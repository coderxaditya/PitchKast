import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import { ComposerCard, RaisedCard } from "@/components/steep/hero/artifacts";
import {
  PortalActivity,
  PortalApproval,
  PortalCalendar,
  PortalCounters,
  PortalGreeting,
  PortalPosts,
} from "@/components/steep/hero/portal";
import { BOOKING_URL } from "@/lib/site";

/**
 * The landing block.
 *
 * Six product fragments sit scattered around the headline; as the page
 * scrolls they converge, the headline clears, and a dashboard shell resolves
 * underneath them. The mechanism is described in `globals.css` — in short, it
 * is CSS scroll-driven animation and costs no JavaScript at all.
 *
 * Two things about the markup are load-bearing:
 *
 *  · Each fragment's scattered position is three custom properties on its
 *    wrapper, and nothing else. The assembled position is the wrapper's
 *    natural grid slot, so there is no second set of coordinates to keep in
 *    sync — "assembled" is literally `transform: none`.
 *
 *  · The scatter is written in `vw`/`vh`, not pixels, so the fragments reach
 *    the edges of a 1280px laptop and a 2560px display alike rather than
 *    clustering in the middle of the second one.
 */

/** Where each fragment rests before the assembly pulls it in. */
/* Intersected with CSSProperties because React's `style` prop rejects an
   object of custom properties alone — it has to be recognisable as a style
   object first. */
type Scatter = React.CSSProperties & {
  "--ax": string;
  "--ay": string;
  "--ar": string;
  "--as"?: string;
};

const SCATTER: Record<
  "counters" | "posts" | "approval" | "calendar" | "activity" | "raised" | "composer",
  Scatter
> = {
  /* These are not guesses. The assembled dashboard was measured at 1440×900
     — it lands at x 230–1210, y 96–867 — and each offset below is the
     difference between a fragment's slot in that grid and where it should sit
     at rest: hard against a viewport edge, or half out of frame.

     Written in vw/vh so the scatter tracks the viewport rather than the
     dashboard, which is fixed at 980px. On a wider display the fragments
     spread further out; on a narrower one they close in, and the composition
     holds at both. */
  counters: { "--ax": "0vw", "--ay": "-17vh", "--ar": "1.5deg", "--as": "1.05" },
  posts: { "--ax": "-27vw", "--ay": "1vh", "--ar": "-3deg", "--as": "1.08" },
  approval: { "--ax": "21vw", "--ay": "-10vh", "--ar": "3.5deg", "--as": "1.1" },
  calendar: { "--ax": "-27vw", "--ay": "14vh", "--ar": "-2deg", "--as": "1.06" },
  activity: { "--ax": "21vw", "--ay": "3vh", "--ar": "4deg", "--as": "1.08" },
  raised: { "--ax": "12vw", "--ay": "9vh", "--ar": "-1.5deg", "--as": "1.05" },
  composer: { "--ax": "15vw", "--ay": "9vh", "--ar": "2.5deg", "--as": "1.05" },
};

export function Hero() {
  return (
    <section id="home" aria-label="PitchKast" className="assembly relative">
      <div className="assembly__stage overflow-hidden py-20 sm:py-24">
        {/* ── Copy ───────────────────────────────────────────── */}
        <Container className="assembly__copy relative z-10 text-center">
          <h1 className="mx-auto max-w-[18ch] font-display text-display font-normal text-ink">
            We build brands that{" "}
            {/* One italicised phrase mid-sentence — the system's headline
                signature, and it falls on the promise. */}
            <em className="italic">move businesses forward</em>
          </h1>

          <p className="mx-auto mt-6 max-w-[54ch] text-body font-[430] text-slate">
            PitchKast is an end-to-end growth partner for early-stage founders —
            founder branding, product build, LinkedIn lead generation, and the
            deck that raises the round.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="md">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a discovery call
              </a>
            </Button>
            <Button asChild variant="ghost" size="md">
              <a href="#case-studies">View case studies</a>
            </Button>
          </div>
        </Container>

        {/* ── The dashboard ──────────────────────────────────── */}
        <Container className="assembly__dashboard">
          <div className="relative mx-auto w-full max-w-[980px]">
            {/* The shell is the ground the fragments land on — nothing
                else. It carried a window title bar and a sidebar copied from
                the site's navigation; both are gone. The fragments are the
                portal, and framing them in a second, invented chrome made
                the whole thing read as a picture of an app rather than as
                the app. */}
            <div className="assembly__shell absolute inset-0 rounded-[var(--radius-card)] border border-hairline bg-fog">
              <div className="px-5 pt-4">
                <PortalGreeting />
              </div>
            </div>

            {/* The fragments. They are laid out beside the shell rather than
                inside it, so the two can be revealed independently.

                Padding is set per side rather than as `p-3 pt-16`: the
                shorthand wins over the longhand in the generated stylesheet,
                so the top padding was silently 12px and the first card sat on
                top of the greeting. */}
            <div className="relative grid grid-cols-1 gap-3 px-3 pt-16 pb-3 sm:grid-cols-3">
              {/* Four of the five portal surfaces are hidden on a phone, and
                  that is a legibility decision: the post table's four columns
                  and the calendar's seven do not survive a 300px column at any
                  type size worth reading. What is left — the greeting, the
                  approval card, the accent and the call to action — is the
                  same page with the parts that cannot be read taken out. */}
              <div
                className="assembly__artifact hidden sm:col-span-3 sm:block"
                style={SCATTER.counters}
              >
                <PortalCounters />
              </div>

              <div
                className="assembly__artifact hidden sm:col-span-2 sm:block"
                style={SCATTER.posts}
              >
                <PortalPosts />
              </div>

              <div className="assembly__artifact" style={SCATTER.approval}>
                <PortalApproval />
              </div>

              <div
                className="assembly__artifact hidden sm:col-span-2 sm:block"
                style={SCATTER.calendar}
              >
                <PortalCalendar />
              </div>

              <div
                className="assembly__artifact hidden sm:block"
                style={SCATTER.activity}
              >
                <PortalActivity />
              </div>

              <div
                className="assembly__artifact sm:col-span-2"
                style={SCATTER.raised}
              >
                <RaisedCard />
              </div>

              <div className="assembly__artifact" style={SCATTER.composer}>
                <ComposerCard />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
