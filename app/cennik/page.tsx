import Link from "next/link";
import type { Metadata } from "next";
import { company } from "@/data/company";
import { services } from "@/data/services";
import {
  drillingPrices,
  cuttingPrices,
  drillingNotes,
  cuttingNotes,
  priceExamples,
  eur,
} from "@/data/pricing";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { SidebarCta } from "@/components/SidebarCta";
import { businessSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cenník jadrového vŕtania a rezania otvorov",
  description:
    "Orientačné ceny jadrového vŕtania podľa priemeru vrtu a rezania otvorov podľa hrúbky múru. Ceny bez DPH. Presnú cenovú ponuku spracujeme zadarmo.",
  alternates: { canonical: "/cennik/" },
};

const crumbs = [
  { name: "Domov", url: "/" },
  { name: "Cenník", url: "/cennik/" },
];

/** Shared table chrome — bordered, tight, readable on mobile. */
function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse border border-ink-200 text-left">
        {children}
      </table>
    </div>
  );
}

const th =
  "border-b border-ink-200 bg-ink-900 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white";
const td = "whitespace-nowrap border-b border-ink-200 px-4 py-3 text-ink-700";
const tdStrong = "whitespace-nowrap border-b border-ink-200 px-4 py-3 font-bold text-ink-900";

