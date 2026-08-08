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
  cities.ts      ← 71 district seats; `content: null` = not published yet
  gallery.ts     ← photos + category + optional city attribution
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

**Locally:** copy `.env.example` → `.env.local` and set
`NEXT_PUBLIC_GOOGLE_MAPS_KEY`.

**On Vercel:** `.env.local` is gitignored, so it never reaches the deploy. Set
the same variable in *Project → Settings → Environment Variables* (tick
Production, Preview and Development), then **redeploy** — anything prefixed
`NEXT_PUBLIC_` is inlined into the bundle at build time, so an existing
deployment will not pick it up until it is rebuilt. Without the variable the
map area falls back to a plain coverage statement + phone number.

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
its own `localIntro`, `buildingStock` and `responseInfo`, and `lib/geo.ts`
computes a real per-city fact (road distance and drive time from Zvolen) that
no template can fake. A city with `content: null` is deliberately NOT generated
and renders as plain text rather than a link — no thin doorway pages.

71 district seats are published × 2 services = 142 city pages. That is a lot of
templated surface; watch Search Console's *Pages* report after launch. If
Google reports city pages as "Crawled – currently not indexed", the copy is not
differentiated enough — the two highest-leverage fixes are a city-specific FAQ
(`localFaq`) and real photos tagged to that town in `data/gallery.ts`.

## TODO before launch

- [ ] Set `NEXT_PUBLIC_GOOGLE_MAPS_KEY` and `RESEND_API_KEY` in Vercel, then redeploy
- [ ] Verify drillmaster.sk in Resend, then send one real test lead end-to-end
- [ ] Rotate the Maps key and restrict it by HTTP referrer in Cloud Console
- [ ] Tag the remaining gallery photos with the town they were taken in
      (`city:` in `data/gallery.ts`) — only guess-free entries
- [ ] Real social URLs in `data/company.ts` (`social.facebook` / `instagram`)
- [ ] Exact GBP coordinates in `data/company.ts` (`geo`)
- [ ] Confirm the redirect map in `next.config.mjs` against Search Console's
      full list of indexed URLs before go-live
- [ ] Verify schema in Google's Rich Results Test after deploy
- [ ] Claim/refresh the Google Business Profile — it outranks the site itself
      for map-pack queries

## Contact form delivery (Resend)

`app/api/contact/route.ts` sends each lead by e-mail through Resend.

**Environment:** `RESEND_API_KEY` is a real secret — no `NEXT_PUBLIC_` prefix, so
it stays server-side. Put it in `.env.local` locally and in Vercel → Settings →
Environment Variables for production. Optional overrides: `CONTACT_TO` (default
`drillmaster@mnsp.sk`) and `CONTACT_FROM`.

**`CONTACT_FROM` must be on a domain verified in Resend.** Until
`drillmaster.sk` finishes DNS verification, every send is rejected. To test the
whole path before then, set `CONTACT_FROM=onboarding@resend.dev` — Resend's
shared sandbox sender, which only delivers to the address that owns the account.

**If delivery fails the lead is written to the server log in full** (Vercel →
your project → Logs). A failed send should never mean a lost job, so the log is
the recovery path. The visitor sees "Odoslanie zlyhalo. Zavolajte nám, prosím."
rather than a false success.

**Rate limit:** 5 submissions per IP per 10 minutes, held in memory. On
serverless that is per instance, so treat it as a speed bump rather than a
guarantee — move it to Vercel KV or Upstash if spam ever becomes real.
