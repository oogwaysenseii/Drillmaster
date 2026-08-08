import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { getCity, publishedCities } from "@/data/cities";
import { company } from "@/data/company";
import { galleryByCategory, type GalleryCategory } from "@/data/gallery";
import { roadDistanceKm, drivePhrase } from "@/lib/geo";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SidebarCta, CrossSellCard } from "@/components/SidebarCta";
import { Gallery } from "@/components/Gallery";
import { Locations } from "@/components/Locations";
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

  const hook =
    service.slug === "jadrove-vrtanie"
      ? "Vŕtanie prestupov"
      : "Rezanie panelu a otvorov";

  return {
    title: `${service.name} ${city.name} | ${hook}`,
    description: `${service.name} ${city.nameLocative} a okolí. ${service.summary} Expresné termíny, cenová ponuka zadarmo. Volajte ${company.phoneDisplay}.`,
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
                    Lokálna expertíza:
                  </strong>{" "}
                  Poskytujeme služby obyvateľom a firmám {city.nameLocative}{" "}
                  a okolí. Poznáme miestne podmienky a dokážeme flexibilne
                  reagovať na vaše požiadavky.
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

          {/* ---- Availability: computed distance + city-specific note ---- */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-bold">Termín a dostupnosť</h2>
            <p className="mt-4 leading-relaxed text-ink-700">
              {city.isHeadquarters ? (
                <>
                  Sídlime priamo {city.nameLocative}, takže sme u vás
                  najrýchlejšie zo všetkých našich lokalít.{" "}
                </>
              ) : (
                <>
                  Z nášho sídla vo Zvolene je to {city.nameLocative} približne{" "}
                  {km} km, teda {drive}.{" "}
                </>
              )}
              {c.responseInfo}
            </p>
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
          <SidebarCta
            title={`${service.name} ${city.nameLocative}`}
            text="Nechajte nám kontakt a ozveme sa vám s cenovou ponukou. Obratom a úplne zadarmo."
          />
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
