# Drillmaster — deep scan #4

Production build, 8 Aug 2026, after the internal-linking fix, share images,
mobile menu, skip link and the asset work. 148 pages crawled and parsed, six
page types profiled in headless Chromium at 1440px and 390px.

**Overall: 9 / 10** — up from 8. (Updated after the FAQ pass: all 71 towns now
carry local questions, and the three long meta descriptions, the heading order
and the small tap targets are fixed.) Everything from the last ranked list is
now done, and the structural weaknesses that persisted across three scans —
orphaned city pages, no share images, no mobile navigation — are gone.

| Area | #1 | #2 | #3 | Now |
|---|---|---|---|---|
| Build & architecture | 9 | 9 | 9 | 9 |
| Technical SEO | 8 | 7 | 7.5 | **9.5** |
| Structured data | 9 | 9 | 9 | **9.5** |
| Content differentiation | 6 | 5.5 | 6.5 | **7.5** |
| Performance | 8.5 | 8.5 | 8.5 | **9** |
| Accessibility | 8 | 8 | 7.5 | **8.5** |
| Launch readiness | 4 | 9 | 9 | 9 |

---

## Fixed since scan #3

**Internal linking — solved.** Every region's towns are now in the markup with
inactive panels hidden, rather than only the active tab.

| | #3 | now |
|---|---|---|
| city pages with 1 inbound link | 116 | **0** |
| lowest inbound on any city page | 1 | **73** |
| avg internal links per page | 20 | **77** |
| orphans | 0 | 0 |

**Share images.** `og:image` missing on 148 pages → **0**. Three 1200×630
images rendered from the real logo and photos: a default plus one per service,
so a shared drilling page and a shared cutting page look different.
`summary_large_image` set for Twitter/X.

**Mobile navigation.** Phones previously had a call button and no way to reach
any page. There is now a slide-in menu with both services, the cenník, the
gallery, a contact CTA and the NAP block — focus trapped, Escape closes, closes
on navigation, portalled out of the header (whose `backdrop-blur` was clipping
it to a 64px strip).

**Assets.** Hero videos re-encoded at 960px: 2.32 MB → 1.05 MB, SSIM 0.95–0.97,
indistinguishable at display size behind the filter treatment. Homepage
transfer 1,357 kB → **815 kB**. Logo now ships a 256px variant instead of
1367px; images oversized by more than 2.2× went from 2 per page to **0**, and
images missing `sizes` from 296 to **0**.

**Also done:** skip link on every page (verified as the first Tab stop), gallery
lightbox now traps focus, `logo`/`image` added to the business schema,
`lastmod` on all 148 sitemap URLs, invalid `figcaption` markup removed.

---

## Content and the remaining trade-off

**Local FAQs — done, 71 of 71 towns.** Two questions per town, each written
against that town's own building-stock copy: panel estates, historic and UNESCO
cores, industrial halls, spa and hotel objects, mountain access, agricultural
buildings. Measured effect:

| | before FAQs | after |
|---|---|---|
| shared text (sentence on ≥7 pages) | 41% | **34%** |
| unique characters per city page | 2,052 | **2,553** |
| city↔city vocabulary overlap | 68% | **57%** |
| avg article words | 456 | **530** |

**These need your fact-check.** They are written from public knowledge about
each town plus what your own copy already says, and never claim a job you have
done — but you know these places and I do not. The claims most worth checking
are the district names (Rúbanisko, Baničné, Klačno, Sásová, Fončorda), the
industry references (Púchov gumárne, Partizánske obuvníctvo, Poltár sklárstvo,
Detva strojárstvo) and the UNESCO/pamiatková zóna statements for Banská
Štiavnica, Bardejov, Levoča and Trnava.

**The amber meter dot fails WCAG contrast, deliberately.** `#E0A800` is 2.15:1
against white, under the 3:1 for graphical objects. A darker amber was tried
and reverted: at 5.02:1 it passed the check but read as a second red — amber
against red measures only 2.58:1, so darkening it defeated the point of having
three distinguishable states. Meaning does not depend on the colour: every dot
carries a text label that screen readers announce and that appears on hover,
which is verified. This is a knowing trade of a checkbox for actual usability,
and it is recorded in `TierMeter.tsx` so nobody "fixes" it later without
knowing why.

**Smaller items — done.** Meta descriptions over 160 characters: 3 → **0**.
Homepage heading order fixed (the h1 now comes first, carried in the hero for
assistive tech, with the intro section demoted to h2). Tap targets under 32px:
20–25 per page → **6–9**, the remainder being genuinely inline links inside
sentences, which WCAG exempts.

**Page weight grew.** Average HTML is 177.8 kB, up from 108.7 kB, because all
71 towns are now in every page's markup. It gzips to roughly 20 kB, so about
7 kB more over the wire per page — a fair price for the linking fix, but worth
knowing the number.

---

## Detail

**Build.** 148 static routes plus the API route, TypeScript clean, shared JS
87.3 kB. First-load JS 130 kB homepage, 128 kB service and city pages.

**Technical SEO — 9.5.** All 148 pages 200; 148 unique titles and descriptions;
canonicals correct and self-referencing; sitemap matches the crawlable set with
`lastmod`; no broken links, no orphans; one `h1` per page, first in document
order; `lang="sk"`; 2 titles over 60 characters, **0 descriptions over 160**.

**Structured data — 9.5.** Zero parse errors. `HomeAndConstructionBusiness`
×148 now including `logo` and `image`, `BreadcrumbList` ×147, `Service` ×146,
`FAQPage` ×144, `ImageGallery` ×4. Pricing modelled as
`UnitPriceSpecification` with `unitText`.

**Performance — 9.** LCP 240–496 ms across page types, CLS 0.0006–0.0028
everywhere, TTFB 30–37 ms. Transfer: homepage 815 kB, service and city pages
~310 kB, `/cennik/` 135 kB. Local figures, so a ceiling rather than field data.

**Accessibility — 8.5.** 1,027 images with zero missing alt. Every form field
labelled. Skip link present and working. All three dialogs — mobile menu, city
service picker, gallery lightbox — trap focus, close on Escape, lock and
restore scroll, and restore focus. Landmarks correct, no nameless controls, no
horizontal overflow at 390px, full content with JavaScript disabled. Held back
by the amber contrast trade-off above and the small tap targets.

**Contact endpoint.** Verified: valid submission reaches the send call, bad
e-mail 422, bad phone 422, honeypot returns a decoy 200, forged service/city
slugs dropped before the e-mail is composed. Rate limit and payload cap active.

---

## Ranked fix list

1. **Fact-check the 71 local FAQs** — the only open item on the site itself.
2. Watch Search Console coverage — the real test of whether 142 city pages hold.
3. Keep tagging gallery photos with the town they were shot in.
4. Ask every customer for a Google review that names their town — the strongest
   local signal available to a business without a branch there.
