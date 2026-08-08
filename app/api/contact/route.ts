import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getService } from "@/data/services";
import { getCity } from "@/data/cities";
import { company } from "@/data/company";

/**
 * Contact form endpoint — delivers the lead by e-mail via Resend.
 *
 * Design notes:
 *  - honeypot field ("web"): bots fill it, humans never see it. We return a
 *    fake success so the bot doesn't learn it was caught.
 *  - server-side validation, because the client check is UX and not security.
 *  - payload cap: a form with two short fields never needs more than a few kB.
 *  - the Resend client is created per request, not at module scope: at build
 *    time RESEND_API_KEY may be absent, and constructing it there would fail
 *    the build rather than the request.
 *  - if delivery fails we log the lead in full. A lost lead is a lost job;
 *    the server log is the last place it can be recovered from.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
// Slovak / international: optional +, digits, spaces, slashes, dashes.
const PHONE_RE = /^\+?[\d\s/-]{9,20}$/;

const MAX_BODY_BYTES = 4096;

/** Where the lead is sent, and who it appears to be from. */
const TO = process.env.CONTACT_TO ?? "drillmaster@mnsp.sk";
// Must be on a domain verified in Resend. Until drillmaster.sk verifies, set
// CONTACT_FROM=onboarding@resend.dev to test the whole path end to end.
const FROM = process.env.CONTACT_FROM ?? "DrillMaster Web <web@drillmaster.sk>";

/**
 * Rate limit: 5 submissions per IP per 10 minutes.
 *
 * In-memory, so on serverless this is per instance rather than global — a
 * speed bump against a naive flood, not a guarantee. If spam becomes a real
 * problem, move this to Vercel KV / Upstash so the counter is shared.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/**
 * Work out which page the form was sent from.
 *
 * Both values arrive in the request body, so both are attacker-controlled and
 * neither can be dropped into an e-mail as-is. The path is therefore resolved
 * against the routes we actually publish — when it matches, the label is built
 * from our own data and cannot be forged. The browser title is only a fallback
 * for pages we can't name (and is stripped of newlines, which would otherwise
 * be a header-injection vector in the subject line).
 */
function describeSource(page: unknown): { label: string; url: string } {
  const p = (page ?? {}) as Record<string, unknown>;
  const rawPath = typeof p.path === "string" ? p.path : "";
  const rawTitle = typeof p.title === "string" ? p.title : "";

  // Only ever accept a same-site path — never a full URL from the body.
  const path = /^\/[\w\-/]*$/.test(rawPath) ? rawPath : "/";
  const url = `${company.url}${path}`;

  const parts = path.split("/").filter(Boolean);

  // /{service}/{city}/ and /{service}/
  if (parts.length >= 1) {
    const service = getService(parts[0]);
    if (service) {
      const city = parts[1] ? getCity(parts[1]) : undefined;
      return {
        label: city ? `${service.name} – ${city.name}` : service.name,
        url,
      };
    }
  }

  if (parts.length === 0) return { label: "Domovská stránka", url };
  if (parts[0] === "kontakt") return { label: "Kontakt", url };
  if (parts[0] === "galeria") return { label: "Galéria", url };

  // Unknown route: fall back to the browser title, sanitised.
  const title = rawTitle
    .replace(/[\r\n]+/g, " ")
    .replace(/\s*\|\s*Drillmaster\s*$/i, "")
    .trim()
    .slice(0, 120);

  return { label: title || path, url };
}

/** Collapse newlines and cap length — safe for a subject line or a log. */
function oneLine(value: unknown, max: number): string {
  return typeof value === "string"
    ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max)
    : "";
}

/** Free text keeps its line breaks but is still capped. */
function multiLine(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * The long form on /kontakt/ also sends service and city. Both arrive as slugs
 * and are resolved against our own data, so the e-mail can only ever contain a
 * service or town we actually publish — an unknown slug is dropped rather than
 * echoed.
 */
function resolveChoices(body: Record<string, unknown>) {
  const service =
    typeof body.service === "string" ? getService(body.service) : undefined;
  const city = typeof body.city === "string" ? getCity(body.city) : undefined;
  return {
    serviceLabel: service?.name ?? "",
    cityLabel: city?.name ?? "",
  };
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (
    fwd?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  // ---- size cap before parsing ----
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }

  const fields = (body ?? {}) as Record<string, unknown>;
  const { email, phone, web, page } = fields;
  const source = describeSource(page);

  // Optional extras, only sent by the long form on /kontakt/.
  const nameStr = oneLine(fields.name, 120);
  const messageStr = multiLine(fields.message, 2000);
  const { serviceLabel, cityLabel } = resolveChoices(fields);

  // ---- honeypot: silently accept ----
  if (typeof web === "string" && web.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // ---- validation ----
  const errors: Record<string, string> = {};

  const emailStr = typeof email === "string" ? email.trim() : "";
  const phoneStr = typeof phone === "string" ? phone.trim() : "";
  const digits = phoneStr.replace(/\D/g, "");

  if (!EMAIL_RE.test(emailStr)) {
    errors.email = "Zadajte platnú e-mailovú adresu.";
  } else if (emailStr.length > 200) {
    errors.email = "E-mail je príliš dlhý.";
  }

  if (!PHONE_RE.test(phoneStr) || digits.length < 9) {
    errors.phone = "Zadajte platné telefónne číslo.";
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // ---- rate limit (after validation, so bad payloads don't consume quota) ----
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Príliš veľa pokusov. Skúste to o chvíľu znova." },
      { status: 429 }
    );
  }

  // ---- deliver ----
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set — lead NOT delivered:",
      { email: emailStr, phone: phoneStr, page: source.label }
    );
    return NextResponse.json(
      { error: "Odoslanie zlyhalo. Zavolajte nám, prosím." },
      { status: 503 }
    );
  }

  // Subject carries the triage information: an explicit service/city choice
  // when the visitor made one, otherwise the page they wrote from.
  const subject = `Nová žiadosť: ${
    [serviceLabel, cityLabel].filter(Boolean).join(" – ") || source.label
  }`;

  // Composed once so the failure log can record the exact message that was
  // lost — including the visitor's own words, which is the part you can't
  // reconstruct from anything else.
  const text = [
    "Nová žiadosť o cenovú ponuku z webu drillmaster.sk",
    "",
    ...(nameStr ? [`Meno:     ${nameStr}`] : []),
    `E-mail:   ${emailStr}`,
    `Telefón:  ${phoneStr}`,
    ...(serviceLabel ? [`Služba:   ${serviceLabel}`] : []),
    ...(cityLabel ? [`Mesto:    ${cityLabel}`] : []),
    ...(messageStr ? ["", "Správa:", messageStr] : []),
    "",
    `Stránka:  ${source.label}`,
    `Odkaz:    ${source.url}`,
  ].join("\n");

  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: [TO],
      replyTo: emailStr,
      subject,
      text,
    });

    if (error) {
      // Most common cause early on: the sending domain is not verified in
      // Resend yet, so `from` is rejected.
      console.error(
        "[contact] Resend rejected the send:",
        error,
        `\nfrom=${FROM} to=${TO}\nsubject=${subject}\n--- lead ---\n${text}\n---`
      );
      return NextResponse.json(
        { error: "Odoslanie zlyhalo. Zavolajte nám, prosím." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error(
      "[contact] delivery threw:",
      err,
      `\nsubject=${subject}\n--- lead ---\n${text}\n---`
    );
    return NextResponse.json(
      { error: "Odoslanie zlyhalo. Zavolajte nám, prosím." },
      { status: 502 }
    );
  }
}
