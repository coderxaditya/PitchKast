/**
 * Turns the landing wordmark into a transparent PNG.
 *
 * The source is white line-art on an opaque black field, drawn on the
 * assumption that black-on-black would read as "floating". It does not: the
 * navbar pill is `liquid-glass` — `rgba(255,255,255,0.01)` with a rim light —
 * so an opaque black rectangle sits inside a rounded pill as a visible square,
 * and the same file would be wrong anywhere else on the site that is not pure
 * #000.
 *
 * The art is pure white on pure black, which makes the conversion exact
 * rather than a matte: luminance *is* the alpha. Every pixel keeps white as
 * its colour and takes its own brightness as opacity, so anti-aliased edges
 * survive as partial alpha instead of turning into a halo.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/landingLogo/Codex Image Aug 26, 2026, 01_48_25 PM.png";
const OUT_DIR = "public/brand";

/** Measured, not eyeballed: the ink's bounding box in the source. */
const ART = { x0: 240, x1: 1166, y0: 201, y1: 973 };
/** A little air so the mark never touches the pill's inner edge. */
const PAD = 26;

const left = ART.x0 - PAD;
const top = ART.y0 - PAD;
const width = ART.x1 - ART.x0 + 1 + PAD * 2;
const height = ART.y1 - ART.y0 + 1 + PAD * 2;

const { data, info } = await sharp(SRC)
  .extract({ left, top, width, height })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const n = info.width * info.height;
const out = Buffer.alloc(n * 4);

for (let i = 0; i < n; i++) {
  const s = i * info.channels;
  /* Rec. 709 luma. The art is neutral, so any weighting lands in the same
     place — this one is simply the honest choice for "how bright is it". */
  const luma =
    0.2126 * data[s] + 0.7152 * data[s + 1] + 0.0722 * data[s + 2];

  out[i * 4] = 255;
  out[i * 4 + 1] = 255;
  out[i * 4 + 2] = 255;
  out[i * 4 + 3] = Math.round(Math.min(255, luma));
}

await mkdir(OUT_DIR, { recursive: true });
const raw = { raw: { width: info.width, height: info.height, channels: 4 } };

await sharp(out, raw)
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/landing-mark.png`);

/* The nav renders it at 48px tall; 256 covers 3x displays without shipping
   the full 1324px source to every visitor. */
await sharp(out, raw)
  .resize({ height: 256, fit: "inside", kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/landing-mark-256.png`);

console.log(`cropped ${width}x${height} from (${left},${top})`);
