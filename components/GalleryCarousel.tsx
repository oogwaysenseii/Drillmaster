"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  gallery as allPhotos,
  galleryCategories,
  galleryForCity,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";
import { getCity } from "@/data/cities";
import { getService } from "@/data/services";
import { GalleryLightbox } from "@/components/GalleryLightbox";

/**
 * Horizontal gallery carousel — 4 slides visible on desktop.
 *
 * Native scrolling + CSS scroll-snap rather than a carousel library:
 *  - every image stays in the DOM and in the static HTML (crawlable),
 *  - touch/trackpad swipe works for free,
 *  - arrows are an enhancement; with JS off it's a scrollable strip.
 *
 * Tiles open a lightbox rather than navigating — see GalleryLightbox for why
 * there are no per-photo pages.
 */
export function GalleryCarousel({
  category,
  city,
  showFilter = false,
}: {
  /** Lock to one category (service pages). */
  category?: GalleryCategory;
  /** Prefer photos from this city; falls back to the whole set. */
  city?: string;
  /** Show category filter tabs. */
  showFilter?: boolean;
}) {
  const [active, setActive] = useState<GalleryCategory | "">("");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const effective: GalleryCategory | "" = category ?? active;

  // City pages: show local work when we have it, otherwise the full set.
  const { items: gallery, isLocal } = city
    ? galleryForCity(city, effective || undefined)
    : {
        items: effective
          ? allPhotos.filter((g) => g.category === effective)
          : allPhotos,
        isLocal: false,
      };

  const cityName = city ? getCity(city)?.name : undefined;

  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
    setPages(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth)));
    setPage(el.clientWidth ? Math.round(el.scrollLeft / el.clientWidth) : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  // Filter changes the track width — reset position and recompute.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    update();
  }, [effective, update]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * el.clientWidth,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const btn =
    "flex h-12 w-12 items-center justify-center border transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed";

  return (
    <div className="mt-10">
      {showFilter && !category && (
        <div
          role="tablist"
          aria-label="Kategórie fotografií"
          className="mb-6 flex flex-wrap gap-2"
        >
          {[{ slug: "" as const, label: "Všetko" }, ...galleryCategories].map(
            (c) => {
              const on = c.slug === active;
              return (
                <button
                  key={c.slug || "all"}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => setActive(c.slug)}
                  className={`border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                    on
                      ? "border-brand bg-brand text-white"
                      : "border-ink-200 text-ink-700 hover:border-brand hover:text-brand"
                  }`}
                >
                  {c.label}
                </button>
              );
            }
          )}
        </div>
      )}

      {/* On a city page, say plainly whether these photos are from that town */}
      {city && cityName && (
        <p className="mb-6 text-sm text-ink-400">
          {isLocal
            ? `Fotografie z realizácií priamo v meste ${cityName}.`
            : `Z tohto mesta zatiaľ nemáme zverejnené fotografie – nižšie sú ukážky našich prác z iných lokalít.`}
        </p>
      )}

      <ul
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {gallery.map((item, i) => {
          const service = getService(item.category);
          const photoCity = item.city ? getCity(item.city) : undefined;

          return (
            <li
              key={item.src}
              className="w-[78%] shrink-0 snap-start sm:w-[48%] md:w-[32%] lg:w-[calc(25%-0.75rem)]"
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Zväčšiť fotografiu: ${item.alt}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden text-left"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={76}
                  // These tiles are 4:5, but most photos are 4:3 landscape.
                  // `object-cover` then scales the image to fill the HEIGHT,
                  // so the image renders 1.67x wider than the tile and spills
                  // out of view on both sides. `sizes` describes the tile, so
                  // the browser was fetching for the tile width and the result
                  // was upscaled 1.29x — visibly soft on every landscape photo.
                  // Widths below are the tile widths multiplied by that 1.67
                  // crop factor. Portrait photos are unaffected: for them the
                  // width governs and the extra is simply not requested.
                  sizes="(max-width: 640px) 130vw, (max-width: 768px) 80vw, (max-width: 1024px) 54vw, 40vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent transition-opacity duration-500" />

                <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

                {/* Location badge — always visible, only when we actually
                    know where the photo is from. Deepens slightly on hover so
                    it still feels connected to the tile. */}
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
              </button>
            </li>
          );
        })}
      </ul>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
            aria-label="Predchádzajúce fotografie"
            className={`${btn} border-ink-200 text-ink-900 hover:border-brand hover:bg-brand hover:text-white`}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={atEnd}
            aria-label="Ďalšie fotografie"
            className={`${btn} border-ink-200 text-ink-900 hover:border-brand hover:bg-brand hover:text-white`}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="h-px flex-1 bg-ink-200" aria-hidden="true">
          <div
            className="h-px bg-brand transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${((page + 1) / pages) * 100}%` }}
          />
        </div>

        <a
          href="/galeria/"
          className="group hidden shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-ink-700 transition-colors hover:text-brand sm:flex"
        >
          Celá galéria
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      <GalleryLightbox
        items={gallery}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </div>
  );
}
