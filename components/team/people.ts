/*
 * Moved out of Team.tsx so it can be read by more than the component.
 *
 * The reason is specific: Team.tsx is a "use client" module, and a value
 * imported from one of those into a server component arrives as a client
 * reference proxy rather than the value itself — `TEAM.map is not a function`
 * at prerender. Data that both a client component and the server-rendered
 * structured data need has to live in a module that is neither.
 *
 * Team.tsx re-exports it, so nothing that imported TEAM from there breaks.
 */
/**
 * The team. These are real, named people — every field here is attributable to
 * them, so treat it as you would a quote in print.
 *
 * `line` is a one-line descriptor condensed from each person's own bio. It is
 * written *about* them, not presented as something they said, which is why it
 * renders without quotation marks.
 *
 * Photos live in `public/team/`. `w`/`h` are each file's true pixel size; they
 * only reserve the right aspect while the file loads, since the frame owns its
 * own dimensions. The frame is 484:596 (0.81), and `object-cover` centre-crops
 * whatever does not match — square and landscape sources lose their sides.
 */
export const TEAM = [
  {
    name: "Soham Goel",
    role: "Founder & CEO, PitchKast",
    line: "Helping founders turn ideas into credibility.",
    description: [
      "Soham Goel is the Founder and CEO of PitchKast and an alumnus of IIT Patna. He leads the company’s vision, strategy, and growth, working closely with founders and businesses to strengthen their personal brand, digital presence, and market positioning.",
      "With a strong interest in technology, entrepreneurship, and growth, Soham focuses on building PitchKast into a platform that helps founders communicate their ideas, establish credibility, and create meaningful business opportunities.",
    ],
    linkedin: "https://www.linkedin.com/in/sohamgoelsg/",
    src: "/team/soham-goel.jpeg",
    w: 1600,
    h: 1304,
  },
  {
    name: "Manish Goel",
    role: "Co-Founder & Head of Innovation Cell, PitchKast",
    line: "Turning ideas into scalable solutions.",
    description: [
      "Manish Goel is the Co-Founder and Head of Innovation Cell at PitchKast, driving innovation, strategic initiatives, and the development of new solutions that help founders and businesses build stronger brands and grow with purpose.",
      "At PitchKast, he works closely on shaping the company’s vision, exploring new opportunities, and turning ideas into impactful, scalable solutions.",
    ],
    linkedin: "https://www.linkedin.com/in/manishgoel27/",
    src: "/team/manish-goel.jpeg",
    w: 800,
    h: 800,
  },
  {
    name: "Mohit Garg",
    role: "Global Business Head & HR Team Lead, PitchKast",
    line: "Growing the business and the team behind it.",
    description: [
      "Mohit Garg leads global business development and people operations at PitchKast, working across business growth, strategic partnerships, and team development. As the HR Team Lead, he also focuses on building a strong, collaborative team and fostering a culture that supports innovation and growth.",
      "With a focus on business expansion and people management, Mohit plays a key role in strengthening PitchKast’s global presence and building the team behind its growth.",
    ],
    linkedin: "https://www.linkedin.com/in/mohit-garg-18b9a511a/",
    src: "/team/mohit-garg.jpeg",
    w: 1600,
    h: 1425,
  },
  {
    name: "Aditya T",
    role: "Head of Tech Department & Product Manager, PitchKast",
    line: "Bridging technical execution and product strategy.",
    description: [
      "Aditya T is the Head of Tech Department and Product Manager at PitchKast, and an alumnus of IIIT Lucknow. With strong technical expertise and hands-on experience across the technology stack, he leads the development and execution of PitchKast’s technology and product initiatives.",
      "He brings an end-to-end understanding of product development, from ideation and architecture to development, deployment, and optimization. His ability to bridge technical execution with product strategy plays a key role in building scalable and impactful solutions at PitchKast.",
    ],
    linkedin: "https://www.linkedin.com/in/aditya-05a575411/",
    src: "/team/aditya-t.jpeg",
    /* 861x1021, not the 868x1024 the file arrived as. The source had a black
       border baked into it — 3 rows across the top, 4 columns down the left,
       3 down the right, all reading 15-19 against the 225 of the studio wall
       — which showed as a hard dark line inside the frame's rounded top edge.
       It was in the pixels, not a gap in the layout, so no amount of
       object-fit or positioning would have covered it. The border is cropped
       out of the file; these are the dimensions that leaves. */
    w: 861,
    h: 1021,
  },
  {
    name: "Sachin Bansal",
    role: "Advisor, PitchKast",
    line: "Strategic guidance on technology and scale.",
    description: [
      "Sachin Bansal serves as an Advisor at PitchKast, bringing extensive experience across technology, product, engineering, and business leadership. He is an alumnus of IIT Roorkee and has built his career working across startups and established organizations, with experience in leading technology and product teams.",
      "At PitchKast, Sachin provides strategic guidance on technology, product development, business growth, and building scalable systems. His experience and industry perspective add valuable expertise to PitchKast’s team and long term vision.",
    ],
    linkedin: "https://www.linkedin.com/in/bansalsachin/",
    src: "/team/sachin-bansal.jpeg",
    w: 200,
    h: 200,
  },
  {
    name: "Shelly G",
    role: "Head of Training Department, PitchKast",
    line: "Fifteen years building industry-ready talent.",
    description: [
      "Shelly G is the Head of Training Department at PitchKast and an alumna of IMS Ghaziabad. She is a Gold Medalist from the Master of International Business, Batch of 2005.",
      "With over 15 years of experience in training and developing young talent, Shelly brings extensive expertise in mentoring, skill development, and professional training. At PitchKast, she leads the training department and works towards building a strong, capable, and industry-ready team.",
    ],
    linkedin: "https://www.linkedin.com/in/shelly-goel-1992aa21a/",
    src: "/team/shelly-g.png",
    w: 646,
    h: 1094,
  },
] as const;
