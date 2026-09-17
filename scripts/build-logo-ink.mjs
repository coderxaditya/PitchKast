/**
 * Transparent, solid-black cuts of the client logos.
 *
 * The files in `public/logos` are black marks on an opaque white field, made
 * for the white client strip. On any other ground that white shows as a box.
 * Blending it away with `mix-blend-mode: multiply` only works while nothing
 * isolates the logo, and the logo strip's moving track does: an animated
 * transform puts the row on its own layer, where the logo blends against
 * transparency instead of the parchment, so every mark showed a white box.
 *
 * So the white is removed from the pixels instead. Each pixel's darkness
 * becomes its alpha and its colour becomes pure black. Grey marks such as
 * Cotton Culture's bars and Ice Global's dots come out black too.
 *
 * `GAIN` pushes greys toward full black. Anti-aliased edges keep their
 * softness, because a pixel only becomes fully opaque once it is dark enough.
 *
 * Run:  node scripts/build-logo-ink.mjs
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/logos";
const OUT = "public/logos/ink";
const GAIN = 1.9;

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => f.endsWith(".png"));
for (const file of files) {
  const { data, info } = await sharp(path.join(SRC, file))
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const lum = data[i * info.channels];
    rgba[i * 4 + 3] = Math.min(255, Math.round((255 - lum) * GAIN));
  }

  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, file));
}

console.log(`${files.length} logos written to ${OUT}`);
