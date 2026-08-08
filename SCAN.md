# Drillmaster — deep scan

Run against a production build (`npm run build && npm start`), 8 Aug 2026.
Every number below is measured, not estimated: 147 pages crawled and parsed,
five page types profiled in headless Chromium at 1440px and 390px.

**Overall: 7.5 / 10** — the SEO and front-end engineering are in good shape.
What holds the score down is launch readiness: the contact form does not
deliver anywhere, and the city pages are less differentiated than the page
count implies.

| Area | Score |
|---|---|
| Build & architecture | 9 / 10 |
| Technical SEO | 8 / 10 |
| Structured data | 9 / 10 |
| Content differentiation | 6 / 10 |
| Performance | 8.5 / 10 |
| Accessibility | 8 / 10 |
| Launch readiness | 4 / 10 |

---

## Blockers — fix before go-live

**The contact form silently drops every lead.** `app/api/contact/route.ts`
validates the submission, then returns `{ ok: true }` without sending
anything. The user sees "Ďakujeme!" and believes they have made contact. This
is the single most damaging issue on the site: it is worse than having no form
at all, because a visitor who submits it will not call. Wire up Resend,
Postmark or a webhook to `drillmaster@mnsp.sk` and test end-to-end. The
delivery block is already marked with a TODO in the file.

**The map is not live in production.** `NEXT_PUBLIC_GOOGLE_MAPS_KEY` is not set
in Vercel, so `ServiceMap` renders its fallback. Set it in Project Settings →
Environment Variables and redeploy; `NEXT_PUBLIC_` values are inlined at build
time, so an existing deployment will not pick it up on its own.

**The Maps key needs rotating and restricting.** It ships in the client bundle
by design, and it has been pasted in plain chat. Rotate it, then restrict it by
HTTP referrer to `https://drillmaster.sk/*` and `http://localhost:3000/*`,
limit it to the Maps JavaScript API, and set a billing budget alert.

**`/api/contact` has no rate limit.** The honeypot stops naive bots; nothing
stops a script posting a thousand times. Add an IP-based limit (Vercel KV,
Upstash, or a simple in-memory window) before the endpoint actually sends mail,
or the first spam run will land in the inbox.

---

## Build & architecture — 9 / 10

153 routes, all statically generated, `dynamicParams = false`, TypeScript clean
under `tsc --noEmit`. Shared JS is 87.3 kB; first-load JS is 124–125 kB on
service and city pages, 98–102 kB on `/kontakt/` and `/galeria/`, 125 kB on the
homepage.

The only real observation: 124 kB on a city page is more than a mostly-textual
page needs, and it comes from client components that are almost always below
the fold — `ServiceMap`, `GalleryCarousel`, `Locations`. The map script itself
is already deferred behind an IntersectionObserver, but the React wrapper still
ships. A `next/dynamic` import with `ssr: false` on `ServiceMap` would move
that weight out of the initial bundle.

## Technical SEO — 8 / 10

What is right: 147 unique titles and 147 unique meta descriptions with zero
duplicates; every page has a canonical and every canonical matches its own
path; consistent trailing slashes across sitemap, links and canonicals;
`lang="sk"`; `robots: index, follow`; sitemap complete and exactly matching the
crawlable set; no orphan pages; no broken internal links; every page has
exactly one `h1`; average 27 internal links per page. The `/lokality/*` legacy
redirects resolve correctly (308, which Google treats as a permanent 301).

What to fix:

*Meta descriptions are too long on 145 of 147 pages* — up to 234 characters
against a ~160-character display budget. They are not penalised, but Google
truncates them and often rewrites them instead, so the part you wrote to earn
the click is the part that gets cut. Shorten the template in
`cityServiceMetadata` to put the city, the service and the phone number in the
first 150 characters.

