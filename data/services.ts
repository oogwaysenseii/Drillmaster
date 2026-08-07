// SERVICES — mirrors the live site's real service split and URL slugs so the
// rebuild keeps existing rankings:
//   /jadrove-vrtanie/   +  /jadrove-vrtanie/{mesto}/
//   /rezanie-otvorov/   +  /rezanie-otvorov/{mesto}/   ← currently MISSING on
//     the live site; these are net-new pages and the biggest quick win.

export interface Service {
  slug: string;
  name: string;
  title: string;
  summary: string;
  intro: string;
  /** "Do akých materiálov vŕtame/režeme?" */
  materials: string[];
  /** "Najčastejšie využitie" */
  useCases: string[];
  /** "Prečo si vybrať..." — label + text */
  benefits: { label: string; text: string }[];
  specs?: { label: string; value: string }[];
  faq: { q: string; a: string }[];
  primaryKeyword: string;
  /**
   * Long-form page content. When present, the service page renders this
   * editorial layout instead of the generic template. Optional so a service
   * without written copy still gets a usable page.
   */
  page?: {
    /** Page H1 — richer than the short nav name. */
    h1: string;
    /** Opening paragraph under the H1. */
    lead: string;
    /** Body sections, rendered in order. */
    sections: {
      heading: string;
      /** One or more paragraphs. */
      body?: string[];
      /** Bulleted advantages, each with a bold lead-in. */
      bullets?: { label: string; text: string }[];
    }[];
  };
}

