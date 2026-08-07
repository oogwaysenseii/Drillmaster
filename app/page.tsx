import { company } from "@/data/company";
import { equipment } from "@/data/equipment";
import { EquipmentSlider } from "@/components/EquipmentSlider";
import { homepage } from "@/data/homepage";
import { gallery } from "@/data/gallery";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { TrustBand } from "@/components/TrustBand";
import { Gallery } from "@/components/Gallery";
import { Locations } from "@/components/Locations";
import { Divider } from "@/components/Divider";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { icons } from "@/components/Icons";
import { businessSchema } from "@/lib/schema";

/** ImageGallery schema — makes the work photos eligible for image search. */
function gallerySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Galéria realizácií – Drillmaster",
    url: `${company.url}/galeria/`,
    associatedMedia: gallery.map((g) => ({
      "@type": "ImageObject",
      // Schema requires absolute URLs; the data holds site-relative paths.
      contentUrl: `${company.url}${g.src}`,
      caption: g.alt,
    })),
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={[businessSchema(), gallerySchema()]} />

      {/* Grey band directly under the header */}
      <Divider />

      <Hero />
      <TrustBand />

      {/* ---------- Intro: wall saw + copy on top, "why us" as one row ------- */}
      <section className="section overflow-hidden">
        <div className="container">
          {/* Top: two columns. The saw column shrinks with the viewport and is
              only dropped on phones (below md), where a side-by-side layout
              would squeeze the text into an unreadable sliver. */}
          {/* Left = image (full height of the block), right = text with the
              "why us" grid nested directly beneath it. */}
          <div className="grid gap-5  lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-5">
            <Reveal
              variant="scale"
              className="hidden lg:flex md:items-center md:justify-center"
            >
              <EquipmentSlider slides={equipment} />
            </Reveal>

            <div>
              <Reveal>
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-brand">
                  <span className="h-px w-8 bg-brand" />O nás
                </p>
                <h1 className="section-title mt-5 text-balance">
                  {homepage.intro.heading}
                </h1>
                <div className="rule mt-7 h-[2px] w-20 bg-brand" />
                <p className="mt-7 text-lg leading-relaxed text-ink-700">
                  {homepage.intro.body}
                </p>
              </Reveal>

              {/* "Why us" — nested in the right column, under the copy */}
              <Reveal delay={60}>
                <h2 className="mt-10 border-t border-ink-200 pt-8 text-xs font-bold uppercase tracking-[0.3em] text-ink-400">
                  {homepage.intro.whyHeading}
                </h2>
              </Reveal>

              <div className="mt-6 grid gap-px bg-ink-200 sm:grid-cols-2">
                {homepage.intro.why.map((w, i) => (
                  <Reveal key={w.num} delay={i * 90}>
                    <div className="group h-full bg-white p-6 transition-colors duration-500 hover:bg-ink-100">
                      <span className="block text-2xl font-extrabold text-ink-200 transition-colors duration-500 group-hover:text-brand">
                        {w.num}
                      </span>
                      <h3 className="mt-3 font-bold leading-snug text-ink-900">
                        {w.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">
                        {w.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Gallery carousel (all photos, with category tabs) ------- */}
      <Gallery showFilter />

      {/* ---------- Locations: region switcher + map ---------- */}
      <Locations />

      {/* ---------- Closing CTA: copy left, form right ---------- */}
      <section className="relative overflow-hidden bg-brand">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 14px)",
          }}
        />
        <div className="container relative py-10">
          <Reveal>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Copy */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/70">
                  Nezáväzne a zadarmo
                </p>
                <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-4xl">
                  Potrebujete presný otvor alebo rez?
                </h2>
                <p className="mt-5 max-w-md text-white/90">
                  Nechajte nám kontakt a ozveme sa vám s cenovou ponukou.
                </p>

                <div className="mt-8 space-y-3 border-t border-white/25 pt-8">
                  <a
                    href={`tel:${company.phone}`}
                    className="group flex items-center gap-3 text-2xl font-extrabold text-white"
                  >
                    <icons.phone className="h-5 w-5 shrink-0 text-white/70" />
                    <span className="relative">
                      {company.phoneDisplay}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                    </span>
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 text-white/85 transition-colors hover:text-white"
                  >
                    <icons.mail className="h-5 w-5 shrink-0 text-white/70" />
                    {company.email}
                  </a>
                  {company.openingHours.map((h) => (
                    <p
                      key={h.days}
                      className="flex items-center gap-3 text-white/70"
                    >
                      <icons.clock className="h-5 w-5 shrink-0 text-white/50" />
                      {h.days}: {h.hours}
                    </p>
                  ))}
                </div>
              </div>

              {/* Form */}
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
