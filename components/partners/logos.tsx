export type LogoItem = {
  /** Stable list key. `title` cannot serve: two marks are unidentified and
      would collide on the same label. */
  id: string;
  title: string;
  ariaLabel: string;
  node: React.ReactNode;
};

/**
 * Client lockups.
 *
 * The files in `public/logos` are processed, not raw: the uploads were 2048px
 * JPEG screenshots totalling 6.7MB, several with the mark reversed out of a
 * solid colour. `scripts/process-logos.mjs` converts them to black on white,
 * trims each to its own ink and fits them to a common height. Re-run it after
 * dropping new files into `assets/logos-source`.
 *
 * Every mark therefore already *is* black and white — there is no
 * `filter: grayscale()` here. Doing it in the file rather than at paint time
 * means the white field matches the band exactly, so no logo shows a box.
 */

/**
 * One slot, identical for every logo.
 *
 * A shared height alone does not work here: the widest mark is 6.4:1 and the
 * narrowest 0.67:1, so at a common height one would be 255px across and
 * another 29px. A fixed box with `object-contain` lets wide marks fill the
 * width and tall ones fill the height, and every logo takes the same space.
 */
function Logo({ src, name }: { src: string; name: string }) {
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      className="h-14 w-40 object-contain"
    />
  );
}

type Entry = { file: string; name: string };

/**
 * Order is the file order. Two marks are wordless — a ribbon and a graduation
 * cap — and carry no name I can read off the artwork, so they are labelled
 * neutrally rather than guessed at. Fill those in when you know them.
 */
const ENTRIES: Entry[] = [
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
];

export const partnerLogos: LogoItem[] = ENTRIES.map(({ file, name }) => ({
  id: file,
  title: name,
  ariaLabel: name,
  node: <Logo src={`/logos/${file}`} name={name} />,
}));
