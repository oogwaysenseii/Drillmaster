import { NextResponse } from "next/server";
import { Resend } from "resend";

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

  const { email, phone, web } = (body ?? {}) as Record<string, unknown>;

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
      { email: emailStr, phone: phoneStr }
    );
    return NextResponse.json(
      { error: "Odoslanie zlyhalo. Zavolajte nám, prosím." },
      { status: 503 }
    );
  }

  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: [TO],
      replyTo: emailStr,
      subject: "Nová žiadosť o cenovú ponuku",
      text: [
        "Nová žiadosť o cenovú ponuku z webu drillmaster.sk",
        "",
        `E-mail:  ${emailStr}`,
        `Telefón: ${phoneStr}`,
      ].join("\n"),
    });

    if (error) {
      // Most common cause early on: the sending domain is not verified in
      // Resend yet, so `from` is rejected.
      console.error("[contact] Resend rejected the send:", error, {
        from: FROM,
        to: TO,
        lead: { email: emailStr, phone: phoneStr },
      });
      return NextResponse.json(
        { error: "Odoslanie zlyhalo. Zavolajte nám, prosím." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[contact] delivery threw:", err, {
      lead: { email: emailStr, phone: phoneStr },
    });
    return NextResponse.json(
      { error: "Odoslanie zlyhalo. Zavolajte nám, prosím." },
      { status: 502 }
    );
  }
}
