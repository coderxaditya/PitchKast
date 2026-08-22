"use client";

import { StackedFeatureCards } from "@/components/unlumen-ui/stacked-feature-cards";

const CASE_STUDIES = [
  {
    id: 1,
    location: "San Francisco, United States",
    category: "SaaS & Technology Founder",
    goal: "Building a founder brand from scratch",
    paragraphs: [
      "The founder had years of experience in technology, but very little of that was visible online. His LinkedIn did not reflect the work he was doing or the conversations he could contribute to.",
      "We spent time understanding his work, his opinions, and the kind of people he wanted to reach. From there, we rebuilt his profile and started creating content around things he actually knew and cared about.",
      "The growth came through consistent posting and genuine engagement, without paid promotions."
    ],
    metrics: ["6,300+ Organic Followers", "30 Days", "100% Organic Growth"]
  },
  {
    id: 2,
    location: "United States & Taiwan",
    category: "B2B Technology",
    goal: "Taking one product into two markets",
    paragraphs: [
      "The challenge here was not creating a brand from zero. It was making an existing product work in two very different markets.",
      "We worked on the product positioning, messaging, sales material, and founder's LinkedIn presence. The core story stayed the same, while the way we communicated it changed depending on the market.",
      "The first measurable response came within the first week. The work eventually helped open up additional revenue opportunities for the business."
    ],
    metrics: ["33% Revenue Uplift", "2 Markets", "First Result Within 1 Week"],
    note: "The revenue figure is client reported and attributed to the additional streams and organic reach generated through the engagement."
  },
  {
    id: 3,
    location: "United States",
    category: "B2B SaaS Founder",
    goal: "Getting the founder and the sales pipeline on the same page",
    paragraphs: [
      "The founder was already doing outreach, but his LinkedIn presence and sales conversations were operating separately.",
      "We brought the two together.",
      "First, we worked on his positioning and profile. Then we built content around his experience and started reaching out to prospects who actually fit his ICP. Every message was written individually rather than pushed through a generic sequence.",
      "The idea was simple: someone should be able to discover the founder through his content and immediately understand what he does."
    ],
    metrics: ["Founder Branding", "ICP Research", "Personalised Outreach", "Lead Generation"]
  },
  {
    id: 4,
    location: "United States",
    category: "Professional Services",
    goal: "Finding something worth saying",
    paragraphs: [
      "This client did not need more posts. He needed a clearer point of view.",
      "We went through his experience, work, and the subjects he could speak about with authority. That became the foundation for his positioning and content.",
      "We then rebuilt the profile and created a regular content system around his own ideas instead of filling the calendar with generic industry posts."
    ],
    metrics: ["Personal Brand Strategy", "Profile Optimisation", "Content Creation", "Organic Engagement"]
  },
  {
    id: 5,
    location: "India",
    category: "Education",
    goal: "Turning a campus into content",
    paragraphs: [
      "An education institution came to us with a much bigger challenge than managing an Instagram page.",
      "There were students, parents, faculty, and recruiters to speak to, each looking for something different.",
      "We took over the social media strategy and execution across Instagram, X, LinkedIn, and other platforms. Our team handled scripting, shoots, editing, design, and scheduling, with regular content production happening on campus.",
      "One production day could generate content for multiple platforms, which made the entire system much easier to manage.",
      "Within three months, the institution crossed 1 lakh organic impressions, with no paid amplification."
    ],
    metrics: ["1L+ Organic Impressions", "3 Months", "4+ Platforms", "0 Paid Amplification"]
  },
  {
    id: 6,
    location: "Founder & Business Growth",
    category: "Technology, Consumer, Media & Education",
    goal: "Different businesses, similar problems",
    paragraphs: [
      "Our client portfolio covers very different industries, from technology and media to consumer brands, healthcare, education, and trade.",
      "What usually brings them to us is straightforward. They have built something, but their online presence has not caught up with the business.",
      "Our work has included founder branding, product positioning, content, social media, and lead generation depending on what the business actually needed.",
      "We do not start with a fixed package. We start with where the business is today and build from there."
    ],
    metrics: ["Founder Branding", "Product Positioning", "Content Strategy", "Lead Generation", "Social Media Growth"]
  }
];

export function CaseStudies() {
  const heroCard = {
    badge: "Track Record",
    title: "Proven Growth",
    description: "See how we help founders turn ideas into credibility. We don't just build profiles, we build positioning that scales.",
  };

  const featureCards = CASE_STUDIES.map(cs => ({
    value: String(cs.id).padStart(2, "0"),
    title: cs.category,
    description: cs.goal,
    location: cs.location,
    paragraphs: cs.paragraphs,
    metrics: cs.metrics,
    note: cs.note
  }));

  return (
    <StackedFeatureCards
      heroCard={heroCard}
      featureCards={featureCards}
      sectionTitle="Case Studies"
    />
  );
}
