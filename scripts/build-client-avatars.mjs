/**
 * Square avatars for the testimonial cards, from `public/clientImages/`.
 *
 * The sources arrive as whatever the client sent: portraits, wide event shots,
 * a screenshot with a circle already in it, and file names with spaces. Each
 * is cropped to a square around the face (sharp's "attention" strategy finds
 * the most salient region) and written as a 176px WebP, four times the 44px
 * avatar so it stays sharp on a dense screen.
 *
 * Run:  node scripts/build-client-avatars.mjs
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/clientImages";
const OUT = "public/testimonials";

/* Source file → output name. `crop` overrides the automatic crop where the
   face is not the most salient thing in the frame: [left, top, size] as
   fractions of the source's width, height and shorter side. */
const FILES = [
  { src: "Rightlin.jpeg", out: "rightlin" },
  { src: "Saumya Alagh.jpeg", out: "saumya-alagh", crop: [0.3, 0.03, 0.4] },
  { src: "Amir-Mulani.jpeg", out: "amir-mulani", crop: [0.27, 0, 0.55] },
  { src: "Maaz-Ansari.jpeg", out: "maaz-ansari", crop: [0.344, 0.07, 0.5] },
  { src: "Dr.Nachiket Bhatia.jpeg", out: "nachiket-bhatia", crop: [0.275, 0.11, 0.45] },
  { src: "Kannan-Gopinathan.jpeg", out: "kannan-gopinathan", crop: [0.33, 0.08, 0.6] },
  { src: "WhatsApp Image 2026-09-18 at 11.16.30.jpeg", out: "client-7" },
];

await mkdir(OUT, { recursive: true });
for (const f of FILES) {
  const img = sharp(`${SRC}/${f.src}`).rotate();
  let pipeline = img;
  if (f.crop) {
    const { width, height } = await img.metadata();
    const side = Math.round(Math.min(width, height) * f.crop[2]);
    pipeline = img.extract({
      left: Math.round(width * f.crop[0]),
      top: Math.round(height * f.crop[1]),
      width: side,
      height: side,
    });
  }
  await pipeline
    .resize(176, 176, { fit: "cover", position: f.crop ? "centre" : sharp.strategy.attention })
    .webp({ quality: 86 })
    .toFile(`${OUT}/${f.out}.webp`);
}
console.log(`${FILES.length} avatars written to ${OUT}`);
