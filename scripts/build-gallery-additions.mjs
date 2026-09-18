/**
 * Web copies of the gallery photographs added in September 2026.
 *
 * The files arrived with camera and messaging-app names (two of them 4MB
 * camera originals at 4240px), so each is written as `gallery-NN.webp`,
 * continuing the numbering after the first ten, with its long edge capped at
 * 2048px. The originals are left untouched in `public/gallery/`.
 *
 * Run:  node scripts/build-gallery-additions.mjs
 * It prints each output's size for `galleryDims` in `content/gallery.ts`.
 */
import sharp from "sharp";

const DIR = "public/gallery";
const FILES = [
  "_.jpeg",
  "1 nov.JPG",
  "WhatsApp Image 2026-09-14 at 17.28.59 (16).jpeg",
  "91.jpg",
  "083a12358faf9b76c5361f1d448e072d.jpg",
  "6a93655e5b303c2f4c96e0eaa2681fb1.jpg",
  "__edited.jpeg",
  "3 nov.JPG",
  "WhatsApp Image 2026-09-15 at 17.44.07 (1).jpeg",
];

for (const [i, src] of FILES.entries()) {
  const out = `${DIR}/gallery-${String(11 + i).padStart(2, "0")}.webp`;
  const info = await sharp(`${DIR}/${src}`)
    .rotate()
    .resize(2048, 2048, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`${out}  [${info.width}, ${info.height}]  ${Math.round(info.size / 1024)}KB`);
}
