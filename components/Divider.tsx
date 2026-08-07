/**
 * Thin light-grey separator band.
 *
 * Same grey as the strip under the footer, used to break up full-bleed
 * sections (under the header, under the hero, under the CTA).
 */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[5px] w-full bg-ink-50 ${className}`}
    />
  );
}
