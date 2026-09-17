"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { TESTIMONIALS } from "@/content/testimonials";

/**
 * Testimonials.
 *
 * monad.com has no testimonials, so this is built from the system rather than
 * copied: a row of hairline cards that scroll-snap sideways, each quote in the
 * serif (the voice of the client, set like a pull quote in a journal), the
 * name in uppercase mono and the role in Smoke underneath a hairline. Two
 * round ghost buttons page through on a pointer; a finger just swipes.
 *
 * Every quote is the client's own, word for word.
 */
export function Testimonials() {
  const rail = useRef<HTMLUListElement>(null);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="testimonials-title" title="What founders say about us" />
          <div className="flex gap-3">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => page(dir)}
                aria-label={dir === -1 ? "Previous testimonials" : "Next testimonials"}
                className="flex size-12 items-center justify-center rounded-pill border border-off-black text-off-black transition-colors hover:bg-off-black hover:text-parchment"
              >
                {dir === -1 ? <ArrowLeft className="size-5" strokeWidth={1.5} /> : <ArrowRight className="size-5" strokeWidth={1.5} />}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* The rail runs to the viewport edges; its padding lines the first card
          up with the container's gutter, however wide the screen. */}
      <div className="mt-12 lg:mt-16">
        <ul
          ref={rail}
          aria-label="Testimonials"
          className="flex snap-x snap-mandatory scroll-px-[var(--rail-pad)] gap-5 overflow-x-auto px-[var(--rail-pad)] pb-2 [--rail-pad:max(20px,calc((100vw-var(--shell))/2+20px))] [scrollbar-width:none] sm:[--rail-pad:max(40px,calc((100vw-var(--shell))/2+40px))] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t) => (
            <li
              key={t.name}
              className="flex w-[min(86vw,460px)] shrink-0 snap-start flex-col justify-between rounded-card border border-off-black/20 p-7 sm:p-10"
            >
              <blockquote className="font-serif text-[20px] leading-[1.4] tracking-[-0.01em] text-ink sm:text-subheading sm:leading-[1.35]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-10 border-t border-ash pt-5">
                <p className="text-body-sm tracking-[0.05em] text-off-black uppercase">{t.name}</p>
                <p className="mt-1 text-body-sm text-smoke">{t.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
