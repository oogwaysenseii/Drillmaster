import Link from "next/link";
import { priceFrom, eur } from "@/data/pricing";

/**
 * Compact "from €X" callout with a link to the full price list.
 *
 * Deliberately NOT the whole table: repeating 7–11 identical rows on 144 pages
 * would make every service and city page a near-duplicate of the cenník, which
 * is the opposite of what these pages need. One real number earns the click.
 */
export function PriceTeaser({
  service,
  city,
}: {
  service: string;
  /** City name in the locative case, e.g. "vo Zvolene" — optional. */
  city?: string;
}) {
  const p = priceFrom[service];
  if (!p) return null;

  return (
    <div className="mt-6 border-l-4 border-brand bg-ink-100 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
        Orientačná cena
      </p>
      <p className="mt-3 text-2xl font-extrabold text-ink-900">
        od {eur(p.amount)}{" "}
        <span className="text-base font-medium text-ink-700">{p.unit}</span>
      </p>
      <p className="mt-3 leading-relaxed text-ink-700">
        Ceny sa odvíjajú od{" "}
        {service === "jadrove-vrtanie"
          ? "priemeru vrtu a materiálu"
          : "hrúbky múru"}
        . {city ? `Pre presnú cenu ${city} nás kontaktujte.` : "Presnú cenu vám radi spočítame."}
      </p>
      <Link
        href="/cennik/"
        className="mt-4 inline-flex items-center gap-2 font-bold text-brand hover:underline"
      >
        Zobraziť celý cenník
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
