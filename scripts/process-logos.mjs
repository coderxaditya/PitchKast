/**
 * One-off: turn the raw logo uploads into a uniform black-and-white strip.
 *
 * The uploads are screenshots, not brand assets: 2048px JPEGs, so no
 * transparency, and several carry a solid coloured field with the mark
 * reversed out of it. Dropped onto the white band those read as coloured
 * tiles, and `filter: grayscale()` only makes them grey tiles.
 *
 * The levels work is done on raw pixels rather than through sharp's operation
 * chain, because sharp applies negate/linear in its own fixed pipeline order
 * rather than the order they are called in — which silently produced a dark
 * tile for the reversed marks and blew out a washed one.
 *
 * Per image: grayscale -> invert if the field is dark -> stretch the field to
 * true white -> trim -> fit to a common height.
 */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/logos-source";
const OUT = "public/logos";
const TARGET_H = 300;          // renders ~48px tall, so this covers 3x DPR
const REVERSED_BELOW = 160;    // field darker than this means a reversed mark

const percentile = (arr, p) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(s.length * p))];
};

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
await mkdir(OUT, { recursive: true });

const report = [];
let n = 0;
for (const f of files) {
  n += 1;

  const { data, info } = await sharp(path.join(SRC, f))
    .grayscale()
    .resize({ height: TARGET_H * 2, fit: "inside", withoutEnlargement: false })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: W, height: H } = info;

  // the 1px frame around the image is the field the mark sits on
  const frame = [];
  for (let x = 0; x < W; x++) { frame.push(data[x], data[(H - 1) * W + x]); }
  for (let y = 0; y < H; y++) { frame.push(data[y * W], data[y * W + W - 1]); }

  const fieldMedian = percentile(frame, 0.5);
  const reversed = fieldMedian < REVERSED_BELOW;
  if (reversed) for (let i = 0; i < data.length; i++) data[i] = 255 - data[i];

  /* White point from the 10th percentile of the field, not its mean. One
     source has a transparency checkerboard baked in, whose two greys average
     to something the mean cannot lift — taking a low percentile picks the
     darker square, so both flatten to white together. */
  const lit = reversed ? frame.map((v) => 255 - v) : frame;
  const white = Math.max(120, percentile(lit, 0.1));
  const gain = Math.min(2.8, Math.max(1, 255 / white));
  for (let i = 0; i < data.length; i++) {
    const v = Math.min(255, Math.round(data[i] * gain));
    /* Snap a near-white field to true white. Without this a source whose field
       is not quite uniform lands a few levels short — one came out at 240,240,240,
       which reads as a faint grey box against the band. Real ink sits far below
       this cut, so nothing in a mark is touched. */
    data[i] = v >= 236 ? 255 : v;
  }

  /* The uploads carry a small four-point sparkle in the bottom-right corner —
     a generator watermark, not part of any mark. It survives the levels pass
     as a dark speck, which defeats the trim below: the image keeps its full
     field and the logo then renders smaller than its neighbours. Painting that
     corner out first lets every logo trim to its own ink. */
  const cw = Math.round(W * 0.08), ch = Math.round(H * 0.08);
  for (let y = H - ch; y < H; y++) {
    for (let x = W - cw; x < W; x++) data[y * W + x] = 255;
  }

  const out = path.join(OUT, `logo-${String(n).padStart(2, "0")}.png`);
  const res = await sharp(data, { raw: { width: W, height: H, channels: 1 } })
    .trim({ background: "#ffffff", threshold: 14 })
    .resize({ height: TARGET_H, fit: "inside", withoutEnlargement: false })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);

  report.push({ n, reversed, field: fieldMedian, white, gain: +gain.toFixed(2),
                out: path.basename(out), size: `${res.width}x${res.height}`,
                kb: Math.round(res.size / 1024) });
}
console.table(report);
console.log("total KB:", report.reduce((a, r) => a + r.kb, 0));
