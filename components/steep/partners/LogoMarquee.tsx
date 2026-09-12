"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { LogoItem } from "./logos";

/** Scroll rate in pixels per second. */
const SPEED = 70;
/** Gap between lockups, in pixels. */
const GAP = 72;
/** Used until the sequence has been measured, so it always animates. */
const FALLBACK_DURATION = 28;

function Sequence({
  logos,
  gap,
  innerRef,
  hidden,
}: {
  logos: LogoItem[];
  gap: number;
  innerRef?: React.Ref<HTMLUListElement>;
  hidden?: boolean;
}) {
  return (
    <ul
      ref={innerRef}
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={hidden || undefined}
      role={hidden ? "presentation" : "list"}
    >
      {logos.map((logo) => (
        <li key={logo.id} className="shrink-0" title={logo.title}>
          {logo.node}
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite logo strip.
 *
 * Motion is a CSS keyframe on the compositor. The only thing JavaScript does
 * is measure one sequence to convert a pixel-per-second speed into an
 * animation duration — a single synchronous read, not an observer and not a
 * per-frame loop. If that measurement never lands the strip still animates at
 * the fallback duration, so there is no path where it sits still.
 */
export function LogoMarquee({
  logos,
  ariaLabel,
  className,
}: {
  logos: LogoItem[];
  ariaLabel: string;
  className?: string;
}) {
  const seqRef = useRef<HTMLUListElement>(null);
  const [duration, setDuration] = useState(FALLBACK_DURATION);

  const measure = () => {
    const width = seqRef.current?.getBoundingClientRect().width ?? 0;
    if (width > 0) setDuration(width / SPEED);
  };

  useLayoutEffect(measure, []);

  /* Wordmarks are type, so the sequence is narrower until the webfont
     arrives. One re-measure when fonts settle keeps the speed honest
     without subscribing to anything ongoing. */
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={`marquee ${className ?? ""}`.trim()}
      role="region"
      aria-label={ariaLabel}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee__track">
        <Sequence logos={logos} gap={GAP} innerRef={seqRef} />
        {/* The clone exists only to make the loop seamless; screen readers
            should hear the list once. */}
        <Sequence logos={logos} gap={GAP} hidden />
      </div>

      {/* Edge fades, painted in the band's own white. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-gradient-to-l from-white to-transparent"
      />
    </div>
  );
}
