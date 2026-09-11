import { ARC_POINTS, MAP_SRC, MAP_VIEWBOX, type MapPoint } from "@/components/reach/projected";

/**
 * Dotted world map with arcs radiating from home.
 *
 * Originally the Aceternity registry component, now reduced to static markup.
 * That version built the map in the browser on every mount, and the cost was
 * not marginal: the constructor alone blocked the main thread for 1.2 seconds
 * on a laptop, and the resulting SVG went inline as a 942KB data URI — 80% of
 * the page's HTML, sitting in the middle of the document, so everything after
 * it arrived late.
 *
 * Both the artwork and the arc geometry are generated at build time now, by
 * `scripts/build-world-map.mjs`. The map is a plain image the browser fetches
 * in parallel and caches (24KB gzipped), and this component ships no
 * JavaScript at all — the draw-in is a CSS keyframe, and `pathLength="1"`
 * normalises every arc so one dash length works for all of them regardless of
 * their real length.
 */
export default function WorldMap({ lineColor = "#3b82f6" }: { lineColor?: string }) {
  const curve = (start: MapPoint, end: MapPoint) => {
    const midX = (start.x + end.x) / 2;
    /* 12.5 of 100 — the proportion the original used, so the arcs keep their
       curvature. */
    const midY = Math.min(start.y, end.y) - 12.5;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  /* Each endpoint once, so a shared origin does not stack thirteen markers on
     top of each other and pulse at thirteen times the opacity. */
  const markers = [
    ...new Map(
      ARC_POINTS.flatMap((arc) => [arc.start, arc.end]).map((p) => [
        `${p.x},${p.y}`,
        p,
      ]),
    ).values(),
  ];

  return (
    <div className="relative aspect-[2/1] w-full rounded-flat bg-ink">
      <img
        src={MAP_SRC}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt=""
        width={1584}
        height={800}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <svg
        viewBox={MAP_VIEWBOX}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="map-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {ARC_POINTS.map((arc, i) => (
          <path
            key={arc.label || i}
            className="map-arc"
            d={curve(arc.start, arc.end)}
            fill="none"
            stroke="url(#map-arc-gradient)"
            strokeWidth="0.25"
            /* Normalises the dash maths: one length works for every arc. */
            pathLength={1}
            style={{ animationDelay: `${(i * 0.12).toFixed(2)}s` }}
          />
        ))}

        {markers.map((p) => (
          <g key={`${p.x},${p.y}`}>
            <circle cx={p.x} cy={p.y} r="0.62" fill={lineColor} />
            <circle cx={p.x} cy={p.y} r="0.62" fill={lineColor} opacity="0.5">
              {/* SMIL rather than CSS: it keeps running with no JavaScript and
                  no compositor work of its own. */}
              <animate
                attributeName="r"
                from="0.62"
                to="2.2"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
