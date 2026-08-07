// Central company / NAP (Name-Address-Phone) info.
// ALL VALUES VERIFIED against the live drillmaster.sk (Aug 2026) — phone,
// email, address and hours are taken from the site's own schema + header.
// Keep this the SINGLE source of truth: it feeds schema, header, footer, contact.

export const company = {
  name: "Drillmaster",
  legalName: "Drillmaster",
  tagline: "Jadrové vŕtanie a rezanie diamantovou technikou",
  description:
    "Jadrové vŕtanie a rezanie stavebných otvorov diamantovou technikou. Vŕtame a režeme do betónu, železobetónu, panelu, tehly aj kameňa – čisto, presne a s minimom prachu a vibrácií.",
  url: "https://drillmaster.sk",

  phone: "+421910939684",
  phoneDisplay: "+421 910 939 684",
  email: "drillmaster@mnsp.sk",

  address: {
    street: "Janka Jesenského 4773/89",
    city: "Zvolen",
    postalCode: "960 01",
    country: "SK",
  },
  geo: { lat: 48.5744, lng: 19.1354 }, // TODO: replace with exact GBP coords
  // Google Business Profile map link found in the current site's schema —
  // keep it, it ties the site to the GBP listing.
  hasMap: "https://www.google.com/maps?cid=7556354895049639611",

  openingHours: [{ days: "Po–So", hours: "7:00 – 18:00" }],
  openingHoursSchema: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "18:00",
  },

  // Drillmaster sits inside the MNSP group. The live site has a group bar
  // across the top linking the sister brands — real corporate relationship,
  // not a link scheme.
  group: {
    name: "MNSP",
    members: [
      { name: "MNSP | Stavebné centrum", url: "https://www.mnsp.sk" },
      { name: "MNSP | Stavby a rekonštrukcie", url: "https://www.mnsp.sk" },
      { name: "Požičovňa náradia", url: "https://www.mnsp.sk" },
    ],
  },

  social: {
    facebook: "", // TODO: paste real URL (icons exist in the current header)
    instagram: "",
    googleBusiness: "https://www.google.com/maps?cid=7556354895049639611",
  },
} as const;

export type Company = typeof company;