*Titles are too long on 92 of 147 pages* — the worst is 77 characters
("Rezanie otvorov Nové Mesto nad Váhom | Rezanie panelu a otvorov |
Drillmaster"). The `| Drillmaster` suffix comes from the root layout template
and is what pushes most of them over. Dropping the hook segment on city pages,
or the brand suffix, brings them under 60.

*No `og:image` on any page.* Every share on Facebook, Messenger or WhatsApp —
which is how a Slovak trades business actually gets passed around — renders as
a bare text link. One 1200×630 image referenced from the root layout fixes all
147 pages.

*Sitemap has no `lastmod`.* Cheap to add and it helps recrawl scheduling.

*One heading-order jump* on the homepage: `h1` → `h3` at "Služby".

## Structured data — 9 / 10

Valid JSON-LD on every page, zero parse errors:
`HomeAndConstructionBusiness` ×147, `Service` ×144, `FAQPage` ×144,
`BreadcrumbList` ×146, `ImageGallery` ×4. The business node carries a real
address, geo, opening hours, phone, e-mail, `hasMap` and `areaServed` scoped to
the page's city, and uses a stable `@id`.

Missing: `image` and `logo` on the business node. Google's local rich results
want them, and both assets already exist in `/public/brand`.

## Content differentiation — 6 / 10

This is the part most likely to cost you, so it is worth stating precisely.

Measured across the 71 published `jadrove-vrtanie` city pages, after
normalising away the town name so that swapping "Zvolen" for "Nitra" does not
count as original writing:

- 448 distinct sentences across all city pages; 424 of them appear on exactly
  one page, and only 7 appear on more than half the pages.
- By character count, article prose is **61% page-specific, 39% shared
  boilerplate** — and that measure flatters the pages, because it only counts
  sentences. The bullet lists (materials, use cases, benefits) are byte-identical
  on all 142 city pages and are not captured above.
- Average genuinely page-specific text: **~308 words per city page.**
- Vocabulary overlap (Jaccard) between two city pages of the same service
  averages **72%**, worst pair 84% (Púchov vs Šaľa), best 59%. For contrast,
  the two *services* for the same city overlap only 48% — that split is
  healthy, the city-to-city one is not.
- **Only 3 of 71 city pages carry a local FAQ.** 68 pages emit the four generic
  service questions and nothing local.

Thinnest pages: Sabinov, Žarnovica, Stropkov, Gelnica, Medzilaborce — five
unique sentences each against 1,420 characters of shared text.

The pages are not doorway pages: each carries a real computed distance and
drive time from Zvolen, its own intro, its own building-stock paragraph and its
own availability note. But 308 unique words is the low end of what survives
Google's helpful-content filtering at this page count, and the risk is not a
penalty — it is 142 pages sitting in "Crawled – currently not indexed".

Highest-leverage fixes, in order: two or three genuinely local FAQ questions
per city (the three pages that have them score measurably better on every
metric here); tagging more photos to the towns they were shot in, so the
gallery block differs per page instead of falling back to the category set;
and varying the bullet lists by city type rather than repeating one list.

## Performance — 8.5 / 10

Measured locally, so treat these as the ceiling rather than field data.

LCP is **424 ms** on the homepage, and the LCP element is the hero poster
image, which is the right answer — the videos are not competing for it. CLS is
between 0.0006 and 0.006 across all five page types, which is excellent. FCP
190–300 ms, TTFB 13–56 ms. No layout shift when the lazy content loads.

Transfer weights: homepage ~1.36 MB, of which 970 kB is the two hero videos;
`/galeria/` 776 kB across 11 images; service and city pages ~320 kB; `/kontakt/`
142 kB. Fonts account for 130 kB in two woff2 files — both needed, since Slovak
diacritics live in the latin-ext subset.

Two concrete wins. The logo declares `width={1367}` with no `sizes`, so the
browser fetches a 1367px-wide asset for a 115px slot on all 294 renderings
(header and footer of every page); adding `sizes="160px"` cuts that to a
fraction. And the hero videos at 2.4 MB combined are the largest thing on the
site — worth re-encoding at a lower bitrate, since they play behind a filter
treatment where detail is invisible.

## Accessibility — 8 / 10

Strong baseline: **1,025 images, zero missing alt text.** Real `<label>`s on
every field, `aria-invalid` and `aria-describedby` wired to the error messages,
a polite live region for the result, correct landmark structure
(header/nav/main/footer), `lang="sk"`, no controls without accessible names, no
focusable elements inside `aria-hidden`. No horizontal overflow at 390px on any
page type. With JavaScript disabled, all content renders visible — the
scroll-reveal degradation works as designed.

The lightbox moves focus to the close button on open, locks body scroll,
supports arrow-key navigation, closes on Escape and restores focus and scroll
afterwards. What it does not do is **trap focus**: five Tab presses walk out of
the dialog into the page behind it.

Also missing: a skip-to-content link, and 22–24 tap targets per page fall under
the 32px minimum on mobile (mostly the small arrow and filter controls).

## Correctness details

`<figcaption>` is used without a `<figure>` ancestor in `GalleryCarousel.tsx`,
`GalleryLightbox.tsx` and `app/galeria/page.tsx`. Browsers tolerate it; it is
invalid HTML and the caption loses its semantic association with the image.

`/galeria/` and the carousels behave differently for the same photo: on the
dedicated gallery page a tile is a `<Link>` that navigates to a service or city
page, while in a carousel the same tile is a `<button>` that opens the lightbox.
Pick one.

No security headers are configured. `X-Powered-By: Next.js` is exposed. A
`headers()` block in `next.config.mjs` with `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy` and a modest CSP, plus
`poweredByHeader: false`, is a ten-minute change.

---

## Ranked fix list

1. Wire the contact form to actually send. Nothing else on this list matters
   until a submitted form reaches a human.
2. Set the Maps key in Vercel; rotate and restrict it.
3. Rate-limit `/api/contact`.
4. Shorten meta descriptions to ~150 characters and titles to ~60.
5. Add an `og:image`.
6. Write two or three local FAQ questions for each city, starting with the
   thinnest pages listed above.
7. Add `sizes` to the logo; re-encode the hero videos.
8. Add a skip link and trap focus in the lightbox.
9. Add `image`/`logo` to the business schema and `lastmod` to the sitemap.
10. Fix the `figcaption` markup and make gallery click behaviour consistent.
