import Link from "next/link";
import { company } from "@/data/company";
import { ContactForm } from "@/components/ContactForm";
import { icons } from "@/components/Icons";

/**
 * Red sidebar CTA — same two-field lead form as the homepage CTA, so a visitor
 * can convert without leaving the service page. Phone stays visible above it
 * for anyone who'd rather just call.
 */
export function SidebarCta({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-brand p-7 text-white">
      {/* Same diagonal texture as the homepage CTA */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 14px)",
        }}
      />
      <div className="relative">
        <h2 className="text-xl font-bold leading-snug">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/90">
          {text ??
            "Nechajte nám kontakt a ozveme sa vám s cenovou ponukou. Obratom a úplne zadarmo."}
        </p>

        <a
          href={`tel:${company.phone}`}
          className="group mt-5 flex items-center gap-3 text-xl font-extrabold text-white"
        >
          <icons.phone className="h-5 w-5 shrink-0 text-white/70" />
          <span className="relative">
            {company.phoneDisplay}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
          </span>
        </a>

        <ContactForm padding="p-5" className="mt-6 border-white/25 bg-black/10" />
      </div>
    </div>
  );
}

/** Light "other services" card shown under the CTA. */
export function CrossSellCard({
  title,
  text,
  href,
  linkLabel,
}: {
  title: string;
  text: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mt-6 border-l-4 border-ink-900 bg-ink-100 p-6">
      <h2 className="font-bold text-ink-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-700">{text}</p>
      <Link
        href={href}
        className="mt-3 inline-block font-semibold text-brand hover:underline"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}
