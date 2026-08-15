"use client";

import { useEffect, useState } from "react";

/**
 * Gates the reveal until every frame is decoded — without it the first scrub
 * lands on frames that have not arrived yet.
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
      className={`fixed inset-0 z-[90] grid place-items-center bg-black transition-opacity duration-1000 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="grid justify-items-center gap-[26px]">
        <div className="font-body text-base leading-none font-semibold tracking-[0.18em] text-white uppercase">
          PITCHKAST
        </div>

        <div className="relative h-px w-[190px] overflow-hidden bg-white/[0.14]">
          <span
            className="absolute inset-y-0 left-0 bg-white transition-[width] duration-[280ms]"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="font-body text-[11px] tracking-[0.16em] text-white/[0.46] tabular-nums">
          {pct}
          <i className="ml-[2px] not-italic">%</i>
        </div>
      </div>
    </div>
  );
}
