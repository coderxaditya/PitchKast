/**
 * The gallery photographs, shared by the section on the home page and the
 * dedicated `/gallery` route so the two can never drift apart.
 *
 * `alt` says what each file is rather than what is in it. These are real
 * photographs whose contents I have not seen, and an invented description
 * would be read out as fact by a screen reader. The index at least gives
 * someone a way to refer to one.
 */
export const galleryImages = [
  "/gallery/gallery-01.jpeg",
  "/gallery/gallery-02.jpeg",
  "/gallery/gallery-03.jpeg",
  "/gallery/gallery-04.jpeg",
  "/gallery/gallery-05.jpeg",
  "/gallery/gallery-06.jpeg",
  "/gallery/gallery-07.jpeg",
  "/gallery/gallery-08.jpg",
  "/gallery/gallery-09.png",
  "/gallery/gallery-10.jpeg",
] as const;

export const galleryAlt = (i: number) => `PitchKast gallery photograph ${i + 1}`;

/** Shared with Services and Team so the light chapter reads as one surface. */
export const SURFACE = "#f4f3f0";
/** Brand gold darkened for light surfaces; ~4.5:1 on SURFACE. */
export const ACCENT = "#8a6a28";

/**
 * The wall order for the /gallery page.
 *
 * Ten photographs split three ways leaves 4/4/2, so the third column runs out
 * well before the others and the bottom right of the page sits empty. This
 * pads the set to fifteen — five per column — by repeating five of them.
 *
 * The order is written out rather than generated, because ParallaxScroll
 * slices the array into equal thirds in sequence: appending the repeats would
 * put photographs 1-5 in the first column and those same five, in the same
 * order, in the third. Each repeat here sits in a different column and at a
 * different height from its original.
 *
 * Indices are into `galleryImages`, so this can never drift from the files.
 */
const WALL_ORDER = [
  0, 1, 2, 3, 4, //  column one
  5, 6, 7, 8, 9, //  column two
  7, 2, 9, 4, 6, //  column three — repeats, none level with its original
] as const;

export const galleryWall = WALL_ORDER.map((i) => galleryImages[i]);

/** Position of a wall slot within the real set, for the viewer's counter. */
export const galleryWallSource = (slot: number) => WALL_ORDER[slot] ?? 0;
