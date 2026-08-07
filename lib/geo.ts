import { cities, type City } from "@/data/cities";
import { company } from "@/data/company";

/**
 * Distance helpers.
 *
 * Every city page states how far it is from the Zvolen base and roughly how
 * long the drive takes. That's a real, verifiable, per-city fact — which is
 * exactly what stops a set of location pages reading as one template with the
 * name swapped. It costs nothing to compute and can't be faked by a competitor
 * copying the copy.
 */

type LatLng = { lat: number; lng: number };

// company.geo is `as const`, so widen it — otherwise the default parameter
// below narrows to the literal coordinates and rejects every other city.
const HQ: LatLng = company.geo;

/** Great-circle distance in km. */
export function distanceKm(a: LatLng, b: LatLng = HQ): number {
  const R = 6371;
  const dLat = ((a.lat - b.lat) * Math.PI) / 180;
  const dLng = ((a.lng - b.lng) * Math.PI) / 180;
  const la1 = (b.lat * Math.PI) / 180;
  const la2 = (a.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Road distance is always longer than the straight line — in Slovakia's
 * terrain a factor of ~1.35 is a fair approximation. Rounded to 5 km so we
 * never imply more precision than we have.
 */
export function roadDistanceKm(city: City): number {
  const km = distanceKm(city.geo) * 1.35;
  return Math.max(5, Math.round(km / 5) * 5);
}

/** Rough drive time in minutes, rounded to the nearest 5. */
export function driveMinutes(city: City): number {
  const km = roadDistanceKm(city);
  // Mixed road types: slower average on short trips, faster once on main roads.
  const kmh = km < 30 ? 45 : km < 90 ? 60 : 75;
  return Math.max(10, Math.round((km / kmh) * 60 / 5) * 5);
}

/** Human phrase, e.g. "približne 20 minút jazdy" / "necelé 2 hodiny jazdy". */
export function drivePhrase(city: City): string {
  const m = driveMinutes(city);
  if (m < 60) return `približne ${m} minút jazdy`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (rest === 0) return `približne ${h} ${h === 1 ? "hodinu" : "hodiny"} jazdy`;
  return `približne ${h} h ${rest} min jazdy`;
}

/** The published cities closest to this one — used for internal linking. */
export function nearestPublished(city: City, limit = 4): City[] {
  return cities
    .filter((c) => c.slug !== city.slug && c.content !== null)
    .map((c) => ({ c, d: distanceKm(c.geo, city.geo) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map((x) => x.c);
}
