// CITIES — every Slovak district seat (okresné mesto), grouped by region.
// 71 towns: the service is deliverable nationwide, so each district town is a
// target for its own service×city page.
//
// HOW IT WORKS
//   content: null  → NOT generated, renders as "Pripravujeme", never linked.
//   content: {...} → page generated at /jadrove-vrtanie/{slug}/ and
//                    /rezanie-otvorov/{slug}/, added to the sitemap, linked.
// Publishing a town is therefore purely a matter of writing its content here.
//
// ⚠️ CRITICAL SEO RULE
// Published city pages must NOT be near-duplicates. Google's Helpful Content
// system flags near-identical "doorway" pages and it can HURT the whole site.
// Every published city needs genuinely local material — localIntro,
// buildingStock, responseInfo, localFaq. Zvolen and Banská Bystrica are the
// reference standard; match their depth. Publishing 71 spun copies would be
// actively harmful, so roll them out gradually with real content.
//
// Coordinates are approximate town centres — fine for map markers, but worth
// spot-checking if you ever use them for anything precise.
// District list verified against the official okresy breakdown (Aug 2026).

export interface CityContent {
  localIntro: string;
  buildingStock: string;
  responseInfo: string;
  localFaq?: { q: string; a: string }[];
}

export interface City {
  slug: string;
  name: string;
  /** Locative case ("vo Zvolene", "v Banskej Bystrici") for natural Slovak copy. */
  nameLocative: string;
  regionSlug: string;
  /** Regional capital — sorted first and badged. */
  isCapital?: boolean;
  /** Company HQ. */
  isHeadquarters?: boolean;
  geo: { lat: number; lng: number };
  content: CityContent | null;
}

