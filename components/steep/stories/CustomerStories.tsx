"use client";

import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

import { Carousel } from "@/components/steep/Carousel";
import { Container } from "@/components/steep/Container";
import { STORIES } from "./stories";

/**
 * Customer stories, as the reference's customer-story band.
 *
 * Measured off steep.app at 1440px: a 1440×830 sky band; "Customer story"
 * over a 44px serif quote and a 20px subhead at 60% ink; a row of four client
 * logos along the bottom of the left column, the current one at full opacity
 * and the others at 40%, with a 2px black indicator a quarter of the row wide
 * sliding between them over 0.3s cubic-bezier(0,0,0.2,1); and a 384px square
 * photograph at a 24px radius on the right, in black and white.
 *
 * A logo is chosen by clicking it, not on a timer: the reference does not
 * rotate this band. Its "Read the story" and "All stories" buttons are left
 * out, as asked. The label is a link on the reference, to its customers page.
 * Here it goes to the case studies, the nearest thing this site has.
 *
 * The logos are a real tab list with arrow keys, Home and End. The quote,
 * subhead and photograph cross-fade rather than swap, so nothing reflows as
 * the story changes: all four are laid in one grid cell and only the current
 * one is visible and announced. Logos use transparent black cuts of the client
 * marks, so nothing behind them shows through as a box.
 *
 * Below `md` it becomes the reference's phone carousel: one card per story
 * with the photograph on top, then the logo, quote and subhead.
 *
 * ⚠️ Every quote is a placeholder. See `stories.ts`.
 */
const EASE = "ease-[cubic-bezier(0,0,0.2,1)]";

export function CustomerStories() {
  const [current, setCurrent] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    const next = (i + STORIES.length) % STORIES.length;
    setCurrent(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: STORIES.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  const label = (
    <a
      href="#case-studies"
      className="group inline-flex items-center gap-1 py-1 text-[16px] text-ink"
    >
      Customer story
      <ChevronRight
        className="mt-px size-3.5 opacity-25 transition-[opacity,translate] duration-150 group-hover:translate-x-1 group-hover:opacity-50"
        strokeWidth={2}
        aria-hidden="true"
      />
    </a>
  );

  return (
    <section
      id="stories"
      aria-labelledby="stories-title"
      className="scroll-mt-24 bg-sky py-24 md:pt-48 md:pb-40"
    >
      <h2 id="stories-title" className="sr-only">
        Customer stories
      </h2>

      <Container>
        {/* ── Desktop and tablet ── */}
        <div className="hidden md:flex md:items-center md:gap-10 xl:gap-20">
          {/* The reference's vertical rhythm: label, quote about 90px lower, and
              the logo row pinned to the bottom of a column taller than the
              photograph, so the row sits below the photo's bottom edge rather
              than level with it. */}
          <div className="flex min-h-[480px] min-w-0 flex-1 flex-col self-stretch">
            {label}

            {/* One grid cell for all four, so the column is as tall as the
                longest quote and nothing below moves when the story changes. */}
            <div className="mt-20 grid">
              {STORIES.map((story, i) => (
                <div
                  key={i}
                  role="tabpanel"
                  id={`story-panel-${i}`}
                  aria-labelledby={`story-tab-${i}`}
                  inert={i !== current}
                  className={`col-start-1 row-start-1 transition-opacity duration-300 ${EASE} ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="max-w-[560px] font-display text-heading text-ink">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <p className="mt-3 max-w-[580px] text-body-lg text-ink/60">{story.subhead}</p>
                </div>
              ))}
            </div>

            <div
              role="tablist"
              aria-label="Customers"
              onKeyDown={onKeyDown}
              className="relative mt-auto flex border-t border-ink/10 pt-3"
            >
              {/* The indicator: a quarter of the row, sliding under the
                  current logo. It sits on the hairline, 2px tall and nudged up
                  1px so it straddles the line as the reference's does. */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-0 left-0 h-[2px] w-1/4 bg-ink transition-transform duration-300 ${EASE}`}
                style={{ transform: `translate(${current * 100}%, -1px)` }}
              />

              {STORIES.map((story, i) => (
                <button
                  key={story.client.name}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`story-tab-${i}`}
                  aria-selected={i === current}
                  aria-controls={`story-panel-${i}`}
                  tabIndex={i === current ? 0 : -1}
                  onClick={() => select(i)}
                  /* `basis-0 min-w-0`: four exactly equal quarters whatever the
                     logos' widths, because the indicator is always a quarter
                     of the row. With plain `flex-1` the widest mark pushed its
                     tab wider and the indicator drifted off it. */
                  className={`flex h-12 min-w-0 flex-1 basis-0 cursor-pointer items-center justify-center px-2 transition-opacity duration-200 ${
                    i === current ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    draggable={false}
                    src={story.client.logo}
                    alt={story.client.name}
                    width={story.client.width}
                    height={story.client.height}
                    loading="lazy"
                    decoding="async"
                    /* The transparent, solid-black cuts. The originals carry an
                       opaque white field, and blending it away did not survive
                       the 40% opacity on unselected logos: opacity isolates the
                       image, so it blended against nothing and the white box
                       came back on every logo except the current one. */
                    className="select-none [-webkit-user-drag:none] h-8 w-auto max-w-[min(120px,100%)] object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid shrink-0">
            {STORIES.map((story, i) => (
              <img
                draggable={false}
                key={story.photo.src}
                src={story.photo.src}
                alt={i === current ? story.photo.alt : ""}
                aria-hidden={i !== current}
                width={story.photo.width}
                height={story.photo.height}
                loading="lazy"
                decoding="async"
                className={`select-none [-webkit-user-drag:none] col-start-1 row-start-1 aspect-square w-[300px] rounded-[var(--radius-card)] object-cover grayscale transition-opacity duration-300 lg:w-[384px] ${EASE} ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Phone ── */}
        <div className="md:hidden">
          {label}
          <Carousel
            label="Customer stories"
            slideSelector=".story-slide"
            className="-mx-6 mt-6 grid auto-cols-[85%] grid-flow-col grid-rows-[auto_auto_auto_auto] snap-x snap-mandatory scroll-px-6 gap-x-4 overflow-x-auto px-6"
            controlsClassName="mt-6 flex gap-4"
          >
            {STORIES.map((story, i) => (
              <article
                key={story.client.name}
                aria-label={`${story.client.name}, ${i + 1} of ${STORIES.length}`}
                className={`story-slide row-span-4 grid max-w-[440px] grid-rows-subgrid ${
                  i === 0 ? "snap-start" : i === STORIES.length - 1 ? "snap-end" : "snap-center"
                }`}
              >
                <img
                  draggable={false}
                  src={story.photo.src}
                  alt={story.photo.alt}
                  width={story.photo.width}
                  height={story.photo.height}
                  loading="lazy"
                  decoding="async"
                  className="select-none [-webkit-user-drag:none] aspect-square w-full rounded-[var(--radius-card)] object-cover grayscale"
                />
                <img
                  draggable={false}
                  src={story.client.logo}
                  alt={story.client.name}
                  width={story.client.width}
                  height={story.client.height}
                  loading="lazy"
                  decoding="async"
                  className="select-none [-webkit-user-drag:none] mt-6 h-7 w-auto max-w-[120px] object-contain object-left"
                />
                <p className="mt-4 font-display text-heading-sm text-ink">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <p className="mt-2 text-body text-ink/60">{story.subhead}</p>
              </article>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
