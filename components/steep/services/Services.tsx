import { ArrowRight } from "lucide-react";

import { Carousel } from "@/components/steep/Carousel";
import { Container } from "@/components/steep/Container";
import { BOOKING_URL } from "@/lib/site";
import { SERVICES, SERVICES_INTRO } from "./offerings";
import { ServiceTabs } from "./ServiceTabs";

/**
 * Services, as the reference's "Engage everyone" band.
 *
 * Fog White ground, so it separates from the white case studies above by a
 * single quiet step. A left-aligned 64px serif heading, the subhead at 22px
 * and 60% ink, and the reference's tinted "Learn more" pill — here the booking
 * link. Below, the tabs and the panel they switch (`ServiceTabs`).
 *
 * The panel is where this departs from the reference, and has to. Theirs
 * shows product UI for each tab; a service has no screen to show. So each
 * panel is the service written out — its full name, its lead and its five
 * points — as a white artifact card on a Mist tray, which is the reference's
 * own arrangement for a floating product surface.
 *
 * ⚠️ Only the five service names are confirmed copy. The heading, subhead,
 * leads and points are still the placeholder text flagged in `offerings.ts`.
 */
/** The reference's secondary pill: a 5% wash of navy ink rather than a
    border. Quieter than the ghost button, louder than a link. */
function BookingPill({ className }: { className: string }) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`h-11 items-center gap-1.5 rounded-full bg-[rgba(4,23,43,0.05)] px-5 text-[17px] font-[430] text-ink transition-colors duration-200 hover:bg-[rgba(4,23,43,0.09)] ${className}`}
    >
      Book a discovery call
      <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 bg-fog py-24 lg:py-32"
    >
      <Container>
        <div className="max-w-[880px]">
          <h2
            id="services-title"
            className="font-display text-heading-lg font-normal text-balance text-ink"
          >
            {SERVICES_INTRO.titleLead}{" "}
            <em className="italic">{SERVICES_INTRO.titleAccent}</em>
          </h2>

          <p className="mt-4 max-w-[640px] text-subheading font-normal text-ink/60">
            {SERVICES_INTRO.description}
          </p>

          {/* Under the subhead on desktop; on a phone the reference moves this
              pill below its carousel, so it is rendered twice and each copy
              shows at one size. */}
          <BookingPill className="mt-8 hidden lg:inline-flex" />
        </div>

        <ServiceTabs services={SERVICES} />

        {/* ── Phone and tablet ─────────────────────────────────────
            The reference's phone treatment of its product tabs: no tabs, one
            slide per item, the visual on top and the title and description
            under it, with previous/next buttons and then the pill.

            The row is a grid, not a flex row, and each slide is a subgrid over
            its three rows. That shares the card row, the title row and the
            description row across all five slides, so every card is as tall as
            the tallest and every title sits at the same height as you swipe.
            With flex, the cards took up the difference in description length
            and the titles stepped up and down between slides. */}
        <div className="lg:hidden">
          <Carousel
            label="Services"
            slideSelector=".svc-slide"
            className="-mx-6 mt-12 grid auto-cols-[84%] grid-flow-col grid-rows-[auto_auto_auto] snap-x snap-mandatory scroll-px-6 gap-x-4 overflow-x-auto px-6 sm:-mx-8 sm:auto-cols-[62%] sm:scroll-px-8 sm:px-8"
            controlsClassName="mt-6 flex gap-4"
          >
            {SERVICES.map((service, i) => (
              <article
                key={service.name}
                aria-label={`${service.menuName}, ${i + 1} of ${SERVICES.length}`}
                className={`svc-slide row-span-3 grid grid-rows-subgrid ${
                  i === 0 ? "snap-start" : i === SERVICES.length - 1 ? "snap-end" : "snap-center"
                }`}
              >
                <div className="rounded-[var(--radius-small)] border border-hairline bg-paper p-6">
                  <p className="text-[14px] text-ash tabular-nums">
                    Service {String(i + 1).padStart(2, "0")} of{" "}
                    {String(SERVICES.length).padStart(2, "0")}
                  </p>
                  <p className="mt-2.5 text-[20px] leading-snug font-[450] text-ink">
                    {service.name}
                  </p>
                  <ul className="mt-5 border-t border-hairline">
                    {service.points.map((point, p) => (
                      <li
                        key={point}
                        className="flex gap-3 border-b border-hairline py-3 text-[15px] leading-snug text-ink last:border-b-0"
                      >
                        <span className="w-5 shrink-0 text-[13px] leading-[1.5] text-ash tabular-nums">
                          {String(p + 1).padStart(2, "0")}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="mt-6 text-heading-sm font-medium text-ink">{service.menuName}</h3>
                <p className="mt-2 text-body-lg text-ink/60">{service.lead}</p>
              </article>
            ))}
          </Carousel>

          <BookingPill className="mt-10 inline-flex" />
        </div>
      </Container>
    </section>
  );
}
