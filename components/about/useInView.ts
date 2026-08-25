"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Viewport observer for the About section.
 *
 * Fires once. The flag latches true on first entry and never returns to false,
 * so each panel reveals as you arrive at it and then simply stays put —
 * re-reading the section doesn't re-animate a wall of copy. The observer
 * disconnects itself once it has fired, so nothing keeps watching.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      /* rootMargin grows the viewport 25% past its bottom edge, so a panel
         starts revealing while it is still below the fold and is already
         settled by the time the reader reaches it. Without this the sequence
         only begins once the panel is `threshold` visible — which is exactly
         when the reader is looking at it, so they watch it assemble instead
         of reading it. */
      { threshold, rootMargin: "0px 0px 25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
