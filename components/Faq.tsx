// Renders an FAQ block. The matching FAQPage JSON-LD is emitted separately
// (see lib/schema.faqSchema) so the questions are eligible for rich results.

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink-100">
      {items.map((item, i) => (
        <details key={i} className="group py-4" {...(i === 0 ? { open: true } : {})}>
          <summary className="cursor-pointer list-none font-semibold text-ink-900 marker:hidden">
            <span className="text-brand mr-2">›</span>
            {item.q}
          </summary>
          <p className="mt-3 pl-5 text-ink-700 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
