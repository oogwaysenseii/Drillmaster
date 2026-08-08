import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { getCity, publishedCities } from "@/data/cities";
import { company } from "@/data/company";
import { galleryByCategory, type GalleryCategory } from "@/data/gallery";
import { roadDistanceKm, drivePhrase, cityTier } from "@/lib/geo";
import { tierCopy, fillTokens } from "@/data/tiers";
import { MeterDot } from "@/components/TierMeter";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SidebarCta, CrossSellCard } from "@/components/SidebarCta";
import { Gallery } from "@/components/Gallery";
import { Locations } from "@/components/Locations";
import { PriceTeaser } from "@/components/PriceTeaser";
import { Reveal } from "@/components/Reveal";
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  businessSchema,
} from "@/lib/schema";

/** Published city slugs — drives generateStaticParams. */
export function cityParams() {
  return publishedCities.map((c) => ({ mesto: c.slug }));
}

/** Unique title + description per service×city. */
export function cityServiceMetadata(
  serviceSlug: string,
  citySlug: string
): Metadata {
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city || !city.content) return {};

  // Title without the extra hook: the root layout already appends
  // "| Drillmaster", and the old three-part title ran to 77 characters, well
  // past what Google shows.
  // Description kept near 150 characters for the same reason, with the tier
  // hook doing the differentiating.
  const hook = tierCopy[cityTier(city)].metaHook;

  return {
    title: `${service.name} ${city.name}`,
    description: `${service.name} ${city.nameLocative} a okolí. ${hook} Cenová ponuka zadarmo, volajte ${company.phoneDisplay}.`,
    alternates: { canonical: `/${service.slug}/${city.slug}/` },
    openGraph: { title: `${service.name} ${city.name} | ${company.name}` },
  };
}

