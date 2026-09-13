/**
 * The customer stories.
 *
 * ⚠️ PLACEHOLDER. None of this is real yet, and the bracketed text is meant to
 * look unfinished on purpose.
 *
 * A customer story is a named client's own words, shown beside their logo.
 * There are no PitchKast testimonials anywhere in the project to draw from.
 * The case studies are deliberately anonymous ("the founder", "an education
 * institution"), so they cannot be attributed to a logo either. Writing quotes
 * here and pairing them with real clients' marks would put words in those
 * companies' mouths, so every quote and subhead is a bracketed placeholder
 * until the real ones arrive.
 *
 * The four logos are the first four wide marks from the client strip, and the
 * four photographs are from the gallery. Both are stand-ins, chosen for fit
 * rather than because these clients gave stories. Replace each entry's fields
 * with the client who actually said it.
 *
 * Do not ship this section with these placeholders in it.
 */
export type Story = {
  /** The client's own words. Rendered inside curly quotation marks. */
  quote: string;
  /** One line under the quote: what changed, or why they chose PitchKast. */
  subhead: string;
  client: { name: string; logo: string; width: number; height: number };
  photo: { src: string; width: number; height: number; alt: string };
};

export const STORIES: Story[] = [
  {
    quote: "[Client quote, in their words. One or two lines.]",
    subhead: "[What changed for them, in one line]",
    client: { name: "PlayBox TV", logo: "/logos/logo-01.png", width: 1008, height: 300 },
    photo: { src: "/gallery/gallery-01.jpeg", width: 2048, height: 959, alt: "PitchKast gallery photograph 1" },
  },
  {
    quote: "[Client quote, in their words. One or two lines.]",
    subhead: "[What changed for them, in one line]",
    client: { name: "Cotton Culture", logo: "/logos/logo-02.png", width: 809, height: 300 },
    photo: { src: "/gallery/gallery-03.jpeg", width: 1280, height: 963, alt: "PitchKast gallery photograph 3" },
  },
  {
    quote: "[Client quote, in their words. One or two lines.]",
    subhead: "[What changed for them, in one line]",
    client: { name: "DBMCI One", logo: "/logos/logo-03.png", width: 735, height: 300 },
    photo: { src: "/gallery/gallery-06.jpeg", width: 1280, height: 719, alt: "PitchKast gallery photograph 6" },
  },
  {
    quote: "[Client quote, in their words. One or two lines.]",
    subhead: "[What changed for them, in one line]",
    client: { name: "Ice Global", logo: "/logos/logo-05.png", width: 697, height: 300 },
    photo: { src: "/gallery/gallery-10.jpeg", width: 1280, height: 960, alt: "PitchKast gallery photograph 10" },
  },
];
