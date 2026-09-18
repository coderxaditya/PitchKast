/**
 * Round portraits for the "client circle" wall, from `public/client-circle/`.
 *
 * The sources are whatever each client had to hand: square headshots, wide
 * event shots, a selfie with a colleague, screenshots. Each is cropped to a
 * square around the face (and a little shoulder, so the circle reads as a
 * portrait rather than a close-up) and written as a 320px colour WebP. The
 * wall renders them in greyscale and brings the colour back on hover.
 *
 * Run:  node scripts/build-client-circle.mjs
 */
import { mkdir, readdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/client-circle";
const OUT = "public/client-circle/web";
const SIZE = 320;

/* In the wall's reading order. `src` is the start of the file name (macOS
   puts a narrow no-break space before "PM" in screenshot names, so those are
   matched by prefix). `crop` is [left, top, side] in source pixels; without
   one the whole (already square) frame is used. */
const FILES = [
  { src: "1557338001313.jpeg" },
  { src: "1679484383600.jpeg" },
  { src: "1783009462485.png", crop: [150, 0, 560] },
  { src: "1769783928604.jpeg", crop: [200, 60, 600] },
  { src: "3kHP1j7uIBZTa7xbyia9eXkE0tzIHodNAYz8zyqo___345w.webp", crop: [40, 0, 250] },
  { src: "donadio-e-leonardo-pucrs-print.webp", crop: [180, 0, 550] },
  { src: "images (1).jpeg", crop: [100, 0, 240] },
  { src: "images (2).jpeg", crop: [110, 0, 452] },
  { src: "images (3).jpeg", crop: [45, 0, 210] },
  { src: "images.jpeg", crop: [20, 10, 320] },
  { src: "medium_DSC_7223_83f78ad6b7.jpg", crop: [20, 60, 390] },
  { src: "Screenshot 2026-08-20 at 2.35.23", crop: [20, 0, 480] },
  { src: "Screenshot 2026-08-20 at 2.39.39", crop: [0, 20, 302] },
  { src: "Screenshot 2026-08-20 at 2.40.40", crop: [110, 20, 380] },
  { src: "Screenshot 2026-08-20 at 2.42.01", crop: [30, 0, 330] },
];

const names = await readdir(SRC);
await mkdir(OUT, { recursive: true });
for (const [i, f] of FILES.entries()) {
  const name = names.find((n) => n.startsWith(f.src));
  if (!name) throw new Error(`No file starting "${f.src}" in ${SRC}`);
  let img = sharp(`${SRC}/${name}`).rotate();
  if (f.crop) {
    const [left, top, side] = f.crop;
    img = img.extract({ left, top, width: side, height: side });
  }
  const out = `${OUT}/client-${String(i + 1).padStart(2, "0")}.webp`;
  await img.resize(SIZE, SIZE, { fit: "cover" }).webp({ quality: 82 }).toFile(out);
  console.log(out);
}
