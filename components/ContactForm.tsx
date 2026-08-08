"use client";

import { useState } from "react";

type Errors = Partial<Record<"email" | "phone", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Two-field lead form: e-mail + phone.
 *
 * Kept deliberately short — every extra field measurably reduces completion,
 * and for this business a phone number is all that's needed to call back.
 *
 * Accessibility: real <label>s, `aria-invalid`, errors linked via
 * `aria-describedby`, and a polite live region for the result message.
 * Validation runs client-side for instant feedback AND server-side in
 * /api/contact (the client check is UX, not security).
 */
export function ContactForm({
  className = "",
  padding = "p-7 md:p-9",
}: {
  className?: string;
  /**
   * Padding utilities for the form box. This is a separate prop rather than
   * something you append to `className` on purpose: Tailwind emits padding
   * utilities in scale order, so a `p-5` tacked onto className loses to the
   * default `md:p-9` no matter where it sits in the string. Passing it here
   * replaces the default instead of competing with it.
   */
  padding?: string;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [web, setWeb] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  function validate(): Errors {
    const e: Errors = {};
    if (!EMAIL_RE.test(email.trim())) e.email = "Zadajte platný e-mail.";
    if (phone.replace(/\D/g, "").length < 9)
      e.phone = "Zadajte platné telefónne číslo.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setState("sending");
    try {
      // NOTE the trailing slash — next.config has `trailingSlash: true`, so
      // "/api/contact" 308-redirects and costs an extra round trip.
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `page` tells the office which page the lead came from — a form sent
        // from /rezanie-otvorov/detva/ is a different conversation from one
        // sent off the homepage. The server treats both fields as untrusted
        // and prefers to resolve the path against known routes itself.
        body: JSON.stringify({
          email,
          phone,
          web,
          page: {
            path: window.location.pathname,
            title: document.title,
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.errors) setErrors(data.errors);
        setState("error");
        return;
      }
      setState("sent");
      setEmail("");
      setPhone("");
    } catch {
      setState("error");
    }
  }

  // White fields on the red band — higher contrast and reads as a real form.
  // focus-visible ring is on the OUTSIDE so it stays visible against white.
  const field =
    "w-full border-2 border-transparent bg-white px-5 py-4 text-ink-900 placeholder-ink-400 outline-none transition-shadow duration-300 focus:border-ink-900/20 focus:ring-4 focus:ring-black/15";

  if (state === "sent") {
    return (
      <div
        role="status"
        className={`border-2 border-white/40 bg-white/10 px-6 py-10 text-center ${className}`}
      >
        <p className="text-lg font-bold text-white">Ďakujeme!</p>
        <p className="mt-2 text-white/85">
          Ozveme sa vám čo najskôr s cenovou ponukou.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`border border-white/25 bg-black/10 ${padding} text-left backdrop-blur-sm ${className}`}
    >
      {/* Stacked, not side-by-side: the form now sits in a narrower column */}
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="cf-email"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/80"
          >
            Váš e-mail
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            placeholder="vas@email.sk"
            className={`${field} ${errors.email ? "border-ink-900" : ""}`}
          />
          {errors.email && (
            <p id="cf-email-err" className="mt-2 text-sm font-medium text-white">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cf-phone"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/80"
          >
            Telefónne číslo
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cf-phone-err" : undefined}
            placeholder="+421 900 000 000"
            className={`${field} ${errors.phone ? "border-ink-900" : ""}`}
          />
          {errors.phone && (
            <p id="cf-phone-err" className="mt-2 text-sm font-medium text-white">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-web">Nevypĺňajte</label>
        <input
          id="cf-web"
          name="web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={web}
          onChange={(e) => setWeb(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        // Dark button so it doesn't read as a third white input
        className="mt-7 w-full bg-ink px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
      >
        {state === "sending" ? "Odosielam…" : "Mám záujem"}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-white/70">
        Odoslaním súhlasíte so spracovaním údajov za účelom spätného
        kontaktovania.
      </p>

      <p aria-live="polite" className="sr-only">
        {state === "sending" ? "Odosielam formulár" : ""}
      </p>

      {state === "error" && (
        <p role="alert" className="mt-4 text-center font-medium text-white">
          Odoslanie zlyhalo. Skúste to prosím znova alebo nám zavolajte.
        </p>
      )}
    </form>
  );
}
