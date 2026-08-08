# Drillmaster — deep scan #2

Run against a production build, 8 Aug 2026, after the cenník page, the full
contact form, the footer/region change and the city service dialog. 148 pages
crawled and parsed; six page types profiled in headless Chromium at 1440px and
390px. Every number is measured.

**Overall: 8 / 10** — up from 7.5. The launch blockers are gone: the contact
form delivers, the map is live, the endpoint is rate-limited. Two things moved
the wrong way, both side effects of changes made since the first scan, and both
are cheap to reverse.

| Area | Scan #1 | Now |
|---|---|---|
| Build & architecture | 9 | 9 |
| Technical SEO | 8 | **7** |
| Structured data | 9 | 9 |
| Content differentiation | 6 | **5.5** |
| Performance | 8.5 | 8.5 |
| Accessibility | 8 | 8 |
| Launch readiness | 4 | **9** |

---

## What got fixed since scan #1

The contact form delivers through Resend instead of silently dropping every
lead — that alone was the worst problem on the site. It now also carries the
page the enquiry came from, and the long form on `/kontakt/` adds name,
service, city and a message. `/api/contact/` is rate-limited to 5 submissions
per IP per 10 minutes, caps the payload at 4 kB, and logs the exact composed
message when delivery fails, so a failed send is recoverable rather than lost.

The map works in production. Two separate causes, both now cleared: billing was
not enabled on the Cloud project, and the key's referrer restriction did not
cover the site's subpages. The loader race that produced
`n is not a constructor` is fixed and covered by a reproducible test.

`/cennik/` is live with both price tables, and the price data is typed and
derived, so the "od X €" figures on service and city pages cannot drift from
the tables.

---

## Regressions to fix

**Internal linking to city pages has collapsed.** This is the significant one.
Replacing the footer's nine city links with eight region links removed the only
site-wide route into those pages. Measured now:

- **116 of 142 city pages have exactly one inbound internal link.**
- Bratislava, Nitra, Trnava, Trenčín, Žilina, Prešov and Košice each went from
  148 inbound links to **1**.
- That single link is the other service for the same town —
  `/jadrove-vrtanie/bratislava/` is reachable only from
  `/rezanie-otvorov/bratislava/`, and vice versa. They point at each other and
  nothing else points at either.
- Average internal links per page: 27 → **20**.

The 26 pages that still have many inbound links are the Banskobystrický towns,
because that region is the default tab and so appears in every page's static
HTML. Every other town is now a near-orphan: crawlable from the sitemap, but
with almost no internal signal. For the biggest markets on the site — the
regional capitals — that is the wrong direction.

Fix options, cheapest first: point each footer region link at that region's
capital city page instead of a `#kraj-` hash, which restores eight strong links
and still reads as "regions"; or keep the region links and add a compact second
row of capital links beneath them; or render all regions' towns in the DOM and
hide the inactive ones with CSS instead of unmounting them, which puts all 71
towns in every page's HTML.

**City pages became more similar to each other, not less.** The price teaser
now on all 142 city pages is identical text, so it added boilerplate to every
one of them:

- City-to-city vocabulary overlap (same service): 72% → **75%** average, worst
  pair 84% → **88%** (Nové Zámky vs Vranov nad Topľou).
- Shared boilerplate share of article prose: 39% → **41%**.
- Page-specific text per city page: ~308 → ~320 words, but the growth came from
  the shared block, not from local writing.

Still only **3 of 71** city pages carry a local FAQ. Thinnest remain Sabinov,
Žarnovica, Stropkov, Gelnica and Medzilaborce at five unique sentences each.
The teaser earns its place as a conversion element; the answer is not to remove
it but to finally add the per-city FAQ so the unique share grows faster than the
shared one.

---

## Unchanged from scan #1

These were in the last report and have not been touched:

