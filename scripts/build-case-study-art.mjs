/**
 * Renders the case-study card artwork into `public/case-studies/`.
 *
 * Each study gets a scene in the style of the reference boards in
 * `public/caseStudies/` (dark ground, a glass dashboard card, a glowing
 * chart) drawn as SVG and rasterised by sharp, so every number on a picture
 * is the study's own result and nothing is invented. Two crops per study:
 * `-square` (featured cards, and every card on a phone) and `-wide` (the
 * stacked cards from 640px up).
 *
 *   node scripts/build-case-study-art.mjs [--only=1-square]
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public/case-studies");
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);

/* ── Palettes, one per reference board ─────────────────────────── */
const THEMES = {
  /* Deep navy ground, an electric-blue card lit from its lower edge. */
  blue: {
    ground: ["#0a111d", "#060a12"],
    glow: "#2f6dff",
    line: "#8fc2ff",
    lineCore: "#dcecff",
    card: ["#10213f", "#050b17"],
    rim: "#6aa6ff",
    edge: "#bfe0ff",
    ink: "#ffffff",
    muted: "#9fb3cf",
    chip: "rgba(160,200,255,0.14)",
  },
  /* Graphite ground under a fine dot grid, a frosted lavender glass card. */
  lavender: {
    ground: ["#23242c", "#131419"],
    glow: "#8e8cff",
    line: "#ffffff",
    lineCore: "#ffffff",
    card: ["#4a4a66", "#26263a"],
    rim: "#b9b8e8",
    edge: "#d8d6ff",
    ink: "#ffffff",
    muted: "#c3c2dc",
    chip: "rgba(255,255,255,0.12)",
  },
  /* Near-black violet, a tilted glass panel with a purple rim and a floor glow. */
  violet: {
    ground: ["#0b0918", "#030208"],
    glow: "#7b4dff",
    line: "#c7a8ff",
    lineCore: "#f1e8ff",
    card: ["#140f2b", "#07060f"],
    rim: "#9c7bff",
    edge: "#d9c8ff",
    ink: "#ffffff",
    muted: "#a79fc6",
    chip: "rgba(156,123,255,0.16)",
  },
};

/* ── Shared SVG pieces ─────────────────────────────────────────── */
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function defs(t, id) {
  return `
  <defs>
    <radialGradient id="${id}-spot" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${t.glow}" stop-opacity="0.35"/>
      <stop offset="0.55" stop-color="${t.glow}" stop-opacity="0.06"/>
      <stop offset="1" stop-color="${t.glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${t.ground[0]}"/>
      <stop offset="1" stop-color="${t.ground[1]}"/>
    </linearGradient>
    <radialGradient id="${id}-card" cx="30%" cy="0%" r="110%">
      <stop offset="0" stop-color="${t.card[0]}"/>
      <stop offset="1" stop-color="${t.card[1]}"/>
    </radialGradient>
    <radialGradient id="${id}-inner" cx="50%" cy="100%" r="75%">
      <stop offset="0" stop-color="${t.glow}" stop-opacity="0.55"/>
      <stop offset="0.6" stop-color="${t.glow}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${t.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${id}-sheen" cx="15%" cy="0%" r="70%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.7" stop-color="${t.glow}" stop-opacity="0"/>
      <stop offset="0.9" stop-color="${t.glow}" stop-opacity="0.7"/>
      <stop offset="0.975" stop-color="${t.edge}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="${id}-area" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${t.line}" stop-opacity="0.42"/>
      <stop offset="1" stop-color="${t.line}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${id}-rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.rim}" stop-opacity="0.9"/>
      <stop offset="0.5" stop-color="${t.rim}" stop-opacity="0.25"/>
      <stop offset="1" stop-color="${t.rim}" stop-opacity="0.7"/>
    </linearGradient>
    <filter id="${id}-blur-lg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
    <filter id="${id}-blur-md" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
    <filter id="${id}-blur-sm" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="${id}-shadow" x="-30%" y="-30%" width="160%" height="170%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="40"/>
      <feOffset dy="50"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.75"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="${id}-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.12"/></feComponentTransfer>
    </filter>
    <pattern id="${id}-dots" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="#ffffff" fill-opacity="0.07"/>
    </pattern>
  </defs>`;
}

