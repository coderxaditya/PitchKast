/**
 * Values more than one component needs.
 *
 * The booking link in particular was written out in three separate files, so
 * changing it meant finding all three. It is one string now.
 */

export const BOOKING_URL =
  "https://calendly.com/goelsoham/founder-growth-strategy-call";

/**
 * The header's links, in the reference's order. "Services" also opens the
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

/** The footer's "Pages" column: every section, in page order. */
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
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

/**
 * The WhatsApp number, in the two forms it is needed in.
 *
 * `wa.me` takes digits only — no plus, no spaces, country code included — and
 * silently fails to resolve a chat if any of that is wrong. The readable form
 * keeps its spacing.
 */
export const WHATSAPP = {
  display: "+91 98919 48444",
  href: "https://wa.me/919891948444",
};

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