// ---------------------------------------------------------------------------
// Published cities — real, unique local content.
// ---------------------------------------------------------------------------
const published: City[] = [
  {
    slug: "zvolen",
    name: "Zvolen",
    nameLocative: "vo Zvolene",
    regionSlug: "banskobystricky",
    isHeadquarters: true,
    geo: { lat: 48.5744, lng: 19.1354 },
    content: {
      localIntro:
        "Zvolen je našou domovskou lokalitou – sídlime priamo tu, takže k zákazníkom vo Zvolene a blízkom okolí sa dostaneme spravidla ešte v ten istý deň. Vŕtame a režeme v rodinných domoch, bytoch, priemyselných halách aj vo verejných budovách po celom meste, od Sekiera cez Podborovú až po centrum.",
      buildingStock:
        "Vo Zvolene sa najčastejšie stretávame s panelovými bytovými domami zo 70. a 80. rokov, kde riešime prestupy pre klimatizácie, rekuperáciu a nové rozvody, so staršou tehlovou zástavbou v centre a s novostavbami rodinných domov na okrajoch mesta. Pre každý typ konštrukcie volíme vhodný priemer, techniku aj postup.",
      responseInfo:
        "Keďže sídlime priamo vo Zvolene, obhliadku aj samotnú realizáciu dokážeme často zabezpečiť v priebehu 24 hodín. V urgentných prípadoch sa vieme dostaviť aj v ten istý deň.",
      localFaq: [
        {
          q: "Vŕtate aj v panelových bytoch vo Zvolene?",
          a: "Áno. V panelákoch najčastejšie riešime otvory pre klimatizácie, rekuperáciu a nové rozvody, prípadne rezanie bytového jadra. Pracujeme čisto, s chladením vodou, takže byt zostáva obývateľný.",
        },
      ],
    },
  },
  {
    slug: "banska-bystrica",
    name: "Banská Bystrica",
    nameLocative: "v Banskej Bystrici",
    regionSlug: "banskobystricky",
    isCapital: true,
    geo: { lat: 48.7395, lng: 19.1453 },
    content: {
      localIntro:
        "Banská Bystrica je od nášho sídla vo Zvolene vzdialená približne 20 minút jazdy, takže jadrové vŕtanie aj rezanie otvorov tu vieme zabezpečiť rýchlo a bez príplatkov za dopravu na väčšie vzdialenosti. Pracujeme v celom meste vrátane sídlisk Sásová, Fončorda a Radvaň.",
      buildingStock:
        "V Banskej Bystrici prevažujú rozsiahle panelové sídliská, kde riešime prestupy pre klimatizácie a rozvody a rezanie bytových jadier. K tomu pristupuje historické jadro s tehlovým a zmiešaným murivom a administratívne budovy, kde je potrebné pracovať bez narušenia prevádzky.",
      responseInfo:
        "Do Banskej Bystrice sa dostavíme spravidla do 24 hodín od dohody. Pri menších zákazkách vieme obhliadku spojiť priamo s realizáciou.",
    },
  },

  {
    slug: "bratislava",
    name: "Bratislava",
    nameLocative: "v Bratislave",
    regionSlug: "bratislavsky",
    isCapital: true,
    geo: { lat: 48.1486, lng: 17.1077 },
    content: {
      localIntro:
        "V Bratislave realizujeme jadrové vŕtanie aj rezanie otvorov naprieč celým mestom – od panelových sídlisk v Petržalke a Dúbravke, cez rekonštrukcie bytov v Starom Meste, až po administratívne a priemyselné objekty v Ružinove, Vajnoroch a v prístavnej zóne. Väčšie zákazky vieme rozdeliť do etáp tak, aby prevádzka objektu pokračovala bez prerušenia.",
      buildingStock:
        "Bratislava je z hľadiska konštrukcií najrozmanitejšie mesto na Slovensku. V Petržalke, ktorá patrí k najväčším panelovým sídliskám v strednej Európe, riešime najmä prestupy pre klimatizácie, rekuperáciu a rezanie bytových jadier. V Starom Meste narážame na tehlové a zmiešané murivo z prelomu storočí, kde je potrebný citlivejší postup, a v novostavbách a administratívnych budovách na husto vystužený železobetón, ktorý zvláda len diamantová technika.",
      responseInfo:
        "Bratislava je od nášho sídla najvzdialenejšou lokalitou, preto termíny plánujeme dopredu a zákazky v regióne spravidla spájame do jedného výjazdu. Vďaka tomu vieme držať ceny na rovnakej úrovni ako v okolí Zvolena. Pri väčších projektoch prichádzame na obhliadku vopred.",
      localFaq: [
        {
          q: "Vŕtate aj v panelákoch v Petržalke?",
          a: "Áno, panelové domy v Petržalke a Dúbravke patria medzi naše najčastejšie zákazky v Bratislave – najmä otvory pre klimatizácie a rekuperáciu a rezanie bytových jadier. Pracujeme s chladením vodou, takže byt zostáva obývateľný.",
        },
        {
          q: "Zvládnete prácu v administratívnej budove počas prevádzky?",
          a: "Áno. Diamantová technika pracuje bez otrasov a s minimom prachu, takže vieme vŕtať aj rezať v budovách, ktoré sú v prevádzke. Hlučnejšie úseky vieme presunúť mimo pracovných hodín.",
        },
      ],
    },
  },
  {
    slug: "nitra",
    name: "Nitra",
    nameLocative: "v Nitre",
    regionSlug: "nitriansky",
    isCapital: true,
    geo: { lat: 48.3069, lng: 18.0866 },
    content: {
      localIntro:
        "V Nitre zabezpečujeme jadrové vŕtanie a rezanie otvorov pre bytové domy na Klokočine a Chrenovej, pre rodinné domy v okrajových častiach aj pre výrobné haly v priemyselnej zóne na severe mesta. Pracujeme pre súkromných zákazníkov aj pre stavebné firmy ako subdodávateľ.",
      buildingStock:
        "Nitra kombinuje rozsiahle panelové sídliská zo 70. a 80. rokov, kde riešime prestupy pre rozvody a klimatizácie, so staršou zástavbou pod Nitrianskym hradom, kde prevažuje tehla a zmiešané murivo. Osobitnou kapitolou sú haly v priemyselnej zóne – tam ide najčastejšie o vývrty veľkých priemerov cez železobetónové panely pre technologické rozvody.",
      responseInfo:
        "Do Nitry vyrážame pravidelne, termín vieme spravidla dohodnúť v priebehu niekoľkých dní. Pri menších zákazkách sa snažíme obhliadku spojiť priamo s realizáciou, aby ste nemuseli čakať na dva výjazdy.",
      localFaq: [
        {
          q: "Robíte aj vŕtanie vo výrobných halách v Nitre?",
          a: "Áno. V priemyselných objektoch najčastejšie vŕtame prestupy väčších priemerov cez železobetónové panely a podlahy pre vzduchotechniku, kanalizáciu a technologické rozvody – bez odstavenia prevádzky.",
        },
      ],
    },
  },
  {
    slug: "lucenec",
    name: "Lučenec",
    nameLocative: "v Lučenci",
    regionSlug: "banskobystricky",
    geo: { lat: 48.3324, lng: 19.6673 },
    content: {
      localIntro:
        "Lučenec a celý Novohrad patria do nášho bežného pôsobiska. Jadrové vŕtanie a rezanie otvorov tu realizujeme v bytových domoch, pri rekonštrukciách rodinných domov aj vo verejných budovách. Zákazky v okrese často spájame, takže sa k vám dostaneme rýchlo a bez príplatku za dopravu.",
      buildingStock:
        "V Lučenci sa stretávame s panelovými bytovými domami na sídliskách Rúbanisko I až III, kde riešime prestupy pre klimatizácie a nové rozvody, a so staršou tehlovou zástavbou v centre, kde je murivo často nehomogénne a vyžaduje opatrnejší postup. V okolitých obciach Novohradu prevažujú rodinné domy s kamennými a zmiešanými základmi.",
      responseInfo:
        "Do Lučenca sa dostaneme spravidla do dvoch dní od dohody. Ak riešite havarijný stav, skúste nám zavolať – vieme zareagovať aj rýchlejšie.",
    },
  },
  {
    slug: "brezno",
    name: "Brezno",
    nameLocative: "v Brezne",
    regionSlug: "banskobystricky",
    geo: { lat: 48.8047, lng: 19.6386 },
    content: {
      localIntro:
        "V Brezne a na Horehroní realizujeme jadrové vŕtanie aj rezanie stavebných otvorov. Okrem samotného mesta pracujeme v obciach pozdĺž Hrona a v rekreačných objektoch v okolí – od chát a penziónov až po bytové domy a prevádzky v centre mesta.",
      buildingStock:
        "V Brezne prevažujú menšie panelové bytové domy a rodinná zástavba, k tomu staršie murované objekty v centre. V rekreačných objektoch v okolí sa často stretávame s kamenným murivom a betónovými základmi, kde je jadrové vŕtanie jediný rozumný spôsob, ako spraviť prestup bez narušenia konštrukcie.",
      responseInfo:
        "Brezno je od nášho sídla dostupné po hlavnej ceste cez Banskú Bystricu. Termín vieme spravidla dohodnúť do dvoch až troch dní.",
    },
  },
  {
    slug: "ruzomberok",
    name: "Ružomberok",
    nameLocative: "v Ružomberku",
    regionSlug: "zilinsky",
    geo: { lat: 49.0788, lng: 19.3084 },
    content: {
      localIntro:
        "V Ružomberku a na Liptove zabezpečujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj priemyselné objekty. Pracujeme v meste aj v okolitých obciach smerom na Liptovský Mikuláš a do Ružomberských dolín.",
      buildingStock:
        "Ružomberok má rozsiahle panelové sídliská Baničné a Klačno, kde riešime prestupy pre rozvody, klimatizácie a rekuperáciu. V centre a v starších štvrtiach prevažuje tehlové murivo. Mesto má zároveň silné priemyselné zázemie, takže časť zákaziek tvoria vývrty a rezy v halách a technologických objektoch.",
      responseInfo:
        "Do Ružomberka jazdíme cez Banskú Bystricu a Donovaly. Termíny plánujeme spravidla s niekoľkodňovým predstihom a zákazky na Liptove radi spájame do jedného výjazdu.",
    },
  },
  {
    slug: "detva",
    name: "Detva",
    nameLocative: "v Detve",
    regionSlug: "banskobystricky",
    geo: { lat: 48.5606, lng: 19.4197 },
    content: {
      localIntro:
        "Detva je od nášho sídla vo Zvolene doslova na skok, takže jadrové vŕtanie aj rezanie otvorov tu vieme zabezpečiť veľmi rýchlo – často ešte v ten istý deň. Pracujeme v bytových domoch v meste, v rodinných domoch aj v priemyselných objektoch v okolí.",
      buildingStock:
        "V Detve nájdeme panelové bytové domy zo 70. a 80. rokov postavené súbežne s rozvojom miestneho strojárskeho priemyslu, k tomu rozsiahlu rodinnú zástavbu a typické podpolianske usadlosti v okolitých obciach, kde sa často stretávame s kamenným murivom a starými betónovými základmi.",
      responseInfo:
        "Detva patrí spolu so Zvolenom k našim najrýchlejšie dostupným lokalitám. Obhliadku aj realizáciu často stihneme v ten istý deň.",
    },
  },
  {
    slug: "ziar-nad-hronom",
    name: "Žiar nad Hronom",
    nameLocative: "v Žiari nad Hronom",
    regionSlug: "banskobystricky",
    geo: { lat: 48.5906, lng: 18.8531 },
    content: {
      localIntro:
        "V Žiari nad Hronom realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre prevádzky v priemyselnom areáli. Mesto je od Zvolena blízko po hlavnom ťahu údolím Hrona, takže termíny vieme držať krátke.",
      buildingStock:
        "Žiar nad Hronom je typické mesto vybudované okolo priemyslu – prevažujú tu panelové bytové domy postavené pre zamestnancov závodu, kde riešime najmä prestupy pre klimatizácie, rekuperáciu a nové rozvody. Priemyselný areál prináša zákazky iného charakteru: vývrty veľkých priemerov cez železobetón a rezy v podlahách a technologických konštrukciách.",
      responseInfo:
        "Do Žiaru nad Hronom sa dostaneme po hlavnej ceste údolím Hrona. Termín vieme spravidla dohodnúť do 24 až 48 hodín.",
    },
  },
  {
    slug: "malacky",
    name: "Malacky",
    nameLocative: "v Malackách",
    regionSlug: "bratislavsky",
    geo: { lat: 48.4363, lng: 17.0215 },
    content: {
      localIntro:
        "Na Záhorí pokrývame Malacky a okolité obce. Popri bytových a rodinných domoch tu často pracujeme pre firmy v priemyselnom parku, kde ide o prestupy väčších priemerov cez železobetónové konštrukcie hál.",
      buildingStock:
        "V Malackách prevažuje nižšia zástavba – rodinné domy a menšie bytové domy, doplnené o novšie logistické a výrobné haly na okraji mesta. V starších objektoch v centre narazíme na tehlové murivo, v halách naopak na hrubé železobetónové podlahy a panely.",
      responseInfo:
        "Malacky sú od nášho sídla na opačnej strane republiky, preto zákazky na Záhorí plánujeme dopredu a spájame ich do jedného výjazdu.",
    },
  },
  {
    slug: "pezinok",
    name: "Pezinok",
    nameLocative: "v Pezinku",
    regionSlug: "bratislavsky",
    geo: { lat: 48.2891, lng: 17.2669 },
    content: {
      localIntro:
        "V Pezinku a v podhorí Malých Karpát realizujeme jadrové vŕtanie aj rezanie otvorov pre rodinné domy, vinárstva a bytové domy. Časť zákaziek tvoria rekonštrukcie starších objektov v historickom centre.",
      buildingStock:
        "Pezinok kombinuje historické jadro s hrubým tehlovým a kamenným murivom, rodinnú zástavbu v podhorí a menšie panelové sídliská. Vo vinárskych objektoch a pivniciach sa často stretávame s klenbami a kamenným murivom, kde je vŕtanie bez otrasov jediná bezpečná možnosť.",
      responseInfo:
        "Do Pezinka jazdíme v rámci výjazdov do bratislavského regiónu, termín preto dohadujeme s niekoľkodňovým predstihom.",
    },
  },
  {
    slug: "senec",
    name: "Senec",
    nameLocative: "v Senci",
    regionSlug: "bratislavsky",
    geo: { lat: 48.2189, lng: 17.4003 },
    content: {
      localIntro:
        "Senec patrí k najrýchlejšie rastúcim mestám v okolí Bratislavy a väčšinu našich zákaziek tu tvoria novostavby rodinných domov a novšie bytové projekty. Riešime prestupy pre rozvody, rekuperáciu aj klimatizácie.",
      buildingStock:
        "V Senci prevažujú novostavby s betónovými a železobetónovými konštrukciami a tvárnicovým murivom. V okolí jazier pribúdajú rekreačné objekty, kde ide najmä o prestupy pre vodu a kanalizáciu cez základové pásy.",
      responseInfo:
        "Senec riešime spolu s ostatnými zákazkami v bratislavskom regióne, termín plánujeme dopredu.",
    },
  },
  {
    slug: "trnava",
    name: "Trnava",
    nameLocative: "v Trnave",
    regionSlug: "trnavsky",
    isCapital: true,
    geo: { lat: 48.3774, lng: 17.5877 },
    content: {
      localIntro:
        "V Trnave zabezpečujeme jadrové vŕtanie a rezanie otvorov pre bytové domy na sídliskách, pre rekonštrukcie v historickom jadre aj pre priemyselné objekty v okolí mesta.",
      buildingStock:
        "Trnava má opevnené historické jadro s hrubým tehlovým murivom, kde je potrebný opatrný postup, a k tomu rozsiahle panelové sídliská z druhej polovice minulého storočia. Priemyselné zázemie mesta prináša zákazky s hrubým železobetónom a podlahovými rezmi.",
      responseInfo:
        "Do Trnavy jazdíme po diaľnici cez Nitru. Termíny plánujeme spravidla s niekoľkodňovým predstihom.",
    },
  },
  {
    slug: "dunajska-streda",
    name: "Dunajská Streda",
    nameLocative: "v Dunajskej Strede",
    regionSlug: "trnavsky",
    geo: { lat: 47.9925, lng: 17.6119 },
    content: {
      localIntro:
        "Na Žitnom ostrove pokrývame Dunajskú Stredu a okolité obce. Pracujeme pre rodinné domy, poľnohospodárske a výrobné objekty aj pre bytové domy v meste.",
      buildingStock:
        "Zástavba na Žitnom ostrove je prevažne nízka – rodinné domy a menšie bytové domy. Špecifikom regiónu je vysoká hladina podzemnej vody, s ktorou treba počítať pri prestupoch cez základy a podlahy suterénov.",
      responseInfo:
        "Dunajská Streda je od nás vzdialenejšia, preto zákazky v regióne spájame a termín dohadujeme dopredu.",
    },
  },
  {
    slug: "galanta",
    name: "Galanta",
    nameLocative: "v Galante",
    regionSlug: "trnavsky",
    geo: { lat: 48.1907, lng: 17.7269 },
    content: {
      localIntro:
        "V Galante a okolí realizujeme jadrové vŕtanie aj rezanie stavebných otvorov pre bytové domy, rodinné domy a priemyselné prevádzky v okolitých obciach.",
      buildingStock:
        "V Galante nájdeme panelové bytové domy zo 70. a 80. rokov spolu s rozsiahlou rodinnou zástavbou na rovinatom teréne Podunajskej nížiny. V priemyselných objektoch ide najčastejšie o vývrty cez železobetónové podlahy a panely.",
      responseInfo:
        "Galantu riešime v rámci výjazdov do západoslovenského regiónu, termín preto dohadujeme vopred.",
    },
  },
  {
    slug: "hlohovec",
    name: "Hlohovec",
    nameLocative: "v Hlohovci",
    regionSlug: "trnavsky",
    geo: { lat: 48.4306, lng: 17.8028 },
    content: {
      localIntro:
        "V Hlohovci a v okolí Váhu realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre prevádzky v miestnej priemyselnej zóne.",
      buildingStock:
        "Hlohovec má staršie jadro s tehlovým murivom rozložené nad Váhom a k tomu panelové bytové domy na svahovitom teréne. Farmaceutický a potravinársky priemysel v okolí prináša zákazky v technologických objektoch s hrubým železobetónom.",
      responseInfo:
        "Do Hlohovca jazdíme v rámci výjazdov na západné Slovensko, termín plánujeme s predstihom.",
    },
  },
  {
    slug: "piestany",
    name: "Piešťany",
    nameLocative: "v Piešťanoch",
    regionSlug: "trnavsky",
    geo: { lat: 48.5936, lng: 17.8261 },
    content: {
      localIntro:
        "V Piešťanoch pracujeme pre bytové domy, rodinné domy aj pre hotelové a kúpeľné objekty, kde je dôležité pracovať potichu a bez prachu.",
      buildingStock:
        "Piešťany majú okrem bežnej panelovej a rodinnej zástavby aj množstvo kúpeľných a hotelových budov, medzi nimi historické vily a objekty na kúpeľnom ostrove. V takýchto prevádzkach oceníte, že diamantová technika pracuje bez otrasov a s minimom hluku.",
      responseInfo:
        "Do Piešťan jazdíme po hlavnom ťahu popri Váhu. Termíny dohadujeme dopredu, v kúpeľných objektoch vieme prispôsobiť čas prác prevádzke.",
    },
  },
  {
    slug: "senica",
    name: "Senica",
    nameLocative: "v Senici",
    regionSlug: "trnavsky",
    geo: { lat: 48.6789, lng: 17.3661 },
    content: {
      localIntro:
        "Na Záhorí pokrývame Senicu a okolité obce – bytové domy, rodinné domy aj výrobné objekty v priemyselnej zóne.",
      buildingStock:
        "V Senici prevažujú panelové bytové domy a rodinná zástavba, doplnené o výrobné haly na okraji mesta. V halách ide najčastejšie o veľkopriemerové vývrty pre technologické rozvody a rezy do betónových podláh.",
      responseInfo:
        "Senica je od nášho sídla vzdialenejšia, preto zákazky na Záhorí spájame do jedného výjazdu.",
    },
  },
  {
    slug: "skalica",
    name: "Skalica",
    nameLocative: "v Skalici",
    regionSlug: "trnavsky",
    geo: { lat: 48.8447, lng: 17.2264 },
    content: {
      localIntro:
        "V Skalici a v jej okolí pri českej hranici realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre rodinné domy, vinárske objekty aj bytové domy.",
      buildingStock:
        "Skalica má zachované historické jadro s hrubým tehlovým a kamenným murivom a k tomu novšiu zástavbu na okrajoch. V pivniciach a vinárskych objektoch sa stretávame s klenbami, kde je vŕtanie bez otrasov nevyhnutnosťou.",
      responseInfo:
        "Skalicu riešime v rámci výjazdov na Záhorie, termín preto dohadujeme dopredu.",
    },
  },
  {
    slug: "trencin",
    name: "Trenčín",
    nameLocative: "v Trenčíne",
    regionSlug: "trenciansky",
    isCapital: true,
    geo: { lat: 48.8945, lng: 18.0444 },
    content: {
      localIntro:
        "V Trenčíne zabezpečujeme jadrové vŕtanie a rezanie otvorov pre bytové domy na Juhu a Sihoti, pre rekonštrukcie v centre pod hradom aj pre priemyselné objekty v okolí.",
      buildingStock:
        "Trenčín má historické jadro pod hradným bralom s hrubým kamenným a tehlovým murivom a k tomu veľké panelové sídliská, predovšetkým Juh. V starších objektoch v centre je murivo často nehomogénne a vyžaduje opatrnejší postup.",
      responseInfo:
        "Do Trenčína jazdíme po hlavnom ťahu Považím. Termíny plánujeme s niekoľkodňovým predstihom.",
    },
  },
  {
    slug: "banovce-nad-bebravou",
    name: "Bánovce nad Bebravou",
    nameLocative: "v Bánovciach nad Bebravou",
    regionSlug: "trenciansky",
    geo: { lat: 48.7203, lng: 18.2578 },
    content: {
      localIntro:
        "V Bánovciach nad Bebravou a okolitých obciach realizujeme jadrové vŕtanie aj rezanie otvorov pre bytové domy, rodinné domy a menšie výrobné prevádzky.",
      buildingStock:
        "V Bánovciach prevažujú panelové bytové domy postavené súbežne s rozvojom miestneho priemyslu a rozsiahla rodinná zástavba. V okolitých obciach sa často stretávame so staršími objektmi s kamennými základmi.",
      responseInfo:
        "Bánovce riešime v rámci výjazdov na stredné Považie, termín dohadujeme dopredu.",
    },
  },
  {
    slug: "ilava",
    name: "Ilava",
    nameLocative: "v Ilave",
    regionSlug: "trenciansky",
    geo: { lat: 48.9986, lng: 18.235 },
    content: {
      localIntro:
        "V Ilave a v okolitých obciach v údolí Váhu realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové aj rodinné domy a pre priemyselné objekty.",
      buildingStock:
        "Ilava je menšie mesto s historickým jadrom, menšími bytovými domami a rodinnou zástavbou v úzkom údolí Váhu. V starších objektoch prevažuje tehlové a kamenné murivo.",
      responseInfo:
        "Ilavu riešime spolu s ostatnými zákazkami na Považí, termín preto plánujeme dopredu.",
    },
  },
  {
    slug: "myjava",
    name: "Myjava",
    nameLocative: "v Myjave",
    regionSlug: "trenciansky",
    geo: { lat: 48.7539, lng: 17.5686 },
    content: {
      localIntro:
        "Na Myjave a v okolitých kopaniciach realizujeme jadrové vŕtanie a rezanie otvorov. Popri meste pracujeme aj v rozptýlenej zástavbe kopaníc, kde ide často o prestupy cez staré základy.",
      buildingStock:
        "Myjavu charakterizuje kombinácia mestskej zástavby a rozptýlených kopaničiarskych usadlostí v okolí. V starších usadlostiach prevažuje kamenné a zmiešané murivo, kde je jadrové vŕtanie jediný spôsob, ako spraviť čistý prestup.",
      responseInfo:
        "Myjava je od nás vzdialenejšia, zákazky v regióne preto spájame do jedného výjazdu.",
    },
  },
  {
    slug: "nove-mesto-nad-vahom",
    name: "Nové Mesto nad Váhom",
    nameLocative: "v Novom Meste nad Váhom",
    regionSlug: "trenciansky",
    geo: { lat: 48.7572, lng: 17.8306 },
    content: {
      localIntro:
        "V Novom Meste nad Váhom a okolí realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre výrobné prevádzky.",
      buildingStock:
        "Mesto kombinuje staršie jadro s tehlovým murivom, panelové bytové domy a priemyselné areály na okraji. V halách riešime najmä vývrty väčších priemerov cez železobetón a rezy do podláh.",
      responseInfo:
        "Do Nového Mesta jazdíme po hlavnom ťahu Považím, termín plánujeme s predstihom.",
    },
  },
  {
    slug: "partizanske",
    name: "Partizánske",
    nameLocative: "v Partizánskom",
    regionSlug: "trenciansky",
    geo: { lat: 48.6272, lng: 18.3778 },
    content: {
      localIntro:
        "V Partizánskom a okolí realizujeme jadrové vŕtanie aj rezanie otvorov pre bytové domy, rodinné domy a pre objekty v pôvodnom priemyselnom areáli.",
      buildingStock:
        "Partizánske je mesto vybudované ako plánovaný celok okolo obuvníckeho priemyslu, takže má nezvyčajne jednotnú funkcionalistickú zástavbu z tehly a betónu, doplnenú o neskoršie panelové domy. V priemyselnom areáli ide o hrubé železobetónové konštrukcie.",
      responseInfo:
        "Partizánske riešime v rámci výjazdov na horné Ponitrie, termín dohadujeme dopredu.",
    },
  },
  {
    slug: "povazska-bystrica",
    name: "Považská Bystrica",
    nameLocative: "v Považskej Bystrici",
    regionSlug: "trenciansky",
    geo: { lat: 49.1214, lng: 18.4239 },
    content: {
      localIntro:
        "V Považskej Bystrici realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy na sídliskách, pre rodinné domy aj pre priemyselné objekty v meste.",
      buildingStock:
        "Považská Bystrica má rozsiahle panelové sídliská postavené pre zamestnancov miestneho strojárstva a k tomu veľké priemyselné areály. V bytových domoch riešime prestupy pre klimatizácie a rozvody, v halách vývrty cez hrubý železobetón.",
      responseInfo:
        "Do Považskej Bystrice jazdíme Považím. Termíny plánujeme s niekoľkodňovým predstihom.",
    },
  },
  {
    slug: "prievidza",
    name: "Prievidza",
    nameLocative: "v Prievidzi",
    regionSlug: "trenciansky",
    geo: { lat: 48.7719, lng: 18.6244 },
    content: {
      localIntro:
        "V Prievidzi a na hornej Nitre realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre priemyselné prevádzky v regióne.",
      buildingStock:
        "Prievidza má rozsiahle panelové sídliská z obdobia rozmachu baníctva na hornej Nitre, k tomu staršiu murovanú zástavbu v centre. Priemyselné a energetické objekty v okolí prinášajú zákazky s hrubým železobetónom a podlahovými rezmi.",
      responseInfo:
        "Do Prievidze jazdíme cez Žiar nad Hronom. Termín vieme spravidla dohodnúť v priebehu niekoľkých dní.",
    },
  },
  {
    slug: "puchov",
    name: "Púchov",
    nameLocative: "v Púchove",
    regionSlug: "trenciansky",
    geo: { lat: 49.1236, lng: 18.3269 },
    content: {
      localIntro:
        "V Púchove a okolí realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre priemyselné objekty v miestnom areáli.",
      buildingStock:
        "Púchov má panelové bytové domy postavené pre zamestnancov gumárenského priemyslu a rozsiahly priemyselný areál. V halách ide najčastejšie o veľkopriemerové vývrty pre technologické rozvody a rezy do betónových podláh.",
      responseInfo:
        "Púchov riešime v rámci výjazdov na Považie, termín preto dohadujeme dopredu.",
    },
  },
  {
    slug: "komarno",
    name: "Komárno",
    nameLocative: "v Komárne",
    regionSlug: "nitriansky",
    geo: { lat: 47.7639, lng: 18.1281 },
    content: {
      localIntro:
        "V Komárne a v okolitých obciach pri Dunaji realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre prevádzky v prístavnej a lodenickej zóne.",
      buildingStock:
        "Komárno má historické jadro s hrubým tehlovým murivom a rozsiahly pevnostný systém, k tomu panelové bytové domy a priemyselné objekty pri Dunaji. Pri prácach v blízkosti rieky treba počítať s vysokou hladinou podzemnej vody.",
      responseInfo:
        "Komárno je od nás vzdialenejšie, zákazky v regióne preto spájame do jedného výjazdu.",
    },
  },
  {
    slug: "levice",
    name: "Levice",
    nameLocative: "v Leviciach",
    regionSlug: "nitriansky",
    geo: { lat: 48.2172, lng: 18.6067 },
    content: {
      localIntro:
        "V Leviciach a v Pohroní realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre priemyselné a energetické objekty v okolí.",
      buildingStock:
        "Levice kombinujú panelové sídliská, staršiu murovanú zástavbu v centre a rozsiahlu rodinnú zástavbu. Energetické a priemyselné objekty v okolí prinášajú zákazky s hrubým železobetónom, kde sa uplatní veľkopriemerové vŕtanie.",
      responseInfo:
        "Do Levíc jazdíme Pohroním. Termín vieme spravidla dohodnúť v priebehu niekoľkých dní.",
    },
  },
  {
    slug: "nove-zamky",
    name: "Nové Zámky",
    nameLocative: "v Nových Zámkoch",
    regionSlug: "nitriansky",
    geo: { lat: 47.9856, lng: 18.1611 },
    content: {
      localIntro:
        "V Nových Zámkoch a okolí realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre výrobné prevádzky.",
      buildingStock:
        "Nové Zámky majú panelové sídliská, staršiu murovanú zástavbu v centre a rozsiahlu rodinnú zástavbu na rovine Podunajskej nížiny. V bytových domoch riešime najmä prestupy pre klimatizácie a nové rozvody.",
      responseInfo:
        "Nové Zámky riešime v rámci výjazdov na juhozápadné Slovensko, termín dohadujeme dopredu.",
    },
  },
  {
    slug: "sala",
    name: "Šaľa",
    nameLocative: "v Šali",
    regionSlug: "nitriansky",
    geo: { lat: 48.1519, lng: 17.8806 },
    content: {
      localIntro:
        "V Šali a okolitých obciach realizujeme jadrové vŕtanie aj rezanie otvorov pre bytové domy, rodinné domy a pre objekty v miestnom chemickom areáli.",
      buildingStock:
        "Šaľa má panelové bytové domy postavené pre zamestnancov chemického priemyslu a rozsiahlu rodinnú zástavbu. V technologických objektoch ide o hrubé železobetónové konštrukcie, kde je diamantová technika jedinou možnosťou.",
      responseInfo:
        "Šaľu riešime v rámci výjazdov na západné Slovensko, termín preto plánujeme dopredu.",
    },
  },
  {
    slug: "topolcany",
    name: "Topoľčany",
    nameLocative: "v Topoľčanoch",
    regionSlug: "nitriansky",
    geo: { lat: 48.5622, lng: 18.1747 },
    content: {
      localIntro:
        "V Topoľčanoch a okolí realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre potravinárske a výrobné prevádzky.",
      buildingStock:
        "Topoľčany majú panelové sídliská a rozsiahlu rodinnú zástavbu na rovinatom teréne. V potravinárskych a výrobných objektoch v okolí riešime prestupy pre technologické rozvody cez železobetónové podlahy a steny.",
      responseInfo:
        "Do Topoľčian jazdíme cez Nitru, termín plánujeme s niekoľkodňovým predstihom.",
    },
  },
  {
    slug: "zlate-moravce",
    name: "Zlaté Moravce",
    nameLocative: "v Zlatých Moravciach",
    regionSlug: "nitriansky",
    geo: { lat: 48.3856, lng: 18.3986 },
    content: {
      localIntro:
        "V Zlatých Moravciach a v podhorí Tribeča realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre menšie výrobné prevádzky.",
      buildingStock:
        "Zlaté Moravce sú menšie mesto s panelovými bytovými domami a prevažujúcou rodinnou zástavbou. V okolitých obciach pod Tribečom sa často stretávame so staršími objektmi s kamennými základmi.",
      responseInfo:
        "Zlaté Moravce riešime v rámci výjazdov do nitrianskeho regiónu, termín dohadujeme dopredu.",
    },
  },
  {
    slug: "zilina",
    name: "Žilina",
    nameLocative: "v Žiline",
    regionSlug: "zilinsky",
    isCapital: true,
    geo: { lat: 49.2231, lng: 18.7394 },
    content: {
      localIntro:
        "V Žiline zabezpečujeme jadrové vŕtanie a rezanie otvorov pre bytové domy na Vlčincoch a Solinkách, pre rekonštrukcie v centre aj pre priemyselné objekty v okolí mesta.",
      buildingStock:
        "Žilina má jedny z najrozsiahlejších panelových sídlisk na severe Slovenska, k tomu historické jadro s tehlovým murivom a veľké priemyselné areály v okolí. V halách ide o vývrty väčších priemerov cez hrubý železobetón.",
      responseInfo:
        "Do Žiliny jazdíme cez Banskú Bystricu a Martin. Termíny plánujeme s niekoľkodňovým predstihom a zákazky na severe spájame.",
    },
  },
  {
    slug: "bytca",
    name: "Bytča",
    nameLocative: "v Bytči",
    regionSlug: "zilinsky",
    geo: { lat: 49.2233, lng: 18.5583 },
    content: {
      localIntro:
        "V Bytči a okolitých obciach v údolí Váhu realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové aj rodinné domy a pre menšie prevádzky.",
      buildingStock:
        "Bytča je menšie mesto s historickým jadrom pri renesančnom zámku, menšími bytovými domami a rodinnou zástavbou. V starších objektoch prevažuje kamenné a tehlové murivo.",
      responseInfo:
        "Bytču riešime v rámci výjazdov na severné Považie, termín preto dohadujeme dopredu.",
    },
  },
  {
    slug: "cadca",
    name: "Čadca",
    nameLocative: "v Čadci",
    regionSlug: "zilinsky",
    geo: { lat: 49.4372, lng: 18.7889 },
    content: {
      localIntro:
        "Na Kysuciach pokrývame Čadcu a okolité obce. Pracujeme v bytových domoch v meste aj v rozptýlenej zástavbe v okolitých dolinách.",
      buildingStock:
        "Čadca leží v úzkom údolí, takže zástavba je natiahnutá pozdĺž rieky – panelové bytové domy v meste a rodinné domy vo svahoch. V starších kysuckých domoch sa často stretávame s kamennými základmi a zmiešaným murivom.",
      responseInfo:
        "Čadca je od nášho sídla vzdialenejšia, zákazky na Kysuciach preto spájame do jedného výjazdu.",
    },
  },
  {
    slug: "dolny-kubin",
    name: "Dolný Kubín",
    nameLocative: "v Dolnom Kubíne",
    regionSlug: "zilinsky",
    geo: { lat: 49.2094, lng: 19.2969 },
    content: {
      localIntro:
        "Na Orave pokrývame Dolný Kubín a okolité obce – bytové domy na sídlisku Brezovec, rodinné domy aj priemyselné prevádzky.",
      buildingStock:
        "Dolný Kubín má panelové sídliská postavené v svahovitom teréne nad Oravou a k tomu staršiu murovanú zástavbu v centre. V okolitých oravských obciach prevažujú rodinné domy s kamennými základmi.",
      responseInfo:
        "Na Oravu jazdíme cez Ružomberok. Termíny plánujeme dopredu a oravské zákazky spájame.",
    },
  },
  {
    slug: "kysucke-nove-mesto",
    name: "Kysucké Nové Mesto",
    nameLocative: "v Kysuckom Novom Meste",
    regionSlug: "zilinsky",
    geo: { lat: 49.3011, lng: 18.7856 },
    content: {
      localIntro:
        "V Kysuckom Novom Meste a okolí realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre priemyselné objekty.",
      buildingStock:
        "Kysucké Nové Mesto má panelové bytové domy postavené pre zamestnancov miestneho strojárskeho závodu a k tomu rodinnú zástavbu v okolitých svahoch. V halách ide o vývrty cez hrubý železobetón.",
      responseInfo:
        "Kysucké Nové Mesto riešime spolu s ostatnými zákazkami na Kysuciach, termín dohadujeme dopredu.",
    },
  },
  {
    slug: "liptovsky-mikulas",
    name: "Liptovský Mikuláš",
    nameLocative: "v Liptovskom Mikuláši",
    regionSlug: "zilinsky",
    geo: { lat: 49.0806, lng: 19.6203 },
    content: {
      localIntro:
        "V Liptovskom Mikuláši a na Liptove realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre hotely a rekreačné objekty v okolí.",
      buildingStock:
        "Liptovský Mikuláš má rozsiahle panelové sídliská, staršie jadro s tehlovým murivom a k tomu veľké množstvo ubytovacích a rekreačných objektov v okolí Liptovskej Mary a pod Tatrami. V hoteloch oceníte prácu bez prachu a otrasov počas prevádzky.",
      responseInfo:
        "Na Liptov jazdíme cez Ružomberok. Termíny plánujeme dopredu a zákazky v regióne spájame.",
    },
  },
  {
    slug: "martin",
    name: "Martin",
    nameLocative: "v Martine",
    regionSlug: "zilinsky",
    geo: { lat: 49.0664, lng: 18.9219 },
    content: {
      localIntro:
        "V Martine a v Turci realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre priemyselné objekty.",
      buildingStock:
        "Martin má rozsiahle panelové sídliská postavené pre zamestnancov ťažkého strojárstva a k tomu historické jadro. Priemyselné areály v meste prinášajú zákazky s veľmi hrubým železobetónom, kde je potrebná výkonná diamantová technika.",
      responseInfo:
        "Do Martina jazdíme cez Banskú Bystricu. Termín vieme spravidla dohodnúť v priebehu niekoľkých dní.",
    },
  },
  {
    slug: "namestovo",
    name: "Námestovo",
    nameLocative: "v Námestove",
    regionSlug: "zilinsky",
    geo: { lat: 49.4078, lng: 19.4803 },
    content: {
      localIntro:
        "V Námestove a na hornej Orave realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre rekreačné objekty pri Oravskej priehrade.",
      buildingStock:
        "Námestovo má menšie panelové sídliská a rozsiahlu rodinnú zástavbu, doplnenú o rekreačné objekty pri priehrade. V starších oravských domoch prevažuje kamenné murivo a betónové základy.",
      responseInfo:
        "Horná Orava je od nášho sídla vzdialenejšia, zákazky v regióne preto spájame do jedného výjazdu.",
    },
  },
  {
    slug: "turcianske-teplice",
    name: "Turčianske Teplice",
    nameLocative: "v Turčianskych Tepliciach",
    regionSlug: "zilinsky",
    geo: { lat: 48.8619, lng: 18.8608 },
    content: {
      localIntro:
        "V Turčianskych Tepliciach a okolí realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové a rodinné domy aj pre kúpeľné a ubytovacie objekty.",
      buildingStock:
        "Turčianske Teplice sú kúpeľné mesto s hotelovými a kúpeľnými budovami, menšími bytovými domami a rodinnou zástavbou. V kúpeľných objektoch je dôležité pracovať potichu a bez prachu počas prevádzky.",
      responseInfo:
        "Turčianske Teplice ležia na ceste do Martina, termín preto vieme spravidla dohodnúť pomerne rýchlo.",
    },
  },
  {
    slug: "tvrdosin",
    name: "Tvrdošín",
    nameLocative: "v Tvrdošíne",
    regionSlug: "zilinsky",
    geo: { lat: 49.3378, lng: 19.5539 },
    content: {
      localIntro:
        "V Tvrdošíne a na Orave realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre výrobné prevádzky v okolí.",
      buildingStock:
        "Tvrdošín je menšie oravské mesto s panelovými bytovými domami a prevažujúcou rodinnou zástavbou. V okolitých obciach sa stretávame so staršími objektmi s kamennými základmi a zmiešaným murivom.",
      responseInfo:
        "Tvrdošín riešime v rámci oravských výjazdov, termín dohadujeme dopredu.",
    },
  },
  {
    slug: "banska-stiavnica",
    name: "Banská Štiavnica",
    nameLocative: "v Banskej Štiavnici",
    regionSlug: "banskobystricky",
    geo: { lat: 48.4483, lng: 18.8964 },
    content: {
      localIntro:
        "V Banskej Štiavnici realizujeme jadrové vŕtanie a rezanie otvorov najmä pri rekonštrukciách historických objektov, kde je šetrný postup nevyhnutnosťou.",
      buildingStock:
        "Banská Štiavnica je historické banské mesto zapísané v zozname UNESCO – prevažuje tu hrubé kamenné a zmiešané murivo, klenby a objekty postavené v strmom teréne. Práve tu má diamantové vŕtanie bez otrasov najväčší význam, pretože klasické búranie by konštrukciu ohrozilo.",
      responseInfo:
        "Banská Štiavnica je od Zvolena blízko, termín vieme spravidla dohodnúť do dvoch dní. Pri pamiatkovo chránených objektoch odporúčame obhliadku vopred.",
    },
  },
  {
    slug: "krupina",
    name: "Krupina",
    nameLocative: "v Krupine",
    regionSlug: "banskobystricky",
    geo: { lat: 48.3553, lng: 19.0656 },
    content: {
      localIntro:
        "V Krupine a v Honte realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre rodinné domy, bytové domy aj pre menšie prevádzky v okolí.",
      buildingStock:
        "Krupina patrí k najstarším mestám na Slovensku, takže v centre nájdeme hrubé kamenné a tehlové murivo. Okolo neho je rozsiahla rodinná zástavba a menšie bytové domy, v okolitých hontianskych obciach staršie objekty s kamennými základmi.",
      responseInfo:
        "Krupina je od Zvolena blízko po hlavnom ťahu, termín vieme spravidla dohodnúť do 24 až 48 hodín.",
    },
  },
  {
    slug: "poltar",
    name: "Poltár",
    nameLocative: "v Poltári",
    regionSlug: "banskobystricky",
    geo: { lat: 48.4297, lng: 19.7947 },
    content: {
      localIntro:
        "V Poltári a okolí realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre objekty v miestnom priemyselnom areáli.",
      buildingStock:
        "Poltár je menšie mesto spojené so sklárskym priemyslom – nájdeme tu panelové bytové domy postavené pre zamestnancov závodu, rodinnú zástavbu a priemyselné haly s hrubými betónovými podlahami.",
      responseInfo:
        "Poltár riešime spolu so zákazkami v okolí Lučenca, termín dohadujeme v priebehu niekoľkých dní.",
    },
  },
  {
    slug: "revuca",
    name: "Revúca",
    nameLocative: "v Revúcej",
    regionSlug: "banskobystricky",
    geo: { lat: 48.6817, lng: 20.115 },
    content: {
      localIntro:
        "V Revúcej a v Gemeri realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre menšie výrobné prevádzky.",
      buildingStock:
        "Revúca má staršie murované jadro, menšie panelové bytové domy a rozsiahlu rodinnú zástavbu. V okolitých gemerských obciach sa často stretávame s kamenným murivom a starými betónovými základmi.",
      responseInfo:
        "Revúca je od nášho sídla vzdialenejšia, zákazky v Gemeri preto spájame do jedného výjazdu.",
    },
  },
  {
    slug: "rimavska-sobota",
    name: "Rimavská Sobota",
    nameLocative: "v Rimavskej Sobote",
    regionSlug: "banskobystricky",
    geo: { lat: 48.3833, lng: 20.0222 },
    content: {
      localIntro:
        "V Rimavskej Sobote a v Gemeri realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre výrobné a poľnohospodárske objekty.",
      buildingStock:
        "Rimavská Sobota má zachované historické jadro s hrubým tehlovým murivom, panelové sídliská a rozsiahlu rodinnú zástavbu na rovine. V poľnohospodárskych objektoch v okolí ide najmä o prestupy cez betónové podlahy a steny.",
      responseInfo:
        "Do Rimavskej Soboty jazdíme cez Lučenec, termín plánujeme s niekoľkodňovým predstihom.",
    },
  },
  {
    slug: "velky-krtis",
    name: "Veľký Krtíš",
    nameLocative: "vo Veľkom Krtíši",
    regionSlug: "banskobystricky",
    geo: { lat: 48.1878, lng: 19.3494 },
    content: {
      localIntro:
        "Vo Veľkom Krtíši a v Novohrade realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre menšie prevádzky.",
      buildingStock:
        "Veľký Krtíš je mesto, ktoré vyrástlo s rozvojom baníctva v regióne – prevažujú tu panelové bytové domy z toho obdobia a rodinná zástavba. V okolitých obciach sú staršie objekty s kamennými základmi.",
      responseInfo:
        "Veľký Krtíš riešime v rámci výjazdov do Novohradu, termín dohadujeme dopredu.",
    },
  },
  {
    slug: "zarnovica",
    name: "Žarnovica",
    nameLocative: "v Žarnovici",
    regionSlug: "banskobystricky",
    geo: { lat: 48.4842, lng: 18.7189 },
    content: {
      localIntro:
        "V Žarnovici a v okolí Hrona realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre výrobné prevádzky.",
      buildingStock:
        "Žarnovica je menšie mesto v údolí Hrona s menšími bytovými domami, rodinnou zástavbou a priemyselnými objektmi na okraji. V starších objektoch prevažuje tehlové a zmiešané murivo.",
      responseInfo:
        "Žarnovica leží na hlavnom ťahu údolím Hrona, termín preto vieme dohodnúť pomerne rýchlo.",
    },
  },
  {
    slug: "presov",
    name: "Prešov",
    nameLocative: "v Prešove",
    regionSlug: "presovsky",
    isCapital: true,
    geo: { lat: 48.9975, lng: 21.2393 },
    content: {
      localIntro:
        "V Prešove zabezpečujeme jadrové vŕtanie a rezanie otvorov pre bytové domy na Sekčove a Sídlisku III, pre rekonštrukcie v historickom centre aj pre priemyselné objekty.",
      buildingStock:
        "Prešov má rozsiahle panelové sídliská, ktoré patria k najväčším na východe Slovenska, a k tomu historické jadro s hrubým tehlovým murivom. V bytových domoch riešime najmä prestupy pre klimatizácie a rekuperáciu a rezanie bytových jadier.",
      responseInfo:
        "Prešov je od nášho sídla na východe republiky, preto termíny plánujeme dopredu a zákazky v regióne spájame do jedného výjazdu.",
    },
  },
  {
    slug: "bardejov",
    name: "Bardejov",
    nameLocative: "v Bardejove",
    regionSlug: "presovsky",
    geo: { lat: 49.2917, lng: 21.2761 },
    content: {
      localIntro:
        "V Bardejove realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pri rekonštrukciách v historickom jadre a v kúpeľoch.",
      buildingStock:
        "Bardejov má mimoriadne zachované historické námestie zapísané v zozname UNESCO, kde prevažuje hrubé kamenné a tehlové murivo a je nutný citlivý postup. Okolo neho sú panelové sídliská a rodinná zástavba, k tomu kúpeľné objekty na okraji mesta.",
      responseInfo:
        "Bardejov je od nás vzdialený, zákazky na severovýchode preto spájame do jedného výjazdu a plánujeme ich dopredu.",
    },
  },
  {
    slug: "humenne",
    name: "Humenné",
    nameLocative: "v Humennom",
    regionSlug: "presovsky",
    geo: { lat: 48.9339, lng: 21.9128 },
    content: {
      localIntro:
        "V Humennom a v hornom Zemplíne realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre priemyselné prevádzky.",
      buildingStock:
        "Humenné má rozsiahle panelové sídliská postavené s rozvojom chemického priemyslu v regióne a k tomu staršiu murovanú zástavbu v centre. V priemyselných objektoch ide o hrubé železobetónové konštrukcie.",
      responseInfo:
        "Humenné je od nášho sídla vzdialené, termíny preto plánujeme dopredu a zákazky v regióne spájame.",
    },
  },
  {
    slug: "kezmarok",
    name: "Kežmarok",
    nameLocative: "v Kežmarku",
    regionSlug: "presovsky",
    geo: { lat: 49.1361, lng: 20.4319 },
    content: {
      localIntro:
        "V Kežmarku a v podtatranskom regióne realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pri rekonštrukciách historických objektov.",
      buildingStock:
        "Kežmarok má zachované historické jadro s hrubým kamenným a tehlovým murivom, k tomu panelové bytové domy a rodinnú zástavbu. V podtatranských obciach pribúdajú rekreačné objekty.",
      responseInfo:
        "Kežmarok riešime v rámci výjazdov na Spiš, termín preto dohadujeme dopredu.",
    },
  },
  {
    slug: "levoca",
    name: "Levoča",
    nameLocative: "v Levoči",
    regionSlug: "presovsky",
    geo: { lat: 49.0247, lng: 20.5892 },
    content: {
      localIntro:
        "V Levoči realizujeme jadrové vŕtanie a rezanie otvorov najmä pri rekonštrukciách v historickom jadre, kde je šetrná technika nevyhnutnosťou, a v bytovej zástavbe mimo hradieb.",
      buildingStock:
        "Levoča je mesto zapísané v zozname UNESCO s kompletne zachovaným historickým jadrom vnútri hradieb – prevažuje hrubé kamenné murivo a klenby. Práve tu je vŕtanie bez otrasov jediný prijateľný spôsob, ako spraviť prestup.",
      responseInfo:
        "Levoču riešime v rámci spišských výjazdov, termín plánujeme dopredu. Pri pamiatkovo chránených objektoch odporúčame obhliadku vopred.",
    },
  },
  {
    slug: "medzilaborce",
    name: "Medzilaborce",
    nameLocative: "v Medzilaborciach",
    regionSlug: "presovsky",
    geo: { lat: 49.2703, lng: 21.9058 },
    content: {
      localIntro:
        "V Medzilaborciach a v okolitých obciach na severovýchode realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové aj rodinné domy.",
      buildingStock:
        "Medzilaborce sú menšie mesto s panelovými bytovými domami a prevažujúcou rodinnou zástavbou v členitom teréne. V starších objektoch v okolí sa stretávame s kamenným murivom.",
      responseInfo:
        "Medzilaborce patria k najvzdialenejším lokalitám, zákazky tu preto spájame a plánujeme s väčším predstihom.",
    },
  },
  {
    slug: "poprad",
    name: "Poprad",
    nameLocative: "v Poprade",
    regionSlug: "presovsky",
    geo: { lat: 49.0553, lng: 20.2986 },
    content: {
      localIntro:
        "V Poprade a pod Tatrami realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre hotely a rekreačné objekty.",
      buildingStock:
        "Poprad má rozsiahle panelové sídliská a k tomu veľké množstvo ubytovacích a rekreačných objektov v celom podtatranskom regióne. V hoteloch a penziónoch oceníte, že pracujeme bez prachu a bez odstavenia prevádzky.",
      responseInfo:
        "Poprad je od nášho sídla vzdialenejší, termíny preto plánujeme dopredu a podtatranské zákazky spájame.",
    },
  },
  {
    slug: "sabinov",
    name: "Sabinov",
    nameLocative: "v Sabinove",
    regionSlug: "presovsky",
    geo: { lat: 49.1017, lng: 21.0986 },
    content: {
      localIntro:
        "V Sabinove a okolí realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre menšie prevádzky.",
      buildingStock:
        "Sabinov má staršie murované jadro, menšie panelové bytové domy a rozsiahlu rodinnú zástavbu. V okolitých obciach prevažujú staršie objekty s kamennými základmi.",
      responseInfo:
        "Sabinov riešime spolu so zákazkami v okolí Prešova, termín preto dohadujeme dopredu.",
    },
  },
  {
    slug: "snina",
    name: "Snina",
    nameLocative: "v Snine",
    regionSlug: "presovsky",
    geo: { lat: 48.9886, lng: 22.1531 },
    content: {
      localIntro:
        "V Snine a v okolí Poloninských vrchov realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre rekreačné objekty.",
      buildingStock:
        "Snina má panelové bytové domy postavené s rozvojom miestneho strojárstva, rodinnú zástavbu a v okolí pribúdajúce rekreačné objekty. V starších domoch prevažuje kamenné a zmiešané murivo.",
      responseInfo:
        "Snina patrí k najvzdialenejším lokalitám, zákazky na východe preto spájame a plánujeme dopredu.",
    },
  },
  {
    slug: "stara-lubovna",
    name: "Stará Ľubovňa",
    nameLocative: "v Starej Ľubovni",
    regionSlug: "presovsky",
    geo: { lat: 49.2989, lng: 20.6892 },
    content: {
      localIntro:
        "V Starej Ľubovni a na severnom Spiši realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre rekreačné objekty.",
      buildingStock:
        "Stará Ľubovňa má menšie panelové sídliská, staršiu murovanú zástavbu a rozsiahlu rodinnú zástavbu v členitom teréne. V okolitých obciach sa stretávame so staršími objektmi s kamennými základmi.",
      responseInfo:
        "Starú Ľubovňu riešime v rámci spišských výjazdov, termín dohadujeme dopredu.",
    },
  },
  {
    slug: "stropkov",
    name: "Stropkov",
    nameLocative: "v Stropkove",
    regionSlug: "presovsky",
    geo: { lat: 49.2044, lng: 21.6511 },
    content: {
      localIntro:
        "V Stropkove a okolí realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre menšie výrobné prevádzky.",
      buildingStock:
        "Stropkov je menšie mesto s panelovými bytovými domami a prevažujúcou rodinnou zástavbou. V okolitých obciach prevažujú staršie objekty s kamennými základmi a zmiešaným murivom.",
      responseInfo:
        "Stropkov je od nášho sídla vzdialený, zákazky na severovýchode preto spájame do jedného výjazdu.",
    },
  },
  {
    slug: "svidnik",
    name: "Svidník",
    nameLocative: "vo Svidníku",
    regionSlug: "presovsky",
    geo: { lat: 49.3067, lng: 21.5697 },
    content: {
      localIntro:
        "Vo Svidníku a okolí realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre verejné budovy.",
      buildingStock:
        "Svidník je mesto z veľkej časti postavené po druhej svetovej vojne, takže prevažuje novšia panelová a murovaná zástavba. V okolitých obciach sa stretávame so staršími objektmi s kamennými základmi.",
      responseInfo:
        "Svidník patrí k vzdialenejším lokalitám, termíny preto plánujeme s väčším predstihom.",
    },
  },
  {
    slug: "vranov-nad-toplou",
    name: "Vranov nad Topľou",
    nameLocative: "vo Vranove nad Topľou",
    regionSlug: "presovsky",
    geo: { lat: 48.8892, lng: 21.6836 },
    content: {
      localIntro:
        "Vo Vranove nad Topľou a v Zemplíne realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre výrobné prevádzky.",
      buildingStock:
        "Vranov nad Topľou má panelové sídliská, staršiu murovanú zástavbu v centre a rozsiahlu rodinnú zástavbu. V priemyselných objektoch v okolí ide o vývrty cez železobetónové konštrukcie.",
      responseInfo:
        "Vranov riešime v rámci výjazdov na východ, termín preto dohadujeme dopredu.",
    },
  },
  {
    slug: "kosice",
    name: "Košice",
    nameLocative: "v Košiciach",
    regionSlug: "kosicky",
    isCapital: true,
    geo: { lat: 48.7164, lng: 21.2611 },
    content: {
      localIntro:
        "V Košiciach zabezpečujeme jadrové vŕtanie a rezanie otvorov naprieč celým mestom – od panelových sídlisk Nad jazerom, Terasa a KVP, cez rekonštrukcie v historickom centre, až po priemyselné objekty na juhu mesta.",
      buildingStock:
        "Košice majú jedny z najrozsiahlejších panelových sídlisk na Slovensku, kde riešime prestupy pre klimatizácie, rekuperáciu a rezanie bytových jadier. K tomu historické centrum s hrubým tehlovým murivom a rozsiahle priemyselné areály, kde ide o veľkopriemerové vývrty cez hrubý železobetón.",
      responseInfo:
        "Košice sú od nášho sídla vzdialené, preto termíny plánujeme dopredu a zákazky na východe spájame do jedného výjazdu. Pri väčších projektoch prichádzame na obhliadku vopred.",
    },
  },
  {
    slug: "gelnica",
    name: "Gelnica",
    nameLocative: "v Gelnici",
    regionSlug: "kosicky",
    geo: { lat: 48.8567, lng: 20.9367 },
    content: {
      localIntro:
        "V Gelnici a v okolitých obciach v údolí Hnilca realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové aj rodinné domy.",
      buildingStock:
        "Gelnica je staré banské mesto v úzkom údolí – prevažuje tu staršia murovaná a kamenná zástavba, doplnená o menšie bytové domy. V starších objektoch je murivo často nehomogénne.",
      responseInfo:
        "Gelnica je od nášho sídla vzdialenejšia, zákazky v regióne preto spájame do jedného výjazdu.",
    },
  },
  {
    slug: "michalovce",
    name: "Michalovce",
    nameLocative: "v Michalovciach",
    regionSlug: "kosicky",
    geo: { lat: 48.7544, lng: 21.9192 },
    content: {
      localIntro:
        "V Michalovciach a v Zemplíne realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre rekreačné objekty pri Zemplínskej šírave.",
      buildingStock:
        "Michalovce majú rozsiahle panelové sídliská a k tomu rodinnú zástavbu na rovine Východoslovenskej nížiny. Pri Zemplínskej šírave pribúdajú rekreačné objekty, kde ide najmä o prestupy pre vodu a kanalizáciu.",
      responseInfo:
        "Michalovce sú od nás vzdialené, termíny preto plánujeme dopredu a východoslovenské zákazky spájame.",
    },
  },
  {
    slug: "roznava",
    name: "Rožňava",
    nameLocative: "v Rožňave",
    regionSlug: "kosicky",
    geo: { lat: 48.6606, lng: 20.5333 },
    content: {
      localIntro:
        "V Rožňave a v Gemeri realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pri rekonštrukciách historických objektov.",
      buildingStock:
        "Rožňava má zachované historické jadro so starým banským námestím, kde prevažuje hrubé kamenné a tehlové murivo. Okolo neho sú panelové bytové domy a rodinná zástavba v kotline pod Slovenským krasom.",
      responseInfo:
        "Do Rožňavy jazdíme cez Gemer. Termíny plánujeme s predstihom a zákazky v regióne spájame.",
    },
  },
  {
    slug: "sobrance",
    name: "Sobrance",
    nameLocative: "v Sobranciach",
    regionSlug: "kosicky",
    geo: { lat: 48.7439, lng: 22.1811 },
    content: {
      localIntro:
        "V Sobranciach a v okolitých obciach na východe realizujeme jadrové vŕtanie a rezanie otvorov pre rodinné domy, bytové domy aj pre poľnohospodárske objekty.",
      buildingStock:
        "Sobrance sú menšie mesto s prevažujúcou rodinnou zástavbou a menšími bytovými domami. V poľnohospodárskych objektoch v okolí ide najmä o prestupy cez betónové podlahy a steny.",
      responseInfo:
        "Sobrance patria k najvzdialenejším lokalitám, zákazky tu preto spájame a plánujeme s väčším predstihom.",
    },
  },
  {
    slug: "spisska-nova-ves",
    name: "Spišská Nová Ves",
    nameLocative: "v Spišskej Novej Vsi",
    regionSlug: "kosicky",
    geo: { lat: 48.9444, lng: 20.5619 },
    content: {
      localIntro:
        "V Spišskej Novej Vsi a na Spiši realizujeme jadrové vŕtanie a rezanie stavebných otvorov pre bytové domy, rodinné domy aj pre prevádzky v okolí Slovenského raja.",
      buildingStock:
        "Spišská Nová Ves má rozsiahle panelové sídliská a historické jadro s najdlhším šošovkovitým námestím na Slovensku, kde prevažuje hrubé murivo. V okolí Slovenského raja pribúdajú ubytovacie a rekreačné objekty.",
      responseInfo:
        "Spišskú Novú Ves riešime v rámci spišských výjazdov, termín preto plánujeme dopredu.",
    },
  },
  {
    slug: "trebisov",
    name: "Trebišov",
    nameLocative: "v Trebišove",
    regionSlug: "kosicky",
    geo: { lat: 48.6281, lng: 21.7186 },
    content: {
      localIntro:
        "V Trebišove a v Zemplínskej nížine realizujeme jadrové vŕtanie a rezanie otvorov pre bytové domy, rodinné domy aj pre poľnohospodárske a výrobné objekty.",
      buildingStock:
        "Trebišov má panelové sídliská, staršiu murovanú zástavbu v centre a rozsiahlu rodinnú zástavbu na rovine. Poľnohospodárske objekty v okolí prinášajú zákazky s prestupmi cez hrubé betónové podlahy a steny.",
      responseInfo:
        "Trebišov je od nášho sídla vzdialený, zákazky na východe preto spájame do jedného výjazdu.",
    },
  },
];

