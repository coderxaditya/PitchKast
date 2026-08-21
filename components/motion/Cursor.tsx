"use client";

import { useEffect, useState } from "react";

import { SmoothCursor } from "@/components/ui/smooth-cursor";

/**
 * Reduced-motion gate for the custom cursor.
 *
 * This has to be a JS gate rather than a CSS one. `SmoothCursor` sets
 * `document.body.style.cursor = "none"` from an effect, so hiding it in CSS
 * alone would leave the real pointer hidden with nothing drawn in its place —
 * no cursor at all. Not rendering it keeps that effect from ever running.
 *
 * The component already excludes touch-first devices on its own; this only
 * adds the motion-preference case on top.
 */
export function Cursor() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowed(!query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!allowed) return null;

  return <SmoothCursor />;
}
