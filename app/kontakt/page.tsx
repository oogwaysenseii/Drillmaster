import type { Metadata } from "next";
import { company } from "@/data/company";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactFormFull } from "@/components/ContactFormFull";
import { icons } from "@/components/Icons";
import { businessSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktujte Drillmaster – jadrové vŕtanie a rezanie otvorov. Telefón ${company.phoneDisplay}, e-mail ${company.email}. Sídlo ${company.address.city}, pôsobíme po celom Slovensku.`,
  alternates: { canonical: "/kontakt/" },
};

const crumbs = [
  { name: "Domov", url: "/" },
  { name: "Kontakt", url: "/kontakt/" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[businessSchema(), breadcrumbSchema(crumbs)]} />
      <Breadcrumbs items={crumbs} />

      <section className="section pt-10">
        <div className="container">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-brand">
                <span className="h-px w-8 bg-brand" />
                Sme tu pre vás
              </p>
              <h1 className="section-title mt-4">Kontakt</h1>
              <div className="rule mt-6 h-[2px] w-20 bg-brand" />
              <p className="mt-6 text-lg leading-relaxed text-ink-700">
                Zavolajte nám alebo nám nechajte kontakt – ozveme sa vám
                s nezáväznou cenovou ponukou.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* Details */}
            <Reveal>
              <dl className="divide-y divide-ink-200 border-y border-ink-200">
                <div className="flex items-start gap-4 py-6">
                  <icons.phone className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
                      Telefón
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${company.phone}`}
                        className="text-2xl font-extrabold transition-colors hover:text-brand"
                      >
                        {company.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-6">
                  <icons.mail className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
                      E-mail
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${company.email}`}
                        className="text-lg font-semibold transition-colors hover:text-brand"
                      >
                        {company.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-6">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-brand" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
                      Sídlo
                    </dt>
                    <dd className="mt-1 leading-relaxed text-ink-700">
                      {company.legalName}
                      <br />
                      {company.address.street}
                      <br />
                      {company.address.postalCode} {company.address.city}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-6">
                  <icons.clock className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
                      Otváracie hodiny
                    </dt>
                    <dd className="mt-1 text-ink-700">
                      {company.openingHours.map((h) => (
                        <span key={h.days} className="block">
                          {h.days}: {h.hours}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>

              <a
                href={company.hasMap}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-brand"
              >
                Zobraziť na mape
                <icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>

            {/* Form on the red band */}
            <Reveal delay={80}>
              <div className="relative overflow-hidden bg-brand p-8 md:p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 14px)",
                  }}
                />
                <div className="relative">
                  <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">
                    Cenová ponuka zadarmo
                  </h2>
                  <p className="mt-3 max-w-md text-white/90">
                    Popíšte nám, čo potrebujete – priemer vrtu, hrúbku múru
                    alebo počet prestupov. Ozveme sa vám s konkrétnou cenou.
                  </p>
                  <ContactFormFull className="mt-8" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
