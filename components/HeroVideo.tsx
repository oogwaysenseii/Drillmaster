"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Optional background video layered over the poster image.
 *
 * Deliberate choices:
 *  - The <video> is only mounted AFTER hydration, so it never competes with
 *    the poster image for LCP and never blocks first paint.
 *  - It fades in only once `canplay` fires — no black flash, no pop.
 *  - Skipped entirely when the user prefers reduced motion, or on a slow /
 *    metered connection (Save-Data, 2g/3g) — the poster stays, which is the
 *    right call on mobile data.
 *  - muted + playsInline + autoPlay is the only combination browsers allow to
 *    autoplay; `loop` keeps it seamless.
 */
export function HeroVideo({
  webm,
  mp4,
}: {
  webm?: string;
  mp4?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!webm && !mp4) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    // Respect data-saving preferences and slow networks.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)([23]g|slow-2g)$/.test(conn.effectiveType))
      return;

    setEnabled(true);
  }, [webm, mp4]);

  // Kick playback off explicitly. `autoPlay` alone is unreliable for an element
  // inserted after hydration, and some browsers return a rejected promise we
  // must swallow. The catch is deliberate: if autoplay is refused we simply
  // keep showing the poster.
  useEffect(() => {
    if (!enabled) return;
    const v = ref.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      // NOT "none": with preload="none" the browser defers loading and the
      // autoplay never starts (verified — the second hero video stayed paused
      // at readyState 1). We only mount this element after hydration and skip
      // it on slow/metered connections, so eager loading is safe here.
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
      onLoadedData={() => setReady(true)}
      // `hero-media` gives the video the same brightness/grayscale/hover
      // treatment as the poster underneath it (see globals.css).
      className={`hero-media absolute inset-0 -z-20 h-full w-full object-cover ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionProperty: "filter, transform, opacity" }}
    >
      {webm && <source src={webm} type="video/webm" />}
      {mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
