/**
 * Rasterises the country flags used by the global-reach row.
 *
 * The sources are SVGs from flagcdn, and their weights are wildly uneven:
 * Poland is 164 bytes and Spain is 153KB, because Spain's coat of arms is
 * drawn path by path. At the 40px the row renders them, none of that detail
 * survives, so shipping it is 150KB spent on nothing.
 *
 * Rasterising at 3x the display size gives every flag the same small, uniform
 * cost and keeps them crisp on a retina screen. Re-run after adding a country:
 *
 *   curl -sS -o public/flags/<code>.svg https://flagcdn.com/<code>.svg
 *   node scripts/build-flags.mjs
 */
import sharp from "sharp";
import { readdir } from "node:fs/promises";

const DIR = "public/flags";
/** 40px in the layout; 120 covers 3x displays. */
const WIDTH = 120;

const files = (await readdir(DIR)).filter((f) => f.endsWith(".svg"));

for (const file of files) {
  const code = file.replace(/\.svg$/, "");
  await sharp(`${DIR}/${file}`, { density: 300 })
    .resize({ width: WIDTH, fit: "inside", kernel: "lanczos3" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(`${DIR}/${code}.png`);
}

console.log(`rasterised ${files.length} flags at ${WIDTH}px`);