export const services: Service[] = [
  {
    slug: "jadrove-vrtanie",
    name: "Jadrové vŕtanie",
    title: "Jadrové vŕtanie",
    summary:
      "Vŕtanie prestupov pre rozvody a inštalácie. Presné a čisté otvory bez zbytočných vibrácií a otrasov.",
    intro:
      "Špecializujeme sa na presné, rýchle a čisté vŕtanie otvorov pomocou profesionálnej diamantovej techniky. Či už ide o rekonštrukciu bytu, stavbu rodinného domu alebo veľký priemyselný projekt, vyhotovíme prestupy s dokonale hladkými hranami, ktoré nevyžadujú ďalšie začisťovanie.",
    materials: [
      "Betónu a železobetónu (vrátane roxorov)",
      "Panelu (ideálne pre bytové jadrá)",
      "Tehly, pórobetónu či akéhokoľvek iného muriva",
      "Prírodného kameňa a asfaltu",
    ],
    useCases: [
      "Prestupy pre vodu, kanalizáciu a kúrenie",
      "Otvory pre vzduchotechniku, rekuperáciu, klimatizácie či komíny",
      "Prechody pre elektroinštaláciu a kabeláž",
      "Montážne otvory pre kotvy a rôzne uchytenia",
      "Odber vzoriek materiálu pre odborné posudky",
    ],
    benefits: [
      {
        label: "Široké možnosti vŕtania",
        text: "Vŕtame otvory rôznych priemerov a hĺbok do betónu, železobetónu, tehly, kameňa aj asfaltu.",
      },
      {
        label: "Čistota a precíznosť",
        text: "Vďaka chladeniu vodou je vŕtanie prakticky bezprašné a zanecháva dokonale hladké otvory. Šetríte čas aj náklady na dodatočné úpravy.",
      },
      {
        label: "Minimálne rušenie",
        text: "Nízka úroveň hluku a vibrácií robí naše služby vhodnými aj pre citlivé alebo obývané priestory.",
      },
      {
        label: "Rýchle termíny",
        text: "Poskytujeme expresné termíny realizácie a cenovú ponuku vypracujeme obratom a zadarmo.",
      },
    ],
    specs: [
      { label: "Priemer otvorov", value: "20 – 500 mm" },
      { label: "Materiál", value: "železobetón, betón, panel, tehla, kameň, asfalt" },
      { label: "Chladenie", value: "vodou – prakticky bezprašná prevádzka" },
    ],
    faq: [
      {
        q: "Do akých materiálov viete vŕtať?",
        a: "Vŕtame do betónu a železobetónu vrátane roxorov, do panelu, tehly, pórobetónu, prírodného kameňa aj asfaltu. Diamantová technika si poradí aj s husto vystuženým železobetónom.",
      },
      {
        q: "Vzniká pri jadrovom vŕtaní prach?",
        a: "Prakticky nie. Vrták chladíme vodou, ktorá zároveň viaže prach. Vďaka tomu je možné vŕtať aj v obývaných bytoch a v prevádzkach bez ich odstavenia.",
      },
      {
        q: "Naruší vŕtanie statiku budovy?",
        a: "Jadrové vŕtanie pracuje bez rázov a otrasov, takže je k okolitej konštrukcii výrazne šetrnejšie než búranie. Pri prestupoch cez nosné konštrukcie vždy odporúčame konzultáciu so statikom.",
      },
      {
        q: "Ako rýchlo viete prísť?",
        a: "Vo väčšine lokalít vieme ponúknuť expresný termín. Cenovú ponuku vypracujeme obratom a úplne zadarmo.",
      },
    ],
    primaryKeyword: "jadrové vŕtanie",
    page: {
      h1: "Jadrové vŕtanie: Precíznosť a efektivita pre každý otvor",
      lead: "Jadrové vŕtanie je moderná a mimoriadne efektívna metóda pre vytváranie presných, kruhových otvorov v širokej škále stavebných materiálov. Využívame špičkové diamantové technológie, ktoré zaručujú čistý vrt s minimálnymi vibráciami a prachom, čo je kľúčové pre zachovanie integrity okolitých štruktúr a minimalizáciu rušenia.",
      sections: [
        {
          heading: "Využitie jadrového vŕtania v stavebníctve",
          body: [
            "Princíp jadrového vŕtania spočíva v použití dutého vrtáka s diamantovými segmentmi, ktorý sa otáča vysokou rýchlosťou, je chladený vodou a tým zabezpečuje minimálny prach a vibrácie. Týmto spôsobom dochádza k odvádzaniu materiálu vo forme jadra (valca), čo umožňuje vytváranie otvorov s dokonale hladkými stenami a presnými rozmermi.",
          ],
        },
        {
          heading: "Výhody jadrového vŕtania",
          bullets: [
            {
              label: "Široká škála materiálov",
              text: "Vŕtame do betónu, železobetónu, panelu, tehly, kameňa či asfaltu.",
            },
            {
              label: "Rôzne priemery a hĺbky",
              text: "Dokážeme vŕtať otvory rôznych priemerov a do požadovaných hĺbok, podľa špecifických požiadaviek projektu.",
            },
            {
              label: "Presnosť a čistota",
              text: "Zaručujeme vysokú mieru presnosti a minimálny odpad, čo vedie k menšej potrebe následných úprav.",
            },
            {
              label: "Minimálne vibrácie a hluk",
              text: "Naše vybavenie minimalizuje hluk a vibrácie, čo ho robí ideálnym aj pre prácu v obývaných alebo citlivých priestoroch.",
            },
            {
              label: "Rôznorodé aplikácie",
              text: "Ideálne pre inštaláciu potrubí, káblov, vzduchotechniky, ventilačných systémov, vytváranie priechodov pre rôzne prvky, odber vzoriek materiálu a mnoho ďalších.",
            },
          ],
        },
        {
          heading: "Prečo si vybrať nás?",
          body: [
            "Náš tím má dlhoročné skúsenosti v oblasti jadrového vŕtania a je vybavený najmodernejšou technikou. Ponúkame krátku čakaciu dobu, kvalitnú a presnú prácu za nízke ceny. Kontaktujte nás pre bezplatnú konzultáciu a cenovú ponuku.",
          ],
        },
      ],
    },
  },
  {
    slug: "rezanie-otvorov",
    name: "Rezanie otvorov",
    title: "Rezanie stavebných otvorov",
    summary:
      "Rezanie stavebných otvorov diamantovou technikou. Čisté a presné rezy bez otrasov a poškodenia okolitej konštrukcie.",
    intro:
      "Diamantové rezanie umožňuje vytvárať presné rovné rezy do betónových a železobetónových konštrukcií bez rázov a otrasov. Používame ho na otvory pre dvere a okná, prierazy v paneloch, dilatačné škáry aj kontrolované búranie tam, kde by klasická technika ohrozila statiku.",
    materials: [
      "Betónu a železobetónu",
      "Panelu (bytové jadrá, priečky, nosné steny)",
      "Tehlového a zmiešaného muriva",
      "Betónových podláh a základov",
    ],
    useCases: [
      "Otvory pre dvere, okná a priechody",
      "Zväčšovanie existujúcich otvorov",
      "Rezanie panelu v byte a bytových jadier",
      "Dilatačné škáry a delenie podláh",
      "Prípravy pre schodiská a výťahové šachty",
      "Statické a kontrolované búranie",
    ],
    benefits: [
      {
        label: "Bez otrasov",
        text: "Rezanie neprenáša do konštrukcie rázy, takže nehrozí praskanie omietok, obkladov ani narušenie statiky.",
      },
      {
        label: "Presné hrany",
        text: "Rez je rovný a čistý, takže otvor je pripravený na osadenie zárubne bez zdĺhavého začisťovania.",
      },
      {
        label: "Vhodné do obývaných priestorov",
        text: "Nižšia hlučnosť a prašnosť než pri búraní zbíjačkou – vhodné aj do bytových domov v prevádzke.",
      },
      {
        label: "Rýchla realizácia",
        text: "Krátke čakacie doby a efektívny priebeh prác s garantovane nízkymi cenami.",
      },
    ],
    specs: [
      { label: "Technológia", value: "stenová píla, špárová píla, ručné rezanie" },
      { label: "Materiál", value: "železobetón, betón, panel, murivo" },
      { label: "Chladenie", value: "vodou – minimum prachu" },
    ],
    faq: [
      {
        q: "Dá sa vyrezať otvor do nosnej steny?",
        a: "Áno, no vždy po statickom posúdení a s vhodným zabezpečením konštrukcie. Diamantové rezanie je pri tom výrazne šetrnejšie než búranie, pretože nevyvoláva otrasy.",
      },
      {
        q: "Je rezanie hlučné a prašné?",
        a: "Rezanie je tichšie a podstatne čistejšie než búranie zbíjačkou. Rez chladíme vodou, ktorá viaže prach.",
      },
      {
        q: "Viete rezať panel v byte?",
        a: "Áno, rezanie panelu patrí medzi naše najčastejšie zákazky – typicky pri prestavbe bytových jadier a rozširovaní dverných otvorov.",
      },
    ],
    primaryKeyword: "rezanie otvorov",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
