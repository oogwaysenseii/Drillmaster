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
 * Tokens resolved by the page: {mesto} locative ("v Detve"), {km}, {drive},
 * {sluzba} lowercase service name.
 */

/** 1 = green, 2 = amber, 3 = red. Never the only carrier of meaning — every
 *  dot ships with a text label for screen readers and colour-blind readers. */
export type MeterLevel = 1 | 2 | 3;

export interface TierMeters {
  distance: MeterLevel;
  availability: MeterLevel;
  price: MeterLevel;
}

export interface TierCopy {
  /** One sentence above the table. Not a paragraph. */
  lead: string;
  /** Low / mid / high. The exact kilometres are deliberately not shown — a
   *  number invites the visitor to do the "that's too far" arithmetic. */
  distanceLabel: string;
  /** Traffic-light levels for distance, availability and price. */
  meters: TierMeters;
  /** Who this region's pricing suits best. */
  bestFor: string;
  /** Lead time and what the distance does to the price. */
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
    lead: "Sme blízko, takže vieme reagovať prakticky okamžite.",
    distanceLabel: "Nízka",
    meters: { distance: 1, availability: 1, price: 1 },
    bestFor:
      "domácnosti aj firmy – oplatí sa nám prísť aj kvôli jednému prestupu",
    rows: [
      {
        label: "Termín",
        text: "spravidla do 24 hodín, v súrnych prípadoch ešte v ten istý deň",
      },
      {
        label: "Doprava",
        text: "bez príplatku – prídeme aj kvôli jednému prestupu",
      },
      {
        label: "Obhliadka",
        text: "zadarmo a nezáväzne, cenu poznáte pred začatím prác",
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
    lead: "V tejto oblasti pracujeme pravidelne – termín naplánujeme bez zbytočného odkladu.",
    distanceLabel: "Stredná",
    meters: { distance: 2, availability: 2, price: 1 },
    bestFor:
      "firmy a zákazky s viacerými prestupmi naraz – jeden príchod pokryje celú prácu",
    rows: [
      {
        label: "Termín",
        text: "táto oblasť je od najbližšej pobočky ďalej, termín preto dohadujeme dopredu – zvyčajne v priebehu niekoľkých pracovných dní",
      },
      {
        label: "Doprava",
        text: "zahrnutá v cenovej ponuke, žiadne prekvapenia na mieste",
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
    lead: "Na väčšie zákazky prídeme kamkoľvek na Slovensku – s vlastnou technikou a záväzným termínom.",
    distanceLabel: "Vyššia",
    meters: { distance: 3, availability: 2, price: 2 },
    bestFor:
      "stavebné firmy, správcov objektov a väčšie objemy prác",
    rows: [
      {
        label: "Termín",
        text: "táto oblasť je od najbližšej pobočky najďalej, zákazky v regióne preto spájame a plánujeme dopredu – vieme prísť aj na niekoľko dní po sebe",
      },
      {
        label: "Doprava",
        text: "zahrnutá v cenovej ponuke – pri väčšom rozsahu sa v cene za kus takmer neprejaví",
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

/** Replace {mesto} / {km} / {drive} / {sluzba} in tier copy. */
export function fillTokens(
  template: string,
  vars: { mesto: string; km: number; drive: string; sluzba: string }
): string {
  return template
    .replace(/\{mesto\}/g, vars.mesto)
    .replace(/\{km\}/g, String(vars.km))
    .replace(/\{drive\}/g, vars.drive)
    .replace(/\{sluzba\}/g, vars.sluzba);
}
