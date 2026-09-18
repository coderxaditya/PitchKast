"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

import { Container } from "@/components/monad/Container";
import { TESTIMONIALS, TESTIMONIALS_INTRO, type Testimonial } from "@/content/testimonials";

/**
 * The previous testimonials design, kept so it can be switched back in:
 * in `app/page.tsx`, render `<TestimonialsBand />` in place of
 * `<Testimonials />`.
 *
 * Testimonials, carried over from the Steep branch as asked.
 *
 * A dark band with a centred pill eyebrow and heading over one endless row of
 * cards, edges faded out. Each card: a 44px ringed avatar (the photo when one
 * is set in `content/testimonials.ts`, the initials until then), the name, the
 * role, the quote cut to three lines, and five amber stars, with a soft
 * peach glow that strengthens on hover.
 *
 * "Read more" opens the whole quote in place and becomes "Read less". While a
 * card is open the row stops, so the text is not carried away mid-sentence;
 * the quote closes by itself, and the row moves on, once the pointer leaves
 * the row or the section leaves the screen. The row also pauses under a
 * pointer. The motion is the logo strip's: two
 * copies of the row on one track, translated by half, so the join is exact.
 * The second copy is hidden from assistive technology and cannot be focused.
 *
 * Colours are the Steep branch's own: ink #17191c, peach #fbe1d1, sienna
 * #5d2a1a.
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

function Card({
  t,
  open,
  onToggle,
  interactive,
}: {
  t: Testimonial;
  open: boolean;
  onToggle: () => void;
  interactive: boolean;
}) {
  const long = t.quote.length > LONG;
  return (
    <article
      className={`flex w-[320px] shrink-0 flex-col gap-6 rounded-[24px] border border-[#fbe1d1]/20 bg-white/[0.04] p-6 shadow-[0_0_45px_-10px_rgba(251,225,209,0.35)] transition-shadow duration-300 hover:shadow-[0_0_55px_-6px_rgba(251,225,209,0.5)] sm:w-[460px] ${
        open ? "min-h-[300px]" : "h-[300px]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          {t.photo ? (
            <img
              src={t.photo}
              alt=""
              draggable={false}
              className="size-11 shrink-0 rounded-full object-cover ring-[1.5px] ring-[#fbe1d1] select-none"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fbe1d1] font-sans text-[14px] font-semibold text-[#5d2a1a] ring-[1.5px] ring-[#fbe1d1]"
            >
              {initials(t.name)}
            </span>
          )}
          <div className="min-w-0">
            <p className="font-sans text-[16px] leading-6 font-semibold text-white">{t.name}</p>
            <p className="font-sans text-[12px] leading-4 text-white/60">{t.role}</p>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-4">
        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <p className={`font-sans text-[16px] leading-6 font-light text-white ${open ? "" : "line-clamp-3"}`}>
            {t.quote}
          </p>
          {long ? (
            interactive ? (
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="self-start py-1 font-sans text-[12px] font-semibold text-[#fbe1d1] transition-colors hover:text-[#fbe1d1]/80"
              >
                {open ? "Read less" : "Read more"}
              </button>
            ) : (
              <span aria-hidden="true" className="self-start py-1 font-sans text-[12px] font-semibold text-[#fbe1d1]">
                {open ? "Read less" : "Read more"}
              </span>
            )
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

export function TestimonialsBand() {
  /* Which card is open, by name. Only the first copy can open one; the second
     copy mirrors it so the loop stays seamless. */
  const [open, setOpen] = useState<string | null>(null);
  const section = useRef<HTMLElement>(null);

  /* An open quote pauses the row, so nothing may leave it open by accident:
     it closes, and the row moves again, as soon as the section scrolls out of
     view. Without this, opening a quote and scrolling on left the row frozen
     until someone came back and pressed "Read less". */
  useEffect(() => {
    const el = section.current;
    if (!el || !open) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setOpen(null);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [open]);

  return (
    <section
      ref={section}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="scroll-mt-[var(--header-h)] overflow-hidden bg-[#17191c] py-24 lg:py-32"
    >
      <Container>
        <div data-reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fbe1d1]/25 bg-[#fbe1d1]/12 px-[15px] py-[7.5px]">
            <Star className="size-3.5 text-[#fbe1d1]" strokeWidth={2} aria-hidden="true" />
            <span className="font-sans text-[12px] font-semibold text-[#fbe1d1] uppercase sm:text-[14px]">
              {TESTIMONIALS_INTRO.eyebrow}
            </span>
          </span>
          <h2
            id="testimonials-title"
            className="max-w-[16ch] text-center font-serif text-heading-lg font-normal text-white"
          >
            {TESTIMONIALS_INTRO.titleLead}{" "}
            <em className="text-[#fbe1d1] italic">{TESTIMONIALS_INTRO.titleAccent}</em>{" "}
            {TESTIMONIALS_INTRO.titleTrail}
          </h2>
        </div>
      </Container>

      {/* Leaving the row with the pointer also closes an open quote, for the
          same reason. */}
      <div
        onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
        className="marquee mt-10 w-full overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]"
      >
        <div
          className="flex w-max animate-marquee items-start [animation-duration:60s]"
          style={open ? { animationPlayState: "paused" } : undefined}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
              inert={copy === 1}
              className="flex shrink-0 items-start gap-6 pr-6"
            >
              {TESTIMONIALS.map((t) => (
                <li key={t.name}>
                  <Card
                    t={t}
                    open={open === t.name}
                    onToggle={() => setOpen((cur) => (cur === t.name ? null : t.name))}
                    interactive={copy === 0}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