function ground(t, id, W, H, { dots = false, spotX = 0.5, spotY = 0.38 } = {}) {
  return `
  <rect width="${W}" height="${H}" fill="url(#${id}-ground)"/>
  ${dots ? `<rect width="${W}" height="${H}" fill="url(#${id}-dots)"/>` : ""}
  <ellipse cx="${W * spotX}" cy="${H * spotY}" rx="${W * 0.62}" ry="${H * 0.55}" fill="url(#${id}-spot)"/>
  <rect width="${W}" height="${H}" filter="url(#${id}-grain)" opacity="0.9"/>`;
}

/** A smooth line through points (Catmull-Rom to cubic Bézier). */
function smooth(pts) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/** Map a 0..1 shape into a box. */
const place = (shape, x, y, w, h) => shape.map(([u, v]) => [x + u * w, y + (1 - v) * h]);

function glowLine(t, id, d, width = 5) {
  return `
    <path d="${d}" fill="none" stroke="${t.line}" stroke-width="${width * 6}" stroke-linecap="round" opacity="0.35" filter="url(#${id}-blur-md)"/>
    <path d="${d}" fill="none" stroke="${t.line}" stroke-width="${width * 2}" stroke-linecap="round" opacity="0.55" filter="url(#${id}-blur-sm)"/>
    <path d="${d}" fill="none" stroke="${t.lineCore}" stroke-width="${width}" stroke-linecap="round"/>`;
}

function dot(t, id, [x, y], r = 16) {
  return `
    <circle cx="${x}" cy="${y}" r="${r * 3}" fill="${t.line}" opacity="0.35" filter="url(#${id}-blur-md)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${t.lineCore}"/>
    <circle cx="${x}" cy="${y}" r="${r + 7}" fill="none" stroke="${t.lineCore}" stroke-opacity="0.35" stroke-width="3"/>`;
}

function text(x, y, s, { size, weight = 400, fill = "#fff", anchor = "start", spacing = 0, opacity = 1 }) {
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" fill-opacity="${opacity}" text-anchor="${anchor}" letter-spacing="${spacing}">${esc(s)}</text>`;
}

function chip(t, x, y, label, { size = 26, anchor = "start", fill } = {}) {
  const w = label.length * size * 0.56 + size * 1.6;
  const h = size * 1.9;
  const left = anchor === "end" ? x - w : anchor === "middle" ? x - w / 2 : x;
  return `
    <rect x="${left}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill || t.chip}" stroke="#ffffff" stroke-opacity="0.14" stroke-width="2"/>
    ${text(left + w / 2, y + h * 0.66, label, { size, fill: t.ink, anchor: "middle", opacity: 0.9 })}`;
}

/** The glass card: shadow, body, sheen, rim, optional lit lower edge. */
function card(t, id, x, y, w, h, r, { lit = false } = {}) {
  return `
    <rect x="${x - w * 0.02}" y="${y + h * 0.05}" width="${w * 1.04}" height="${h}" rx="${r}" fill="${t.glow}" opacity="0.22" filter="url(#${id}-blur-lg)"/>
    <rect x="${x + w * 0.08}" y="${y + h * 0.9}" width="${w * 0.84}" height="${h * 0.14}" rx="${h * 0.07}" fill="${t.glow}" opacity="0.28" filter="url(#${id}-blur-lg)"/>
    <g filter="url(#${id}-shadow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${id}-card)"/>
    </g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${id}-inner)"/>
    ${lit ? `<rect x="${x - w * 0.02}" y="${y + h * 0.9}" width="${w * 1.04}" height="${h * 0.16}" rx="${h * 0.08}" fill="${t.glow}" opacity="0.7" filter="url(#${id}-blur-md)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${id}-edge)"/>` : ""}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${id}-sheen)"/>
    <rect x="${x + 1.5}" y="${y + 1.5}" width="${w - 3}" height="${h - 3}" rx="${r - 1.5}" fill="none" stroke="url(#${id}-rim)" stroke-width="3"/>`;
}

