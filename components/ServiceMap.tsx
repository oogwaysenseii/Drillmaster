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

function loadMapsScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as any;
  if (w.google?.maps) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Maps script failed"))
      );
    });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.src =
      `https://maps.googleapis.com/maps/api/js?key=${KEY}` +
      `&libraries=maps,marker&loading=async&v=weekly&language=sk&region=SK`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Maps script failed"));
    document.head.appendChild(s);
  });
}

/**
 * Resolve the constructors we need.
 *
 * With `loading=async` the bootstrap does NOT populate google.maps.Map
 * synchronously — you must await importLibrary() first, otherwise you get
 * "google.maps.Map is not a constructor". The direct-property branch is a
 * fallback for the older synchronous loader.
 */
async function getMapsApi() {
  await loadMapsScript();
  const g = (window as any).google;
  if (!g?.maps) throw new Error("Maps namespace missing");

  if (typeof g.maps.importLibrary === "function") {
    const [mapsLib, markerLib] = await Promise.all([
      g.maps.importLibrary("maps"),
      g.maps.importLibrary("marker"),
    ]);
    return {
      Map: mapsLib.Map,
      InfoWindow: mapsLib.InfoWindow,
      Marker: markerLib.Marker,
    };
  }

  return {
    Map: g.maps.Map,
    InfoWindow: g.maps.InfoWindow,
    Marker: g.maps.Marker,
  };
}

export function ServiceMap({
  activeRegion,
  service = "jadrove-vrtanie",
}: {
  activeRegion?: string;
  /** Service the marker links point at — must match the host page. */
  service?: string;
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
                const link = live
                  ? `<a href="/${service}/${c.slug}/" style="color:#D2051E;font-weight:600;text-decoration:none">Zobraziť služby →</a>`
                  : `<span style="color:#8b8b8b">Pripravujeme</span>`;
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
            console.error("[ServiceMap]", err);
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
    // `service` is baked into each marker's info window, so rebuild if it changes
  }, [service]);

  // Pan to the selected region.
  useEffect(() => {
    if (status !== "ready" || !mapRef.current || !activeRegion) return;
    const r = getRegion(activeRegion);
    if (!r) return;
    mapRef.current.panTo(r.geo);
    mapRef.current.setZoom(9);
  }, [activeRegion, status]);

  if (!KEY) {
    return (
      <div className="flex h-[420px] items-center justify-center border border-dashed border-ink-200 bg-ink-100 text-center text-sm text-ink-400">
        <p className="max-w-sm px-6">
          Mapa sa nezobrazuje – chýba <code>NEXT_PUBLIC_GOOGLE_MAPS_KEY</code>.
          Doplňte ho do <code>.env.local</code>.
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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-ink-400">
            {status === "error"
              ? "Mapu sa nepodarilo načítať."
              : "Načítavam mapu…"}
          </span>
        </div>
      )}
    </div>
  );
}
