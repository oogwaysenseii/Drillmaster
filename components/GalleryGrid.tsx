"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { gallery } from "@/data/gallery";
import { getService } from "@/data/services";
import { getCity } from "@/data/cities";
import { Reveal } from "@/components/Reveal";
import { GalleryLightbox } from "@/components/GalleryLightbox";

/**
 * The full gallery grid on /galeria/.
 *
 * Clicking a tile opens the lightbox — the point of a gallery page is to look
 * at the photo. It used to navigate straight to the service or city page, so
 * the one thing a visitor came here to do was the one thing they couldn't.
 *
 * The tile stays a real <Link> rather than becoming a <button>, for three
 * reasons: with JS off it still goes somewhere useful, ctrl/cmd/middle-click
 * opens the service page in a new tab as any link should, and the href keeps
 * these tiles as crawlable internal links into the city pages. Only a plain
 * left-click is intercepted; modified clicks fall through to the browser.
 *
 * The lightbox itself carries the service and city links, so the destination
 * the tile used to jump to is still one click away.
 */
export function GalleryGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
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
                onClick={(e) => {
                  // Let the browser handle "open in new tab/window" and any
                  // non-primary button; only take over the plain click.
                  if (
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey ||
                    e.button !== 0
                  ) {
                    return;
                  }
                  e.preventDefault();
                  setLightbox(i);
                }}
                aria-label={`Zväčšiť fotografiu: ${item.alt}`}
                className="group relative block aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={86}
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

      <GalleryLightbox
        items={gallery}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </>
  );
}