function gridLines(x, y, w, h, step, opacity = 0.08) {
  let s = "";
  for (let gx = x + step; gx < x + w; gx += step) s += `<line x1="${gx}" y1="${y}" x2="${gx}" y2="${y + h}" stroke="#fff" stroke-opacity="${opacity}" stroke-width="1.5"/>`;
  for (let gy = y + step; gy < y + h; gy += step) s += `<line x1="${x}" y1="${gy}" x2="${x + w}" y2="${gy}" stroke="#fff" stroke-opacity="${opacity}" stroke-width="1.5"/>`;
  return s;
}

/* ── Card contents ─────────────────────────────────────────────── */

/** A headline figure over a glowing growth line. */
function figureCard(t, id, box, c) {
  const { x, y, w, h } = box;
  const pad = w * 0.075;
  const s = w / 1000; // type scale
  const chartTop = y + h * 0.52;
  const chartH = h * (c.lit ? 0.26 : 0.34);
  const pts = place(c.shape, x + pad, chartTop, w - pad * 2, chartH);
  const d = smooth(pts);
  const end = pts[c.marker ?? pts.length - 1];
  const area = `${d} L${pts.at(-1)[0]} ${chartTop + chartH} L${pts[0][0]} ${chartTop + chartH} Z`;
  return `
    ${card(t, id, x, y, w, h, w * 0.075, { lit: c.lit })}
    <clipPath id="${id}-clip"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.075}"/></clipPath>
    <g clip-path="url(#${id}-clip)">
      ${c.grid ? gridLines(x, chartTop - chartH * 0.1, w, h - (chartTop - y) + chartH * 0.1, w / 12, 0.07) : ""}
      ${c.area ? `<path d="${area}" fill="url(#${id}-area)"/>` : ""}
      ${glowLine(t, id, d, 6 * s)}
      ${dot(t, id, end, 15 * s)}
    </g>
    ${text(x + pad, y + pad + 30 * s, c.eyebrow, { size: 30 * s, fill: t.muted, spacing: 4 * s, weight: 500 })}
    ${c.chip ? chip(t, x + w - pad, y + pad - 12 * s, c.chip, { size: 26 * s, anchor: "end" }) : ""}
    ${text(x + pad - 6 * s, y + pad + 210 * s, c.value, { size: 190 * s, weight: 700, fill: t.ink, spacing: -4 * s })}
    ${text(x + pad, y + pad + 272 * s, c.sub, { size: 34 * s, fill: t.muted })}
    ${(c.ticks || [])
      .map((label, i, all) =>
        text(x + pad + ((w - pad * 2) * i) / (all.length - 1), y + h - pad * (c.lit ? 1.35 : 0.55), label, {
          size: 24 * s,
          fill: t.muted,
          anchor: i === 0 ? "start" : i === all.length - 1 ? "end" : "middle",
          opacity: 0.8,
        }),
      )
      .join("")}`;
}

