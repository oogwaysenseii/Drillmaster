import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { company } from "@/data/company";
import { galleryByCategory, type GalleryCategory } from "@/data/gallery";
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

export function serviceHubMetadata(slug: string): Metadata {
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.page?.h1 ?? service.title,
    // service.summary alone is already ~110 chars, so keep the tail short.
    description: `${service.summary} Po celom Slovensku, cenová ponuka zadarmo.`,
    alternates: { canonical: `/${service.slug}/` },
    openGraph: {
      title: service.page?.h1 ?? service.title,
      images: [{ url: `/og/og-${service.slug}.jpg`, width: 1200, height: 630 }],
    },
  };
}

export function ServiceHub({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) notFound();

  const other = services.find((s) => s.slug !== service.slug);
  const crumbs = [
    { name: "Domov", url: "/" },
    { name: service.name, url: `/${service.slug}/` },
  ];

  const page = service.page;
  const photos = galleryByCategory(service.slug as GalleryCategory);

  return (
    <>
      <JsonLd
        data={[
          businessSchema(),
          serviceSchema(service),
          faqSchema(service.faq),
          breadcrumbSchema(crumbs),
          // Photos for this service only
          ...(photos.length
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "ImageGallery",
                  name: `${service.name} – galéria realizácií`,
                  url: `${company.url}/${service.slug}/`,
                  associatedMedia: photos.map((g) => ({
                    "@type": "ImageObject",
                    contentUrl: `${company.url}${g.src}`,
                    caption: g.alt,
                  })),
                },
              ]
            : []),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <div className="container grid gap-12 py-10 lg:grid-cols-[minmax(0,880px)_360px] lg:justify-between">
        <article>
          <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
            {page?.h1 ?? service.title}
          </h1>
          <div className="rule mt-6 h-[2px] w-20 bg-brand" />

          <p className="mt-6 text-lg leading-relaxed text-ink-700">
            {page?.lead ?? service.intro}
          </p>

          {/* ---- Long-form sections (when written) ---- */}
          {page?.sections.map((sec) => (
            <Reveal key={sec.heading}>
              <h2 className="mt-12 text-2xl font-bold">{sec.heading}</h2>

              {sec.body?.map((para) => (
                <p key={para} className="mt-4 leading-relaxed text-ink-700">
                  {para}
                </p>
              ))}

              {sec.bullets && (
                <ul className="mt-5 space-y-3">
                  {sec.bullets.map((b) => (
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
              )}
            </Reveal>
          ))}

          {/* ---- Generic fallback for services without written copy ---- */}
          {!page && (
            <>
              <h2 className="mt-12 text-2xl font-bold">
                Do akých materiálov{" "}
                {service.slug === "jadrove-vrtanie" ? "vŕtame" : "režeme"}?
              </h2>
              <ul className="mt-5 space-y-2">
                {service.materials.map((m) => (
                  <li key={m} className="flex gap-3 text-ink-700">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-brand" />
                    {m}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 text-2xl font-bold">Najčastejšie využitie</h2>
              <ul className="mt-5 space-y-2">
                {service.useCases.map((u) => (
                  <li key={u} className="flex gap-3 text-ink-700">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-brand" />
                    {u}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 text-2xl font-bold">
                Prečo si vybrať Drillmaster?
              </h2>
              <dl className="mt-5 space-y-4">
                {service.benefits.map((b) => (
                  <div key={b.label}>
                    <dt className="font-bold text-ink-900">{b.label}</dt>
                    <dd className="mt-1 leading-relaxed text-ink-700">
                      {b.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {service.specs && (
            <>
              <h2 className="mt-12 text-2xl font-bold">Technické parametre</h2>
              <dl className="mt-5 divide-y divide-ink-200 border border-ink-200">
                {service.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 p-4">
                    <dt className="font-medium text-ink-900">{s.label}</dt>
                    <dd className="text-right text-ink-700">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}


          {/* ---- Price, with a route into the full cenník ---- */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-bold">
              Koľko stojí {service.name.toLowerCase()}?
            </h2>
            <PriceTeaser service={service.slug} />
          </Reveal>

          <h2 className="mt-12 text-2xl font-bold">Časté otázky</h2>
          <div className="mt-4">
            <Faq items={service.faq} />
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SidebarCta title="Nezáväzná cenová ponuka" />
          {other && (
            <CrossSellCard
              title="Hľadáte iné služby?"
              text={`Zabezpečujeme aj profesionálne ${other.name.toLowerCase()} diamantovou technikou.`}
              href={`/${other.slug}/`}
              linkLabel={`Prejsť na ${other.name}`}
            />
          )}
        </aside>
      </div>

      {/* ---- Gallery, filtered to this service ---- */}
      {photos.length > 0 && (
        <Gallery
          category={service.slug as GalleryCategory}
          heading={`${service.name} – naše realizácie`}
          intro={`Fotografie z realizácií: ${service.name.toLowerCase()} v rodinných domoch, bytoch aj priemyselných objektoch.`}
        />
      )}

      {/* ---- Where we work ---- */}
      <Locations service={service.slug} />
    </>
  );
}
