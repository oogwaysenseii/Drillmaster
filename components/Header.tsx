import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { Logo } from "@/components/Logo";
import { icons } from "@/components/Icons";

/** Nav link with an animated brand underline. */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative py-2 text-lg  text-ink-900 transition-colors duration-300 hover:text-brand"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
    </Link>
  );
}

export function Header() {
  return (
    <>
      {/* ---- Group bar: sister brands ---- */}
      <div className="hidden bg-ink text-white md:block">
        <div className="container flex h-9 items-center justify-end text-[11px]">
          {company.group.members.map((m, i) => (
            <span key={m.name} className="flex items-center">
              {i > 0 && <span className="mx-4 h-3 w-px bg-white/15" />}
              <a
                href={m.url}
                className="tracking-wide text-white/55 transition-colors duration-300 hover:text-white"
              >
                {m.name}
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* ---- Contact strip ---- */}
      <div className="border-b border-ink-200 bg-ink-100">
        <div className="container flex h-11 items-center justify-between text-xs">
          <span className="hidden items-center gap-2.5 text-ink-700 sm:flex">
            <span className="h-px w-5 bg-brand" />
            {company.tagline}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2 text-ink-700 transition-colors duration-300 hover:text-brand"
            >
              <icons.mail className="h-3.5 w-3.5 text-brand" />
              {company.email}
            </a>
            <span className="h-3 w-px bg-ink-200" />
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-2 font-bold text-ink-900 transition-colors duration-300 hover:text-brand"
            >
              <icons.phone className="h-3.5 w-3.5 text-brand" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* ---- Main nav ---- */}
      <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/95 shadow-[0_1px_20px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <div className="py-1 container flex h-19 items-center justify-between gap-6">
          <Logo className="h-14 shrink-0 py-1.5" priority />

          <nav className="hidden items-center gap-8 md:flex">
            {services.map((s) => (
              <NavLink key={s.slug} href={`/${s.slug}/`}>
                {s.name}
              </NavLink>
            ))}
            <NavLink href="/cennik/">Cenník</NavLink>
            <NavLink href="/galeria/">Galéria</NavLink>

            <Link
              href="/kontakt/"
              className="group relative ml-2 flex items-center gap-2.5 overflow-hidden bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
            >
              {/* Dark wipe on hover */}
              <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              <span className="relative">Kontakt</span>
              <icons.arrow className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </nav>

          {/* Mobile call button */}
          <a
            href={`tel:${company.phone}`}
            className="flex items-center gap-2 bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white md:hidden"
          >
            <icons.phone className="h-3.5 w-3.5" />
            Zavolať
          </a>
        </div>
      </header>
    </>
  );
}
