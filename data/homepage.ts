// Homepage copy. The intro block is the client's own text from the current
// drillmaster.sk — it reads well and is already on-message, so it's kept
// (only a missing comma fixed: "betónu, tehly").

export const homepage = {
  intro: {
    heading: "Drillmaster: expert na jadrové vŕtanie a rezanie diamantovou technikou",
    body: "V Drillmaster poskytujeme jadrové vŕtanie a rezanie otvorov do všetkých bežných stavebných materiálov, vrátane panelu, betónu, tehly či kameňa. Pracujeme s diamantovou technikou, ktorá umožňuje presné vŕty a rezy s minimálnym poškodením okolia a rýchly priebeh prác. Služby realizujeme čisto, presne a za férové ceny.",
    whyHeading: "Prečo si vybrať nás",
    why: [
      {
        num: "01",
        label: "Profesionalita a skúsenosti",
        text: "Roky praxe a špecializované vybavenie.",
      },
      {
        num: "02",
        label: "Čistota a presnosť",
        text: "Diamantová technika zaručuje minimálny prach a maximálnu presnosť.",
      },
      {
        num: "03",
        label: "Rýchla realizácia",
        text: "Krátke čakacie doby a efektívny priebeh prác.",
      },
      {
        num: "04",
        label: "Dostupné ceny",
        text: "Kvalitné služby za garantovane nízke ceny.",
      },
    ],
    closing: "Nechajte si vypracovať bezplatnú cenovú ponuku.",
  },

  trust: [
    {
      label: "Krátka čakacia doba",
      note: "Expresné termíny, vo Zvolene a okolí často do 24 hodín.",
      icon: "clock" as const,
    },
    {
      label: "Kvalitná, čistá a presná práca",
      note: "Diamantová technika s chladením vodou – minimum prachu.",
      icon: "check" as const,
    },
    {
      label: "Garantované nízke ceny",
      note: "Cenovú ponuku vypracujeme obratom a úplne zadarmo.",
      icon: "euro" as const,
    },
  ],
};
