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
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
