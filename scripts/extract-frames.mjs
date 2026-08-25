#!/usr/bin/env node
/**
 * Regenerates the scroll-scrub frame sequence from the source video.
 *
 * The frames are a derived artifact — ~23MB of JPEGs decoded from a 2.9MB
 * mp4 — so they are gitignored and rebuilt on demand instead of committed.
 * `prebuild` runs this, which means a fresh clone (or a CI/Vercel build,
 * where the frames will never exist) produces them automatically.
 *
 * Already-complete sequences are left alone, so local builds skip the work.
 * Pass --force to rebuild regardless.
 *
 * Uses the ffmpeg binary from `ffmpeg-static`, so this runs the same on
 * macOS and on the Linux containers CI and Vercel build in.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import ffmpeg from "ffmpeg-static";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Keep in sync with FRAME_COUNT in lib/scrub/config.ts. */
const FRAME_COUNT = 178;
const FPS = 24;
/** Source resolution — never upscale, there is nothing to gain. */
const WIDTH = 1280;
/** ffmpeg JPEG quality: 2 is near-lossless, which near-black frames need to
 *  avoid visible banding in the dark gradients. */
const QUALITY = 2;

const SRC = join(root, "public", "assets", "final.mp4");
const OUT = join(root, "public", "assets", "frames");

const force = process.argv.includes("--force");

if (!existsSync(SRC)) {
  console.error(`✗ Source video missing: ${SRC}`);
  console.error("  The scroll sequence cannot be built without it.");
  process.exit(1);
}

/* Match the exact naming only. Editors and cloud-sync clients drop stray
   copies ("frame_0007 2.jpg") into synced folders, and counting those would
   trigger a pointless rebuild on every single build. */
const FRAME_RE = /^frame_\d{4}\.jpg$/;
const countFrames = () =>
  existsSync(OUT) ? readdirSync(OUT).filter((f) => FRAME_RE.test(f)).length : 0;

const existing = countFrames();

if (existing === FRAME_COUNT && !force) {
  console.log(`✓ ${FRAME_COUNT} frames already present — skipping.`);
  process.exit(0);
}

if (existing > 0) {
  console.log(`· Found ${existing}/${FRAME_COUNT} frames — rebuilding.`);
  rmSync(OUT, { recursive: true, force: true });
}

mkdirSync(OUT, { recursive: true });
console.log(`· Extracting ${FRAME_COUNT} frames at ${WIDTH}px…`);

execFileSync(
  ffmpeg,
  [
    "-hide_banner",
    "-loglevel", "error",
    "-i", SRC,
    "-vf", `fps=${FPS},scale=${WIDTH}:-2`,
    "-qscale:v", String(QUALITY),
    "-frames:v", String(FRAME_COUNT),
    "-start_number", "0",
    join(OUT, "frame_%04d.jpg"),
  ],
  { stdio: "inherit" },
);

const written = countFrames();

if (written !== FRAME_COUNT) {
  console.error(`✗ Expected ${FRAME_COUNT} frames, produced ${written}.`);
  console.error("  Check FPS/FRAME_COUNT against the source video duration.");
  process.exit(1);
}

console.log(`✓ Wrote ${written} frames to public/assets/frames`);
