import {
  BookOpen,
  ChartColumn,
  Landmark,
  Lightbulb,
  Target,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react";

/**
 * The hero diagram, on monad.com's pipeline.
 *
 * Theirs shows security data flowing from sources, through a hub that
 * ingests, reduces, normalises and routes it, out to destinations. Ours shows
 * what a founder brings, flowing through the four things PitchKast does with
 * it, out to what the founder gets. The same anatomy: bordered pill nodes on
 * the left, thin curved Ash lines converging on a glowing hub of four
 * petals, lines fanning back out to pill nodes on the right.
 *
 * It is drawn as one SVG on a 1352×460 box (the reference's column at 1440),
 * so the whole thing scales as a single picture. Motion is layered on top:
 * a dash pattern crawls along every line (CSS), small labelled packets ride
 * a few of them (SVG `animateMotion`), each source pill's border ticks dark in
 * turn, and the ring of dots around the mark turns. All of it is hidden under
 * `prefers-reduced-motion`.
 *
 * Below 1024px the picture would shrink to unreadable type, so a vertical
 * version replaces it: the sources as wrapped pills, the hub, the outcomes.
 */

const W = 1352;
const H = 460;
const CX = W / 2;
const CY = H / 2;

type Node = { label: string; icon?: LucideIcon };

const SOURCES: Node[] = [
  { label: "Your story", icon: BookOpen },
  { label: "Product idea", icon: Lightbulb },
  { label: "LinkedIn profile", icon: UserRound },
  { label: "Market data", icon: ChartColumn },
  { label: "Early traction", icon: TrendingUp },
  { label: "Target buyers", icon: Target },
  { label: "Investor list", icon: Landmark },
];

const OUTCOMES: Node[] = [
  { label: "Founder brand" },
  { label: "Shipped product" },
  { label: "Qualified leads" },
  { label: "New markets" },
  { label: "Investor meetings" },
];

/* Packets: which line carries one, what it says, and when it leaves. */
const IN_PACKETS = [
  { line: 0, text: "story", begin: 0 },
  { line: 2, text: "profile", begin: 1.4 },
  { line: 4, text: "numbers", begin: 2.6 },
  { line: 6, text: "investors", begin: 0.8 },
];
const OUT_PACKETS = [
  { line: 0, text: "posts", begin: 1.8 },
  { line: 2, text: "leads", begin: 3.2 },
  { line: 4, text: "meetings", begin: 0.4 },
];

/* ── Geometry ─────────────────────────────────────────────── */
const CHAR = 9.05; // IBM Plex Mono at 15px, uppercase, 0.05em tracking
const PILL_H = 42;
const pillWidth = (n: Node) => Math.round(n.label.length * CHAR + (n.icon ? 70 : 44));

const LEFT_EDGE = 286; // right edge of the source pills
const RIGHT_EDGE = 1066; // left edge of the outcome pills
const spread = (count: number, i: number, gap: number) => CY + (i - (count - 1) / 2) * gap;

const inY = (i: number) => spread(SOURCES.length, i, 62);
const outY = (i: number) => spread(OUTCOMES.length, i, 93);

/* Lines converge to a tight bundle entering the hub, then fan out again. */
const inPath = (i: number) => {
  const y = inY(i);
  const yc = CY + (y - CY) * 0.09;
  return `M${LEFT_EDGE} ${y} H380 C480 ${y} 470 ${yc} 560 ${yc} H600`;
};
const outPath = (i: number) => {
  const y = outY(i);
  const yc = CY + (y - CY) * 0.09;
  return `M752 ${yc} H792 C882 ${yc} 872 ${y} 972 ${y} H${RIGHT_EDGE}`;
};

/* ── Pieces ───────────────────────────────────────────────── */
function Pill({ node, x, y, align, delay }: { node: Node; x: number; y: number; align: "end" | "start"; delay?: number }) {
  const w = pillWidth(node);
  const left = align === "end" ? x - w : x;
  const Icon = node.icon;
  return (
    <foreignObject x={left} y={y - PILL_H / 2} width={w} height={PILL_H}>
      <div
        className={`node-tick flex h-full items-center gap-2.5 rounded-pill border border-ash px-5 text-[15px] tracking-[0.05em] text-off-black uppercase ${
          align === "end" ? "bg-[#fbfaf9]" : "bg-[#eef5ef]"
        }`}
        style={delay !== undefined ? ({ "--d": `${delay}s` } as React.CSSProperties) : { animation: "none" }}
      >
        {Icon ? <Icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" /> : null}
        <span className="whitespace-nowrap">{node.label}</span>
      </div>
    </foreignObject>
  );
}

function Packet({ d, text, begin, dur }: { d: string; text: string; begin: number; dur: number }) {
  const w = text.length * 7.2 + 14;
  return (
    <g className="packet" opacity={0}>
      <g transform={`translate(${-w / 2} -9)`}>
        <rect width={w} height={18} rx={9} fill="#f6f3f1" stroke="#cecac8" />
        <text x={w / 2} y={12.5} textAnchor="middle" className="fill-graphite font-mono text-[11px]">
          {text}
        </text>
      </g>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.08;0.6;0.72;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </g>
  );
}

/** The hub: a green-gold glow, four petals, and the mark inside a turning
    ring of dots. Drawn around (0, 0) so either layout can place it. */
function Hub({ glow }: { glow: string }) {
  const petal = 94;
  const off = 70;
  const petals = [
    { label: "Build", x: 0, y: -off },
    { label: "Position", x: -off, y: 0 },
    { label: "Raise", x: off, y: 0 },
    { label: "Grow", x: 0, y: off },
  ];
  return (
    <g>
      <circle r={230} fill={`url(#${glow})`} className="hub-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      {petals.map((p) => (
        <g key={p.label} transform={`translate(${p.x} ${p.y})`}>
          <rect
            x={-petal / 2}
            y={-petal / 2}
            width={petal}
            height={petal}
            rx={18}
            transform="rotate(45)"
            fill="#c9f7dc"
            fillOpacity={0.75}
            stroke="#ffffff"
            strokeOpacity={0.8}
            strokeWidth={1.5}
          />
          {(
            <text
              y={p.y === 0 ? 4 : p.y < 0 ? -10 : 18}
              x={p.x === 0 ? 0 : p.x < 0 ? -22 : 16}
              textAnchor="middle"
              className="fill-off-black font-mono text-[10px] tracking-[0.04em] uppercase"
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
      <rect x={-50} y={-50} width={100} height={100} rx={22} transform="rotate(45)" fill="#f6f3f1" stroke="#ecda98" strokeWidth={2} />
      <g className="hub-ring">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 30} cy={Math.sin(a) * 30} r={i % 3 === 0 ? 3.4 : 2.6} fill="#242424" />;
        })}
      </g>
      <image href="/brand/landing-mark-ink-256.png" x={-14} y={-12} width={28} height={24} />
    </g>
  );
}

