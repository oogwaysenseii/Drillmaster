# Drillmaster — deep scan #5

Production build, 9 Aug 2026, after the tier/availability cleanup, the six new
job photos, the gallery lightbox and the GTM install. 148 sitemap URLs crawled
and parsed; six page types profiled in headless Chromium at 1440 px and 390 px;
accessibility audited with axe-core against WCAG 2.0/2.1 A and AA.

**Overall: 8.5 / 10** — down from 9, and the reason matters. The site did not
get worse. This is the first scan that ran a real automated accessibility
audit instead of checking contrast by eye on elements I happened to look at,
and it found a WCAG AA failure that has been present the whole time. The
previous 8.5 for accessibility was not earned. Separately, installing GTM
created a compliance gap that did not exist when the site collected nothing.

| Area | #1 | #2 | #3 | #4 | Now |
|---|---|---|---|---|---|
| Build & architecture | 9 | 9 | 9 | 9 | 9 |
| Technical SEO | 8 | 7 | 7.5 | 9.5 | 9.5 |
| Structured data | 9 | 9 | 9 | 9.5 | 9.5 |
| Content differentiation | 6 | 5.5 | 6.5 | 7.5 | **8** |
| Performance | 8.5 | 8.5 | 8.5 | 9 | 9 |
| Accessibility | 8 | 8 | 7.5 | 8.5 | **7** |
| Launch readiness | 4 | 9 | 9 | 9 | **7** |

---

## What the crawl found

148 URLs, all HTTP 200. Zero duplicate titles, zero duplicate meta
descriptions, zero missing canonicals, zero missing `og:image`, zero pages
without exactly one `<h1>`, zero images without `alt`, zero invalid JSON-LD
blocks, zero broken internal links across 148 distinct link targets, zero
console errors on any page type.

| Metric | Value |
|---|---|
| Title length | 21–70, avg 39 (2 over 60) |
| Description length | 106–159, avg 117 (0 over 160) |
| Unique internal links per page | 14–86, avg 85 |
| Orphan pages | 0 |
| Pages with fewer than 3 inbound links | 0 |
| Body words per page | 132–1283, avg 925 |
| Schema coverage | Business 148/148, Service 145/148, FAQPage 144/148, Breadcrumb 147/148 |

The three pages without `Service` schema are `/`, `/galeria/` and `/kontakt/`;
the four without `FAQPage` are those plus `/cennik/`. All correct except
`/cennik/`, which is the one commercial page that would benefit from an FAQ
block and does not have one.

## Content differentiation — 7.5 → 8

Measured two ways, because one number alone is misleading.

**Article body, excluding the shared Locations block: 85.6% of sentence
characters appear on exactly one page.** Range 80% (Námestovo) to 88%
(Bratislava). Average article length 512 words. The shared remainder is about
535 characters — four sentences of FAQ answer that are genuinely universal
("Vrták chladíme vodou, ktorá zároveň viaže prach"), which is the right kind
of repetition.

**Whole `<main>`, including Locations: 41.1% unique.** That figure is
dominated by the region switcher rendering all 71 town names on every page.
That block is navigation and it is the thing that fixed the orphaned-city-page
problem in scan #4, so its repetition is a deliberate trade, not a content
weakness. Quoting only the 85.6% would flatter the work; quoting only the
41.1% would misrepresent it.

Vocabulary overlap between city pages (Jaccard, words over three letters)
averages 70%, worst pair Prešov/Košice at 87%. That is expected — two
same-tier towns describing the same service in the same language share most of
their vocabulary. Sentence-level uniqueness is the honest measure and it is
the one that improved.

Gains since scan #4: three interchangeable lead sentences per tier dealt
round-robin (13/12/12, 9/9/9, 2/2/2 — no town shares its opening line with
more than a dozen others), all 71 `responseInfo` lines rewritten as two
city-specific sentences with zero duplicates, and six new city-tagged photos
that give Žiar nad Hronom and Detva their first local gallery instead of the
"we have no photos from here" fallback.

## Accessibility — 8.5 → 7

This is the finding of this scan.

