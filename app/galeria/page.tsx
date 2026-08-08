import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { gallery } from "@/data/gallery";
import { company } from "@/data/company";
import { getService } from "@/data/services";
import { getCity } from "@/data/cities";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { businessSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Galéria realizácií",
  description:
    "Fotografie našich realizácií – jadrové vŕtanie prestupov, rezanie panelu v byte, vŕtanie do kameňa a betónu. Ukážky práce diamantovou technikou.",
  alternates: { canonical: "/galeria/" },
};

const crumbs = [
  { name: "Domov", url: "/" },
  { name: "Galéria", url: "/galeria/" },
];

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema(),
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Galéria realizácií – Drillmaster",
            url: `${company.url}/galeria/`,
            associatedMedia: gallery.map((g) => ({
              "@type": "ImageObject",
              contentUrl: `${company.url}${g.src}`,
              caption: g.alt,
            })),
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="section pt-10">
        <div className="container">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-brand">
                <span className="h-px w-8 bg-brand" />
                Naša práca
              </p>
              <h1 className="section-title mt-4">Galéria realizácií</h1>
              <div className="rule mt-6 h-[2px] w-20 bg-brand" />
              <p className="mt-6 text-lg leading-relaxed text-ink-700">
                Ukážky jadrového vŕtania a rezania stavebných otvorov z
                rodinných domov, bytov aj priemyselných objektov.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, i) => {
              const service = getService(item.category);
              const photoCity = item.city ? getCity(item.city) : undefined;
              const href = item.city
                ? `/${item.category}/${item.city}/`
                : `/${item.category}/`;
              return (
                <Reveal key={item.src} variant="scale" delay={(i % 3) * 80}>
                  <Link
                    href={href}
                    className="group relative block aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      quality={80}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

                    {/* Location badge — always on, only when known */}
                    {photoCity && (
                      <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-black/55 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-500 group-hover:bg-brand">
                        <span className="h-1.5 w-1.5 bg-brand transition-colors duration-500 group-hover:bg-white" />
                        {photoCity.name}
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 p-5">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {service?.name}
                      </span>
                      <span className="mt-1 block font-semibold leading-snug text-white">
                        {item.caption}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
