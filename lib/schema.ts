// JSON-LD schema builders. These output plain objects injected via <JsonLd>.
// Uses HomeAndConstructionBusiness (more specific than LocalBusiness) to match
// what the current site already declares — keeps entity continuity for Google.

import { company } from "@/data/company";
import type { Service } from "@/data/services";
import type { City } from "@/data/cities";

const SITE = company.url;
const BUSINESS_ID = `${SITE}/#business`;

/** The core business entity. Emit once per page; other nodes reference @id. */
export function businessSchema(city?: City) {
  const sameAs = [
    company.social.facebook,
    company.social.instagram,
    company.social.googleBusiness,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: `${company.name} – ${company.tagline}`,
    description: company.description,
    url: SITE,
    telephone: company.phone,
    email: company.email,
    priceRange: "€€",
    hasMap: company.hasMap,
    // Google's local rich results want both; the assets already exist.
    logo: `${company.url}/brand/drillmaster-logo.png`,
    image: `${company.url}/og/og-default.jpg`,
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      postalCode: company.address.postalCode.replace(/\s/g, ""),
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    // areaServed reflects the whole service radius; city pages narrow it.
    areaServed: city
      ? [{ "@type": "City", name: city.name }]
      : undefined,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: company.openingHoursSchema.days,
        opens: company.openingHoursSchema.opens,
        closes: company.openingHoursSchema.closes,
      },
    ],
  };
}

/** Kept as an alias so existing imports keep working. */
export const localBusinessSchema = businessSchema;

/** Service schema, optionally scoped to a city. */
export function serviceSchema(service: Service, city?: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${service.title} – ${city.name}` : service.title,
    serviceType: service.name,
    description: service.summary,
    provider: { "@id": BUSINESS_ID },
    ...(city ? { areaServed: { "@type": "City", name: city.name } } : {}),
    url: city
      ? `${SITE}/${service.slug}/${city.slug}/`
      : `${SITE}/${service.slug}/`,
  };
}

/** FAQPage schema — eligible for FAQ rich results. */
export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** BreadcrumbList schema. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.url}`,
    })),
  };
}
