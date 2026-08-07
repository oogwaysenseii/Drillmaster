import { homepage } from "@/data/homepage";
import { company } from "@/data/company";
import { icons } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";

/**
 * Trust band + contact bar — light variant.
 *
 * Sits directly under the dark hero, so the red rule across the top does the
 * work of separating it rather than a background colour change.
 */
export function TrustBand() {
  return (
    <section className="relative bg-white text-ink-900">
      {/* Brand rule across the very top */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand via-brand/40 to-transparent" />

      <div className="container">
        <div className="grid divide-y divide-ink-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {homepage.trust.map((t, i) => {
            const Icon = icons[t.icon];
            return (
              <Reveal key={t.label} delay={i * 110}>
                {/* Identical padding on all three */}
                <div className="group flex h-full items-start gap-5 p-8">
                  {/* Icon plate — solid red with a white glyph */}
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                    <Icon className="h-6 w-6 text-white" />
                  </span>

                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold tracking-[0.3em] text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-1.5 font-bold leading-snug text-ink-900">
                      {t.label}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                      {t.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ---- Contact bar ---- */}
      <div className="border-t border-ink-200 bg-ink-100">
        <div className="container">
          <div className="flex flex-col items-stretch md:flex-row md:items-center">
            <div className="flex items-center gap-3 py-6 pr-8 md:w-72">
              <span className="h-px w-6 bg-brand" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
                Kontaktujte nás
              </span>
            </div>

            <div className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-4 border-t border-ink-200 py-6 md:border-l md:border-t-0 md:pl-10">
              <a
                href={`tel:${company.phone}`}
                className="group flex items-center gap-3  text-ink-700"
              >
                <icons.phone className="h-4 w-4 text-brand" />
                <span className="relative">
                  {company.phoneDisplay}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </span>
              </a>

              <a
                href={`mailto:${company.email}`}
                className="group flex items-center gap-3 text-ink-700 transition-colors hover:text-ink-900"
              >
                <icons.mail className="h-4 w-4 text-brand" />
                <span className="relative">
                  {company.email}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </span>
              </a>

              <span className="flex items-center gap-3 text-ink-400">
                <icons.clock className="h-4 w-4 text-ink-400" />
                {company.openingHours.map((h) => (
                  <span key={h.days}>
                    {h.days}: {h.hours}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