**`text-ink-400` (#9C9C9C) is 2.75:1 on white. WCAG AA requires 4.5:1 for
text under 18.66 px bold.** It is used in 24 places across 13 components, so
axe reports it 27 times on the homepage, 23–24 on service and city pages, 9 on
`/kontakt/`, 5 on `/cennik/` and `/galeria/`. Affected: the numbered "why us"
labels, opening hours, the map placeholder, the "Krajské mesto / Vybrať
službu" tile metadata, the footer coverage note, the copyright line and the
`<dt>` labels on the contact page.

Darkening the token to **#6B6B6B** clears it everywhere: 5.33:1 on white,
4.89:1 on #F5F5F5, 4.68:1 on #F0F0F0 — the three backgrounds it is actually
used against. #767676 passes on white (4.54) but only reaches 3.99 on #F0F0F0,
so it is not sufficient.

**`/kontakt/` has invalid definition-list markup.** The `<dl>` wraps each row
in a `<div>` that contains an icon `<svg>` and a nested `<div>` holding the
`<dt>`/`<dd>`. A `<div>` inside a `<dl>` may only contain `<dt>`/`<dd>`, so
all eight terms and definitions are, structurally, outside any list. Screen
readers lose the term/definition relationship. Moving the icon inside the
`<dt>` fixes it without changing the layout.

**`/cennik/` price tables scroll horizontally on mobile but are not keyboard
reachable** (axe: `scrollable-region-focusable`, 2 instances). A keyboard user
cannot scroll to the right-hand columns. `tabIndex={0}` plus a label on the
scroll container fixes it.

Sub-24 px tap targets: the three group-bar links in the header are 16 px tall.
WCAG 2.5.8 exempts inline links in prose, and these are not prose. The header
contact strip already solves this with `-my-2 py-2`; the group bar never got
the same treatment.

What passes: zero missing alt text, one `<h1>` per page, focus trapped in both
the lightbox and the mobile menu, Escape closes both, focus restored on close,
skip link present and working, reduced-motion respected throughout.

## Performance — 9

Transfer size on a 390 px viewport, measured from `transferSize`:

| Page | Transfer |
|---|---|
| `/` | 834 kB |
| `/galeria/` | 554 kB |
| `/jadrove-vrtanie/bratislava/` | 346 kB |
| `/cennik/` | 330 kB |

DOMContentLoaded 113–332 ms locally. No horizontal overflow at 390 px on any
page type. The homepage is 19 kB heavier than scan #4 (815 kB), which is the
six added carousel photos; next/image keeps the offscreen ones lazy.

Two caveats this environment cannot measure. LCP did not report reliably in
headless Chromium here, so no LCP number is claimed. And `googletagmanager.com`
is blocked in this sandbox, so **GTM's real cost is not in any figure above** —
budget roughly 90–110 kB and a third-party connection on every page once tags
are added.

## Launch readiness — 9 → 7

Nothing broke. What changed is that the site now loads a tag manager.

GTM itself sets no cookies and the container is empty, so today the exposure
is theoretical. It stops being theoretical with the first GA4 or Ads tag:
EEA visitors need prior consent for non-essential cookies, and Google requires
Consent Mode v2 signals — which, since 15 June 2026, is the single control
governing all ad data reaching Google Ads.

Independently of tagging, the site has **no privacy policy page** while the
contact form collects a name, email and phone and sends them through Resend, a
US processor. GDPR Article 13 wants an information notice at the point of
collection; the line under the form is not one. This is a gap that predates
GTM and is the single most substantive thing outstanding.

Also still open: the Maps API key that went through chat has not been rotated,
`RESEND_API_KEY` travelled inside an uploaded zip and should be treated as
exposed, and the project is still not in a git remote — the zip is the only
backup, after five container rollbacks.

---

## Ranked fix list

1. **Contrast** — retune `ink.400` to #6B6B6B. One token, clears every
   contrast violation on every page.
2. **Privacy policy page** + consent layer before the first GA4 tag. Legal,
   not cosmetic.
3. **`/kontakt/` `<dl>` structure** — move the icon into the `<dt>`.
4. **`/cennik/` scroll containers** — `tabIndex={0}` and a label.
5. **`/galeria/` heading order** — the page goes `<h1>` straight to the
   footer's `<h3>`s. It needs an `<h2>` over the grid.
6. **Two titles over 60 characters** — `/` (61) and `/jadrove-vrtanie/` (70).
7. **Group-bar links** — pad from 16 px to a 24 px target.
8. **An FAQ block on `/cennik/`** — the highest-intent page on the site has no
   FAQ and no `FAQPage` schema.
9. **Rotate the Maps key and the Resend key**, then get the repo onto GitHub.
