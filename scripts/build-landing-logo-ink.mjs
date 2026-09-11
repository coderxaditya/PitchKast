/**
 * Ink-coloured variant of the landing wordmark.
 *
 * `build-landing-logo.mjs` produces a white mark with luminance-derived alpha,
 * which was correct while the site sat on black. The flat rebuild puts the
 * navbar on a white bar, where a white mark is invisible.
 *
 * Recolouring the finished transparent PNG rather than re-deriving from the
 * source keeps the two marks pixel-identical in shape: the alpha channel is
 * copied through untouched, so anti-aliased edges match exactly and only the
 * RGB changes. Re-running the original script regenerates the input to this
 * one, so the pair can never drift.
 */
import sharp from "sharp";

const SRC = "public/brand/landing-mark.png";
const OUT_DIR = "public/brand";

/** Gray 900 — the design system's foreground, so the mark matches body text. */
const INK = [17, 24, 39];

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const n = info.width * info.height;
const out = Buffer.alloc(n * 4);

for (let i = 0; i < n; i++) {
  const s = i * info.channels;
  out[i * 4] = INK[0];
  out[i * 4 + 1] = INK[1];
  out[i * 4 + 2] = INK[2];
  /* Alpha carried through verbatim — this is the whole point. */
  out[i * 4 + 3] = data[s + 3];
}

const raw = { raw: { width: info.width, height: info.height, channels: 4 } };

await sharp(out, raw)
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/landing-mark-ink.png`);

await sharp(out, raw)
  .resize({ height: 256, fit: "inside", kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/landing-mark-ink-256.png`);

console.log(`ink mark written from ${info.width}x${info.height}`);
