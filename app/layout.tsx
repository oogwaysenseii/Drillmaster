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
  description: company.description,
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: company.name,
    url: company.url,
  },
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
