// GALLERY + HERO MEDIA — all assets are now LOCAL (in /public), so next/image
// generates AVIF/WebP variants and there is no third-party origin in the
// critical path. Source photos were downscaled to max 1600 px (11.3 MB → 2.2 MB
// total); next/image serves whatever size each breakpoint actually needs.
//
// File names are kept keyword-descriptive in Slovak — image search reads them.

/**
 * Gallery categories. Every photo carries one, and any gallery section can be
 * filtered by it — the homepage shows all with filter tabs, a service page
 * locks to its own category.
 *
 * The slug doubles as the service-page slug, so a tile can link straight to
 * the relevant service. Adding a category = one entry here + tagging photos.
 */
export type GalleryCategory = "jadrove-vrtanie" | "rezanie-otvorov";

export const galleryCategories: { slug: GalleryCategory; label: string }[] = [
  { slug: "jadrove-vrtanie", label: "Jadrové vŕtanie" },
  { slug: "rezanie-otvorov", label: "Rezanie otvorov" },
];

export interface GalleryItem {
  src: string;
  /** Descriptive alt text — this is what earns image-search traffic. */
  alt: string;
  /** Short caption shown on the tile. */
  caption: string;
  /** Which category this photo belongs to — drives filtering. */
  category: GalleryCategory;
  /**
   * City slug where the photo was actually taken.
   *
   * ⚠️ Only set this when you KNOW where the photo is from. It's shown on the
   * tile and used to filter the gallery on city pages, so a guess here is a
   * false claim about where you've worked. Photos without a city still appear
   * everywhere — they're just not attributed to a town.
   *
   * Currently set only for the three photos whose original filenames on
   * drillmaster.sk named the city. The rest are unknown — fill them in.
   */
  city?: string;
}

export const gallery: GalleryItem[] = [
  {
    src: "/galeria/jadrove-vrtanie-prestupov-do-kamena.webp",
    alt: "Jadrové vŕtanie prestupov do kameňa diamantovou vŕtačkou",
    caption: "Vŕtanie prestupov do kameňa",
    category: "jadrove-vrtanie",
    city: "zvolen",
  },
  {
    src: "/galeria/rezanie-dverneho-otvoru-do-panelu-v-byte.webp",
    alt: "Rezanie dverného otvoru do panelu v byte",
    caption: "Rezanie otvoru do panelu",
    category: "rezanie-otvorov",
    city: "zvolen",
  },
  {
    src: "/galeria/jadrove-vrtanie-zakladov.webp",
    alt: "Jadrové vŕtanie prestupu cez základy domu vo Zvolene",
    caption: "Vŕtanie cez základy",
    category: "jadrove-vrtanie",
    city: "zvolen",
  },
  {
    src: "/galeria/vrtanie-betonu-jadrovou-vrtackou.webp",
    alt: "Vŕtanie monolitických stien a stropov",
    caption: "Vŕtanie prestupov do železobetónu",
    category: "jadrove-vrtanie",
    city: "banska-bystrica",
  },
  {
    src: "/galeria/rezanie-panelu-v-byte.webp",
    alt: "Rezanie panelu v byte diamantovou technikou",
    caption: "Rezanie panelu v byte",
    category: "rezanie-otvorov",
    city: "detva",

  },
  {
    src: "/galeria/jadrove-vrtanie-pre-rekuperaciu.webp",
    alt: "Jadrové vŕtanie otvorov pre rekuperáciu",
    caption: "Prestupy pre rekuperáciu",
    category: "jadrove-vrtanie",
    city: "zvolen",
  },
  {
    src: "/galeria/vyrezanie-otvoru-do-panelu.webp",
    alt: "Vyrezanie dverného otvoru do panelu",
    caption: "Vyrezanie dverného otvoru do panelu",
    category: "rezanie-otvorov",
    city: "banska-bystrica",

  },
  {
    src: "/galeria/jadrove-vrtanie-do-kamena.webp",
    alt: "Jadrové vŕtanie do kameňa a muriva",
    caption: "Vŕtanie do kameňa",
    category: "jadrove-vrtanie",
    city: "zvolen",
  },
  {
    src: "/galeria/jadrove-vrtanie-prestupov-akejkolvek-hlbky.webp",
    alt: "Jadrové vŕtanie prestupov akejkoľvek hĺbky",
    caption: "Prestupy akejkoľvek hĺbky",
    category: "jadrove-vrtanie",
    city: "zvolen",

  },
  {
    src: "/galeria/jadrove-vrtanie-prestupov-cez-zaklady.webp",
    alt: "Jadrové vŕtanie prestupov cez základy v náročných podmienkach",
    caption: "Vŕtanie v náročných podmienkach",
    category: "jadrove-vrtanie",
    city: "zvolen",

  },
];

/**
 * Hero media per service.
 *
 * `poster` always renders and is the LCP element, so the hero paints instantly.
 * `video` is layered on top after hydration and fades in when it can play —
 * it never blocks first paint, and it's skipped entirely on reduced-motion,
 * Save-Data or slow connections (see components/HeroVideo.tsx).
 *
 * Encoding used: 12 s loop, 1280 px wide, 25 fps, AUDIO STRIPPED (smaller and
 * never blocked by autoplay policy). ~0.4–0.8 MB per file.
 */
export interface HeroMedia {
  poster: string;
  video?: { webm?: string; mp4?: string };
}

export const heroMedia: Record<string, HeroMedia> = {
  "jadrove-vrtanie": {
    poster: "/video/vrtanie-poster.webp",
    video: { webm: "/video/vrtanie.webm", mp4: "/video/vrtanie.mp4" },
  },
  "rezanie-otvorov": {
    poster: "/video/rezanie-poster.webp",
    video: { webm: "/video/rezanie.webm", mp4: "/video/rezanie.mp4" },
  },
};

/** Photos in a category (or all of them when no category is given). */
export function galleryByCategory(category?: GalleryCategory): GalleryItem[] {
  return category ? gallery.filter((g) => g.category === category) : gallery;
}

/**
 * Photos for a city, falling back to the whole category when we have no photo
 * attributed to that town — better to show relevant work than an empty grid.
 * The second return value tells the UI whether it's showing local work.
 */
export function galleryForCity(
  citySlug: string,
  category?: GalleryCategory
): { items: GalleryItem[]; isLocal: boolean } {
  const pool = galleryByCategory(category);
  const local = pool.filter((g) => g.city === citySlug);
  return local.length
    ? { items: local, isLocal: true }
    : { items: pool, isLocal: false };
}
