// Slovak self-governing regions (kraje) + their regional capital
// (krajské mesto). Drives the region switcher in the Locations section.
//
// A region only appears in the UI if at least one city references its slug in
// data/cities.ts — so removing a region is just a matter of removing its
// cities. Keep this list in the geographic order people expect (west → east).

export interface Region {
  slug: string;
  name: string;
  /** Short label for the tab. */
  short: string;
  /** The regional capital — always listed first within the region. */
  capital: string;
  /** Map centre for this region. */
  geo: { lat: number; lng: number };
}

export const regions: Region[] = [
  { slug: "bratislavsky", name: "Bratislavský kraj", short: "Bratislavský", capital: "Bratislava", geo: { lat: 48.1486, lng: 17.1077 } },
  { slug: "trnavsky", name: "Trnavský kraj", short: "Trnavský", capital: "Trnava", geo: { lat: 48.3774, lng: 17.5877 } },
  { slug: "trenciansky", name: "Trenčiansky kraj", short: "Trenčiansky", capital: "Trenčín", geo: { lat: 48.8945, lng: 18.0444 } },
  { slug: "nitriansky", name: "Nitriansky kraj", short: "Nitriansky", capital: "Nitra", geo: { lat: 48.3069, lng: 18.0866 } },
  { slug: "zilinsky", name: "Žilinský kraj", short: "Žilinský", capital: "Žilina", geo: { lat: 49.2231, lng: 18.7394 } },
  { slug: "banskobystricky", name: "Banskobystrický kraj", short: "Banskobystrický", capital: "Banská Bystrica", geo: { lat: 48.7395, lng: 19.1453 } },
  { slug: "presovsky", name: "Prešovský kraj", short: "Prešovský", capital: "Prešov", geo: { lat: 48.9975, lng: 21.2393 } },
  { slug: "kosicky", name: "Košický kraj", short: "Košický", capital: "Košice", geo: { lat: 48.7164, lng: 21.2611 } },
];

export function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}
