"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { regions } from "@/data/regions";
import { citiesInRegion, activeRegionSlugs } from "@/data/cities";
import { ServiceMap } from "@/components/ServiceMap";

/**
 * Locations with a region switcher.
 *
 * Covers all 71 Slovak district seats, so tiles are compact — a region can hold
 * up to 13 towns and they need to read as a scannable list, not a wall of cards.
 *
 * SEO note: only the ACTIVE region's towns are in the DOM at a time, so the
 * hidden ones aren't crawlable from here. That's fine — published cities are
 * also linked from the footer and listed in the sitemap, which is where
 * crawlers pick them up. The default tab is the home region, so the most
 * important towns are present in the static HTML.
 */
export function Locations({
  service = "jadrove-vrtanie",
}: {
  /**
   * Which service the city links point at. On a service or city page this must
   * be that page's service — otherwise a visitor reading about rezanie otvorov
   * clicks a town and lands on a jadrové vŕtanie page.
   */
  service?: string;
} = {}) {
  const active = useMemo(() => {
    const slugs = new Set(activeRegionSlugs());
    return regions.filter((r) => slugs.has(r.slug));
  }, []);

  const [current, setCurrent] = useState(
    active.find((r) => r.slug === "banskobystricky")?.slug ?? active[0]?.slug ?? ""
  );

  const list = citiesInRegion(current);
  const region = active.find((r) => r.slug === current);

  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-brand">
            <span className="h-px w-8 bg-brand" />
            Kde pôsobíme
            <span className="h-px w-8 bg-brand" />
          </p>
          <p className="mt-5 text-ink-700">
            Jadrové vŕtanie a rezanie otvorov zabezpečujeme po celom Slovensku.
            Vyberte kraj a pozrite si mestá vo vašom okolí.
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
            <ServiceMap activeRegion={current} service={service} />
          </div>

          {/* Towns in the selected region */}
          <div
            id={`region-${current}`}
            role="tabpanel"
            aria-label={region?.name}
            // Borders rather than gap-px + background: an incomplete last row
            // would otherwise render phantom grey cells.
            // Fewer columns than before — this now sits in a half-width column.
            className="order-1 grid grid-cols-2 border-l border-t border-ink-200 sm:grid-cols-3 lg:order-2 lg:grid-cols-3 xl:grid-cols-4"
          >
          {list.map((c) => {
            const live = c.content !== null;
            return live ? (
              <Link
                key={c.slug}
                href={`/${service}/${c.slug}/`}
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
                <span className="mt-1 flex items-center gap-1 text-[10px] text-ink-400">
                  {c.isCapital ? "Krajské mesto" : "Zobraziť"}
                  <span className="text-brand transition-transform duration-500 group-hover:translate-x-0.5">
                    →
                  </span>
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
        </div>
      </div>
    </section>
  );
}
