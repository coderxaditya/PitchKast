/**
 * The gallery photographs.
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

/**
 * True pixel size of each file, in the same order as `galleryImages`.
 *
 * These exist to reserve the right box before the file arrives. Without them
 * a lazily-loaded image has zero height until it decodes, and the masonry
 * columns balance against nothing — the grid lands lopsided on first paint and
 * then jumps as each photograph lands. Measured, not estimated.
 */
export const galleryDims: readonly (readonly [number, number])[] = [
  [2048, 959],
  [2048, 1062],
  [1280, 963],
  [2047, 1536],
  [1200, 1600],
  [1280, 719],
  [1280, 720],
  [1080, 573],
  [956, 746],
  [1280, 960],
];