/** A list of the work, each item checked, joined by a glowing rail. */
function listCard(t, id, box, c) {
  const { x, y, w, h } = box;
  const pad = w * 0.08;
  const s = w / 1000;
  const top = y + pad + 150 * s;
  const rowH = (h - (top - y) - pad) / c.items.length;
  const railX = x + pad + 30 * s;
  const rows = c.items
    .map((label, i) => {
      const cy = top + rowH * i + rowH / 2;
      const on = i < c.done;
      return `
      <rect x="${x + pad - 20 * s}" y="${cy - rowH * 0.36}" width="${w - pad * 2 + 40 * s}" height="${rowH * 0.72}" rx="${rowH * 0.2}" fill="#ffffff" fill-opacity="${on ? 0.06 : 0.03}" stroke="#ffffff" stroke-opacity="0.1" stroke-width="2"/>
      ${on ? `<circle cx="${railX}" cy="${cy}" r="${42 * s}" fill="${t.line}" opacity="0.45" filter="url(#${id}-blur-sm)"/>` : ""}
      <circle cx="${railX}" cy="${cy}" r="${24 * s}" fill="${on ? t.lineCore : "none"}" stroke="${t.lineCore}" stroke-opacity="${on ? 1 : 0.4}" stroke-width="${3 * s}"/>
      ${on ? `<path d="M${railX - 10 * s} ${cy} l${7 * s} ${7 * s} l${13 * s} -${14 * s}" fill="none" stroke="${t.card[1]}" stroke-width="${5 * s}" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
      ${text(railX + 60 * s, cy + 13 * s, label, { size: 38 * s, weight: 500, fill: t.ink, opacity: on ? 0.95 : 0.6 })}
      <rect x="${x + w - pad - 150 * s}" y="${cy - 5 * s}" width="${150 * s}" height="${10 * s}" rx="${5 * s}" fill="#fff" fill-opacity="0.1"/>
      <rect x="${x + w - pad - 150 * s}" y="${cy - 5 * s}" width="${150 * s * (on ? 1 - i * 0.12 : 0.3)}" height="${10 * s}" rx="${5 * s}" fill="${t.line}" fill-opacity="0.9"/>`;
    })
    .join("");
  const first = top + rowH / 2;
  const last = top + rowH * (c.items.length - 0.5);
  return `
    ${card(t, id, x, y, w, h, w * 0.07, { lit: c.lit })}
    <line x1="${railX}" y1="${first}" x2="${railX}" y2="${last}" stroke="${t.line}" stroke-opacity="0.5" stroke-width="${4 * s}"/>
    ${text(x + pad, y + pad + 34 * s, c.eyebrow, { size: 30 * s, fill: t.muted, spacing: 4 * s, weight: 500 })}
    ${text(x + pad, y + pad + 104 * s, c.title, { size: 58 * s, weight: 700, fill: t.ink })}
    ${c.chip ? chip(t, x + w - pad, y + pad, c.chip, { size: 26 * s, anchor: "end" }) : ""}
    ${rows}`;
}

/* ── The studies ───────────────────────────────────────────────── */
const RISE = [[0, 0.05], [0.15, 0.1], [0.3, 0.16], [0.45, 0.3], [0.58, 0.36], [0.72, 0.58], [0.86, 0.72], [1, 0.97]];
const WAVE = [[0, 0.08], [0.16, 0.4], [0.3, 0.28], [0.44, 0.55], [0.6, 0.38], [0.74, 0.5], [0.88, 0.62], [1, 0.98]];
const HILLS = [[0, 0.04], [0.18, 0.3], [0.34, 0.2], [0.52, 0.55], [0.68, 0.42], [0.85, 0.7], [1, 1]];

const STUDIES = {
  1: {
    theme: "blue",
    kind: figureCard,
    c: { eyebrow: "ORGANIC FOLLOWERS", value: "6,300+", sub: "Grown in 30 days", chip: "100% organic", shape: RISE, grid: true, lit: true, area: false, ticks: ["Day 1", "Day 10", "Day 20", "Day 30"] },
  },
  2: {
    theme: "lavender",
    kind: figureCard,
    c: { eyebrow: "REVENUE UPLIFT", value: "33%", sub: "Across 2 markets", chip: "First result in week 1", shape: WAVE, area: true, ticks: ["United States", "Taiwan"] },
  },
  5: {
    theme: "violet",
    kind: figureCard,
    c: { eyebrow: "ORGANIC IMPRESSIONS", value: "1L+", sub: "In 3 months, 0 paid", chip: "4+ platforms", shape: HILLS, area: true, ticks: ["Month 1", "Month 2", "Month 3"] },
  },
  3: {
    theme: "blue",
    kind: listCard,
    c: { eyebrow: "PIPELINE", title: "Founder-led outreach", chip: "B2B SaaS", items: ["Founder Branding", "ICP Research", "Personalised Outreach", "Lead Generation"], done: 4, lit: true },
  },
  4: {
    theme: "lavender",
    kind: listCard,
    c: { eyebrow: "POINT OF VIEW", title: "Content system", chip: "Weekly", items: ["Personal Brand Strategy", "Profile Optimisation", "Content Creation", "Organic Engagement"], done: 4 },
  },
  6: {
    theme: "violet",
    kind: listCard,
    c: { eyebrow: "GROWTH PLAN", title: "Built per business", chip: "Egypt", items: ["Founder Branding", "Product Positioning", "Content Strategy", "Lead Generation"], done: 4 },
  },
};

/** Star specks for the lavender card, placed by a seeded generator so a
    rebuild draws the same sky. */
function stars(id, box, seed) {
  let n = seed * 9301 + 49297;
  const rand = () => ((n = (n * 9301 + 49297) % 233280) / 233280);
  let out = "";
  for (let i = 0; i < 11; i++) {
    const x = box.x + box.w * (0.58 + rand() * 0.3);
    const y = box.y + box.h * (0.2 + rand() * 0.2);
    const r = (1.5 + rand() * 3.5) * (box.w / 1000);
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 3).toFixed(1)}" fill="#fff" opacity="0.25" filter="url(#${id}-blur-sm)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.45 + rand() * 0.5).toFixed(2)}"/>`;
  }
  return out;
}

/* ── Framing: where the card sits in each crop ─────────────────── */
function scene(studyId, crop) {
  const { theme, kind, c } = STUDIES[studyId];
  const t = THEMES[theme];
  const id = `s${studyId}${crop[0]}`;
  const [W, H] = crop === "square" ? [1600, 1600] : [2000, 1000];
  /* Square: the card centred in the top part, the phone layout, where the
     picture sits above the text. Wide: the card against the right edge,
     clear of the text the page sets over the left of the picture, and
     without its chip. */
  const box =
    crop === "square"
      ? { x: W * 0.17, y: H * 0.1, w: W * 0.66, h: H * 0.5 }
      : { x: W * 0.575, y: H * 0.17, w: W * 0.38, h: H * 0.62 };
  const tilt =
    theme === "violet"
      ? `transform="rotate(-3 ${box.x + box.w / 2} ${box.y + box.h / 2}) skewX(-2)"`
      : "";
  const floor =
    theme === "violet"
      ? `<ellipse cx="${box.x + box.w / 2}" cy="${box.y + box.h + H * 0.035}" rx="${box.w * 0.42}" ry="${H * 0.025}" fill="${t.glow}" opacity="0.8" filter="url(#${id}-blur-md)"/>
         <ellipse cx="${box.x + box.w / 2}" cy="${box.y + box.h + H * 0.035}" rx="${box.w * 0.18}" ry="${H * 0.006}" fill="${t.edge}" opacity="0.9" filter="url(#${id}-blur-sm)"/>`
      : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${defs(t, id)}
  ${ground(t, id, W, H, {
    dots: theme === "lavender",
    spotX: (box.x + box.w / 2) / W,
    spotY: (box.y + box.h * 0.45) / H,
  })}
  ${floor}
  <g ${tilt}>${kind(t, id, box, crop === "wide" ? { ...c, chip: null } : c)}${theme === "lavender" && kind === figureCard ? stars(id, box, studyId) : ""}</g>
</svg>`;
}

fs.mkdirSync(OUT, { recursive: true });
for (const studyId of Object.keys(STUDIES)) {
  for (const crop of ["square", "wide"]) {
    const name = `study-${studyId}-${crop}`;
    if (only && !name.endsWith(only) && `${studyId}-${crop}` !== only) continue;
    const svg = scene(Number(studyId), crop);
    await sharp(Buffer.from(svg), { density: 72 })
      .webp({ quality: 88, smartSubsample: true })
      .toFile(path.join(OUT, `${name}.webp`));
    console.log("wrote", name);
  }
}
