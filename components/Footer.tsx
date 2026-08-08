import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { regions } from "@/data/regions";

import { Logo } from "@/components/Logo";
import { icons } from "@/components/Icons";

/** Column heading with a short brand rule under it. */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-ink-900">
        {children}
      </h3>
      <span className="mt-3 block h-[2px] w-8 bg-brand" />
    </>
  );
}

/** Footer link with a subtle dash-in on hover. */
function FootLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "group -my-1.5 inline-flex items-center gap-2 py-1.5 text-sm text-ink-700 transition-colors duration-300 hover:text-brand";
  const inner = (
    <>
      <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
      {children}
    </>
  );
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-white text-ink-900">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {/* Brand */}
        <div>
          {/* Light footer means the logo can be used as-is, no white plate. */}
          <Logo className="h-16 w-fit" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-700">
            {company.description}
          </p>
        </div>

        {/* Services */}
        <div>
          <ColHeading>Služby</ColHeading>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <FootLink href={`/${s.slug}/`}>{s.name}</FootLink>
              </li>
            ))}
            <li>
              <FootLink href="/cennik/">Cenník</FootLink>
            </li>
            <li>
              <FootLink href="/galeria/">Galéria realizácií</FootLink>
            </li>
          </ul>
        </div>

        {/* Regions. Each link opens the locations section with that region
            already selected (the hash is read by <Locations/> on mount), so a
            visitor lands on the towns they actually care about. */}
        <div>
          <ColHeading>Kde pôsobíme</ColHeading>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
            {regions.map((r) => (
              <li key={r.slug}>
                <FootLink href={`/jadrove-vrtanie/#kraj-${r.slug}`}>
                  {r.short}
                </FootLink>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-ink-400">
            Pôsobíme po celom Slovensku – jadrové vŕtanie a rezanie otvorov
            zabezpečujeme vo všetkých okresných mestách.
          </p>
        </div>

        {/* Contact */}
        <div>
          <ColHeading>Kontakt</ColHeading>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={`tel:${company.phone}`}
                className="group flex items-center gap-3 text-lg font-bold text-ink-900"
              >
                <icons.phone className="h-4 w-4 shrink-0 text-brand" />
                <span className="relative">
                  {company.phoneDisplay}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-ink-700 transition-colors duration-300 hover:text-brand"
              >
                <icons.mail className="h-4 w-4 shrink-0 text-brand" />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-ink-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand" />
              <span>
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </span>
            </li>
            {company.openingHours.map((h) => (
              <li key={h.days} className="flex items-center gap-3 text-ink-700">
                <icons.clock className="h-4 w-4 shrink-0 text-brand" />
                {h.days}: {h.hours}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar — group cross-links (real corporate relationship) */}
      <div className="border-t border-ink-200 bg-ink-50">
        <div className="container flex flex-col gap-4 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {company.legalName}. Všetky práva
            vyhradené.
          </span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {company.group.members.map((m, i) => (
              <span key={m.name} className="flex items-center gap-4">
                {i > 0 && <span className="h-3 w-px bg-ink-200" />}
                <a
                  href={m.url}
                  className="transition-colors duration-300 hover:text-brand"
                >
                  {m.name}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
