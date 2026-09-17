/**
 * Client lockups, in file order.
 *
 * The files in `public/logos` are processed, not raw: `scripts/process-logos.mjs`
 * converts the uploads to black on white, trims each to its own ink and fits
 * them to a common height. Two marks carry no name that can be read off the
 * artwork, so they are labelled neutrally rather than guessed at.
 */
export const LOGOS = [
  { file: "logo-01.png", name: "PlayBox TV" },
  { file: "logo-02.png", name: "Cotton Culture" },
  { file: "logo-03.png", name: "DBMCI One" },
  { file: "logo-04.png", name: "True Veda" },
  { file: "logo-05.png", name: "Ice Global" },
  { file: "logo-06.png", name: "NYNM" },
  { file: "logo-07.png", name: "Sanat Enterprises" },
  { file: "logo-08.png", name: "Mauritius" },
  { file: "logo-09.png", name: "What China Reads" },
  { file: "logo-10.png", name: "Ori" },
  { file: "logo-11.png", name: "PIXL VFX" },
  { file: "logo-12.png", name: "The VivaLuxury" },
  { file: "logo-13.png", name: "Steady Rabbit" },
  { file: "logo-14.png", name: "Client" },
  { file: "logo-15.png", name: "Cezaa Wellness" },
  { file: "logo-16.png", name: "OneAD" },
  { file: "logo-17.png", name: "Client" },
] as const;
