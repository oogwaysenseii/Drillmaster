"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { regions } from "@/data/regions";
import { citiesInRegion, activeRegionSlugs, type City } from "@/data/cities";
import { ServiceMap } from "@/components/ServiceMap";
import { CityServicePicker } from "@/components/CityServicePicker";
import { TierDots, MeterLegend } from "@/components/TierMeter";

/**
 * Locations with a region switcher.
 *
 * Covers all 71 Slovak district seats, so tiles are compact — a region can hold
 * up to 13 towns and they need to read as a scannable list, not a wall of cards.
 *
 * SEO note: every region's towns are in the DOM; the inactive panels are
 * hidden rather than unmounted. Rendering only the active tab used to mean a
 * page linked to 13 towns and no others, and once the footer stopped listing
 * cities that left 116 of 142 city pages with a single inbound internal link.
 * Keeping all 71 in the markup costs about 7 kB gzipped per page and makes
 * every city page reachable from every other one.
 */
export function Locations({
  service = "jadrove-vrtanie",
  servicePicker = false,
}: {
  /**
   * Which service the city links point at. On a service or city page this must
   * be that page's service — otherwise a visitor reading about rezanie otvorov
   * clicks a town and lands on a jadrové vŕtanie page. It is also the starting
   * selection when `servicePicker` is on.
   */
  service?: string;
  /**
   * Ask which service when a town is clicked, instead of navigating straight
   * to `service`.
   *
   * Only for pages with no service of their own — the homepage. A service page
   * already states which service it is about, so a picker there would be a
   * pointless question with a wrong answer available.
   */
  servicePicker?: boolean;
} = {}) {
  const active = useMemo(() => {
    const slugs = new Set(activeRegionSlugs());
    return regions.filter((r) => slugs.has(r.slug));
  }, []);

  const [current, setCurrent] = useState(
    active.find((r) => r.slug === "banskobystricky")?.slug ?? active[0]?.slug ?? ""
  );

  // Town whose service dialog is open (picker mode only).
  const [picked, setPicked] = useState<City | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  /**
   * Footer links arrive as /jadrove-vrtanie/#kraj-zilinsky. The browser can't
   * jump to that on its own — the tab is React state, not an element id — so
   * read it on mount, select the region, and scroll here ourselves. Also
   * listen for hashchange, since clicking a second region from the footer of
   * this same page changes only the hash and fires no navigation.
   */
  useEffect(() => {
    const apply = (smooth: boolean) => {
      const slug = window.location.hash.replace(/^#kraj-/, "");
      if (!slug || !active.some((r) => r.slug === slug)) return;
      setCurrent(slug);
      sectionRef.current?.scrollIntoView({
        behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "smooth"
          : "auto",
        block: "start",
      });
    };
    apply(false);
    const onHash = () => apply(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [active]);

  return (
    <section className="section scroll-mt-24" id="kde-posobime" ref={sectionRef}>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-brand">
            <span className="h-px w-8 bg-brand" />
            Kde pôsobíme
            <span className="h-px w-8 bg-brand" />
          </p>
          <p className="mt-5 text-ink-700">
            Jadrové vŕtanie a rezanie otvorov zabezpečujeme po celom Slovensku.
            {" Vyberte kraj a pozrite si mestá vo vašom okolí."}
          </p>
        </div>

        {/* ---- Region tabs (span both columns) ---- */}
        <div
          role="tablist"
          aria-label="Kraje"
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          {active.map((r) => {
            const on = r.slug === current;
            return (
              <button
                key={r.slug}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`region-${r.slug}`}
                onClick={() => setCurrent(r.slug)}
                className={`border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                  on
                    ? "border-brand bg-brand text-white"
                    : "border-ink-200 text-ink-700 hover:border-brand hover:text-brand"
                }`}
              >
                {r.short}
              </button>
            );
          })}
        </div>

        {/* ---- Two columns: map on the left, towns on the right ---- */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:items-start">
          {/* Map — sticks while the town list scrolls past on tall screens */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-28">
            <ServiceMap
              activeRegion={current}
              service={service}
              bothServices={servicePicker}
            />
          </div>

          {/* Towns — EVERY region is rendered, inactive ones hidden.
              Rendering only the active tab meant a page's static HTML linked
              to 13 towns and no others, so 116 of 142 city pages ended up with
              a single inbound internal link. `hidden` keeps the links in the
              markup (crawlable, and there with JS off) while taking the
              inactive panels out of the tab order and the accessibility tree. */}
          <div className="order-1 lg:order-2">
          {active.map((r) => (
          <div
            key={r.slug}
            id={`region-${r.slug}`}
            role="tabpanel"
            aria-label={r.name}
            // Both: the attribute takes the panel out of the accessibility
            // tree and the tab order, the class actually hides it — a `grid`
            // display class from the author stylesheet beats the UA rule for
            // [hidden], so the attribute alone leaves the panel on screen.
            hidden={r.slug !== current}
            // Borders rather than gap-px + background: an incomplete last row
            // would otherwise render phantom grey cells.
            className={`${
              r.slug === current ? "grid" : "hidden"
            } grid-cols-2 border-l border-t border-ink-200 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4`}
          >
          {citiesInRegion(r.slug).map((c) => {
            const live = c.content !== null;
            return live ? (
              <Link
                key={c.slug}
                href={`/${service}/${c.slug}/`}
                // Picker mode keeps the href (crawlable, and the fallback when
                // JS is off) but intercepts the click to ask which service.
                onClick={
                  servicePicker
                    ? (e) => {
                        e.preventDefault();
                        setPicked(c);
                      }
                    : undefined
                }
                className="group border-b border-r border-ink-200 bg-white px-2 py-2 transition-colors duration-500 hover:bg-ink"
              >
                <span className="flex items-start gap-1.5">
                  <span className="text-[13px] font-bold leading-tight transition-colors duration-500 group-hover:text-white">
                    {c.name}
                  </span>
                  {c.isHeadquarters && (
                    <span className="mt-0.5 shrink-0 bg-brand px-1 py-0.5 text-[8px] font-bold uppercase leading-none tracking-wider text-white">
                      Sídlo
                    </span>
                  )}
                </span>
                <span className="mt-1 flex items-center justify-between gap-1 text-[10px] text-ink-400">
                  <span className="flex items-center gap-1">
                    {c.isCapital
                      ? "Krajské mesto"
                      : servicePicker
                        ? "Vybrať službu"
                        : "Zobraziť"}
                    <span className="text-brand transition-transform duration-500 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <TierDots city={c} />
                </span>
              </Link>
            ) : (
              // Not yet written — plain text, never a link. Linking to a page
              // that doesn't exist (or is thin) is worse than not linking.
              <div
                key={c.slug}
                className="border-b border-r border-ink-200 bg-white px-2 py-2"
              >
                <span className="block text-[13px] font-bold leading-tight text-ink-400">
                  {c.name}
                </span>
                <span className="mt-1 block text-[10px] text-ink-400/70">
                  Pripravujeme
                </span>
              </div>
            );
          })}
          </div>
          ))}
          </div>
        </div>

        <MeterLegend className="mt-5 justify-center" />
      </div>

      {servicePicker && (
        <CityServicePicker city={picked} onClose={() => setPicked(null)} />
      )}
    </section>
  );
}
