import { Button } from "@/components/monad/Button";
import { ArcList } from "./ArcList";

/**
 * Reach, on monad.com's "Connect Everything, Effortlessly" band.
 *
 * The one coloured surface on the page: a Periwinkle Mist band with a 40px
 * radius, inset 4px from the viewport edges, 200px of vertical padding on a
 * wide screen. The heading and a mono paragraph on the left, a dark pill under
 * them, and the countries PitchKast works in drifting along a chevron on the
 * right, with a coral-to-sky wash bleeding in from the edge.
 *
 * The paragraph is the FAQ's own answer to "Do you work with clients outside
 * India?", condensed.
 */
export function Reach() {
  return (
    <section aria-labelledby="reach-title" className="px-1 py-6 lg:py-10">
      <div className="relative overflow-hidden rounded-band bg-periwinkle">
        <div
          className="wash top-[10%] right-[-12%] h-[80%] w-[34%] opacity-80"
          style={{ background: "linear-gradient(270deg, rgba(160,181,235,0.6) 16%, rgba(255,148,115,0.6) 93%)", filter: "blur(75px)" }}
        />
        <div className="relative mx-auto grid max-w-[var(--shell)] items-center gap-6 px-5 py-16 sm:px-10 md:grid-cols-2 lg:py-[120px]">
          <div data-reveal className="relative z-10">
            <h2 id="reach-title" className="max-w-[14ch] font-serif text-heading-lg font-normal text-ink">
              Growth, wherever your buyers are
            </h2>
            <p className="mt-6 max-w-[44ch] text-body-lg text-off-black/80">
              Around half of our clients are based outside India. We work
              remotely across time zones and markets, shaping the work to each
              business rather than to a package.
            </p>
            <Button asChild variant="dark" className="mt-8">
              <a data-magnetic href="#case-studies">Explore case studies</a>
            </Button>
          </div>
          <ArcList />
        </div>
      </div>
    </section>
  );
}
