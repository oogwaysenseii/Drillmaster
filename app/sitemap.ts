import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { publishedCities } from "@/data/cities";

// Auto-generated sitemap. New services/cities appear here automatically —
// no manual editing. Next writes this to /sitemap.xml at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.url;
  // Only list pages that actually exist — a sitemap pointing at 404s is worse
  // than no sitemap. Add entries here as you build the corresponding routes.
  const staticPages = ["/", "/galeria/", "/kontakt/"];

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.6,
  }));

  for (const s of services) {
    entries.push({
      url: `${base}/${s.slug}/`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const c of publishedCities) {
      entries.push({
        url: `${base}/${s.slug}/${c.slug}/`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
