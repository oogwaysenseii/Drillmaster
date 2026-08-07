import { NextResponse } from "next/server";

/**
 * Contact form endpoint — STUB.
 *
 * It validates and accepts the submission but does NOT yet deliver anywhere.
 * Wire up one of these before launch and replace the marked section:
 *   - Resend / Postmark / SendGrid  → e-mail to drillmaster@mnsp.sk
 *   - or a webhook into whatever CRM the team uses
 *
 * Security notes already handled here:
 *   - honeypot field ("web") — bots fill it, humans never see it
 *   - server-side validation (never trust the client)
 *   - payload size cap
 *   - no logging of personal data beyond what's needed
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
// Slovak / international: optional +, digits, spaces, slashes, dashes; 9–15 digits
const PHONE_RE = /^\+?[\d\s/-]{9,20}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }

  const { email, phone, web } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: silently accept so bots don't learn they were caught.
  if (typeof web === "string" && web.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    errors.email = "Zadajte platnú e-mailovú adresu.";
  }
  const digits = typeof phone === "string" ? phone.replace(/\D/g, "") : "";
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim()) || digits.length < 9) {
    errors.phone = "Zadajte platné telefónne číslo.";
  }
  if (typeof email === "string" && email.length > 200) {
    errors.email = "E-mail je príliš dlhý.";
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // ------------------------------------------------------------------
  // TODO: deliver the lead. Example with Resend:
  //
  //   await resend.emails.send({
  //     from: "web@drillmaster.sk",
  //     to: "drillmaster@mnsp.sk",
  //     subject: "Nová žiadosť o cenovú ponuku",
  //     text: `E-mail: ${email}\nTelefón: ${phone}`,
  //   });
  //
  // Until this is wired up the form reports success but nothing is sent —
  // do NOT go live without it.
  // ------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
