import sharp from "sharp";
import { readdir } from "node:fs/promises";
const files = (await readdir("public/logos")).filter(f => f.endsWith(".png")).sort();
const CW = 520, CH = 200, COLS = 3;
const rows = Math.ceil(files.length / COLS);
const tiles = [];
for (let i = 0; i < files.length; i++) {
  const buf = await sharp(`public/logos/${files[i]}`)
    .resize({ width: CW - 24, height: CH - 40, fit: "inside" })
    .extend({ top: 8, bottom: 8, left: 8, right: 8, background: "#fff" })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  tiles.push({
    input: buf,
    left: (i % COLS) * CW + Math.round((CW - meta.width) / 2),
    top: Math.floor(i / COLS) * CH + Math.round((CH - meta.height) / 2),
  });
  // label strip
  const label = Buffer.from(
    `<svg width="${CW}" height="20"><text x="8" y="15" font-family="monospace" font-size="14" fill="#c00">${i + 1}</text></svg>`);
  tiles.push({ input: label, left: (i % COLS) * CW, top: Math.floor(i / COLS) * CH });
}
await sharp({ create: { width: CW * COLS, height: CH * rows, channels: 3, background: "#efefef" } })
  .composite(tiles).png().toFile("/tmp/logo-sheet.png");
console.log("rows", rows, "files", files.length);
