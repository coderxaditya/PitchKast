/**
 * The testimonials, word for word as the clients gave them.
 *
 * Add `photo` (a path under `public/`) to show a face; without one the card
 * shows the person's initials.
 */
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  photo?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rightlin",
    role: "Founder & CEO, Luxury Viva, Dubai",
    quote:
      "We were struggling to create a compelling pitch deck and financial model that effectively conveyed our unique business concept. Their expertise in storytelling and data visualization truly brought our pitch deck to life and helped us secure substantial investment meetings for our ambitious project.",
  },
  {
    name: "Saumya Alagh",
    role: "Co-Founder & CBO, NYMN Organics",
    quote:
      "What sets team Pitchkast apart is their dedication to client satisfaction. They maintained open lines of communication, promptly addressing any concerns or questions we had. Their responsiveness and willingness to go the extra mile ensured a smooth and collaborative working relationship.",
  },
  {
    name: "Amir Mulani",
    role: "Founder & CEO, Playbox TV (Featured on Shark Tank)",
    quote:
      "One of the standout qualities of Pitchkast is their ability to understand my unique business needs. They took the time to listen attentively, asking insightful questions to gain a deep understanding of my goals and objectives. This personalized approach allowed them to tailor their services to suit my specific requirements perfectly.",
  },
  {
    name: "Maaz Ansari",
    role: "Co-Founder, Ori.",
    quote:
      "As a startup, we needed to attract investors and make a strong impression. Pitchkast team helped us create a compelling pitch deck that effectively communicated our vision, market potential, and growth strategy. Their attention to detail and creative approach truly set us apart.",
  },
  {
    name: "Dr. Nachiket Bhatia",
    role: "CEO, DBMCI",
    quote:
      "From the initial consultation to the final product launch, Pitchkast project manager displayed a high level of professionalism and expertise. They meticulously understood our brand and delivered a visually stunning Investors deck that perfectly captures our organisation essence.",
  },
  {
    name: "Kannan Gopinathan",
    role: "Founder & CEO, What China Reads",
    quote:
      "Pitchkast for our Pitchdeck partner was the best decision we made. Their expertise in understanding the business model and vision have been instrumental in building our presentation. The entire team consistently demonstrated their commitment to quality and exceeded our expectations at every stage with timely delivery.",
  },
];

export const TESTIMONIALS_INTRO = {
  eyebrow: "Testimonials",
  titleLead: "What",
  titleAccent: "founders",
  titleTrail: "say about us",
};
