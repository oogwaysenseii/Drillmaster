import type { City } from "@/data/cities";
import { cityTier } from "@/lib/geo";
import { tierCopy, type MeterLevel } from "@/data/tiers";

/**
 * Traffic-light indicators for distance, availability and price.
 *
 * Colour is never the only signal: each dot carries a text label that screen
 * readers announce and that shows as a native tooltip on hover, so the meaning
 * survives for anyone who can't distinguish the colours. Green/amber/red are
 * defined here rather than in the theme because they are semantic — they must
 * not drift with the brand palette.
 */

// NOTE on the amber: #E0A800 is 2.15:1 against white, under the 3:1 WCAG asks
// for graphical objects. It is kept deliberately — a darker amber tested worse
// in practice, reading as a second red rather than a middle state, and telling
// the three levels apart is the whole point of the meter. The text label on
// every dot is what carries the meaning for anyone who can't use the colour.
const DOT: Record<MeterLevel, { className: string; word: string }> = {
  1: { className: "bg-[#16A34A]", word: "dobrá" },
  2: { className: "bg-[#E0A800]", word: "stredná" },
  3: { className: "bg-[#D2051E]", word: "nižšia" },
};

/** Wording per metric, so the label reads naturally rather than "price: good". */
const WORDS: Record<
  "distance" | "availability" | "price",
  { name: string; levels: Record<MeterLevel, string> }
> = {
  distance: {
    name: "Vzdialenosť",
    levels: { 1: "nízka", 2: "stredná", 3: "vyššia" },
  },
  availability: {
    name: "Dostupnosť",
    levels: { 1: "do 24 hodín", 2: "po dohode", 3: "po dohode" },
  },
  price: {
    name: "Cena",
    levels: {
      1: "najvýhodnejšia",
      2: "výhodná pri väčšom rozsahu",
      3: "podľa rozsahu",
    },
  },
};

export type Metric = keyof typeof WORDS;

export function MeterDot({
  metric,
  level,
  size = "sm",
  decorative = false,
}: {
  metric: Metric;
  level: MeterLevel;
  size?: "sm" | "md";
  /** True when a visible label sits right next to the dot — then the dot is
   *  pure decoration and repeating the text would just be noise in a screen
   *  reader. */
  decorative?: boolean;
}) {
  const label = `${WORDS[metric].name}: ${WORDS[metric].levels[level]}`;
  return (
    <span
      title={label}
      aria-hidden={decorative || undefined}
      className={`inline-block shrink-0 rounded-full ${DOT[level].className} ${
        size === "md" ? "h-3 w-3" : "h-2 w-2"
      }`}
    >
      {!decorative && <span className="sr-only">{label}</span>}
    </span>
  );
}

/** The three dots in a row — used inside the compact city tiles. */
export function TierDots({ city }: { city: City }) {
  const m = tierCopy[cityTier(city)].meters;
  return (
    <span className="flex items-center gap-1" aria-hidden={false}>
      <MeterDot metric="distance" level={m.distance} />
      <MeterDot metric="availability" level={m.availability} />
      <MeterDot metric="price" level={m.price} />
    </span>
  );
}

/**
 * Explains the dots. Two separate things: which position is which metric, and
 * what the colours mean. An earlier version drew one coloured dot per metric,
 * which read as "distance is green, price is red" — the opposite of the truth.
 */
export function MeterLegend({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-ink-400 ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-ink-200" />
          <span className="h-2 w-2 rounded-full bg-ink-200" />
          <span className="h-2 w-2 rounded-full bg-ink-200" />
        </span>
        zľava: vzdialenosť · dostupnosť · cena
      </span>
      <span className="flex items-center gap-3">
        {(
          [
            ["bg-[#16A34A]", "najlepšia"],
            ["bg-[#E0A800]", "stredná"],
            ["bg-[#D2051E]", "nižšia"],
          ] as const
        ).map(([cls, word]) => (
          <span key={word} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${cls}`} aria-hidden="true" />
            {word}
          </span>
        ))}
      </span>
    </div>
  );
}
