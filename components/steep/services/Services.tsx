import { ArrowRight } from "lucide-react";

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

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            /* The reference's secondary pill: a 5% wash of navy ink, not a
               border — quieter than the ghost button, louder than a link. */
            className="mt-8 inline-flex h-11 items-center gap-1.5 rounded-full bg-[rgba(4,23,43,0.05)] px-5 text-[17px] font-[430] text-ink transition-colors duration-200 hover:bg-[rgba(4,23,43,0.09)]"
          >
            Book a discovery call
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>

        <ServiceTabs services={SERVICES} />
      </Container>
    </section>
  );
}
