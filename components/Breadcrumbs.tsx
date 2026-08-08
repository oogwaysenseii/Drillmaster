import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Navigácia" className="container pt-6 text-sm text-ink-700">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.url} className="flex items-center gap-1">
            {i > 0 && <span className="text-ink-200">/</span>}
            {i < items.length - 1 ? (
              <Link
                href={item.url}
                className="-my-1.5 inline-block py-1.5 hover:text-brand"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-ink-900 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
