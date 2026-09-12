/**
 * Cuts the hero's floating artifacts out of the portal screenshots.
 *
 * The six fragments that assemble into the dashboard are real crops of the
 * PitchKast client portal, not reconstructions of it. Cropping at build time
 * rather than with CSS matters for two reasons: the browser never downloads
 * the 1280×832 frame to show a 300px slice of it, and the crop rectangle
 * lives here as four numbers that can be re-measured, instead of as an
 * `object-position` somebody has to guess at later.
 *
 * Every source carries a dark window bar across its first ~28 rows and a page
 * chrome around the edges; every rectangle below starts inside that.
 *
 * Run:  node scripts/build-portal-crops.mjs
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/portal-images";
const OUT = "public/portal";

/* Sources are named by the moment WhatsApp compressed them, which says
   nothing about what they show. Matched by their timestamp fragment so the
   rectangles below can be read against a name. */
const SOURCES = {
  overview: "17.51.19", // greeting, stat row, "waiting on you" queue
  activity: "17.55.00", // "coming up" beside the activity feed
  calendar: "18.00.13", // the month grid
};

/** left, top, width, height — in the 1280×832 source. */
const CROPS = [
  {
    name: "stats",
    from: "overview",
    rect: { left: 38, top: 236, width: 1204, height: 122 },
  },
  {
    name: "queue",
    from: "overview",
    /* Ends on a row boundary — a list cut through the middle of a row
       reads as a rendering fault rather than as a crop. */
    rect: { left: 46, top: 382, width: 1196, height: 252 },
  },
  {
    name: "upcoming",
    from: "activity",
    rect: { left: 96, top: 108, width: 542, height: 298 },
  },
  {
    name: "calendar",
    from: "calendar",
    rect: { left: 96, top: 228, width: 1092, height: 448 },
  },
  {
    name: "feed",
    from: "activity",
    rect: { left: 644, top: 108, width: 548, height: 420 },
  },
];

const files = await readdir(SRC);
const resolve = (stamp) => {
  const hit = files.find((f) => f.includes(stamp));
  if (!hit) throw new Error(`No screenshot in ${SRC} matching "${stamp}"`);
  return path.join(SRC, hit);
};

await mkdir(OUT, { recursive: true });

const manifest = [];
for (const crop of CROPS) {
  const file = resolve(SOURCES[crop.from]);
  const out = path.join(OUT, `${crop.name}.webp`);

  /* 2× the size they are rendered at, capped at the source's own pixels —
     these are screenshots, so upscaling would only blur them. */
  await sharp(file)
    .extract(crop.rect)
    .webp({ quality: 88 })
    .toFile(out);

  const { width, height, size } = await sharp(out).metadata();
  manifest.push({ name: crop.name, width, height, kb: Math.round(size / 102.4) / 10 });
}

console.table(manifest);
