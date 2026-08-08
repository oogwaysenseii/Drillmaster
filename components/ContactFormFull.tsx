"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { publishedCities } from "@/data/cities";

/**
 * Full enquiry form — the /kontakt/ version.
 *
 * The two-field form elsewhere on the site is deliberately minimal: it sits
 * beside other content and its only job is to capture a callback. Someone who
 * has navigated to the contact page has already decided to get in touch, so
 * here it's worth asking for what actually shortens the first phone call —
 * what the job is, where it is, and how to address them.
 *
 * Everything except e-mail and phone is optional. Each extra required field
 * costs conversions, and a lead with a phone number is already actionable.
 *
 * Accessibility mirrors the short form: real <label>s, `aria-invalid`,
 * errors linked with `aria-describedby`, and a polite live region for the
 * result. Validation runs here for instant feedback and again in
 * /api/contact, which is the copy that counts.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

type Errors = Partial<Record<"email" | "phone" | "message", string>>;

const MESSAGE_MAX = 2000;

export function ContactFormFull({ className = "" }: { className?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
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
    if (message.length > MESSAGE_MAX)
      e.message = `Správa je príliš dlhá (max. ${MESSAGE_MAX} znakov).`;
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setState("sending");
    try {
      // Trailing slash: next.config sets trailingSlash, so "/api/contact"
      // would 308-redirect and cost an extra round trip.
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          city,
          message,
          web,
          page: { path: window.location.pathname, title: document.title },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.errors) setErrors(data.errors);
        setState("error");
        return;
      }
      setState("sent");
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setCity("");
      setMessage("");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div
        className={`border-2 border-white/40 bg-white/10 px-6 py-12 text-center ${className}`}
      >
        <p className="text-lg font-bold text-white">Ďakujeme!</p>
        <p className="mt-2 text-white/85">
          Vašu žiadosť sme prijali. Ozveme sa vám čo najskôr.
        </p>
      </div>
    );
  }

  const field =
    "w-full border-0 bg-white px-4 py-3.5 text-ink-900 outline-none ring-offset-2 ring-offset-brand placeholder:text-ink-400 focus-visible:ring-2 focus-visible:ring-white";
  const label =
    "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/80";
  const optional =
    "ml-2 normal-case tracking-normal text-[11px] font-medium text-white/50";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`text-left ${className}`}
      aria-describedby="cff-status"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-2">
          <label htmlFor="cff-name" className={label}>
            Meno <span className={optional}>nepovinné</span>
          </label>
          <input
            id="cff-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ján Novák"
            className={field}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="cff-email" className={label}>
            Váš e-mail
          </label>
          <input
            id="cff-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cff-email-err" : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vas@email.sk"
            className={field}
          />
          {errors.email && (
            <p id="cff-email-err" className="mt-2 text-sm font-medium text-white">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="cff-phone" className={label}>
            Telefónne číslo
          </label>
          <input
            id="cff-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cff-phone-err" : undefined}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+421 900 000 000"
            className={field}
          />
          {errors.phone && (
            <p id="cff-phone-err" className="mt-2 text-sm font-medium text-white">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Service */}
        <div>
          <label htmlFor="cff-service" className={label}>
            Služba <span className={optional}>nepovinné</span>
          </label>
          <select
            id="cff-service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={field}
          >
            <option value="">Neviem / iné</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label htmlFor="cff-city" className={label}>
            Mesto / okres <span className={optional}>nepovinné</span>
          </label>
          <select
            id="cff-city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={field}
          >
            <option value="">Vyberte mesto</option>
            {publishedCities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="cff-message" className={label}>
            Čo potrebujete? <span className={optional}>nepovinné</span>
          </label>
          <textarea
            id="cff-message"
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "cff-message-err" : undefined}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Napríklad: 3 prestupy ⌀ 100 mm cez 30 cm panel, byt na 4. poschodí."
            className={`${field} resize-y`}
          />
          {errors.message && (
            <p
              id="cff-message-err"
              className="mt-2 text-sm font-medium text-white"
            >
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — off-screen, not display:none, so bots still fill it. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cff-web">Web</label>
        <input
          id="cff-web"
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
        className="mt-7 w-full bg-ink px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-auto"
      >
        {state === "sending" ? "Odosielam…" : "Odoslať žiadosť"}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-white/70">
        Odoslaním súhlasíte so spracovaním údajov za účelom spätného
        kontaktovania.
      </p>

      <p aria-live="polite" className="sr-only" id="cff-status">
        {state === "sending" ? "Odosielam formulár" : ""}
      </p>

      {state === "error" && !errors.email && !errors.phone && (
        <p role="alert" className="mt-4 font-medium text-white">
          Odoslanie zlyhalo. Skúste to znova alebo nám zavolajte.
        </p>
      )}
    </form>
  );
}
