"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { icons } from "@/components/Icons";

/**
 * Mobile navigation.
 *
 * The desktop nav is `hidden md:flex`, so before this existed a phone visitor
 * could call or nothing — no way to reach the services, the cenník or the
 * gallery. Most of this site's traffic will be phones.
 *
 * Behaves like the other dialogs on the site: focus moves in, is trapped,
 * Escape closes, body scroll locks, focus returns to the trigger. It also
 * closes on navigation — the header stays mounted across App Router
 * transitions, so without that the panel would still be open on the next page.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the first link rather than the panel, so the first Tab goes to the
    // second item instead of appearing to do nothing.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const f = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!f || f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
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
      triggerRef.current?.focus?.();
    };
  }, [open]);

  const link =
    "flex items-center justify-between border-b border-ink-200 py-4 text-lg font-bold text-ink-900";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Otvoriť menu"
        className="flex h-11 w-11 items-center justify-center border border-ink-200 text-ink-900 md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {/*
        Portalled to <body> on purpose. The header carries `backdrop-blur`,
        and a backdrop-filter makes an element a containing block for its
        position:fixed descendants — so rendered in place, this overlay was
        clipped to the 64px header strip instead of covering the viewport.
      */}
      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[80] bg-black/50 md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          role="presentation"
        >
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-white"
          >
            <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-ink-400">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Zavrieť menu"
                className="flex h-10 w-10 items-center justify-center text-2xl text-ink-400"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5">
              {services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/`} className={link}>
                  {s.name}
                  <span aria-hidden="true" className="text-brand">
                    →
                  </span>
                </Link>
              ))}
              <Link href="/cennik/" className={link}>
                Cenník
                <span aria-hidden="true" className="text-brand">
                  →
                </span>
              </Link>
              <Link href="/galeria/" className={link}>
                Galéria
                <span aria-hidden="true" className="text-brand">
                  →
                </span>
              </Link>

              <Link
                href="/kontakt/"
                className="mt-6 flex items-center justify-center gap-2.5 bg-brand px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white"
              >
                Kontakt
                <icons.arrow className="h-4 w-4" />
              </Link>
            </nav>

            <div className="border-t border-ink-200 px-5 py-5">
              <a
                href={`tel:${company.phone}`}
                className="flex items-center gap-3 text-lg font-extrabold text-ink-900"
              >
                <icons.phone className="h-5 w-5 shrink-0 text-brand" />
                {company.phoneDisplay}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="mt-3 flex items-center gap-3 text-sm text-ink-700"
              >
                <icons.mail className="h-4 w-4 shrink-0 text-brand" />
                {company.email}
              </a>
              <p className="mt-3 flex items-center gap-3 text-sm text-ink-700">
                <icons.clock className="h-4 w-4 shrink-0 text-brand" />
                {company.openingHours[0]?.days}: {company.openingHours[0]?.hours}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
