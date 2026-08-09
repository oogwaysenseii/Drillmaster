/**
 * TIER COPY — availability and price, stated compactly, by how far the town is.
 *
 * Deliberately short. An earlier version explained the distance across three
 * paragraphs and ended up arguing the visitor out of calling; a price list
 * doesn't apologise for itself and neither should this. The tier now shows the
 * three facts a buyer decides on — how far, how soon, what it does to the
 * price — and gets out of the way.
 *
 *   local    ≤45 min   → speed, no minimum job
 *   regional ≤2 h      → planned dates, cheaper per hole in batches
 *   project  >2 h      → we travel, transport disappears into a larger job
 *
 * Tokens resolved by the page: {mesto} locative ("v Detve") and {sluzba},
 * the lowercase service name.
 *
 * There is deliberately NO {km} or {drive} token. The site states availability
 * as Dobrá/Stredná/Nižšia and never a figure, so the exact distance is not
 * made available to templates at all — if it were, it would eventually end up
 * in copy again.
 */

import { publishedCities } from "@/data/cities";
import { cityTier } from "@/lib/geo";

/** 1 = green, 2 = amber, 3 = red. Never the only carrier of meaning — every
 *  dot ships with a text label for screen readers and colour-blind readers. */
export type MeterLevel = 1 | 2 | 3;

export interface TierMeters {
  distance: MeterLevel;
  availability: MeterLevel;
  price: MeterLevel;
}

export interface TierCopy {
  /**
   * One sentence above the table. Not a paragraph.
   *
   * Three interchangeable phrasings per tier, picked from the city slug (see
   * `tierLead`). Same promise, different words — with 37 towns sharing the
   * regional tier, a single sentence repeated 74 times across service×city
   * pages is the kind of boilerplate that flattens a whole page set.
   */
  leads: [string, string, string];
  /**
   * How available we are here, not how far it is. Same underlying fact, but
   * "Dostupnosť: nižšia" is a service level a visitor can weigh, whereas
   * "Vzdialenosť: vyššia" is a reason to stop reading — and kilometres would
   * only invite them to do the "too far" arithmetic themselves.
   */
  availabilityLabel: string;
  /** Traffic-light levels for distance, availability and price. */
  meters: TierMeters;
  /** Who this region's pricing suits best. */
  bestFor: string;
  /** Lead time and, where useful, what suits this region best. */
  rows: { label: string; text: string }[];
  /** Sidebar CTA, so the ask matches the audience. */
  cta: { title: string; text: string };
  /** Short hook for the meta description. */
  metaHook: string;
  /** First bullet of "Prečo si vybrať…", true for this distance. */
  whyBullet: { label: string; text: string };
}

