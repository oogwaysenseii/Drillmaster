"use client";

import { useEffect, useRef, useState } from "react";
import { cities } from "@/data/cities";
import { getRegion } from "@/data/regions";
import { company } from "@/data/company";

/**
 * Google Map of the service area.
 *
 * Performance: the Maps script is ~200 kB+ and would hurt Core Web Vitals if
 * loaded eagerly, so it is only fetched when the map scrolls into view
 * (IntersectionObserver). Until then a lightweight placeholder renders.
 *
 * ⚠️ API KEY: read from NEXT_PUBLIC_GOOGLE_MAPS_KEY. Anything prefixed
 * NEXT_PUBLIC_ is embedded in the client bundle and is publicly visible —
 * unavoidable for the Maps JS API. Protect it with an HTTP-referrer
 * restriction (drillmaster.sk/*) in Google Cloud Console. See .env.example.
 */

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const SCRIPT_ID = "gmaps-js";

// Muted monochrome basemap so the red markers carry the brand.
// NOTE: inline `styles` requires the legacy (non-mapId) map. That's also why
// we use the classic Marker rather than AdvancedMarkerElement — the latter
// needs a cloud-configured mapId, which in turn disables inline styling.
const MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8b8b8b" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#d6d6d6" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e9e9e9" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dfe6ea" }] },
];

// Circle drawn as a raw SVG path so we don't depend on google.maps.SymbolPath
// (which isn't guaranteed to exist before the relevant library is imported).
const CIRCLE_PATH =
  "M 0,0 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0";

/** Inject the bootstrap once. Resolves as soon as the tag has loaded. */
function loadMapsScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    // Already finished loading in an earlier mount — a `load` listener added
    // now would never fire, so resolve immediately and let waitForImportLibrary
    // below decide when the API is genuinely usable.
    if (existing.dataset.loaded === "1") return Promise.resolve();
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Maps script failed to load"))
      );
    });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.src =
      `https://maps.googleapis.com/maps/api/js?key=${KEY}` +
      `&loading=async&v=weekly&language=sk&region=SK`;
    s.onload = () => {
      s.dataset.loaded = "1";
      resolve();
    };
    s.onerror = () => reject(new Error("Maps script failed to load"));
    document.head.appendChild(s);
  });
}

/**
 * Wait until the async bootstrap has attached `importLibrary`.
 *
 * `window.google.maps` appears BEFORE `importLibrary` is attached to it, so
 * "does google.maps exist" is not a safe readiness test — that gap is what
 * produced "n is not a constructor" in production: the old code saw
 * google.maps, decided the modern loader wasn't present, fell back to reading
 * google.maps.Map directly, and got `undefined`.
 */
async function waitForImportLibrary(timeoutMs = 10000): Promise<any> {
  const started = Date.now();
  for (;;) {
    const g = (window as any).google;
    if (typeof g?.maps?.importLibrary === "function") return g;
    if (Date.now() - started > timeoutMs) {
      throw new Error("google.maps.importLibrary never appeared");
    }
    await new Promise((r) => setTimeout(r, 50));
  }
}

/**
 * Resolve the constructors we need.
 *
 * With `loading=async` the bootstrap does NOT populate google.maps.Map
 * synchronously — every constructor must come from importLibrary(). There is
 * deliberately no direct-property fallback: reading google.maps.Map before the
 * library is imported yields `undefined`, and `new undefined()` fails with a
 * message that says nothing useful once minified.
 */
async function getMapsApi() {
  await loadMapsScript();
  const g = await waitForImportLibrary();

  const [mapsLib, markerLib] = await Promise.all([
    g.maps.importLibrary("maps"),
    g.maps.importLibrary("marker"),
  ]);

  const api = {
    Map: mapsLib?.Map,
    InfoWindow: mapsLib?.InfoWindow,
    Marker: markerLib?.Marker,
  };

  // Name the missing piece rather than letting `new undefined()` throw.
  for (const [name, ctor] of Object.entries(api)) {
    if (typeof ctor !== "function") {
      throw new Error(`Maps API loaded but ${name} is not a constructor`);
    }
  }

  return api as {
    Map: any;
    InfoWindow: any;
    Marker: any;
  };
}

