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
        "Banská Bystrica je od najbližšej pobočky vzdialená približne 20 minút jazdy, takže jadrové vŕtanie aj rezanie otvorov tu vieme zabezpečiť rýchlo a bez príplatkov za dopravu na väčšie vzdialenosti. Pracujeme v celom meste vrátane sídlisk Sásová, Fončorda a Radvaň.",
      buildingStock:
        "V Banskej Bystrici prevažujú rozsiahle panelové sídliská, kde riešime prestupy pre klimatizácie a rozvody a rezanie bytových jadier. K tomu pristupuje historické jadro s tehlovým a zmiešaným murivom a administratívne budovy, kde je potrebné pracovať bez narušenia prevádzky.",
      responseInfo:
        "Do Banskej Bystrice sa dostavíme spravidla do 24 hodín od dohody. Pri menších zákazkách vieme obhliadku spojiť priamo s realizáciou.",
      localFaq: [
        {
          q: "Vŕtate na sídliskách ako Sásová alebo Fončorda?",
          a: "Áno, panelové sídliská tvoria väčšinu našich zákaziek v Banskej Bystrici. Najčastejšie ide o otvory pre klimatizácie, rekuperáciu a nové rozvody. Vŕtame s chladením vodou a odsávaním, takže v byte nezostáva prach a nemusíte sa sťahovať.",
        },
        {
          q: "Ako rýchlo sa k nám dostanete?",
          a: "Banská Bystrica je od nás asi dvadsať minút, takže patrí k lokalitám, kde vieme reagovať prakticky okamžite – obhliadku aj realizáciu často stihneme v ten istý deň.",
        },
      ],
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
        "Bratislava je od najbližšej pobočky najďalej, preto termíny plánujeme dopredu a zákazky v regióne spravidla spájame do jedného výjazdu. Vďaka tomu vieme držať ceny na rovnakej úrovni ako v okolí Zvolena. Pri väčších projektoch prichádzame na obhliadku vopred.",
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
      localFaq: [
        {
          q: "Vŕtate v panelákoch na Rúbanisku?",
          a: "Áno, na Rúbanisku I až III riešime hlavne prestupy pre klimatizácie, rekuperáciu a výmeny stúpačiek. Otvor vedieme so spádom von, aby v ňom nestála voda, a hrany necháme čisté, takže nie je potrebné ďalšie začisťovanie.",
        },
        {
          q: "Dá sa v paneli vyrezať väčší otvor pre dvere?",
          a: "Áno, ale v nosnej panelovej stene vždy až po statickom posúdení a s vhodným zabezpečením konštrukcie. Diamantové rezanie je pri tom podstatne šetrnejšie než búranie – neprenáša do panelu otrasy, takže nepraskajú omietky ani obklady u susedov.",
        },
      ],
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
        "Brezno je od najbližšej pobočky dostupné po hlavnej ceste cez Banskú Bystricu. Termín vieme spravidla dohodnúť do dvoch až troch dní.",
      localFaq: [
        {
          q: "Poradíte si so staršou murovanou zástavbou v centre?",
          a: "Áno. V starších breznianskych objektoch býva murivo zmiešané – tehla, kameň aj dodatočné vysprávky v jednej stene. Diamantová korunka si s tým poradí, len vŕtanie trvá dlhšie a postupujeme pomalšie, aby sa okolo otvoru nič neuvoľnilo.",
        },
        {
          q: "Robíte aj prestupy pre kotly a vykurovanie?",
          a: "Áno, je to jedna z najčastejších požiadaviek – prestupy pre odvod spalín, prívod vzduchu a rozvody kúrenia. Priemer vieme prispôsobiť presne podľa projektu, takže komín ani potrubie netreba dodatočne dotesňovať.",
        },
      ],
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
      localFaq: [
        {
          q: "Pracujete na sídliskách Baničné a Klačno?",
          a: "Áno, panelové domy na Baničnom a Klačne sú v Ružomberku našou najčastejšou zákazkou – prestupy pre rozvody, klimatizácie a rekuperáciu, prípadne rezanie bytového jadra pri rekonštrukcii kúpeľne.",
        },
        {
          q: "Zvládnete aj prestupy v priemyselných objektoch?",
          a: "Áno. V halách ide spravidla o hrubé železobetónové steny a stropy, kde je diamantová technika jedinou reálnou možnosťou. Vŕtame prestupy pre technologické rozvody aj vzduchotechniku, v prípade potreby aj vo výške.",
        },
      ],
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
        "Detva je od najbližšej pobočky doslova na skok, takže jadrové vŕtanie aj rezanie otvorov tu vieme zabezpečiť veľmi rýchlo – často ešte v ten istý deň. Pracujeme v bytových domoch v meste, v rodinných domoch aj v priemyselných objektoch v okolí.",
      buildingStock:
        "V Detve nájdeme panelové bytové domy zo 70. a 80. rokov postavené súbežne s rozvojom miestneho strojárskeho priemyslu, k tomu rozsiahlu rodinnú zástavbu a typické podpolianske usadlosti v okolitých obciach, kde sa často stretávame s kamenným murivom a starými betónovými základmi.",
      responseInfo:
        "Detva patrí spolu so Zvolenom k našim najrýchlejšie dostupným lokalitám. Obhliadku aj realizáciu často stihneme v ten istý deň.",
      localFaq: [
        {
          q: "Vŕtate aj v objektoch miestneho strojárskeho priemyslu?",
          a: "Áno. V halách a technologických objektoch pracujeme s hrubým železobetónom, kde bežná technika nestačí. Vieme vŕtať prestupy pre rozvody, vzduchotechniku aj káblové trasy, a to aj v stiesnených priestoroch medzi technológiou.",
        },
        {
          q: "Prídete aj do okolitých podpolianskych obcí?",
          a: "Áno, okolie Detvy riešime spolu so zákazkami v meste. V starších usadlostiach sa často stretávame s kamenným murivom a betónovými základmi – vŕtanie tam trvá dlhšie, ale je to bežná práca.",
        },
      ],
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
      localFaq: [
        {
          q: "Robíte prestupy v priemyselných halách?",
          a: "Áno, Žiar je mesto postavené okolo priemyslu a hrubé železobetónové konštrukcie sú tu bežné. Vŕtame prestupy pre technologické rozvody aj vzduchotechniku a prácu vieme naplánovať tak, aby zapadla do odstávky prevádzky.",
        },
        {
          q: "Ako je to s prestupmi v panelákoch pre zamestnancov?",
          a: "Panelové domy v Žiari majú typické konštrukcie, ktoré poznáme – prestupy pre klimatizácie a rekuperáciu vieme urobiť rýchlo a bez prachu. Otvor má hladké hrany a je pripravený na osadenie potrubia.",
        },
      ],
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
        "Malacky sú od najbližšej pobočky na opačnej strane republiky, preto zákazky na Záhorí plánujeme dopredu a spájame ich do jedného výjazdu.",
      localFaq: [
        {
          q: "Vŕtate aj v nových logistických a výrobných halách?",
          a: "Áno. V novších halách na okraji Malaciek ide o betónové a železobetónové konštrukcie, kde vieme vyvŕtať prestupy pre technológiu, vzduchotechniku aj káblové trasy bez toho, aby sme narušili okolitú konštrukciu.",
        },
        {
          q: "Riešite aj bežné rodinné domy?",
          a: "Áno, nižšia zástavba tvorí v Malackách väčšinu. Najčastejšie ide o prestupy pre vodu, kanalizáciu, elektriku alebo rekuperáciu, či už v novostavbe alebo pri dodatočnom zavedení sietí do staršieho domu.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate aj v historickom jadre?",
          a: "Áno, ale v starom pezinskom murive postupujeme opatrnejšie – býva hrubé, zmiešané a nepravidelné. Diamantová technika nepracuje príklepom, takže do steny neprenáša otrasy a nehrozí praskanie omietok.",
        },
        {
          q: "Aké podmienky potrebujete na mieste?",
          a: "Prívod elektriny 230 V, prístup k vode a miesto na zaparkovanie v rozumnej vzdialenosti od vchodu. Ak voda nie je k dispozícii, privezieme si vlastnú nádrž – to sa hodí najmä v podhorí a pri novostavbách.",
        },
      ],
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
      localFaq: [
        {
          q: "Riešite novostavby s tvárnicovým murivom?",
          a: "Áno, v Senci prevažujú novšie konštrukcie. Do tvárnic aj betónu vŕtame presné prestupy pre rozvody, rekuperáciu a klimatizácie – hrany zostanú čisté, takže sa otvor nemusí dodatočne začisťovať.",
        },
        {
          q: "Pracujete aj na objektoch pri jazerách?",
          a: "Áno, rekreačné a ubytovacie objekty v okolí Slnečných jazier riešime bežne. Prácu vieme naplánovať mimo sezóny alebo mimo prevádzkových hodín, aby vŕtanie nezasiahlo hostí.",
        },
      ],
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
      localFaq: [
        {
          q: "Dá sa vŕtať v opevnenom historickom jadre?",
          a: "Áno, len opatrne. Trnavské jadro má hrubé tehlové murivo a mnohé objekty sú pamiatkovo chránené, takže si vopred overte, či zásah nevyžaduje súhlas pamiatkarov. Samotné vŕtanie je bezotrasové, čo je pri takýchto stenách rozhodujúce.",
        },
        {
          q: "Ako hrubým múrom prevŕtate?",
          a: "Hĺbka nie je pre jadrové vŕtanie problém – korunky nadstavujeme, takže prejdeme aj cez veľmi hrubé historické murivo. Cena sa počíta za centimeter hĺbky, takže pri hrubšom múre s ňou treba rátať.",
        },
      ],
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
      localFaq: [
        {
          q: "Ako riešite prestupy pri vysokej hladine spodnej vody?",
          a: "Na Žitnom ostrove je to bežná téma. Prestup cez základ alebo suterénnu stenu vieme vyvŕtať presne a s hladkými hranami, čo je dôležité práve preto, že otvor sa musí spoľahlivo dotesniť proti tlakovej vode.",
        },
        {
          q: "Vŕtate aj do betónových základov starších domov?",
          a: "Áno, dodatočné zavedenie vody, kanalizácie alebo elektriky cez základ je jedna z najčastejších zákaziek v regióne. Vrt vedieme pomaly a priebežne kontrolujeme smer, aby vyšiel presne tam, kde má.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate v panelákoch aj v rodinných domoch?",
          a: "Áno, oboje. V panelových domoch zo 70. a 80. rokov ide najčastejšie o prestupy pre klimatizácie a rekuperáciu, v rodinnej zástavbe o rozvody, kanalizáciu a prestupy cez základy.",
        },
        {
          q: "Koľko neporiadku po vŕtaní zostane?",
          a: "Prakticky žiadny. Vŕtame s chladením vodou, ktorá viaže prach, miesto si vopred zakryjeme a po sebe upraceme. Byt ani prevádzku preto počas prác nemusíte uzatvárať.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate aj v domoch na svahu nad Váhom?",
          a: "Áno. Svahovitý terén znamená hlavne otázku prístupu – techniku prenášame po častiach, takže nám stačí prístup pešo a miesto na zaparkovanie neďaleko. Ak je prístup komplikovaný, povedzte nám to pri dohadovaní termínu.",
        },
        {
          q: "Poradíte si so starším tehlovým murivom v jadre?",
          a: "Áno. Staršie hlohovecké murivo býva nepravidelné a miestami dutinové – korunku vedieme pomalšie a sledujeme, aby sa okolo otvoru nič neuvoľnilo. Výsledkom je čistý otvor bez vytrhaných okrajov.",
        },
      ],
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
      localFaq: [
        {
          q: "Dá sa vŕtať v kúpeľnom alebo hotelovom objekte počas prevádzky?",
          a: "Áno. Jadrové vŕtanie je podstatne tichšie a čistejšie než búranie, takže prevádzku úplne nezastavuje. Pri citlivých objektoch prácu radi naplánujeme na ranné hodiny alebo mimo sezóny, aby hostí nerušila.",
        },
        {
          q: "Pracujete aj na chránených budovách?",
          a: "Áno, no pri pamiatkovo chránených objektoch je potrebné mať zásah odsúhlasený vopred. Technicky ide o bezotrasové vŕtanie, čo je práve pri historických konštrukciách dôvod, prečo sa volí diamantová technika.",
        },
      ],
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
        "Senica je od najbližšej pobočky vzdialenejšia, preto zákazky na Záhorí spájame do jedného výjazdu.",
      localFaq: [
        {
          q: "Robíte prestupy vo výrobných halách?",
          a: "Áno, haly na okraji Senice sú typická zákazka – hrubé železobetónové steny a stropy, prestupy pre technológiu, vzduchotechniku a káblové trasy. Prácu vieme naplánovať na odstávku, aby výroba nestála zbytočne dlho.",
        },
        {
          q: "Vŕtate aj v obývaných bytoch?",
          a: "Áno, panelové domy v Senici riešime bežne. Vŕtame s chladením vodou, takže nevzniká prach, a hlučnosť je obmedzená len na krátky čas priamo pri vrte.",
        },
      ],
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
      localFaq: [
        {
          q: "Ako postupujete v historickom jadre Skalice?",
          a: "Opatrne a s ohľadom na hrúbku muriva – v jadre je bežné hrubé tehlové aj kamenné murivo. Vŕtanie je bezotrasové, takže nehrozí praskanie omietok, ale pri chránených objektoch treba mať zásah vopred odsúhlasený.",
        },
        {
          q: "Zvládnete prevŕtať veľmi hrubú stenu?",
          a: "Áno. Korunky nadstavujeme, takže hrúbka nie je prekážkou. Keďže sa cena počíta za centimeter hĺbky, pri hrubom historickom murive vyjde vyššie než pri bežnej panelovej stene – povieme vám to dopredu.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate pod hradným bralom v starom jadre?",
          a: "Áno. V trenčianskom jadre je murivo hrubé, kamenné a nepravidelné, takže vŕtanie trvá dlhšie a korunka sa rýchlejšie opotrebuje. Cenu preto pri takýchto stenách potvrdzujeme až po obhliadke.",
        },
        {
          q: "Riešite aj veľké sídliská ako Juh?",
          a: "Áno, panelové sídliská sú v Trenčíne našou najčastejšou zákazkou – prestupy pre klimatizácie, rekuperáciu a rozvody, prípadne rezanie bytového jadra pri rekonštrukcii.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate aj v priemyselných objektoch?",
          a: "Áno. V bánovských halách ide o hrubé železobetónové konštrukcie, kde robíme prestupy pre technologické rozvody a vzduchotechniku. Vieme pracovať aj vo výške a v stiesnených priestoroch.",
        },
        {
          q: "Ako dlho dopredu treba objednať termín?",
          a: "Zvyčajne stačí niekoľko dní. Bánovce riešime v rámci výjazdov na stredné Považie, takže sa oplatí spojiť viac prestupov do jedného príchodu – vyjde to lacnejšie za kus.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate aj v priemyselných objektoch v okolí Ilavy?",
          a: "Áno. Hrubé železobetónové steny a stropy v halách sú pre diamantovú techniku bežná práca – vŕtame prestupy pre technologické rozvody, vzduchotechniku aj káblové trasy, a to aj vo výške alebo v stiesnených priestoroch medzi technológiou.",
        },
        {
          q: "Naruší vŕtanie staršiu tehlovú stenu?",
          a: "Nie. Jadrové vŕtanie funguje na princípe obrusovania, nie príklepu, takže do muriva neprenáša otrasy. Práve preto ho volíme v starších tehlových a kamenných objektoch, kde by príklepové vŕtanie mohlo spôsobiť praskliny.",
        },
      ],
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
      localFaq: [
        {
          q: "Prídete aj na kopanice mimo mesta?",
          a: "Áno, rozptýlené usadlosti v okolí Myjavy riešime bežne. Techniku prenášame po častiach, takže nám stačí prístup pešo. Ak je cesta k domu náročná, spomeňte to dopredu a prispôsobíme tomu vybavenie.",
        },
        {
          q: "Aké murivo v starších usadlostiach čakáte?",
          a: "Prevažne kamenné a zmiešané, často s nepravidelnou skladbou. Diamantová korunka ním prejde, len pomalšie než betónom – a práve preto, že nevŕta príklepom, sa staré murivo okolo otvoru nerozpadá.",
        },
      ],
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
      localFaq: [
        {
          q: "Robíte prestupy v priemyselných areáloch na okraji mesta?",
          a: "Áno. V halách ide o hrubé železobetónové steny a stropy – vŕtame prestupy pre technológiu, vzduchotechniku aj káble. Termín vieme zladiť s odstávkou, aby prevádzka stála čo najkratšie.",
        },
        {
          q: "Vŕtate aj v staršom jadre s tehlovým murivom?",
          a: "Áno. Staršie murivo býva nehomogénne, takže vŕtanie trvá dlhšie, ale výsledok je rovnako čistý otvor s hladkými hranami, ktorý netreba dodatočne upravovať.",
        },
      ],
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
      localFaq: [
        {
          q: "Má jednotná zástavba mesta vplyv na vŕtanie?",
          a: "V praxi áno, a v dobrom – budovy z obdobia výstavby mesta majú podobné konštrukcie, takže vieme dopredu odhadnúť, čo v stene čakať, a s tým aj presnejšie určiť cenu a čas.",
        },
        {
          q: "Pracujete aj v objektoch bývalého obuvníckeho areálu?",
          a: "Áno. V priemyselných objektoch riešime prestupy pre technologické rozvody, vzduchotechniku a káblové trasy – vrátane hrubých železobetónových stien, kde bežná technika nestačí.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate v panelákoch postavených pre strojárov?",
          a: "Áno, sídliská v Považskej Bystrici sú našou najčastejšou zákazkou – prestupy pre klimatizácie, rekuperáciu a výmenu stúpačiek. Otvor je hneď pripravený na osadenie potrubia, bez ďalšieho začisťovania.",
        },
        {
          q: "Zvládnete prestupy vo veľkých halách?",
          a: "Áno. Hrubé železobetónové steny a stropy sú pre diamantovú techniku bežná práca – vŕtame prestupy pre technológiu aj vzduchotechniku, v prípade potreby vo výške aj medzi stojacou technológiou.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate na sídliskách na hornej Nitre?",
          a: "Áno, prievidzské panelové sídliská tvoria väčšinu zákaziek v meste. Najčastejšie ide o otvory pre klimatizácie a rekuperáciu, prípadne o rezanie bytového jadra pri rekonštrukcii.",
        },
        {
          q: "Poradíte si so staršou murovanou zástavbou v centre?",
          a: "Áno. Staršie murivo býva zmiešané a nepravidelné – vŕtame pomalšie a sledujeme, aby sa okolo otvoru nič neuvoľnilo. Výsledok je rovnako čistý otvor ako v betóne.",
        },
      ],
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
      localFaq: [
        {
          q: "Robíte prestupy v gumárenskom areáli?",
          a: "Áno. V priemyselných objektoch ide o hrubé železobetónové konštrukcie, kde je diamantová technika jedinou možnosťou. Rátame s tým, že vstup do areálu podlieha školeniu a povoleniu prevádzkovateľa.",
        },
        {
          q: "Vŕtate aj v obývaných bytoch?",
          a: "Áno. Vŕtame s chladením vodou, takže nevzniká prakticky žiadny prach, a miesto po sebe upraceme. Byt počas prác opúšťať nemusíte.",
        },
      ],
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
      localFaq: [
        {
          q: "Dá sa vŕtať v pevnostných objektoch a starom jadre?",
          a: "Technicky áno – hrubé tehlové a kamenné murivo prevŕtame nadstavovanou korunkou. Pri pamiatkovo chránených objektoch a pevnostiach však treba mať zásah odsúhlasený vopred, to si zabezpečuje objednávateľ.",
        },
        {
          q: "Aká je cena pri veľmi hrubom múre?",
          a: "Cena sa počíta za centimeter hĺbky vrtu, takže hrubé komárňanské murivo vyjde drahšie než bežná panelová stena. Presnú sumu vieme povedať, keď poznáme priemer a hrúbku steny.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate aj v energetických a priemyselných objektoch?",
          a: "Áno. Ide spravidla o hrubý železobetón a prestupy pre technologické rozvody, kde bežná technika nestačí. Prácu plánujeme tak, aby zapadla do odstávky prevádzky.",
        },
        {
          q: "Riešite bežné byty a rodinné domy?",
          a: "Áno, tvoria väčšinu zákaziek – prestupy pre klimatizácie, rekuperáciu, vodu a kanalizáciu. V paneli aj v tehlovom murive vieme otvor umiestniť presne podľa projektu.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate na sídliskách aj v rodinnej zástavbe?",
          a: "Áno, oboje. V paneloch ide najčastejšie o prestupy pre klimatizácie a rekuperáciu, v rodinných domoch na rovine Podunajskej nížiny o rozvody a prestupy cez základy.",
        },
        {
          q: "Zvládnete prestup cez základ do suterénu?",
          a: "Áno, je to bežná zákazka. Otvor má hladké hrany, takže sa dá spoľahlivo dotesniť – čo je pri suterénoch v nížine dôležité kvôli vlhkosti.",
        },
      ],
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
      localFaq: [
        {
          q: "Pracujete aj v objektoch chemického areálu?",
          a: "Áno. V technologických objektoch ide spravidla o hrubé železobetónové konštrukcie, kde je diamantová technika jedinou reálnou možnosťou. Rátame s tým, že vstup podlieha školeniu a povoleniu prevádzkovateľa, takže termín dohadujeme priamo so správcom objektu.",
        },
        {
          q: "Vŕtate otvory pre rekuperáciu a klimatizáciu v panelákoch?",
          a: "Áno, v šalianskych panelových domoch je to jedna z najčastejších zákaziek. Otvor vyvŕtame v presnom priemere a so spádom von, aby v ňom nestála voda. Vŕtame s chladením vodou, takže byt zostáva obývateľný a nezostáva po nás prach.",
        },
      ],
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
      localFaq: [
        {
          q: "Robíte prestupy v potravinárskych prevádzkach?",
          a: "Áno. V takýchto objektoch je dôležitá čistota práce – vŕtame s chladením vodou, bez prachu a bez otrasov, takže prevádzku vieme obísť s minimálnym zásahom. Termín zladíme so sanitáciou alebo odstávkou.",
        },
        {
          q: "Vŕtate aj v panelových domoch?",
          a: "Áno, topoľčianske sídliská riešime bežne – prestupy pre klimatizácie, rekuperáciu a rozvody, prípadne rezanie bytového jadra pri rekonštrukcii kúpeľne.",
        },
      ],
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
      localFaq: [
        {
          q: "Prídete aj do okolitých obcí?",
          a: "Áno, okolie riešime spolu so zákazkami v meste. V starších domoch v obciach sa často stretávame s kamennými základmi a zmiešaným murivom – vŕtanie tam trvá dlhšie, ale je to bežná práca.",
        },
        {
          q: "Vŕtate prestupy pre rekuperáciu?",
          a: "Áno, patrí to k najčastejším požiadavkám. Otvor vyvŕtame v presnom priemere a so spádom von, aby v ňom nestála voda, a hrany necháme čisté.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate na veľkých žilinských sídliskách?",
          a: "Áno, patria k najrozsiahlejším na severe Slovenska a tvoria väčšinu našich zákaziek v meste – prestupy pre klimatizácie, rekuperáciu, rozvody aj rezanie bytových jadier.",
        },
        {
          q: "Pracujete aj v historickom jadre?",
          a: "Áno. V jadre je murivo hrubšie a nepravidelné, takže vŕtanie trvá dlhšie. Keďže technika nepracuje príklepom, do konštrukcie sa neprenášajú otrasy – práve preto sa v starších domoch volí.",
        },
      ],
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
      localFaq: [
        {
          q: "Poradíte si s kamenným murivom v starších domoch v Bytči?",
          a: "Áno. V staršej zástavbe okolo historického jadra býva murivo nehomogénne – kameň, tehla aj dodatočne dobetónované časti v jednej stene. Diamantová korunka si s tým poradí, vŕtanie však trvá dlhšie ako v betóne a postupujeme opatrnejšie, aby sa okolo otvoru nič neuvoľnilo.",
        },
        {
          q: "Aký prístup potrebujete v úzkych uliciach centra?",
          a: "Techniku dopravíme k vrtu po častiach, takže nám stačí zaparkovať v rozumnej vzdialenosti od vchodu. Na mieste potrebujeme prívod elektriny 230 V a prístup k vode – ak voda nie je k dispozícii, privezieme si vlastnú nádrž.",
        },
      ],
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
        "Čadca je od najbližšej pobočky vzdialenejšia, zákazky na Kysuciach preto spájame do jedného výjazdu.",
      localFaq: [
        {
          q: "Dostanete sa aj k domom vo svahu nad údolím?",
          a: "Väčšinou áno. Techniku prenášame po častiach, takže nám stačí prístup pešo a miesto na zaparkovanie v rozumnej vzdialenosti. Pri komplikovanom prístupe to spomeňte pri dohadovaní termínu.",
        },
        {
          q: "Ako je to s termínmi na Kysuciach?",
          a: "Zákazky na Kysuciach spájame do jedného výjazdu, takže termín dohadujeme dopredu. Ak riešite viac prestupov naraz, vyjde vás to výhodnejšie – celú prácu urobíme na jeden príchod.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate v panelákoch postavených v svahu?",
          a: "Áno. Svahovitý terén ovplyvňuje najmä prístup k objektu, nie samotné vŕtanie – v paneli robíme bežné prestupy pre klimatizácie, rekuperáciu a rozvody.",
        },
        {
          q: "Prídete aj v zime?",
          a: "Áno, vŕtame celoročne. Pri mrazoch len dbáme na to, aby chladiaca voda nezamŕzala v hadiciach, a po práci systém vyprázdnime – na termín to nemá vplyv.",
        },
      ],
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
      localFaq: [
        {
          q: "Robíte prestupy v strojárskom závode?",
          a: "Áno. V priemyselných objektoch ide o hrubé železobetónové konštrukcie a prestupy pre technologické rozvody. Prácu vieme naplánovať na odstávku, aby výroba stála čo najkratšie.",
        },
        {
          q: "Vŕtate aj v bytoch pre zamestnancov?",
          a: "Áno, panelové domy v meste riešime bežne – prestupy pre klimatizácie a rekuperáciu, výmeny stúpačiek aj rezanie bytového jadra.",
        },
      ],
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
      localFaq: [
        {
          q: "Dá sa vŕtať v penzióne počas sezóny?",
          a: "Áno. Vŕtanie je tiché a bezprašné v porovnaní s búraním, takže prevádzku nezastaví. Pri ubytovacích objektoch prácu radi naplánujeme na ranné hodiny alebo mimo sezóny.",
        },
        {
          q: "Riešite aj veľké sídliská v meste?",
          a: "Áno, panelové domy tvoria väčšinu zákaziek – prestupy pre klimatizácie, rekuperáciu a rozvody, prípadne rezanie bytového jadra pri rekonštrukcii.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate v objektoch ťažkého strojárstva?",
          a: "Áno. Hrubé železobetónové steny a stropy sú pre diamantovú techniku bežná práca – prestupy pre technológiu, vzduchotechniku aj káblové trasy, aj vo výške.",
        },
        {
          q: "Pracujete aj v historickom jadre?",
          a: "Áno, len opatrnejšie – murivo je hrubšie a nepravidelné, takže vŕtanie trvá dlhšie. Bezotrasový postup je dôvod, prečo sa v takýchto objektoch diamantová technika volí.",
        },
      ],
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
        "Horná Orava je od najbližšej pobočky vzdialenejšia, zákazky v regióne preto spájame do jedného výjazdu.",
      localFaq: [
        {
          q: "Prídete aj k rekreačným objektom pri priehrade?",
          a: "Áno, chaty a penzióny v okolí Oravskej priehrady riešime bežne. Ak na mieste nie je voda, privezieme si vlastnú nádrž – pri rekreačných objektoch mimo sezóny sa to stáva často.",
        },
        {
          q: "Ako plánujete termín na Orave?",
          a: "Zákazky v regióne spájame do jedného výjazdu a termín dohadujeme dopredu. Pri viacerých prestupoch naraz je cena za kus nižšia, lebo dopravu neplatíte dvakrát.",
        },
      ],
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
      localFaq: [
        {
          q: "Dá sa vŕtať v kúpeľnej budove počas prevádzky?",
          a: "Áno. Jadrové vŕtanie je podstatne tichšie a čistejšie než búranie, takže prevádzku úplne nezastavuje. V citlivých priestoroch prácu naplánujeme na ranné hodiny alebo mimo sezóny.",
        },
        {
          q: "Robíte aj menšie zákazky v bytoch a domoch?",
          a: "Áno, popri kúpeľných a hotelových objektoch tvoria bežnú časť práce – prestupy pre rekuperáciu, klimatizácie, vodu a kanalizáciu.",
        },
      ],
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
      localFaq: [
        {
          q: "Prídete aj do okolitých oravských obcí?",
          a: "Áno, obce riešime spolu so zákazkami v meste. V starších domoch tam býva kamenné murivo a betónové základy – vŕtanie je pomalšie, ale bežné.",
        },
        {
          q: "Vŕtate aj v drevených stavbách?",
          a: "Samotné drevo bežnou technikou prevŕta tesár – nás volajte na betónové základy, sokle a murované časti, kde diamantová korunka urobí presný otvor bez toho, aby konštrukciu narušila.",
        },
      ],
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
      localFaq: [
        {
          q: "Dá sa vôbec vŕtať v pamiatkovej zóne UNESCO?",
          a: "Technicky áno a bezotrasovo, čo je pri štiavnickom murive rozhodujúce. Administratívne však zásah do chránenej budovy vyžaduje súhlas pamiatkarov – to si zabezpečuje objednávateľ pred začatím prác.",
        },
        {
          q: "Čo znamená staré banské murivo pre vŕtanie?",
          a: "V jednej stene sa strieda kameň, malta aj tehla. Korunka sa v takom murive opotrebuje rýchlejšie a vŕtanie trvá dlhšie než v betóne, preto cenu potvrdzujeme až po obhliadke konkrétnej steny.",
        },
      ],
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
      localFaq: [
        {
          q: "Poradíte si s murivom v jednom z najstarších miest?",
          a: "Áno. V krupinskom centre je bežné hrubé kamenné a tehlové murivo, často nepravidelné. Vŕtame pomalšie a s väčšou opatrnosťou, aby sa okolo otvoru nič neuvoľnilo.",
        },
        {
          q: "Ako rýchlo viete prísť?",
          a: "Krupina patrí k našim najbližším lokalitám, takže obhliadku aj realizáciu zvládneme spravidla do 24 hodín a v súrnych prípadoch aj v ten istý deň.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate aj v objektoch sklárskeho priemyslu?",
          a: "Áno. V priemyselných objektoch ide o hrubé betónové a železobetónové konštrukcie – prestupy pre technológiu, vzduchotechniku a rozvody. Termín vieme zladiť s odstávkou.",
        },
        {
          q: "Riešite aj panelové byty v meste?",
          a: "Áno, prestupy pre klimatizácie a rekuperáciu sú bežná zákazka. Vŕtame s chladením vodou, takže byt zostáva obývateľný a bez prachu.",
        },
      ],
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
        "Revúca je od najbližšej pobočky vzdialenejšia, zákazky v Gemeri preto spájame do jedného výjazdu.",
      localFaq: [
        {
          q: "Prídete aj do gemerských obcí v okolí?",
          a: "Áno, obce riešime spolu so zákazkami v meste. V starších domoch sa stretávame s kamenným murivom a nepravidelnými základmi – vrt vedieme pomalšie a kontrolujeme jeho smer.",
        },
        {
          q: "Vŕtate prestupy pre dodatočné rozvody?",
          a: "Áno, patria k najčastejším – voda, kanalizácia, elektrina alebo rekuperácia zavedené do staršieho domu. Otvor má hladké hrany a dá sa spoľahlivo dotesniť.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate v historickom jadre aj na sídliskách?",
          a: "Áno, oboje. V jadre je murivo hrubé a tehlové, takže vŕtanie trvá dlhšie; na sídliskách ide o bežné panelové prestupy pre klimatizácie a rekuperáciu.",
        },
        {
          q: "Ako dohadujete termín v Gemeri?",
          a: "Zákazky v regióne spájame do jedného výjazdu a termín plánujeme dopredu. Pri viacerých prestupoch naraz je cena za kus nižšia, lebo dopravu neplatíte dvakrát.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate v panelákoch z obdobia baníctva?",
          a: "Áno, tvoria väčšinu zástavby v meste. Konštrukcie sú typické a dobre známe, takže prestup pre klimatizáciu či rekuperáciu vieme urobiť rýchlo a s presným priemerom.",
        },
        {
          q: "Prídete aj do obcí v okolí?",
          a: "Áno, okolité obce riešime spolu so zákazkami v meste. V starších domoch tam býva kamenné murivo a betónové základy, kde je jadrové vŕtanie jediný čistý spôsob, ako urobiť prestup.",
        },
      ],
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
      localFaq: [
        {
          q: "Robíte prestupy v priemyselných objektoch v údolí Hrona?",
          a: "Áno. Ide o hrubé betónové a železobetónové konštrukcie, kde vŕtame prestupy pre technológiu, vzduchotechniku a káblové trasy bez narušenia okolitej konštrukcie.",
        },
        {
          q: "Ako rýchlo sa k nám dostanete?",
          a: "Žarnovica patrí k našim najbližším lokalitám, takže obhliadku aj realizáciu vieme spravidla zabezpečiť do 24 hodín.",
        },
      ],
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
        "Prešov je od najbližšej pobočky na východe republiky, preto termíny plánujeme dopredu a zákazky v regióne spájame do jedného výjazdu.",
      localFaq: [
        {
          q: "Vŕtate na veľkých prešovských sídliskách?",
          a: "Áno, patria k najväčším na východe Slovenska a tvoria väčšinu zákaziek v meste – prestupy pre klimatizácie, rekuperáciu, rozvody aj rezanie bytových jadier.",
        },
        {
          q: "Oplatí sa vás volať až z Prešova?",
          a: "Pri jednom otvore v byte skôr nie. Pri väčšom počte prestupov, priemyselnom objekte alebo rekonštrukcii celej budovy sa doprava rozpustí v objeme práce a cena zostáva konkurenčná.",
        },
      ],
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
      localFaq: [
        {
          q: "Dá sa vŕtať v pamiatkovej zóne UNESCO?",
          a: "Technicky áno a bez otrasov, čo je pri bardejovskom murive rozhodujúce. Zásah do chránenej budovy však vyžaduje súhlas pamiatkarov, ktorý si zabezpečuje objednávateľ.",
        },
        {
          q: "Aké murivo v starom meste čakáte?",
          a: "Hrubé kamenné a zmiešané, často nepravidelné. Korunka sa v ňom opotrebuje rýchlejšie a vŕtanie trvá dlhšie – preto pri takýchto objektoch cenu potvrdzujeme až po obhliadke.",
        },
      ],
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
        "Humenné je od najbližšej pobočky vzdialené, termíny preto plánujeme dopredu a zákazky v regióne spájame.",
      localFaq: [
        {
          q: "Vŕtate v objektoch chemického priemyslu?",
          a: "Áno. Ide spravidla o hrubé železobetónové konštrukcie. Rátame s tým, že vstup do areálu podlieha školeniu a povoleniu prevádzkovateľa, takže termín dohadujeme so správcom objektu.",
        },
        {
          q: "Riešite aj panelové byty?",
          a: "Áno, humenské sídliská sú bežná zákazka – prestupy pre klimatizácie, rekuperáciu a rozvody, vŕtané s chladením vodou, takže po nás nezostáva prach.",
        },
      ],
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
      localFaq: [
        {
          q: "Poradíte si s hrubým murivom v historickom jadre?",
          a: "Áno. Kamenné a tehlové murivo v Kežmarku býva hrubé a nepravidelné – korunky nadstavujeme, takže hĺbka nie je prekážkou, len vŕtanie trvá dlhšie.",
        },
        {
          q: "Vŕtate aj v zime pod Tatrami?",
          a: "Áno, celoročne. Pri mrazoch dbáme, aby chladiaca voda nezamŕzala v hadiciach, a po práci systém vyprázdnime. Na termín to vplyv nemá.",
        },
      ],
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
      localFaq: [
        {
          q: "Dá sa vŕtať v jadre zapísanom v UNESCO?",
          a: "Technicky áno – diamantová technika je bezotrasová, čo je pri levočských konštrukciách dôvod, prečo sa volí. Administratívne treba mať zásah do chránenej budovy odsúhlasený vopred.",
        },
        {
          q: "Ako hrubé steny viete prevŕtať?",
          a: "Aj veľmi hrubé – korunky nadstavujeme. Keďže sa cena počíta za centimeter hĺbky, historické múry vyjdú drahšie než bežná panelová stena; sumu povieme dopredu.",
        },
      ],
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
      localFaq: [
        {
          q: "Prídete aj do obcí v členitom teréne?",
          a: "Áno. Techniku prenášame po častiach, takže nám stačí prístup pešo a miesto na zaparkovanie neďaleko. Ak je prístup náročný, spomeňte to pri dohadovaní termínu.",
        },
        {
          q: "Kedy sa vás oplatí volať až sem?",
          a: "Pri väčšom počte prestupov alebo pri celom objekte. Zákazky na severovýchode spájame do jedného výjazdu, takže sa oplatí naplánovať celú prácu naraz.",
        },
      ],
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
        "Poprad je od najbližšej pobočky vzdialenejší, termíny preto plánujeme dopredu a podtatranské zákazky spájame.",
      localFaq: [
        {
          q: "Pracujete v hoteloch a penziónoch v Tatrách?",
          a: "Áno, ubytovacie a rekreačné objekty v podtatranskom regióne sú bežná zákazka. Vŕtanie je tiché a bezprašné, takže prevádzku nezastaví – termín vieme naplánovať mimo sezóny.",
        },
        {
          q: "Riešite aj panelové sídliská v meste?",
          a: "Áno, popradské sídliská sú rozsiahle a prestupy pre klimatizácie, rekuperáciu a rozvody v nich robíme bežne.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate prestupy cez kamenné základy starších domov?",
          a: "Áno, v okolitých obciach je to častá požiadavka – najmä pri dodatočnom zavedení vody, kanalizácie alebo elektriny do starších domov. Kamenné základy sú nepravidelné, preto vrt vedieme pomalšie a priebežne kontrolujeme jeho smer.",
        },
        {
          q: "Dá sa vŕtať aj v obývanom byte?",
          a: "Áno. Vŕtame s chladením vodou, takže nevzniká prakticky žiadny prach, a miesto po sebe upraceme. Byt ani počas prác nemusíte opúšťať – obmedzenie je len hluk v bezprostrednom okolí vrtu.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate aj v objektoch miestneho strojárstva?",
          a: "Áno. V halách ide o hrubé železobetónové steny a stropy, kde vŕtame prestupy pre technológiu a vzduchotechniku, v prípade potreby aj vo výške.",
        },
        {
          q: "Prídete aj k novostavbám v okolí?",
          a: "Áno. V novostavbách ide o betón a tvárnicové murivo – prestupy pre rekuperáciu, klimatizácie a rozvody urobíme presne podľa projektu, s čistými hranami.",
        },
      ],
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
      localFaq: [
        {
          q: "Prídete aj k domom v členitom teréne?",
          a: "Áno, terén ovplyvňuje najmä prístup, nie vŕtanie. Techniku prenesieme po častiach; ak je cesta k domu náročná, povedzte nám to dopredu a prispôsobíme tomu vybavenie.",
        },
        {
          q: "Poradíte si so staršou murovanou zástavbou?",
          a: "Áno. Staršie murivo býva zmiešané a nepravidelné, takže vŕtame pomalšie a sledujeme, aby sa okolo otvoru nič neuvoľnilo.",
        },
      ],
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
        "Stropkov je od najbližšej pobočky vzdialený, zákazky na severovýchode preto spájame do jedného výjazdu.",
      localFaq: [
        {
          q: "Prídete aj do okolitých obcí?",
          a: "Áno, obce riešime spolu so zákazkami v meste. V starších domoch tam býva kamenné murivo a betónové základy, kde je jadrové vŕtanie najčistejší spôsob, ako urobiť prestup.",
        },
        {
          q: "Ako plánujete termín na severovýchode?",
          a: "Zákazky v regióne spájame do jedného výjazdu a termín dohadujeme dopredu. Pri viacerých prestupoch naraz vychádza cena za kus nižšie.",
        },
      ],
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
      localFaq: [
        {
          q: "Aké konštrukcie v meste čakáte?",
          a: "Svidník je z veľkej časti povojnová zástavba, takže prevažuje novšia panelová a murovaná konštrukcia – tie sú pre jadrové vŕtanie predvídateľné a prestup v nich urobíme rýchlo.",
        },
        {
          q: "Robíte aj prestupy cez základy?",
          a: "Áno, dodatočné zavedenie vody, kanalizácie alebo elektriky cez základ je bežná zákazka. Otvor má hladké hrany, takže sa dá spoľahlivo dotesniť proti vlhkosti.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate v priemyselných prevádzkach v okolí?",
          a: "Áno. V halách ide o hrubý železobetón a prestupy pre technologické rozvody. Prácu vieme naplánovať na odstávku, aby prevádzka stála čo najkratšie.",
        },
        {
          q: "Riešite aj bežné byty a domy?",
          a: "Áno, panelové sídliská aj rodinná zástavba tvoria väčšinu zákaziek – prestupy pre klimatizácie, rekuperáciu, vodu a kanalizáciu.",
        },
      ],
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
        "Košice sú od najbližšej pobočky vzdialené, preto termíny plánujeme dopredu a zákazky na východe spájame do jedného výjazdu. Pri väčších projektoch prichádzame na obhliadku vopred.",
      localFaq: [
        {
          q: "Vŕtate na košických sídliskách?",
          a: "Áno, patria k najrozsiahlejším na Slovensku a tvoria väčšinu zákaziek v meste – prestupy pre klimatizácie, rekuperáciu a rozvody, aj rezanie bytového jadra.",
        },
        {
          q: "Oplatí sa vás objednať až do Košíc?",
          a: "Pri jednom otvore v byte skôr nie. Pri desiatkach prestupov, priemyselnom objekte alebo rekonštrukcii celej budovy sa doprava rozpustí v objeme práce a cena zostáva konkurenčná.",
        },
      ],
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
        "Gelnica je od najbližšej pobočky vzdialenejšia, zákazky v regióne preto spájame do jedného výjazdu.",
      localFaq: [
        {
          q: "Čo znamená nehomogénne murivo pre cenu a čas vŕtania?",
          a: "V starej banskej zástavbe sa v jednej stene často strieda kameň, malta aj tehla. Korunka sa v takom murive opotrebuje rýchlejšie a vŕtanie trvá dlhšie než v betóne, preto pri takýchto objektoch potvrdzujeme cenu až po obhliadke konkrétnej steny.",
        },
        {
          q: "Dostanete sa aj k domom vo svahu nad údolím?",
          a: "Vo väčšine prípadov áno. Techniku prenášame po častiach, takže nám stačí prístup pešo a miesto na zaparkovanie v rozumnej vzdialenosti. Ak je prístup komplikovaný, spomeňte to pri dohadovaní termínu – prispôsobíme tomu vybavenie.",
        },
      ],
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
      localFaq: [
        {
          q: "Robíte prestupy v poľnohospodárskych objektoch?",
          a: "Áno. V halách a skladoch na Východoslovenskej nížine ide o betónové konštrukcie a prestupy pre technológiu či rozvody – vŕtame ich bez otrasov, takže konštrukcia zostáva neporušená.",
        },
        {
          q: "Vŕtate aj v panelových bytoch?",
          a: "Áno, michalovské sídliská sú rozsiahle a prestupy pre klimatizácie a rekuperáciu v nich robíme bežne, s chladením vodou a bez prachu.",
        },
      ],
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
      localFaq: [
        {
          q: "Poradíte si s murivom na starom banskom námestí?",
          a: "Áno. Hrubé kamenné a tehlové murivo je pre nás bežné, len vŕtanie trvá dlhšie a korunka sa rýchlejšie opotrebuje – preto cenu pri takýchto stenách potvrdzujeme po obhliadke.",
        },
        {
          q: "Prídete aj do obcí v okolí?",
          a: "Áno, gemerské obce riešime spolu so zákazkami v meste. Zákazky v regióne spájame do jedného výjazdu, takže sa oplatí naplánovať viac prestupov naraz.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate aj v poľnohospodárskych objektoch?",
          a: "Áno. V hospodárskych budovách ide o betónové steny, podlahy a základy – prestupy pre rozvody, technológiu alebo odvodnenie urobíme presne a bez narušenia konštrukcie.",
        },
        {
          q: "Prídete aj kvôli jednému prestupu?",
          a: "Sobrance sú od nás ďaleko, takže pri jedinom otvore v byte sa cesta neoplatí. Ak však riešite viac prestupov alebo celý objekt, radi prídeme – termín naplánujeme dopredu.",
        },
      ],
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
      localFaq: [
        {
          q: "Vŕtate v historickom jadre okolo námestia?",
          a: "Áno. Murivo v jadre býva hrubšie a nepravidelné, takže vŕtanie trvá dlhšie; bezotrasový postup je dôvod, prečo sa v takýchto domoch diamantová technika volí.",
        },
        {
          q: "Riešite aj panelové sídliská?",
          a: "Áno, sú rozsiahle a tvoria väčšinu zákaziek v meste – prestupy pre klimatizácie, rekuperáciu a rozvody, prípadne rezanie bytového jadra.",
        },
      ],
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
        "Trebišov je od najbližšej pobočky vzdialený, zákazky na východe preto spájame do jedného výjazdu.",
      localFaq: [
        {
          q: "Robíte prestupy v poľnohospodárskych prevádzkach?",
          a: "Áno. V halách, skladoch a hospodárskych budovách vŕtame prestupy pre rozvody, technológiu aj odvodnenie – betónové konštrukcie sú pre diamantovú techniku bežná práca.",
        },
        {
          q: "Vŕtate aj v bytoch a rodinných domoch?",
          a: "Áno, panelové sídliská a rodinná zástavba tvoria väčšinu zákaziek – prestupy pre klimatizácie, rekuperáciu, vodu a kanalizáciu, vrátane prestupov cez základy.",
        },
      ],
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
