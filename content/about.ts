/**
 * About, condensed.
 *
 * The previous version ran seven chapters over roughly seven viewport heights
 * and said several things twice. Nothing here is newly written — every line is
 * lifted from those chapters — but four overlaps were collapsed:
 *
 *  · Build / Grow / Raise appeared as a three-card rail in "Who We Are" AND as
 *    the whole of "The Growth System". Kept once, in the system.
 *  · The seven disciplines were enumerated in "Our Story" as a sentence AND
 *    again as chips under each stage. Kept once, as the chips.
 *  · "Advisors, not vendors" was a full-width chapter AND the first of four
 *    principle cards, with the same claim in both. Merged into the card, which
 *    keeps the chapter's sharper wording.
 *  · "You own everything" was a full-width chapter AND the third principle
 *    card. Merged the same way, with the chapter's closing payoff kept as the
 *    statement block that ends the section.
 *
 * Seven chapters became five blocks and the reading length roughly halved.
 */

export const ABOUT_INTRO = {
  eyebrow: "About PitchKast",
  titleLead: "One team from",
  titleAccent: "build to raise",
  lead: "PitchKast is an end-to-end growth partner for early-stage founders.",
  body: [
    "We bring product, design, growth, and fundraising expertise together under one accountable team, helping founders move from an idea to a built product, from product to traction, and from traction to their next funding round.",
  ],
};

export const ABOUT_STATS = [
  { value: "90+", label: "Projects delivered" },
  { value: "$40M+", label: "Raised by founders we've backed" },
  { value: "5", label: "Continents served" },
  { value: "12+", label: "Years of combined craft" },
];

export const ABOUT_SYSTEM = {
  title: "One team. Three stages. Seven disciplines.",
  lead: "We believe building a company should not mean managing seven different vendors.",
  stages: [
    {
      index: "01",
      label: "Build",
      body: "We turn ideas into products people can use and investors can understand, combining engineering, product design, branding, and investor-ready collateral.",
      services: ["IT Solutions", "Design"],
    },
    {
      index: "02",
      label: "Grow",
      body: "We turn the product into measurable attention through search, digital marketing, content, and founder-led LinkedIn growth.",
      services: ["Search", "Digital Marketing", "LinkedIn Growth"],
    },
    {
      index: "03",
      label: "Raise",
      body: "We help founders open the right doors through targeted outreach, investor strategy, financial modelling, storytelling, and fundraising preparation.",
      services: ["Outreach", "Business Consultancy"],
    },
  ],
};

export const ABOUT_PRINCIPLES = [
  {
    index: "01",
    title: "Comfortable Review",
    body: "Enjoy a personalized dashboard that gives you a clear view of your progress, priorities, deliverables, and key outcomes.",
  },
  {
    index: "02",
    title: "Hassle Free, Minimal Interference",
    body: "We take your vision, understand your voice, and adapt to your numbers, giving you the support you need without unnecessary interference.",
  },
  {
    index: "03",
    title: "Advisors, Not Vendors",
    body: "We work on your side of the table. We tell you what should be built, what should be changed, and when something simply is not worth building. We measure ourselves by outcomes, not by the number of deliverables we can invoice.",
  },
  {
    index: "04",
    title: "One Accountable Team",
    body: "Every service is delivered by one coordinated team, with clear ownership and communication. No unnecessary agency gaps, fragmented execution, or confusing handoffs.",
  },
  {
    index: "05",
    title: "You Own Everything",
    body: "Your code, infrastructure, identity files, content, lead data, credentials, and documentation remain yours from day one.",
  },
  {
    index: "06",
    title: "Honest Reporting",
    body: "Your personalized dashboard keeps everything visible, while our reporting tells you what actually happened, what worked, what did not, and what needs to happen next.",
  },
];

export const ABOUT_CLOSING = {
  loud: "The goal is to make your company stronger.",
};
