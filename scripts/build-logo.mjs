/**
 * Rebuilds the brand mark into clean, square, tightly-cropped assets.
 *
 * The source is a 2400x1792 JPEG in which the artwork occupies only 16.8% of
 * the canvas, sitting off-centre in a field of flat orange. Two problems come
 * from that. Anything that squares it — a favicon, or the footer's `w-8 h-8`
 * box — crops to the middle of the canvas and shows mostly empty orange. And
 * the flat field still carries faint diagonal residue from the watermark that
 * was painted out of it, visible under a 6x contrast stretch.
 *
 * Both are solved by not resampling the source at all. The mark is pure black
 * on one flat colour, so each pixel is reconstructed from how black it is:
 *
 *     t = (bg.g - px.g) / bg.g        0 = background, 1 = ink
 *
 * and the output is that ratio blended between a pure orange and a pure black.
 * Antialiased edges survive as intermediate values, JPEG noise and watermark
 * residue do not survive at all, because nothing between the two endpoints is
 * carried over — only the ratio is.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/footerLogo/output-image.jpeg";
const OUT_DIR = "public/brand";

/** Brand orange, sampled from the source and then used as an exact constant. */
const BG = [255, 139, 0];
const INK = [0, 0, 0];

/** Art bounding box, measured rather than eyeballed. */
const ART = { x0: 880, x1: 1802, y0: 562, y1: 1342 };

/**
 * Square side. The art is 923x781, so 1100 leaves ~8% margin on the wide axis
 * — deliberately tight, because a favicon is read at 16px and generous
 * padding there just shrinks the only part anyone can see.
 */
const SIDE = 1100;

const cx = Math.round((ART.x0 + ART.x1) / 2);
const cy = Math.round((ART.y0 + ART.y1) / 2);
const left = cx - SIDE / 2;
const top = cy - SIDE / 2;

const { data, info } = await sharp(SRC)
  .extract({ left, top, width: SIDE, height: SIDE })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const n = info.width * info.height;
const flat = Buffer.alloc(n * 4); // opaque, orange field
const cut = Buffer.alloc(n * 4); //  transparent field, ink only

for (let i = 0; i < n; i++) {
  const g = data[i * info.channels + 1];
  // 0 where the pixel matches the background, 1 where it is full ink.
  const t = Math.min(1, Math.max(0, (BG[1] - g) / BG[1]));

  for (let c = 0; c < 3; c++) {
    flat[i * 4 + c] = Math.round(BG[c] + (INK[c] - BG[c]) * t);
    cut[i * 4 + c] = INK[c];
  }
  flat[i * 4 + 3] = 255;
  cut[i * 4 + 3] = Math.round(t * 255);
}

await mkdir(OUT_DIR, { recursive: true });
const raw = { raw: { width: info.width, height: info.height, channels: 4 } };

/** The mark as it should appear anywhere it needs its own background. */
await sharp(flat, raw).png({ compressionLevel: 9 }).toFile(`${OUT_DIR}/logo.png`);

/** Ink on transparency, for placing on the site's own black. */
await sharp(cut, raw).png({ compressionLevel: 9 }).toFile(`${OUT_DIR}/logo-mark.png`);

/* 512 is what the manifest declares and what Next serves as the icon; 180 is
   what iOS asks for. Downscaling once here beats the browser doing it badly
   from 1100 on every paint. */
for (const size of [512, 180, 32]) {
  await sharp(flat, raw)
    .resize(size, size, { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT_DIR}/logo-${size}.png`);
}

console.log(`built from ${SIDE}x${SIDE} crop at (${left},${top})`);
