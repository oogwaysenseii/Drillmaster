"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper.
 *
 * IMPORTANT (SEO): children are rendered into the HTML unconditionally — this
 * component only toggles a CSS class. Nothing is hidden from crawlers, and with
 * JS disabled the content displays normally (see `.js` guard in globals.css).
 *
 * Uses a single IntersectionObserver per element, disconnected after firing,
 * so there's no scroll listener and no layout thrash.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger in ms. */
  delay?: number;
  variant?: "up" | "scale";
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the element is already at or above the viewport on mount — which
    // happens when the browser restores scroll position on back-navigation,
    // or when the user lands on a #hash — reveal it immediately. Without this
    // it would stay invisible forever, since it never *enters* the viewport.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = variant === "scale" ? "reveal reveal-scale" : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
