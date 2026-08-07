/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // All imagery is local (/public) — no remotePatterns needed, and no
    // third-party origin in the critical path.
  },
  // Trailing slash matches the current drillmaster.sk URL scheme
  // (e.g. /jadrove-vrtanie/zvolen/) so existing links/redirects line up.
  trailingSlash: true,

  // ---------------------------------------------------------------------
  // MIGRATION REDIRECTS
  // Audited against the live site on 2026-08-06. The /lokality/* branch
  // pages are linked from the current homepage but all except Zvolen return
  // a soft 404, and /lokality/zvolen/ duplicates /jadrove-vrtanie/zvolen/
  // (same target keyword, no canonical) — classic cannibalisation.
  // Consolidating them into the /{service}/{city}/ structure.
  //
  // NOTE: redirects run on the Node/Vercel server. If you ever switch to
  // `output: "export"`, move these to the host (Vercel/Netlify/nginx) config.
  // ---------------------------------------------------------------------
  async redirects() {
    const branchCities = [
      "zvolen",
      "banska-bystrica",
      "bratislava",
      "nitra",
      "lucenec",
      "brezno",
      "ruzomberok",
    ];

    return [
      // /lokality/{mesto}/ → /jadrove-vrtanie/{mesto}/  (301, permanent)
      ...branchCities.map((c) => ({
        source: `/lokality/${c}`,
        destination: `/jadrove-vrtanie/${c}/`,
        permanent: true,
      })),
      // Bare /lokality/ hub → the service hub
      {
        source: "/lokality",
        destination: "/jadrove-vrtanie/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
