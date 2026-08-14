"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

/**
 * Oversized display word anchored to the bottom of the hero.
 *
 * Sized to whatever vertical room the hero content leaves, so it is always
 * fully on screen at any viewport height, then stretched horizontally only —
 * height stays put — so it reaches near full-bleed width whatever size the
 * height cap left it at.
 */
export function GiantWord({
  word,
  sectionRef,
  contentRef,
}: {
  word: string;
  sectionRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}) {
  const wordRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const fit = () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const el = wordRef.current;
      if (!section || !content || !el) return;

      const available = section.clientHeight - content.offsetHeight;
      const byWidth = window.innerWidth * 0.3;
      const byHeight = available / 0.78; // .giant-word line-height
      el.style.fontSize = `${Math.max(32, Math.min(byWidth, byHeight))}px`;

      el.style.transform = "none";
      const naturalWidth = el.getBoundingClientRect().width;
      const target = window.innerWidth * 0.96;
      const scaleX = Math.min(2, Math.max(1, target / naturalWidth));
      el.style.transform = `scaleX(${scaleX})`;
    };

    fit();
    window.addEventListener("resize", fit);
    document.fonts.ready.then(fit).catch(() => {});

    // The content block changes height as webfonts settle — refit whenever it does.
    const ro = new ResizeObserver(fit);
    if (contentRef.current) ro.observe(contentRef.current);

    return () => {
      window.removeEventListener("resize", fit);
      ro.disconnect();
    };
  }, [sectionRef, contentRef]);

  return (
    <span ref={wordRef} className="giant-word">
      {word}
    </span>
  );
}
