import type { Metadata } from "next";
import { gallery } from "@/data/gallery";
import { company } from "@/data/company";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GalleryGrid } from "@/components/GalleryGrid";
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

          <GalleryGrid />

        </div>
      </section>
    </>
  );
}
