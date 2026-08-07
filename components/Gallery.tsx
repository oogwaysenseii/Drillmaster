import { Reveal } from "@/components/Reveal";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import type { GalleryCategory } from "@/data/gallery";

/**
 * Gallery section — heading + filterable carousel.
 *
 * Two modes:
 *   <Gallery showFilter />                     all photos + category tabs
 *   <Gallery category="jadrove-vrtanie" />     locked to one category, no tabs
 *
 * SEO value beyond decoration: every photo keeps its descriptive Slovak alt
 * text and each tile links into the relevant service or city page.
 * ImageGallery/ImageObject schema is emitted by the page that renders this.
 */
export function Gallery({
  category,
  city,
  showFilter = false,
  eyebrow = "Naša práca",
  heading = "Galéria realizácií",
  intro = "Ukážky jadrového vŕtania a rezania otvorov z rodinných domov, bytov aj priemyselných objektov.",
}: {
  category?: GalleryCategory;
  /** City page: prefer photos from this town, fall back to the full set. */
  city?: string;
  showFilter?: boolean;
  eyebrow?: string;
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-brand">
                <span className="h-px w-8 bg-brand" />
                {eyebrow}
              </p>
              <h2 className="section-title mt-4">{heading}</h2>
            </div>
            <p className="max-w-md text-ink-700">{intro}</p>
          </div>
          <div className="rule mt-8 h-px w-full bg-ink-200" />
        </Reveal>

        <GalleryCarousel category={category} city={city} showFilter={showFilter} />
        <div className="rule mt-8 h-px w-full bg-ink-200" />
      </div>
    </section>
  );
}
