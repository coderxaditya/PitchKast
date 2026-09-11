import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/flat/Button";
import { Container } from "@/components/flat/Container";
import { BOOKING_URL } from "@/lib/site";
import { LOOKS } from "./looks";
import { SERVICES, SERVICES_INTRO, type Service } from "./offerings";

function Card({
  service,
  look,
  wide,
}: {
  service: Service;
  look: (typeof LOOKS)[number];
  wide: boolean;
}) {
  const Icon = look.icon;

  return (
    <article
      className={`group flex h-full flex-col rounded-flat p-7 transition-all duration-200 hover:scale-[1.02] sm:p-9 ${look.card} ${look.hover} ${
        wide ? "lg:col-span-2" : ""
      }`}
    >
      {/* Icon in a white disc — the system's treatment, and on a tinted card
          the white is what gives it an edge without a border. */}
      <span
        className={`flex size-14 shrink-0 items-center justify-center rounded-full bg-canvas transition-transform duration-200 group-hover:scale-110 ${look.mark}`}
      >
        <Icon className="size-6" strokeWidth={2.25} aria-hidden="true" />
      </span>

      <h3 className="mt-7 text-display-sm leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-ink">
        {service.name}
      </h3>
      <p className="mt-3 text-lg font-semibold text-ink-soft">{service.lead}</p>

      {/* The wide card would otherwise run one very long column of five
          bullets across the full page width; it splits instead. */}
      <ul
        className={`mt-7 space-y-3.5 ${wide ? "lg:columns-2 lg:gap-x-10 lg:space-y-0" : ""}`}
      >
        {service.points.map((point) => (
          <li
            key={point}
            className={`flex gap-3 text-ink-soft ${wide ? "lg:mb-3.5 lg:break-inside-avoid" : ""}`}
          >
            <Check
              className={`mt-0.5 size-5 shrink-0 ${look.mark}`}
              strokeWidth={3}
              aria-hidden="true"
            />
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Services.
 *
 * The scroll-driven cylinder this replaces turned five names past a pinned
 * viewport over five and a half screens of scrolling and showed nothing else
 * about any of them. Here all five are on the page at once, each with what it
 * actually involves, and the section costs the reader one screen instead of
 * six.
 *
 * Five cards into two columns leaves an odd one out, so the last runs full
 * width with its list in two columns. That reads as a deliberate close to the
 * grid rather than a gap beside it.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-20 bg-canvas py-20 sm:py-24 lg:py-32"
    >
      <Container>
        {/* Header splits at lg — headline left, supporting line right — which
            is the reference's arrangement and stops a long title and a long
            paragraph stacking into a wall. */}
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="lg:max-w-2xl">
            <p className="inline-flex rounded-full bg-surface px-4 py-2 text-eyebrow font-bold tracking-[0.12em] text-action-strong uppercase">
              {SERVICES_INTRO.eyebrow}
            </p>
            <h2
              id="services-title"
              className="mt-6 text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-ink"
            >
              {SERVICES_INTRO.titleLead}{" "}
              <span className="text-action-strong">
                {SERVICES_INTRO.titleAccent}
              </span>
              .
            </h2>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft lg:mt-0 lg:pb-2">
            {SERVICES_INTRO.description}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Card
              key={service.name}
              service={service}
              look={LOOKS[i]}
              wide={i === SERVICES.length - 1}
            />
          ))}
        </div>

        {/* The section ends on a list of what is on offer, so it ends on the
            way to ask for it. */}
        <div className="mt-12 flex justify-center sm:mt-14">
          <Button asChild size="lg">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Discovery Call
              <ArrowUpRight className="size-5" strokeWidth={2.5} />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
