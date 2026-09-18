/**
 * Values more than one component needs.
 *
 * The booking link in particular was written out in three separate files, so
 * changing it meant finding all three. It is one string now.
 */

export const BOOKING_URL =
  "https://calendly.com/goelsoham/founder-growth-strategy-call";

/**
 * The header's links, in the reference's order. The footer's "Pages" column
 * reads the same list, so the two always match. "Services" also opens the
 * dropdown of the five services. There is no blog, so the reference's "Blog"
 * item has no counterpart here.
 */
export const HEADER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Social profiles.
 *
 * One list, read by both the footer's text column and its icon dock, so a URL
 * is only ever written once.
 *
 * ⚠️ Instagram and X are `#` placeholders — they scroll to the top of the page
 * and do nothing else. Swap in the real URLs when you have them; nothing else
 * needs touching. `EMAIL` is live.
 */
export const EMAIL = "contact@pitchkast.com";
/** Soham Goel, founder: listed under Contact in the footer. */
export const FOUNDER_EMAIL = "sohamgoel@pitchkast.com";

export const SOCIAL_LINKS = [
  /* LinkedIn leads: it is the only live profile, and the platform the company
     actually sells on. Order here drives both the footer column and the icon
     dock. */
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/pitchkast-india/",
  },
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
] as const;

/** A placeholder must not open a new tab — that spawns a blank copy of the page. */
export const isExternal = (href: string) => href.startsWith("http");
