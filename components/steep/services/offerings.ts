/**
 * The five services.
 *
 * ⚠️ The five NAMES are yours and unchanged. Everything else here — the
 * shortened `menuName` used in the navbar dropdown, each `lead` and `short`
 * line, every bullet, and the section header copy below — is
 * placeholder written to give the cards their shape, and is meant to be
 * replaced when you send the real text. It is drawn from what the FAQ already
 * says the company does, so nothing here claims something new, but none of it
 * has been through you.
 */
export type Service = {
  name: string;
  /** Shown on the cards. */
  lead: string;
  /** Shown in the navbar dropdown, where one short line is all there is room
      for. Deliberately shorter than `lead` rather than a truncation of it. */
  short: string;
  /** Shown in the navbar dropdown as the item's label — the full names run to
      eight words, which is a paragraph in a menu. */
  menuName: string;
  points: string[];
  /** A result shown beside the item in the navbar dropdown. Only set where a
      real figure backs it: the case studies or the hero's raise total. */
  badge?: string;
};

export const SERVICES: Service[] = [
  {
    name: "Founder & Company Branding Across Social Media Platforms",
    menuName: "Founder & Company Branding",
    badge: "6,300+ Followers",
    lead: "Your founders and your company, visible to the people who matter.",
    short: "Presence your buyers actually find.",
    points: [
      "Profile and page rebuilt so the work is clear the moment someone lands on it.",
      "A content system built on what you actually know, not generic industry posts.",
      "Consistent posting across the platforms your buyers already use.",
      "Daily engagement handled for you, so a profile becomes a presence.",
      "A monthly read on what worked and where to push next.",
    ],
  },
  {
    name: "Product & Technology Creation",
    menuName: "Product & Technology",
    lead: "Software built to fit the business roadmap, not just the brief.",
    short: "Products built to ship and scale.",
    points: [
      "Web and mobile applications, from product strategy through to launch.",
      "Cloud infrastructure, automation and APIs behind the product.",
      "MVPs taken from an early idea to something you can put in front of users.",
      "Design and development in one team, so nothing is lost in a handoff.",
      "Built to evolve as the company grows.",
    ],
  },
  {
    name: "LinkedIn Lead Generation & Marketing",
    menuName: "LinkedIn Lead Generation",
    lead: "Conversations with people who actually fit, not volume for its own sake.",
    short: "Qualified conversations, not volume.",
    points: [
      "ICP research before a single message goes out.",
      "Every contact verified, and every message written individually.",
      "Outreach that reads like a person rather than a sequence.",
      "Content and outreach working together instead of in separate lanes.",
      "Reporting on replies, calls booked and pipeline.",
    ],
  },
  {
    name: "Sales & Market Expansion",
    menuName: "Sales & Market Expansion",
    badge: "33% Revenue Uplift",
    lead: "One product, positioned for every market you want to be in.",
    short: "One product, every market you want.",
    points: [
      "Positioning and messaging shaped per market, from one core story.",
      "Sales material that matches how the conversation actually goes.",
      "Channels and partnerships opened where they make sense.",
      "Work across time zones: around half our clients are outside India.",
      "A plan you can run with, not a deck you file away.",
    ],
  },
  {
    name: "Fundraising & Strategic Growth Decks",
    menuName: "Fundraising & Growth Decks",
    badge: "$40M+ Raised",
    lead: "The story investors need, told in the order they need it.",
    short: "The story investors need to hear.",
    points: [
      "A narrative built from the business rather than from a template.",
      "Market, traction and numbers laid out so they hold up to questions.",
      "Design that keeps attention on the argument, not the slide.",
      "Revision and rehearsal before the room.",
      "Follow-on material for the conversations that come after.",
    ],
  },
];

/** Also placeholder. */
export const SERVICES_INTRO = {
  eyebrow: "What We Do",
  titleLead: "Everything Your Brand Needs, Under",
  titleAccent: "One Team",
  description:
    "Each service stands on its own. Together they cover the whole path: building the product, telling the story, and putting it in front of the people who decide.",
};
