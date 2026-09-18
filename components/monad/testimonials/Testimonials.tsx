import { Star } from "lucide-react";

import { Container } from "@/components/monad/Container";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { TESTIMONIALS, TESTIMONIALS_INTRO, type Testimonial } from "@/content/testimonials";

/**
 * Testimonials, on Magic UI's Marquee demo.
 *
 * A near-black band: the pill eyebrow and serif heading, then two rows of
 * review cards drifting in opposite directions, each row pausing under the
 * pointer, with both ends fading into the band. A card is a 16px-radius
 * hairline frame with a faint top-lit fill that brightens on hover: the
 * client's round photo, their name and role, and the quote in full.
 *
 * The moving rows repeat every card several times, so they are hidden from
 * assistive technology; a plain list of the same testimonials, visually
 * hidden, is what a screen reader reads.
 *
 * The previous design is kept in `TestimonialsBand.tsx`.
 */
const initials = (name: string) =>
  name
    .replace(/^(Dr|Mr|Ms|Mrs)\.\s+/, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const half = Math.ceil(TESTIMONIALS.length / 2);
const FIRST_ROW = TESTIMONIALS.slice(0, half);
const SECOND_ROW = TESTIMONIALS.slice(half);

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure
      className={cn(
        "relative w-[300px] shrink-0 cursor-default overflow-hidden rounded-card border p-5 sm:w-[400px] sm:p-6",
        "border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.02] transition-colors duration-300",
        "hover:border-white/[0.18] hover:from-white/[0.11] hover:to-white/[0.04]",
      )}
    >
      <div className="flex items-center gap-3">
        {t.photo ? (
          <img
            src={t.photo}
            alt=""
            width={44}
            height={44}
            draggable={false}
            className="size-11 shrink-0 rounded-full object-cover select-none"
          />
        ) : (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lake to-coral font-sans text-[14px] font-semibold text-white">
            {initials(t.name)}
          </span>
        )}
        <div className="min-w-0">
          <figcaption className="font-sans text-[15px] leading-5 font-medium text-white">{t.name}</figcaption>
          <p className="mt-0.5 font-sans text-[12.5px] leading-4 text-white/45">{t.role}</p>
        </div>
      </div>
      <blockquote className="mt-4 font-sans text-[14.5px] leading-[1.55] text-white/75">{t.quote}</blockquote>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="scroll-mt-[var(--header-h)] overflow-hidden bg-[#0a0a0a] py-24 lg:py-32"
    >
      <Container>
        <div data-reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-[15px] py-[7.5px]">
            <Star className="size-3.5 fill-[#f5a623] text-[#f5a623]" strokeWidth={0} aria-hidden="true" />
            <span className="font-sans text-[12px] font-semibold text-white/80 uppercase sm:text-[14px]">
              {TESTIMONIALS_INTRO.eyebrow}
            </span>
          </span>
          <h2
            id="testimonials-title"
            className="max-w-[16ch] text-center font-serif text-heading-lg font-normal text-white"
          >
            {TESTIMONIALS_INTRO.titleLead}{" "}
            <em className="text-periwinkle italic">{TESTIMONIALS_INTRO.titleAccent}</em>{" "}
            {TESTIMONIALS_INTRO.titleTrail}
          </h2>
        </div>
      </Container>

      <ul className="sr-only">
        {TESTIMONIALS.map((t) => (
          <li key={t.name}>
            {t.quote} {t.name}, {t.role}
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="relative mt-12 flex w-full flex-col items-center overflow-hidden lg:mt-16">
        <Marquee pauseOnHover className="[--duration:60s] [--gap:1.25rem]">
          {FIRST_ROW.map((t) => (
            <ReviewCard key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:60s] [--gap:1.25rem]">
          {SECOND_ROW.map((t) => (
            <ReviewCard key={t.name} t={t} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#0a0a0a]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#0a0a0a]" />
      </div>
    </section>
  );
}
