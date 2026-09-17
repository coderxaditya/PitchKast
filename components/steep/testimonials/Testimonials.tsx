import { Star, X } from "lucide-react";

import { Container } from "@/components/steep/Container";
import { TESTIMONIALS, TESTIMONIALS_INTRO, type Testimonial } from "./quotes";

/**
 * Testimonials, on the reference's (iniziomedia.com) marquee.
 *
 * A centred pill eyebrow and heading over one endless row of cards on a dark
 * band, edges faded out. Measured off their page: cards 460px wide (320px on
 * a phone) and 300px tall, 24px apart, 24px radius and padding, a hairline
 * border and a soft coloured glow that strengthens on hover; a 44px ringed
 * avatar, the name, the role, a "Best Service" pill, the quote cut to three
 * lines with "Read more", and five amber stars. The row takes 60s to loop and
 * pauses under the pointer. Their glow is purple; here it is the system's
 * peach.
 *
 * The motion is the logo strip's (`.marquee` in `globals.css`): two copies of
 * the row, translated by half, so the join is seamless.
 */

/** Past roughly this many characters a quote runs beyond three lines. */
const LONG = 150;

const initials = (name: string) =>
  name
    .replace(/^(Dr|Mr|Ms|Mrs)\.\s+/, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Card({ t, index, copy }: { t: Testimonial; index: number; copy: number }) {
  const id = `testimonial-${index}`;
  return (
    <article className="flex h-[300px] w-[320px] shrink-0 flex-col gap-6 rounded-[24px] border border-peach/20 bg-white/[0.04] p-6 shadow-[0_0_45px_-10px_rgba(251,225,209,0.35)] transition-shadow duration-300 hover:shadow-[0_0_55px_-6px_rgba(251,225,209,0.5)] sm:w-[460px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          {t.photo ? (
            <img
              src={t.photo}
              alt=""
              className="size-11 shrink-0 rounded-full object-cover ring-[1.5px] ring-peach"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-peach text-[14px] font-semibold text-sienna ring-[1.5px] ring-peach"
            >
              {initials(t.name) || "PK"}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-[16px] leading-6 font-semibold text-paper">{t.name}</p>
            <p className="text-[12px] leading-4 text-white/60">{t.role}</p>
          </div>
        </div>
        {/* Hidden on a phone, where the card is 320px and the pill would leave
            the client's name and role too little room. */}
        <span className="hidden shrink-0 rounded-full border border-peach/20 bg-peach/12 px-3 py-[5px] text-[14px] font-semibold tracking-[0.6px] text-peach uppercase sm:inline-block">
          Best Service
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-4">
        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <p className="line-clamp-3 text-[16px] leading-6 font-light text-paper">{t.quote}</p>
          {t.quote.length > LONG && copy === 0 ? (
            <button
              type="button"
              popoverTarget={id}
              className="self-start text-[12px] font-semibold text-peach transition-colors hover:text-peach/80"
            >
              Read more
            </button>
          ) : t.quote.length > LONG ? (
            <span aria-hidden="true" className="self-start text-[12px] font-semibold text-peach">
              Read more
            </span>
          ) : null}
        </div>
        <div className="flex gap-1 text-[#f5a623]" role="img" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-5 fill-current" strokeWidth={0} aria-hidden="true" />
          ))}
        </div>
      </div>
    </article>
  );
}

function Full({ t, index }: { t: Testimonial; index: number }) {
  const id = `testimonial-${index}`;
  return (
    <div
      id={id}
      popover="auto"
      aria-label={`Testimonial from ${t.name}`}
      className="m-auto w-[min(560px,calc(100vw-32px))] rounded-[var(--radius-card)] bg-paper p-8 text-ink shadow-overlay backdrop:bg-ink/40"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[16px] font-semibold">{t.name}</p>
          <p className="text-[14px] text-slate">{t.role}</p>
        </div>
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          aria-label="Close"
          className="-mt-2 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 hover:bg-mist"
        >
          <X className="size-5" strokeWidth={1.75} />
        </button>
      </div>
      <p className="mt-6 text-body leading-[1.55]">{t.quote}</p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="scroll-mt-24 overflow-hidden bg-ink py-24 lg:py-32"
    >
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-peach/25 bg-peach/12 px-[15px] py-[7.5px]">
            <Star className="size-3.5 text-peach" strokeWidth={2} aria-hidden="true" />
            <span className="text-[12px] font-semibold text-peach uppercase sm:text-[14px]">
              {TESTIMONIALS_INTRO.eyebrow}
            </span>
          </span>
          <h2
            id="testimonials-title"
            className="max-w-[16ch] text-center font-display text-heading-lg font-normal text-paper"
          >
            {TESTIMONIALS_INTRO.titleLead}{" "}
            <em className="text-peach italic">{TESTIMONIALS_INTRO.titleAccent}</em>{" "}
            {TESTIMONIALS_INTRO.titleTrail}
          </h2>
        </div>
      </Container>

      <div
        className="marquee mt-10 w-full py-10 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]"
        style={{ "--marquee-duration": "60s" } as React.CSSProperties}
      >
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
              inert={copy === 1}
              className="flex shrink-0 gap-6 pr-6"
            >
              {TESTIMONIALS.map((t, i) => (
                <li key={i}>
                  <Card t={t} index={i} copy={copy} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {TESTIMONIALS.map((t, i) => (
        <Full key={i} t={t} index={i} />
      ))}
    </section>
  );
}
