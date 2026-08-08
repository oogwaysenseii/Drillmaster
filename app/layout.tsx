import type { Metadata } from "next";
// Inter — matches the typeface on the current drillmaster.sk.
// Self-hosted via @fontsource (NOT next/font/google) on purpose: no request to
// Google's servers, which keeps the site clean under EU/GDPR guidance and
// removes a third-party round-trip from the critical path.
// The variable font covers all weights in one file.
import "@fontsource-variable/inter/index.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company } from "@/data/company";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} | ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  // Kept near 150 characters: company.description is the long form used in
  // schema and the footer, and ran to 179 here.
  description:
    "Jadrové vŕtanie a rezanie stavebných otvorov diamantovou technikou. Čisto, presne a bez otrasov. Cenová ponuka zadarmo.",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: company.name,
    url: company.url,
    // 1200×630 is what Facebook, Messenger, WhatsApp and LinkedIn crop from.
    // Without this every share renders as a bare text link.
    images: [
      {
        url: "/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${company.name} – ${company.tagline}`,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        {/*
          Sets `.js` before first paint so scroll-reveal elements can start
          hidden without a flash. If JS is disabled (or fails), the class is
          never added and ALL content renders visible — see globals.css.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="font-sans">
        {/*
          Skip link. Without it a keyboard user tabs through the group bar,
          the e-mail and phone links and the whole nav before reaching the
          content — on every page. Visually hidden until focused.
        */}
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:uppercase focus:tracking-[0.14em] focus:text-white"
        >
          Preskočiť na obsah
        </a>
        <Header />
        <main id="obsah">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