export function CityServicePage({
  serviceSlug,
  citySlug,
}: {
  serviceSlug: string;
  citySlug: string;
}) {
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city || !city.content) notFound();

  const c = city.content;
  const verb = service.slug === "jadrove-vrtanie" ? "vŕtame" : "režeme";
  const combinedFaq = [...(c.localFaq ?? []), ...service.faq];
  const other = services.find((s) => s.slug !== service.slug);
  const photos = galleryByCategory(service.slug as GalleryCategory);

  // Real, per-city facts — the thing that stops these pages reading as one
  // template with the name swapped.
  const km = roadDistanceKm(city);
  const drive = drivePhrase(city);
  const tier = tierCopy[cityTier(city)];
  const fill = (t: string) =>
    fillTokens(t, {
      mesto: city.nameLocative,
      km,
      drive,
      sluzba: service.name.toLowerCase(),
    });

  const crumbs = [
    { name: "Domov", url: "/" },
    { name: service.name, url: `/${service.slug}/` },
    { name: city.name, url: `/${service.slug}/${city.slug}/` },
  ];

  return (
    <>
      <JsonLd
        data={[
          businessSchema(city),
          serviceSchema(service, city),
          faqSchema(combinedFaq),
          breadcrumbSchema(crumbs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <div className="container grid gap-12 py-10 lg:grid-cols-[1fr_360px]">
        <article>
          <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
            {service.name} – {city.name} a okolie
          </h1>
          <div className="rule mt-6 h-[2px] w-20 bg-brand" />

          <p className="mt-6 text-lg leading-relaxed text-ink-700">
            {c.localIntro}
          </p>

          {/* ---- Materials ---- */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-bold">
              Do akých materiálov {verb}?
            </h2>
            <p className="mt-4 leading-relaxed text-ink-700">
              Naša technika si poradí s akýmkoľvek stavebným materiálom bez
              zbytočných vibrácií a otrasov, ktoré by mohli narušiť statiku
              budovy. {city.nameLocative.charAt(0).toUpperCase() +
                city.nameLocative.slice(1)}{" "}
              najčastejšie {verb} do:
            </p>
            <ul className="mt-5 space-y-2">
              {service.materials.map((m) => (
                <li key={m} className="flex gap-3 text-ink-700">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-brand" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- Local building stock (unique per city) ---- */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-bold">
              S akými konštrukciami sa {city.nameLocative} stretávame
            </h2>
            <p className="mt-4 leading-relaxed text-ink-700">
              {c.buildingStock}
            </p>
          </Reveal>

          {/* ---- Use cases ---- */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-bold">Najčastejšie využitie</h2>
            <p className="mt-4 leading-relaxed text-ink-700">
              Obyvateľom a firmám {city.nameLocative} vyhotovujeme presné
              prestupy s dokonale hladkými hranami, ktoré nevyžadujú ďalšie
              začisťovanie. {service.name} využijete na:
            </p>
            <ul className="mt-5 space-y-2">
              {service.useCases.map((u) => (
                <li key={u} className="flex gap-3 text-ink-700">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-brand" />
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>


          {/* ---- Why us, city-flavoured ---- */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-bold">
              Prečo si vybrať {service.name.toLowerCase()} {city.nameLocative}{" "}
              od Drillmaster?
            </h2>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 bg-brand" />
                <span className="leading-relaxed text-ink-700">
                  <strong className="font-bold text-ink-900">
                    {tier.whyBullet.label}:
                  </strong>{" "}
                  {tier.whyBullet.text}
                </span>
              </li>
              {service.benefits.map((b) => (
                <li key={b.label} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-brand" />
                  <span className="leading-relaxed text-ink-700">
                    <strong className="font-bold text-ink-900">
                      {b.label}:
                    </strong>{" "}
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- Availability and price, by distance ----
               Kept to one line plus a table on purpose: this is a buying
               decision (how far, how soon, what it costs), not an essay.
               See data/tiers.ts. */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-bold">
              Dostupnosť a cena {city.nameLocative}
            </h2>

            <p className="mt-4 leading-relaxed text-ink-700">
              {city.isHeadquarters
                ? `Sídlime priamo ${city.nameLocative}, takže sme u vás najrýchlejšie zo všetkých našich lokalít.`
                : tier.lead}{" "}
              {c.responseInfo}
            </p>

            <dl className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
              {/* Distance as a level, not a number: "235 km" invites the
                  visitor to decide for us that it's too far. */}
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                <dt className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-ink-400 sm:w-44">
                  Vzdialenosť
                </dt>
                <dd className="flex items-center gap-2.5 text-ink-700">
                  <MeterDot
                    metric="distance"
                    level={city.isHeadquarters ? 1 : tier.meters.distance}
                    size="md"
                    decorative
                  />
                  <span className="font-bold text-ink-900">
                    {city.isHeadquarters ? "Sídlo firmy" : tier.distanceLabel}
                  </span>
                </dd>
              </div>
              {tier.rows.map((r) => (
                <div
                  key={r.label}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6"
                >
                  <dt className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-ink-400 sm:w-44">
                    {r.label}
                  </dt>
                  <dd className="leading-relaxed text-ink-700">{r.text}</dd>
                </div>
              ))}
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                <dt className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-ink-400 sm:w-44">
                  Najvýhodnejšie pre
                </dt>
                <dd className="leading-relaxed text-ink-700">{tier.bestFor}</dd>
              </div>
            </dl>
          </Reveal>

          {/* ---- Price, with a route into the full cenník ---- */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-bold">
              Koľko stojí {service.name.toLowerCase()} {city.nameLocative}?
            </h2>
            <PriceTeaser service={service.slug} city={city.nameLocative} />
          </Reveal>

          {/* ---- FAQ ---- */}
          <h2 className="mt-12 text-2xl font-bold">Časté otázky</h2>
          <div className="mt-4">
            <Faq items={combinedFaq} />
          </div>


          {/* ---- The other service, same city ---- */}
          {other && (
            <>
              <h2 className="mt-12 text-2xl font-bold">
                Ďalšie služby {city.nameLocative}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-700">
                Okrem toho zabezpečujeme {city.nameLocative} aj profesionálne{" "}
                {other.name.toLowerCase()} diamantovou technikou.
              </p>
              <Link
                href={`/${other.slug}/${city.slug}/`}
                className="mt-4 inline-block font-semibold text-brand hover:underline"
              >
                Prejsť na {other.name} {city.name} →
              </Link>
            </>
          )}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SidebarCta title={fill(tier.cta.title)} text={fill(tier.cta.text)} />
          {other && (
            <CrossSellCard
              title="Hľadáte iné služby?"
              text={`Zabezpečujeme ${city.nameLocative} aj ${other.name.toLowerCase()}.`}
              href={`/${other.slug}/${city.slug}/`}
              linkLabel={`Prejsť na ${other.name}`}
            />
          )}
        </aside>
      </div>

      {/* ---- Gallery, filtered to this service ---- */}
      {photos.length > 0 && (
        <Gallery
          category={service.slug as GalleryCategory}
          city={city.slug}
          heading={`${service.name} ${city.nameLocative}`}
          intro={`Ukážky našej práce – ${service.name.toLowerCase()} v rodinných domoch, bytoch aj priemyselných objektoch.`}
        />
      )}

      {/* ---- Where we work ---- */}
      <Locations service={service.slug} />
    </>
  );
}
