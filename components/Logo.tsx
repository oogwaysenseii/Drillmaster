import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";

/**
 * Brand logotype.
 *
 * NOTE: the supplied PNG has a light beige plate behind "DRILL MASTER" and a
 * black tagline, so it only reads correctly on LIGHT backgrounds. On dark
 * surfaces we render it on a white plate (`onDark`) rather than filtering it,
 * because inverting would turn the brand red into cyan.
 * TODO: ask the designer for a white/knockout version for dark backgrounds.
 */
export function Logo({
  className = "",
  onDark = false,
  priority = false,
}: {
  className?: string;
  onDark?: boolean;
  priority?: boolean;
}) {
  const img = (
    <Image
      src="/brand/drillmaster-logo.png"
      alt={`${company.name} – ${company.tagline}`}
      width={1367}
      height={525}
      priority={priority}
      className="h-full w-auto"
    />
  );

  return (
    <Link
      href="/"
      aria-label={`${company.name} – domovská stránka`}
      className={`block ${className}`}
    >
      {onDark ? (
        <span className="inline-flex h-full items-center bg-white px-4 py-2">
          {img}
        </span>
      ) : (
        img
      )}
    </Link>
  );
}
