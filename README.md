# Drillmaster — Next.js SEO rebuild

Static-generated Next.js (App Router) site for Drillmaster (jadrové vŕtanie a
rezanie otvorov). Built SEO-first: the whole site generates from typed data, so
adding a city or a service is a data edit, not a code change.

**Read [`AUDIT.md`](./AUDIT.md) first** — it documents what's broken on the live
site today and why this structure is shaped the way it is.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
data/            ← source of truth (edit these to grow the site)
  company.ts     ← NAP, hours, MNSP group links — VERIFIED against the live site
  services.ts    ← jadrove-vrtanie, rezanie-otvorov
  cities.ts      ← the 7 real branches; `content: null` = not published yet
lib/schema.ts    ← JSON-LD (HomeAndConstructionBusiness, Service, FAQ, Breadcrumb)
components/      ← Header, Footer, ServiceHub, CityServicePage, SidebarCta…
app/
  page.tsx                       ← homepage (split hero, matches live design)
  {service}/page.tsx             ← service hub
  {service}/[mesto]/page.tsx     ← service × city — generateStaticParams
  sitemap.ts / robots.ts         ← auto-generated from data
next.config.mjs                  ← 301 redirect map for the broken /lokality/* URLs
```

## Google Map (service area)

Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_GOOGLE_MAPS_KEY`.

The map is loaded lazily (only when scrolled into view) because the Maps script
is ~200 kB and would otherwise hurt Core Web Vitals. It uses the modern
`loading=async` bootstrap, which means constructors must be obtained via
`google.maps.importLibrary()` — reading `google.maps.Map` directly throws
"is not a constructor". See `components/ServiceMap.tsx`.

**Secure the key** with an HTTP-referrer restriction in Google Cloud Console
(`https://drillmaster.sk/*` + `http://localhost:3000/*`), restrict it to the
Maps JavaScript API only, and set a billing budget alert. The key ships in the
client bundle — that's unavoidable — so the referrer restriction is the only
thing preventing someone else from spending your quota.

## Brand

Sampled from the live site: primary red `#D2051E`, black `#000`, Inter.
Inter is **self-hosted** via `@fontsource-variable/inter` rather than
`next/font/google` — no request to Google's servers (cleaner under EU/GDPR
guidance, and one less third-party round-trip).

## The one rule that matters

**City pages must not be near-duplicates.** Each city in `cities.ts` carries
unique content (`localIntro`, `buildingStock`, `referenceProject`, `localFaq`).
A city with `content: null` is deliberately NOT generated and renders as plain
text on the homepage rather than a link — no thin doorway pages. Zvolen and
Banská Bystrica are done as the reference standard; copy their depth.

## TODO before launch

- [ ] Write `content` for: Bratislava, Nitra, Lučenec, Brezno, Ružomberok
- [ ] Real social URLs in `data/company.ts` (`social.facebook` / `instagram`)
- [ ] Exact GBP coordinates in `data/company.ts` (`geo`)
- [ ] Real logo asset (header/footer use a placeholder logotype)
- [ ] Photos via `next/image` — the site is text-only right now, the live site
      has 7–8 images per city page
- [ ] Build `/galeria/`, `/kontakt/` (both linked in nav, not yet created)
- [ ] Confirm the redirect map in `next.config.mjs` against Search Console's
      full list of indexed URLs before go-live
- [ ] Verify schema in Google's Rich Results Test after deploy