function Defs({ glow }: { glow: string }) {
  /* Each layout gets its own id: the wide SVG is display:none on a phone,
     and a gradient referenced out of a hidden SVG does not paint. */
  return (
    <defs>
      <radialGradient id={glow}>
        <stop offset="0" stopColor="#a7fccd" stopOpacity="0.95" />
        <stop offset="0.45" stopColor="#bdf5c9" stopOpacity="0.55" />
        <stop offset="0.7" stopColor="#ecda98" stopOpacity="0.28" />
        <stop offset="1" stopColor="#ecda98" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

export function Pipeline() {
  return (
    <div aria-hidden="true">
      {/* ── Wide ── */}
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden h-auto w-full overflow-visible lg:block">
        <Defs glow="hub-glow-wide" />
        <g fill="none" stroke="#cecac8" strokeWidth={1.5}>
          {SOURCES.map((_, i) => <path key={`i${i}`} d={inPath(i)} />)}
          {OUTCOMES.map((_, i) => <path key={`o${i}`} d={outPath(i)} />)}
        </g>
        <g fill="none" stroke="#797776" strokeWidth={1.5} strokeLinecap="round" className="motion">
          {SOURCES.map((_, i) => <path key={`fi${i}`} d={inPath(i)} className="flow" />)}
          {OUTCOMES.map((_, i) => <path key={`fo${i}`} d={outPath(i)} className="flow flow--out" />)}
        </g>

        <g transform={`translate(${CX} ${CY}) scale(1.3)`}>
          <Hub glow="hub-glow-wide" />
        </g>

        <g className="motion">
          {IN_PACKETS.map((p) => (
            <Packet key={p.text} d={inPath(p.line)} text={p.text} begin={p.begin} dur={4.2} />
          ))}
          {OUT_PACKETS.map((p) => (
            <Packet key={p.text} d={outPath(p.line)} text={p.text} begin={p.begin} dur={3.6} />
          ))}
        </g>

        {SOURCES.map((n, i) => (
          <Pill key={n.label} node={n} x={LEFT_EDGE} y={inY(i)} align="end" delay={i * 0.6} />
        ))}
        {OUTCOMES.map((n, i) => (
          <Pill key={n.label} node={n} x={RIGHT_EDGE} y={outY(i)} align="start" />
        ))}
      </svg>

      {/* ── Narrow ── */}
      <div className="lg:hidden">
        <ul className="flex flex-wrap justify-center gap-2">
          {SOURCES.map((n) => {
            const Icon = n.icon!;
            return (
              <li key={n.label} className="flex items-center gap-2 rounded-pill border border-ash bg-[#fbfaf9] px-3.5 py-2 text-caption tracking-[0.05em] uppercase">
                <Icon className="size-3.5" strokeWidth={1.5} />
                {n.label}
              </li>
            );
          })}
        </ul>
        <svg viewBox="-170 -150 340 300" className="mx-auto my-2 h-auto w-full max-w-[300px] overflow-visible">
          <Defs glow="hub-glow-narrow" />
          <g fill="none" stroke="#797776" strokeWidth={1.5} className="motion">
            <path d="M0 -150 V-120" className="flow" />
            <path d="M0 120 V150" className="flow flow--out" />
          </g>
          <Hub glow="hub-glow-narrow" />
        </svg>
        <ul className="flex flex-wrap justify-center gap-2">
          {OUTCOMES.map((n) => (
            <li key={n.label} className="rounded-pill border border-ash bg-[#eef5ef] px-3.5 py-2 text-caption tracking-[0.05em] uppercase">
              {n.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
