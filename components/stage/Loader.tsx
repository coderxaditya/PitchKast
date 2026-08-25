"use client";

import { useEffect, useState } from "react";

import styles from "./Loader.module.css";

/**
 * Gates the reveal until every frame is decoded — without it the first scrub
 * lands on frames that have not arrived yet.
 *
 * The animation is the speeder, ported from its styled-components original
 * into a CSS module. Nothing about it is dynamic — no prop feeds a colour, a
 * duration or an offset — so it is a static stylesheet wearing a runtime
 * library's clothes. Using styled-components would have meant a 2MB
 * dependency, a `StyledComponentsRegistry` client provider wrapping the whole
 * app, and `compiler.styledComponents` in next.config, all to emit CSS that
 * can be written directly and compiled at build time. Every keyframe, offset
 * and duration is copied across unchanged; swapping back is a small change if
 * the library is wanted for something else later.
 */
export function Loader({ pct, done }: { pct: number; done: boolean }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 1100);
    return () => clearTimeout(t);
  }, [done]);

  if (gone) return null;

  return (
    <div
      /* #212121, not the site's own black. The ship is solid #000 with no
         outline, so on pure black there would be nothing to see. */
      style={{ background: "#212121" }}
      className={`fixed inset-0 z-[90] transition-opacity duration-1000 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${pct} percent`}
    >
      {/* aria-hidden: the whole thing is decoration, and the percentage is
          already announced by the label above. */}
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.loader}>
          <span>
            <span />
            <span />
            <span />
            <span />
          </span>
          <div className={styles.base}>
            <span />
            <div className={styles.face} />
          </div>
        </div>

        <div className={styles.longfazers}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Kept from the previous loader deliberately. The gate is 240 frames
          and ~11MB — a 20-second wait on mobile data — and an animation with
          no progress cannot distinguish "still working" from "hung", which is
          the moment someone closes the tab. Sits low and dim so it reads as
          instrumentation rather than as part of the artwork. Say the word and
          it comes out. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-10 grid justify-items-center gap-3"
      >
        <div className="relative h-px w-[190px] overflow-hidden bg-black/25">
          <span
            className="absolute inset-y-0 left-0 bg-black/70 transition-[width] duration-[280ms]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="font-body text-[11px] tracking-[0.16em] text-black/45 tabular-nums">
          {pct}
          <i className="ml-[2px] not-italic">%</i>
        </div>
      </div>
    </div>
  );
}
