"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

/**
 * Dotted world map with arcs between points.
 *
 * From the Aceternity registry, with three changes made on arrival:
 *
 *  1. `next-themes` is gone. The registry version calls `useTheme()` to pick
 *     between a black and a white map, and that package is not installed here —
 *     the import alone would have failed the build. This map is always the dark
 *     cut, so the colours are stated outright rather than resolved at runtime.
 *  2. `motion/react` swapped for `framer-motion`, which the project already
 *     carries. Installing a second animation runtime to draw eleven arcs is not
 *     a trade worth making.
 *  3. The map SVG is memoised. `new DottedMap(...)` walks a full coordinate
 *     grid and serialises it to markup on every call, and the registry version
 *     does that on every single render.
 *  4. Points are projected with the library's own `getPin`, not the registry's
 *     hand-rolled equirectangular formula. That formula assumes the map spans
 *     the full -90..90 latitude range into a 2:1 box; the real map is 198x100
 *     over a cropped range, so the two disagree by about nine percent of the
 *     map's height. On a 350px map that is 32 pixels — enough to put a pin on
 *     central India out in the Bay of Bengal. `getPin` also snaps to the
 *     nearest dot, so every marker lands on the grid rather than between it.
 *
 * The arc draw-in is the only motion here. The pulsing rings are SMIL
 * `<animate>` from the original, which keeps running without JavaScript.
 */
interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#3b82f6",
}: MapProps) {
  /* One instance, used for both the artwork and the projection, so a pin can
     never be placed against a different map than the one drawn. */
  const { svgMap, projectPoint } = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return {
      svgMap: map.getSVG({
        radius: 0.22,
        /* The dark cut. White at 25% is what makes the landmasses read as a
           dotted relief rather than a grey smear, and the background matches
           the band's own Gray 900 exactly so the mask can fade the map into it
           with no visible seam. */
        color: "#FFFFFF40",
        shape: "circle",
        backgroundColor: "#111827",
      }),
      projectPoint: (lat: number, lng: number) => {
        /* Typed as optional by the library, though it always resolves for a
           valid coordinate. Falling back to the map's centre keeps a bad
           input from crashing the whole band. */
        const pin = map.getPin({ lat, lng });
        return { x: pin?.x ?? 99, y: pin?.y ?? 50 };
      },
    };
  }, []);

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    /* 12.5 of 100 — the same proportion of the map's height the registry's
       50-of-400 gave, so the arcs keep their original curvature. */
    const midY = Math.min(start.y, end.y) - 12.5;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="relative aspect-[2/1] w-full rounded-flat bg-ink">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt=""
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        /* The dotted map's own viewBox. Matching it is what lets `getPin`
           coordinates be used directly, with no conversion to go wrong. */
        viewBox="0 0 198 100"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        aria-hidden="true"
      >
        {dots.map((dot, i) => (
          <motion.path
            key={`path-${i}`}
            d={createCurvedPath(
              projectPoint(dot.start.lat, dot.start.lng),
              projectPoint(dot.end.lat, dot.end.lng),
            )}
            fill="none"
            stroke="url(#path-gradient)"
            strokeWidth="0.25"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.15 * i, ease: "easeOut" }}
          />
        ))}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-${i}`}>
            {[dot.start, dot.end].map((point, j) => {
              const { x, y } = projectPoint(point.lat, point.lng);
              return (
                <g key={j}>
                  <circle cx={x} cy={y} r="0.62" fill={lineColor} />
                  <circle cx={x} cy={y} r="0.62" fill={lineColor} opacity="0.5">
                    <animate
                      attributeName="r"
                      from="0.62"
                      to="2.2"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