export function ServiceMap({
  activeRegion,
  service = "jadrove-vrtanie",
  bothServices = false,
}: {
  activeRegion?: string;
  /** Service the marker links point at — must match the host page. */
  service?: string;
  /** Offer both services in the info window (homepage, which has no service). */
  bothServices?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );

  // Load + initialise only once the map scrolls into view.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !KEY) return;

    let cancelled = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setStatus("loading");

        getMapsApi()
          .then(({ Map, InfoWindow, Marker }) => {
            if (cancelled || !hostRef.current) return;

            const map = new Map(hostRef.current, {
              center: { lat: 48.75, lng: 19.15 }, // roughly centre of Slovakia
              zoom: 7,
              styles: MAP_STYLE,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              gestureHandling: "cooperative", // don't hijack page scroll
            });
            mapRef.current = map;

            const info = new InfoWindow();

            for (const c of cities) {
              const live = c.content !== null;
              const marker = new Marker({
                position: c.geo,
                map,
                title: c.name,
                icon: {
                  path: CIRCLE_PATH,
                  scale: c.isHeadquarters ? 1 : 0.7,
                  fillColor: live ? "#D2051E" : "#B9BDC2",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                },
              });

              marker.addListener("click", () => {
                const a = (href: string, label: string) =>
                  `<a href="${href}" style="color:#D2051E;font-weight:600;text-decoration:none;display:block;margin-top:4px">${label} →</a>`;
                // On the homepage the map has no service either, so offer both
                // rather than quietly sending everyone to drilling.
                const link = !live
                  ? `<span style="color:#8b8b8b">Pripravujeme</span>`
                  : bothServices
                    ? a(`/jadrove-vrtanie/${c.slug}/`, "Jadrové vŕtanie") +
                      a(`/rezanie-otvorov/${c.slug}/`, "Rezanie otvorov")
                    : a(`/${service}/${c.slug}/`, "Zobraziť služby");
                info.setContent(
                  `<div style="font-family:Inter,sans-serif;padding:2px 4px">
                     <strong style="font-size:14px">${c.name}</strong>
                     ${
                       c.isHeadquarters
                         ? '<div style="font-size:11px;color:#D2051E;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Sídlo firmy</div>'
                         : ""
                     }
                     <div style="margin-top:6px;font-size:13px">${link}</div>
                   </div>`
                );
                info.open({ anchor: marker, map });
              });
            }

            setStatus("ready");
          })
          .catch((err) => {
            // Log the message explicitly: minified stacks turn a thrown
            // Error into "n is not a constructor" with no clue which one.
            console.error(
              "[ServiceMap] map init failed:",
              err instanceof Error ? err.message : err,
              "\nIf this mentions the key, check the HTTP-referrer " +
                "restriction in Google Cloud Console covers this domain " +
                "(including *.vercel.app previews) and that billing is on.",
              err
            );
            if (!cancelled) setStatus("error");
          });
      },
      { rootMargin: "200px" }
    );

    io.observe(host);
    return () => {
      cancelled = true;
      io.disconnect();
    };
    // both are baked into each marker's info window, so rebuild if they change
  }, [service, bothServices]);

  // Pan to the selected region.
  useEffect(() => {
    if (status !== "ready" || !mapRef.current || !activeRegion) return;
    const r = getRegion(activeRegion);
    if (!r) return;
    mapRef.current.panTo(r.geo);
    mapRef.current.setZoom(9);
  }, [activeRegion, status]);

  // No key configured. This is a deployment mistake, not something a visitor
  // can act on — so show neutral copy that still states the coverage area,
  // and leave the diagnostic in the console for whoever deploys the site.
  if (!KEY) {
    if (typeof window !== "undefined") {
      console.warn(
        "[ServiceMap] NEXT_PUBLIC_GOOGLE_MAPS_KEY is not set. " +
          "Locally: add it to .env.local. On Vercel: Project Settings → " +
          "Environment Variables, then redeploy (NEXT_PUBLIC_ vars are " +
          "baked in at build time)."
      );
    }
    return (
      <div className="flex h-[210px] w-full items-center justify-center border border-ink-200 bg-ink-100 text-center md:h-[300px]">
        <p className="max-w-xs px-6 text-sm leading-relaxed text-ink-700">
          Pôsobíme po celom Slovensku – so sídlom vo Zvolene.
          <br />
          <a
            href={`tel:${company.phone}`}
            className="mt-2 inline-block font-bold text-brand hover:underline"
          >
            {company.phoneDisplay}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={hostRef}
        role="region"
        aria-label={`Mapa pôsobnosti ${company.name}`}
        className="h-[210px] w-full bg-ink-100 md:h-[300px]"
      />
      {status !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center text-center">
          {status === "error" ? (
            // A visitor can do nothing about a failed map, so give them the
            // information the map was there to convey instead of a dead box.
            <p className="max-w-xs px-6 text-sm leading-relaxed text-ink-700">
              Pôsobíme po celom Slovensku – so sídlom vo Zvolene.
              <br />
              <a
                href={`tel:${company.phone}`}
                className="mt-2 inline-block font-bold text-brand hover:underline"
              >
                {company.phoneDisplay}
              </a>
            </p>
          ) : (
            <span className="pointer-events-none text-sm text-ink-400">
              Načítavam mapu…
            </span>
          )}
        </div>
      )}
    </div>
  );
}