export const tierCopy: Record<string, TierCopy> = {
  local: {
    leads: [
      "Sme blízko, takže vieme reagovať prakticky okamžite.",
      "Túto oblasť máme na dosah – termín vieme dať prakticky hneď.",
      "Sme odtiaľto kúsok, väčšinu zákaziek preto stihneme obratom.",
    ],
    availabilityLabel: "Dobrá",
    meters: { distance: 1, availability: 1, price: 1 },
    bestFor: "domácnosti aj firmy – bez minimálnej zákazky",
    rows: [
      {
        label: "Termín",
        text: "expresné termíny – spravidla do 24 hodín, v súrnych prípadoch ešte v ten istý deň",
      },
    ],
    cta: {
      title: "Potrebujete to rýchlo?",
      text: "Sme kúsok od vás. Nechajte nám kontakt a ozveme sa vám ešte dnes.",
    },
    metaHook: "Prídeme spravidla do 24 hodín.",
    whyBullet: {
      label: "Sme kúsok od vás",
      text: "Túto oblasť máme na dosah, takže poznáme miestnu zástavbu aj bežné konštrukcie a vieme prísť prakticky okamžite.",
    },
  },

  regional: {
    leads: [
      "V tejto oblasti pracujeme pravidelne – termín naplánujeme bez zbytočného odkladu.",
      "Do tohto regiónu vyrážame pravidelne, takže termín vieme dohodnúť rýchlo.",
      "Túto oblasť pokrývame pravidelnými výjazdmi, stačí sa dohodnúť dopredu.",
    ],
    availabilityLabel: "Stredná",
    meters: { distance: 2, availability: 2, price: 1 },
    bestFor:
      "firmy a zákazky s viacerými prestupmi naraz – jeden príchod pokryje celú prácu",
    rows: [
      {
        label: "Termín",
        text: "dohodnutý termín – zvyčajne v priebehu niekoľkých pracovných dní",
      },
    ],
    cta: {
      title: "Naplánujeme termín",
      text: "Napíšte nám, čo potrebujete, a ozveme sa vám s termínom a cenou.",
    },
    metaHook: "Termín dohodneme dopredu.",
    whyBullet: {
      label: "Poznáme región",
      text: "V tejto oblasti pracujeme pravidelne, takže vieme, s akými konštrukciami tu rátať, a termín naplánujeme bez odkladu.",
    },
  },

  project: {
    leads: [
      "Na väčšie zákazky prídeme kamkoľvek na Slovensku – s vlastnou technikou a záväzným termínom.",
      "Aj do vzdialenejších regiónov chodíme za väčšími zákazkami, s vlastnou technikou a dohodnutým termínom.",
      "Pri väčších objemoch prác prídeme kamkoľvek na Slovensku a termín držíme.",
    ],
    availabilityLabel: "Nižšia",
    meters: { distance: 3, availability: 2, price: 2 },
    bestFor:
      "stavebné firmy, správcov objektov a väčšie objemy prác",
    rows: [
      {
        label: "Termín",
        text: "plánované výjazdy – termín dohodneme dopredu, vieme prísť aj na niekoľko dní po sebe",
      },
    ],
    cta: {
      title: "Máte väčšiu zákazku?",
      text: "Pošlite nám rozsah prác a spracujeme cenovú ponuku vrátane dopravy.",
    },
    metaHook: "Väčšie zákazky po celom Slovensku.",
    whyBullet: {
      label: "Špecialisti s vlastnou technikou",
      text: "Prídeme aj zďaleka – pri zákazkách, kde sa oplatí mať firmu, ktorá vŕtanie a rezanie robí každý deň, nie raz za čas.",
    },
  },
};

/**
 * Rank of a town inside its own tier, towns sorted by slug. Computed once.
 *
 * Round-robin rather than a hash of the slug: hashing spread the 37 regional
 * towns fine but dealt the 6 non-HQ local ones 4/2/0, so two thirds of the
 * local pages opened with the same sentence — the exact boilerplate the
 * variants exist to avoid. Sorting by slug keeps it stable across builds (a
 * page whose opening line shuffles on every deploy reads as unstable to a
 * crawler); adding a town only shifts the ones after it alphabetically.
 */
const leadRank = (() => {
  let ranks: Map<string, number> | null = null;
  return (slug: string): number => {
    if (!ranks) {
      ranks = new Map();
      const byTier = new Map<string, string[]>();
      for (const c of publishedCities) {
        const t = cityTier(c);
        const list = byTier.get(t) ?? [];
        list.push(c.slug);
        byTier.set(t, list);
      }
      for (const list of byTier.values()) {
        list.sort();
        list.forEach((s, i) => ranks!.set(s, i));
      }
    }
    return ranks.get(slug) ?? 0;
  };
})();

/** Pick one of a tier's three lead sentences for a given town. */
export function tierLead(tier: TierCopy, slug: string): string {
  return tier.leads[leadRank(slug) % tier.leads.length];
}

/** Replace {mesto} / {sluzba} in tier copy. */
export function fillTokens(
  template: string,
  vars: { mesto: string; sluzba: string }
): string {
  return template
    .replace(/\{mesto\}/g, vars.mesto)
    .replace(/\{sluzba\}/g, vars.sluzba);
}
