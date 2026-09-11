/**
 * The footer mark: the supplied artwork as a square orange tile.
 *
 * The source is black line art on a solid orange field, 2400x1792, with the
 * artwork covering 4% of that canvas. Used directly it renders an almost empty
 * orange rectangle, so this crops a square around the art's measured bounding
 * box and keeps the file's own colours exactly as they are — orange field,
 * black ink. No alpha extraction and no recolouring: the tile *is* the logo.
 *
 * The footer rounds the corners in CSS rather than baking them in, so the
 * radius stays tied to the design system's own value.
 */
import sharp from "sharp";

const SRC = "public/footerLogo/output-image.jpeg";
const OUT_DIR = "public/brand";

/** The ink's bounding box in the source. Measured, not eyeballed. */
const ART = { x0: 880, x1: 1802, y0: 562, y1: 1342 };
/** Field left around the art on the square's longest side. */
const PAD = 60;

const artW = ART.x1 - ART.x0 + 1;
const artH = ART.y1 - ART.y0 + 1;
/* Square, centred on the art: the tile has to be square or the rounded corners
   read as a lozenge, and centring on the art rather than on the canvas is what
   stops the mark drifting off to one side. */
const side = Math.max(artW, artH) + PAD * 2;
const left = Math.round((ART.x0 + ART.x1) / 2 - side / 2);
const top = Math.round((ART.y0 + ART.y1) / 2 - side / 2);

const tile = sharp(SRC).extract({ left, top, width: side, height: side });

/* PNG, not JPEG: two flat colours and hard edges are exactly the case where
   JPEG's chroma subsampling shows, and a palette PNG of this is far smaller
   than the 310KB source besides. */
await tile
  .clone()
  .resize({ width: 256, kernel: "lanczos3" })
  .png({ compressionLevel: 9, palette: true })
  .toFile(`${OUT_DIR}/footer-mark-256.png`);

console.log(`cropped ${side}x${side} from (${left},${top})`);
