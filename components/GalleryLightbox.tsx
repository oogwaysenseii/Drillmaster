"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import type { GalleryItem } from "@/data/gallery";
import { getCity } from "@/data/cities";
import { getService } from "@/data/services";

/**
 * Gallery lightbox.
 *
 * Deliberately NOT a route. Per-photo pages would be ~10 near-empty pages
 * whose only content is one image and a caption — exactly the thin-content
 * pattern we're already trying to stay clear of on the city pages. Everything
 * a crawler needs is already in the grid: the <img> with descriptive alt text,
 * the visible caption, and ImageObject schema on the page. The lightbox is a
 * viewing convenience for humans, so it lives in client state only.
 *
 * Accessibility: focus is moved into the dialog and restored on close, Escape
 * closes, arrows navigate, and the backdrop is click-to-dismiss.
 */
export function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onNavigate((index + dir + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  // Keyboard + scroll lock while open
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open, onClose, go]);

  if (index === null) return null;
  const item = items[index];
  if (!item) return null;

  const city = item.city ? getCity(item.city) : undefined;
  const service = getService(item.category);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Zavrieť"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-brand hover:bg-brand md:right-8 md:top-8"
      >
        <span aria-hidden="true">✕</span>
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Predchádzajúca fotografia"
            className="absolute left-3 flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-brand hover:bg-brand md:left-8"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Ďalšia fotografia"
            className="absolute right-3 flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-brand hover:bg-brand md:right-8"
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      <figure className="flex max-h-full w-full max-w-4xl flex-col items-center">
        {/* next/image `fill` needs a definite height — flex-1 inside a
            max-h-full column collapses to zero, so the height is explicit. */}
        <div className="relative h-[55vh] w-full md:h-[62vh]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 92vw, 900px"
            quality={85}
            className="object-contain"
            priority
          />
        </div>

        <figcaption className="mt-5 w-full max-w-2xl text-center">
          <p className="text-lg font-bold text-white">{item.caption}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/70">
            {item.alt}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.14em]">
            {service && (
              <Link
                href={`/${service.slug}/`}
                onClick={onClose}
                className="border border-white/25 px-4 py-2 text-white transition-colors hover:border-brand hover:text-brand"
              >
                {service.name}
              </Link>
            )}
            {city && (
              <Link
                href={`/${item.category}/${city.slug}/`}
                onClick={onClose}
                className="bg-brand px-4 py-2 text-white transition-colors hover:bg-brand-dark"
              >
                {city.name}
              </Link>
            )}
            <span className="text-white/40">
              {index + 1} / {items.length}
            </span>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