/** Price notes — visible, not hidden behind an accordion. */
function Notes({ items }: { items: string[] }) {
  return (
    <div className="mt-6 border-l-4 border-brand bg-ink-100 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
        Informácie o cenách
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((n) => (
          <li key={n} className="flex gap-3 text-sm leading-relaxed text-ink-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  const drilling = services.find((s) => s.slug === "jadrove-vrtanie");
  const cutting = services.find((s) => s.slug === "rezanie-otvorov");

  return (
    <>
      <JsonLd
        data={[
          businessSchema(),
          breadcrumbSchema(crumbs),
          // Prices are per centimetre / per metre, so they are modelled as
          // UnitPriceSpecification. A bare `price` would let Google render
          // "od 0,60 €" as if that were the cost of a hole.
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Jadrové vŕtanie",
            provider: { "@id": `${company.url}/#business` },
            url: `${company.url}/cennik/`,
            offers: drillingPrices.map((p) => ({
              "@type": "Offer",
              name: `Jadrové vŕtanie ⌀ ${p.diameterMm} mm`,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceCurrency: "EUR",
                price: p.reinforced,
                unitText: "cm hĺbky vrtu",
                valueAddedTaxIncluded: false,
              },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Rezanie stavebných otvorov",
            provider: { "@id": `${company.url}/#business` },
            url: `${company.url}/cennik/`,
            offers: cuttingPrices.map((p) => ({
              "@type": "Offer",
              name: `Rezanie múru do ${p.maxThicknessMm} mm`,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceCurrency: "EUR",
                price: p.perMetre,
                unitText: "m rezu",
                valueAddedTaxIncluded: false,
              },
            })),
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <div className="container grid gap-12 py-10 lg:grid-cols-[1fr_360px]">
        {/* min-w-0 matters: a grid item defaults to min-width:auto, so without
            it the wide price table stretches this column instead of scrolling
            inside its own wrapper — which makes phones zoom the whole page out. */}
        <article className="min-w-0">
          <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
            Cenník
          </h1>
          <div className="rule mt-6 h-[2px] w-20 bg-brand" />

          <p className="mt-6 text-lg leading-relaxed text-ink-700">
            Orientačné ceny jadrového vŕtania a rezania stavebných otvorov
            diamantovou technikou. Vŕtanie sa účtuje za centimeter hĺbky vrtu,
            rezanie za meter dĺžky rezu – všetky ceny sú uvedené bez DPH.
            Konkrétnu cenovú ponuku spracujeme zadarmo a nezáväzne.
          </p>

          {/* ---------------- Drilling ---------------- */}
          <Reveal>
            <h2 className="mt-14 text-2xl font-bold">
              Cenník jadrového vŕtania
            </h2>
            <p className="mt-4 leading-relaxed text-ink-700">
              Orientačné ceny jadrového vŕtania betónu, panelu a tehly podľa
              priemeru vrtu. Cena je za <strong>1 cm hĺbky vrtu</strong>.
            </p>

            <TableShell>
              <thead>
                <tr>
                  <th scope="col" className={th}>
                    Priemer vrtáku
                  </th>
                  <th scope="col" className={th}>
                    Tehla
                  </th>
                  <th scope="col" className={th}>
                    Betón / kameň
                  </th>
                  <th scope="col" className={th}>
                    Železobetón / panel
                  </th>
                </tr>
              </thead>
              <tbody>
                {drillingPrices.map((p) => (
                  <tr key={p.diameterMm} className="even:bg-ink-50">
                    <th scope="row" className={tdStrong}>
                      {p.diameterMm} mm
                    </th>
                    <td className={td}>{eur(p.brick)}</td>
                    <td className={td}>{eur(p.concrete)}</td>
                    <td className={td}>{eur(p.reinforced)}</td>
                  </tr>
                ))}
              </tbody>
            </TableShell>

            <Notes items={drillingNotes} />
          </Reveal>

          {/* ---------------- Cutting ---------------- */}
          <Reveal>
            <h2 className="mt-14 text-2xl font-bold">Orientačný cenník rezania</h2>
            <p className="mt-4 leading-relaxed text-ink-700">
              Ceny rezania stavebných otvorov podľa hrúbky múru. Cena je za{" "}
              <strong>1 m dĺžky rezu</strong>.
            </p>

            <TableShell>
              <thead>
                <tr>
                  <th scope="col" className={th}>
                    Hrúbka múru
                  </th>
                  <th scope="col" className={th}>
                    Cena za 1 m rezu
                  </th>
                </tr>
              </thead>
              <tbody>
                {cuttingPrices.map((p) => (
                  <tr key={p.maxThicknessMm} className="even:bg-ink-50">
                    <th scope="row" className={tdStrong}>
                      do {p.maxThicknessMm} mm
                    </th>
                    <td className={td}>{eur(p.perMetre)}</td>
                  </tr>
                ))}
              </tbody>
            </TableShell>

            <Notes items={cuttingNotes} />
          </Reveal>

          {/* ---------------- Worked examples ---------------- */}
          <Reveal>
            <h2 className="mt-14 text-2xl font-bold">Ako sa cena počíta</h2>
            <p className="mt-4 leading-relaxed text-ink-700">
              Cena vrtu závisí od hĺbky, cena rezu od jeho dĺžky. Niekoľko
              príkladov, aby ste vedeli, s čím počítať:
            </p>
            <ul className="mt-5 space-y-4">
              {priceExamples.map((ex) => (
                <li
                  key={ex.label}
                  className="flex flex-col gap-1 border border-ink-200 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-semibold text-ink-900">{ex.label}</span>
                  <span className="text-ink-700">
                    {eur(ex.unitPrice)} × {ex.quantityLabel} ={" "}
                    <strong className="whitespace-nowrap font-bold text-brand">
                      {eur(ex.unitPrice * ex.quantity)}
                    </strong>{" "}
                    <span className="text-sm">bez DPH</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-ink-700">
              Príklady sú ilustračné. Konečná cena závisí od množstva,
              prístupnosti miesta a náročnosti realizácie – ozvite sa nám a
              spočítame vám ju presne.
            </p>
          </Reveal>

          {/* ---------------- Back to services ---------------- */}
          <Reveal>
            <h2 className="mt-14 text-2xl font-bold">Naše služby</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[drilling, cutting].map(
                (s) =>
                  s && (
                    <Link
                      key={s.slug}
                      href={`/${s.slug}/`}
                      className="group border border-ink-200 p-6 transition-colors hover:border-brand"
                    >
                      <h3 className="font-bold text-ink-900 group-hover:text-brand">
                        {s.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">
                        {s.summary}
                      </p>
                      <span className="mt-4 inline-block text-sm font-bold text-brand">
                        Viac o službe →
                      </span>
                    </Link>
                  )
              )}
            </div>
          </Reveal>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SidebarCta
            title="Presná cena zadarmo"
            text="Napíšte nám priemer, hrúbku múru alebo počet prestupov a ozveme sa vám s konkrétnou cenou."
          />
        </aside>
      </div>
    </>
  );
}
