"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { services } from "@/data/services";
import type { City } from "@/data/cities";

/**
 * "Which service?" dialog, opened by a city tile on the homepage.
 *
 * The homepage has no service of its own, so a town tile can't know where to
 * send someone. Rather than guessing (it used to always pick drilling), the
 * tile asks.
 *
 * IMPORTANT: the tiles that open this are still real <a href> elements
 * pointing at the drilling page — the click is intercepted with
 * preventDefault(). That keeps a crawlable link in the static HTML and means
 * the section still works with JavaScript off, where the dialog can't run.
 */
export function CityServicePicker({
  city,
  onClose,
}: {
  city: City | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Where focus came from, so it can be put back on close.
  const restoreRef = useRef<HTMLElement | null>(null);

  const open = city !== null;

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap. The gallery lightbox doesn't do this and it shows: five
      // tabs and you're behind the dialog with no idea where the caret went.
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  const onBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!open || !city) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onBackdrop}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="city-picker-title"
        className="relative w-full max-w-md bg-white p-7 md:p-9"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Zavrieť"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-xl text-ink-400 transition-colors hover:text-brand"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand">
          {city.isHeadquarters ? "Sídlo firmy" : "Vyberte službu"}
        </p>
        <h2
          id="city-picker-title"
          className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-ink-900"
        >
          {city.name}
        </h2>
        <span className="mt-4 block h-[2px] w-12 bg-brand" />

        <div className="mt-7 grid gap-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}/${city.slug}/`}
              // Deliberately no onClick={onClose}: closing here unmounts this
              // <Link> mid-click and the App Router navigation is dropped, so
              // the dialog just closes and nothing happens. The whole section
              // unmounts on navigation anyway, and the effect cleanup restores
              // body scroll and focus.
              className="group flex items-center justify-between gap-4 border border-ink-200 p-5 transition-colors duration-300 hover:border-brand hover:bg-ink-100"
            >
              <span>
                <span className="block font-bold text-ink-900 transition-colors group-hover:text-brand">
                  {s.name}
                </span>
                <span className="mt-1 block text-sm leading-snug text-ink-700">
                  {s.summary}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