// ---------------------------------------------------------------------------
// Remaining district seats. Compact tuples keep 69 entries readable:
//   [slug, name, locative, regionSlug, lat, lng, isCapital?]
// ---------------------------------------------------------------------------
type Row = [string, string, string, string, number, number, boolean?];

const rows: Row[] = [
  // --- Bratislavský ---

  // --- Trnavský ---

  // --- Trenčiansky ---

  // --- Nitriansky ---

  // --- Žilinský ---

  // --- Banskobystrický (Zvolen + Banská Bystrica are published above) ---

  // --- Prešovský ---

  // --- Košický ---
];

export const cities: City[] = [
  ...published,
  ...rows.map<City>(([slug, name, nameLocative, regionSlug, lat, lng, isCapital]) => ({
    slug,
    name,
    nameLocative,
    regionSlug,
    ...(isCapital ? { isCapital: true } : {}),
    geo: { lat, lng },
    content: null,
  })),
];

/** Only cities with written content get pages generated. */
export const publishedCities = cities.filter((c) => c.content !== null);

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Cities in a region — capital first, then published, then alphabetical. */
export function citiesInRegion(regionSlug: string): City[] {
  return cities
    .filter((c) => c.regionSlug === regionSlug)
    .sort((a, b) => {
      if (!!a.isCapital !== !!b.isCapital) return a.isCapital ? -1 : 1;
      const ap = a.content !== null;
      const bp = b.content !== null;
      if (ap !== bp) return ap ? -1 : 1;
      return a.name.localeCompare(b.name, "sk");
    });
}

/** Region slugs that have at least one city. */
export function activeRegionSlugs(): string[] {
  return [...new Set(cities.map((c) => c.regionSlug))];
}
