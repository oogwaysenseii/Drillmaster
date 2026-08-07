"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Equipment slider — cross-fades between the machines.
 *
 * Both images are rendered in the DOM (stacked, opacity-toggled) rather than
 * swapped, so:
 *   - the alt text of every machine is crawlable,
 *   - there's no flash while the next image decodes,
 *   - the container height never jumps (no CLS).
 *
 * Auto-advances slowly, pauses on hover/focus, and stops entirely under
 * prefers-reduced-motion.
 */

export interface Slide {
  src: string;
  alt: string;
  /** Short caption shown under the image. */
  label: string;
  width: number;
  height: number;
}

const AUTOPLAY_MS = 6000;

export function EquipmentSlider({
  slides,
  className = "",
}: {
  slides: Slide[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => setI((n) => (n + dir + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || reduced.current || slides.length < 2) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, go, slides.length]);

  if (!slides.length) return null;

  return (
    <div
      className={`w-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Naša technika"
    >
      {/* Stage — fixed aspect so nothing shifts between slides */}
      <div className="relative mx-auto aspect-[425/830] w-full max-w-[400px]">
        {slides.map((s, n) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            sizes="(max-width: 1024px) 60vw, 400px"
            priority={n === 0}
            className={`absolute inset-0 m-auto h-full w-full object-contain transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              n === i ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={n !== i}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Predchádzajúci stroj"
          className="flex h-9 w-9 items-center justify-center border border-ink-200 text-ink-900 transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((s, n) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Zobraziť: ${s.label}`}
              aria-current={n === i}
              className={`h-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                n === i ? "w-6 bg-brand" : "w-1.5 bg-ink-200 hover:bg-ink-400"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Ďalší stroj"
          className="flex h-9 w-9 items-center justify-center border border-ink-200 text-ink-900 transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Caption — announced politely so screen readers follow the change */}
      <p
        aria-live="polite"
        className="mt-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-400"
      >
        {slides[i].label}
      </p>
    </div>
  );
}
