/**
 * The testimonials.
 *
 * ⚠️ PLACEHOLDERS. Every name, role, company and quote below is a bracketed
 * stand-in so the cards have their shape. Replace each entry with a real
 * testimonial, word for word as the client gave it, before this ships. Add
 * `photo` (a path under `public/`) to show a face; without one the card shows
 * the person's initials.
 */
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  photo?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "[Client name]",
    role: "[Role @ Company]",
    quote:
      "[Testimonial 1. What the client says about working with PitchKast, in their own words. Longer quotes are cut to three lines on the card and open in full with Read more.]",
  },
  {
    name: "[Client name]",
    role: "[Role @ Company]",
    quote: "[Testimonial 2. A short quote fits on the card without a Read more link.]",
  },
  {
    name: "[Client name]",
    role: "[Role @ Company]",
    quote:
      "[Testimonial 3. What changed for the founder or the business after the engagement: the conversations, the pipeline, the raise, the reach.]",
  },
  {
    name: "[Client name]",
    role: "[Role @ Company]",
    quote: "[Testimonial 4. A short quote from a client.]",
  },
  {
    name: "[Client name]",
    role: "[Role @ Company]",
    quote:
      "[Testimonial 5. What the client says about working with PitchKast, in their own words. Longer quotes are cut to three lines on the card and open in full with Read more.]",
  },
  {
    name: "[Client name]",
    role: "[Role @ Company]",
    quote:
      "[Testimonial 6. What changed for the founder or the business after the engagement, told by the client.]",
  },
];

export const TESTIMONIALS_INTRO = {
  eyebrow: "Testimonials",
  titleLead: "What",
  titleAccent: "founders",
  titleTrail: "say about us",
};
