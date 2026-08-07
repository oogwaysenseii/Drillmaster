import { company } from "@/data/company";

export function CtaBand({ title }: { title?: string }) {
  return (
    <section className="bg-brand">
      <div className="container flex flex-col items-center gap-4 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {title ?? "Potrebujete presný otvor alebo rez?"}
          </h2>
          <p className="mt-1 text-white/90">
            Zavolajte nám a dohodneme si nezáväznú obhliadku.
          </p>
        </div>
        <a
          href={`tel:${company.phone}`}
          className="rounded-md bg-white px-6 py-3 font-semibold text-brand-dark hover:bg-ink-100 transition-colors"
        >
          Zavolať {company.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
