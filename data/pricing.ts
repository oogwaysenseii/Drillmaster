/**
 * PRICING — supplied by Drillmaster, transcribed verbatim from the existing
 * price list. Do not "tidy" the numbers.
 *
 * Two different units, which is the thing visitors most often get wrong:
 *   - drilling  → price per 1 cm of BORE DEPTH, by bit diameter and material
 *   - cutting   → price per 1 m of CUT LENGTH, by wall thickness
 *
 * All figures are ex-VAT and explicitly orientačné (indicative). The notes
 * below are rendered on the page next to each table rather than hidden in an
 * accordion — "per cm" and "without VAT" change the number a customer expects
 * by an order of magnitude, so they are not fine print.
 */

export interface DrillingPrice {
  /** Bit diameter in mm. */
  diameterMm: number;
  /** € per 1 cm of depth, ex-VAT. */
  brick: number;
  concrete: number;
  reinforced: number;
}

export interface CuttingPrice {
  /** Upper bound of wall thickness in mm ("do 100 mm"). */
  maxThicknessMm: number;
  /** € per 1 m of cut, ex-VAT. */
  perMetre: number;
}

export const drillingPrices: DrillingPrice[] = [
  { diameterMm: 52, brick: 0.6, concrete: 0.75, reinforced: 0.8 },
  { diameterMm: 102, brick: 0.85, concrete: 1, reinforced: 1.15 },
  { diameterMm: 127, brick: 1.04, concrete: 1.2, reinforced: 1.35 },
  { diameterMm: 162, brick: 1.25, concrete: 1.45, reinforced: 1.6 },
  { diameterMm: 202, brick: 1.5, concrete: 2, reinforced: 2.1 },
  { diameterMm: 250, brick: 1.95, concrete: 2.45, reinforced: 2.55 },
  { diameterMm: 300, brick: 2.2, concrete: 2.8, reinforced: 2.95 },
];

export const cuttingPrices: CuttingPrice[] = [
  { maxThicknessMm: 100, perMetre: 24.25 },
  { maxThicknessMm: 150, perMetre: 43.65 },
  { maxThicknessMm: 200, perMetre: 53.35 },
  { maxThicknessMm: 250, perMetre: 58.2 },
  { maxThicknessMm: 300, perMetre: 63.05 },
  { maxThicknessMm: 350, perMetre: 67.9 },
  { maxThicknessMm: 400, perMetre: 72.75 },
  { maxThicknessMm: 450, perMetre: 77.6 },
  { maxThicknessMm: 500, perMetre: 82.45 },
  { maxThicknessMm: 550, perMetre: 87.3 },
  { maxThicknessMm: 600, perMetre: 92.15 },
];

export const drillingNotes: string[] = [
  "Uvedené ceny sú za 1 cm hĺbky vrtu bez DPH.",
  "Uvedené ceny sú orientačné a skutočná cena môže byť vyššia alebo nižšia v závislosti od požadovaného množstva, náročnosti a spôsobu vŕtania.",
  "Pre upresnenie ceny nás kontaktujte.",
];

export const cuttingNotes: string[] = [
  "Uvedené ceny sú za 1 m dĺžky rezu bez DPH.",
  "Uvedené ceny neobsahujú náklady na dopravu, réžiu a spotrebný materiál.",
  "Uvedené ceny sú orientačné a skutočná cena môže byť vyššia alebo nižšia v závislosti od požadovaného množstva, náročnosti a spôsobu rezania.",
  "Pre upresnenie ceny nás kontaktujte.",
];

/** Slovak money formatting: comma decimal separator, two places, € after. */
export function eur(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

/**
 * Cheapest entry per service, for the "od X €" teaser on service and city
 * pages. Derived rather than hardcoded so it can never drift from the tables.
 */
export const priceFrom: Record<string, { amount: number; unit: string }> = {
  "jadrove-vrtanie": {
    amount: Math.min(...drillingPrices.map((p) => p.brick)),
    unit: "za 1 cm hĺbky vrtu",
  },
  "rezanie-otvorov": {
    amount: Math.min(...cuttingPrices.map((p) => p.perMetre)),
    unit: "za 1 m rezu",
  },
};

/**
 * Worked examples. Per-cm and per-metre pricing is hard to picture, so each
 * example shows the arithmetic. Values are computed from the tables above, so
 * they cannot contradict them.
 */
export const priceExamples = [
  {
    service: "jadrove-vrtanie",
    label: "Prestup 102 mm cez 30 cm panel",
    unitPrice: drillingPrices.find((p) => p.diameterMm === 102)!.reinforced,
    quantity: 30,
    quantityLabel: "30 cm hĺbky",
  },
  {
    service: "jadrove-vrtanie",
    label: "Prestup 52 mm cez 20 cm tehlovú stenu",
    unitPrice: drillingPrices.find((p) => p.diameterMm === 52)!.brick,
    quantity: 20,
    quantityLabel: "20 cm hĺbky",
  },
  {
    service: "rezanie-otvorov",
    label: "Dverný otvor – 5 m rezu do 150 mm panelu",
    unitPrice: cuttingPrices.find((p) => p.maxThicknessMm === 150)!.perMetre,
    quantity: 5,
    quantityLabel: "5 m rezu",
  },
] as const;
