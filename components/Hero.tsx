import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { heroMedia } from "@/data/gallery";
import { company } from "@/data/company";
import { HeroVideo } from "@/components/HeroVideo";

/**
 * Cinematic split hero — two services, full-bleed media, depth gradient.
 *
 * Media strategy: the poster <Image> is always rendered and is the LCP
 * element (priority + explicit sizes). If a video is configured in
 * data/gallery.ts, HeroVideo layers it on top after hydration and fades it in.
 * That way adding video later costs nothing in LCP or CLS.
 */
export function Hero() {
  return (
    // Flex row (not a grid) so the panels can resize against each other.
    <section className="relative flex flex-col md:flex-row">
      {services.map((s, i) => {
        const media = heroMedia[s.slug];
        return (
          <div
            key={s.slug}
            /*
              Panel expansion copied from the live drillmaster.sk:
                .service-box       { flex: 1 1 0%; transition: .8s cubic-bezier(.2,1,.2,1) }
                .service-box:hover { flex: 2 1 0% }
              The hovered panel takes 2/3 of the width and pushes the other
              back. Only from md up — on a stacked mobile layout there's no
              sideways room, and no hover either.
            */
            className="group relative isolate flex min-h-[40vh] flex-1 items-center overflow-hidden transition-[flex-grow] duration-[800ms] ease-[cubic-bezier(0.2,1,0.2,1)] md:min-h-[66vh] md:hover:grow-[2]"
          >
            {/*
              Media treatment replicated from the current drillmaster.sk:
                default : filter brightness(.4) grayscale(30%)
                hover   : filter brightness(.7) grayscale(0)  + scale(1.05)
                easing  : 0.8s cubic-bezier(0.2, 1, 0.2, 1)
              The `hero-media` class carries it (see globals.css) so the poster
              and the video get an identical look and swap seamlessly.
            */}
            <Image
              src={media.poster}
              alt={
                s.slug === "jadrove-vrtanie"
                  ? "Jadrové vŕtanie prestupu diamantovou technikou"
                  : "Rezanie železobetónu stenovou pílou"
              }
              fill
              priority
              quality={82}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="hero-media -z-30 object-cover"
            />

            {/* Optional video, layered above the poster */}
            {media.video && (
              <HeroVideo webm={media.video.webm} mp4={media.video.mp4} />
            )}

            {/* Bottom-weighted gradient, as on the current site
                (transparent → rgba(0,0,0,0.8)) */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Hairline between panels */}
            {i === 0 && (
              <div className="absolute right-0 top-0 z-10 hidden h-full w-px bg-white/15 md:block" />
            )}

            {/* Vertically centred within the panel */}
            <div className="relative w-full px-8 py-16 md:px-12">
              <div className="mx-auto max-w-lg">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-brand">
                  <span className="h-px w-8 bg-brand" />
                  Drillmaster
                </p>

                <h2 className="mt-5 text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white md:text-6xl lg:text-7xl">
                  {s.name.split(" ").map((word, wi) => (
                    <span
                      key={word}
                      className={wi === 1 ? "block text-brand" : "block"}
                    >
                      {word}
                    </span>
                  ))}
                </h2>

                <p className="mt-6 max-w-md leading-relaxed text-white/75">
                  {s.summary}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href={`/${s.slug}/`}
                    className="group/btn relative overflow-hidden border border-white/80 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white"
                  >
                    <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-x-100" />
                    <span className="transition-colors duration-300 group-hover/btn:text-ink">
                      Zobraziť
                    </span>
                  </Link>

                  <a
                    href={`tel:${company.phone}`}
                    className="border border-white/25 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-white/60 hover:text-white"
                  >
                    Získať cenovú ponuku
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