**Meta descriptions are too long on 145 of 148 pages** (max 234 characters
against a ~160 budget), so Google truncates or rewrites them. **92 titles
exceed 60 characters**, worst 77 ("Rezanie otvorov Bánovce nad Bebravou |
Rezanie panelu a otvorov | Drillmaster"). **No `og:image` on any of the 148
pages**, so every Messenger and WhatsApp share is a bare text link. The
business schema still lacks `image`/`logo`, the sitemap has no `lastmod`, and
there is one heading-order jump on the homepage (`h1` → `h3` at "Služby").

The logo still declares `width={1367}` with no `sizes`, so a 1367px asset is
fetched for a 115px slot on all 296 renderings. There is still no skip link.
`<figcaption>` is still used without a `<figure>` ancestor in three files.

## Build & architecture — 9/10

148 routes plus the API route, all static, TypeScript clean. Shared JS 87.3 kB.
First-load JS: 127 kB homepage (was 125 — the service dialog), 125 kB service
and city pages, 113 kB `/kontakt/` (was 98 — the longer form), 98 kB `/cennik/`,
102 kB `/galeria/`. All still reasonable; the earlier note stands that
`ServiceMap` could move behind `next/dynamic` to trim the city pages.

## Technical SEO — 7/10

148 unique titles, 148 unique descriptions, zero duplicates, every canonical
correct and self-referencing, trailing slashes consistent, sitemap matches the
crawlable set exactly, no broken internal links, one `h1` per page, `lang="sk"`.
The score drops from 8 purely on the internal-linking regression above and the
still-unfixed head-tag issues.

## Structured data — 9/10

Valid JSON-LD everywhere, zero parse errors: `HomeAndConstructionBusiness` ×148,
`BreadcrumbList` ×147, `Service` ×146, `FAQPage` ×144, `ImageGallery` ×4. The
new pricing page models per-centimetre and per-metre rates as
`UnitPriceSpecification` with `unitText`, so a price can't be misread as the
cost of a whole hole. Still missing `image`/`logo` on the business node.

## Performance — 8.5/10

Local figures, so treat them as the ceiling. LCP 424 ms on the homepage (hero
poster, correct element), 184 ms on `/cennik/`, 196 ms on a city page. CLS
between 0.0006 and 0.0059 everywhere — excellent. Transfer: homepage ~1.36 MB
of which 970 kB is the two hero videos, `/galeria/` 776 kB, city pages ~320 kB,
`/cennik/` and `/kontakt/` 142 kB. The hero videos remain the largest single
win available.

## Accessibility — 8/10

**1,027 images, zero missing alt.** Every form field labelled, including the six
new ones on `/kontakt/`. Landmarks correct, no nameless controls, no overflow at
390px on any page type, and with JavaScript disabled all four checked pages
render full content with no hidden reveal blocks.

The new city service dialog is done properly: `aria-modal`, focus moved in on
open, **focus trapped** (six Tab presses stay inside), Escape and backdrop
close, body scroll and focus restored.

The gallery lightbox still is not: focus escapes after four Tab presses. It is
now the odd one out, and the picker's implementation can be copied straight
across. Still no skip link, and 20–25 tap targets per page fall under 32px on
mobile.

---

## Ranked fix list

1. Restore internal links to the city pages — point footer region links at the
   regional capitals, or add a capitals row back.
2. Write two or three local FAQ questions per city, starting with the five
   thinnest pages. This is now the only lever that meaningfully moves the
   duplication numbers.
3. Shorten meta descriptions to ~150 characters and titles to ~60.
4. Add an `og:image`.
5. Trap focus in the gallery lightbox (copy `CityServicePicker`).
6. Add `sizes` to the logo; re-encode the hero videos.
7. Add a skip link.
8. Add `image`/`logo` to the business schema and `lastmod` to the sitemap.
9. Fix the `figcaption` markup.
10. Verify in Search Console once indexing has had a few weeks — the coverage
    report is the only real test of whether the 142 city pages hold up.
