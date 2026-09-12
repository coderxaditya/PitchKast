import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import {
  ClientsCard,
  ComposerCard,
  DisciplinesCard,
  RaisedCard,
  ShellSidebar,
  TeamCard,
  TrackRecordCard,
} from "@/components/steep/hero/artifacts";
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
  "record" | "clients" | "raised" | "disciplines" | "team" | "composer",
  Scatter
> = {
  record: { "--ax": "-26vw", "--ay": "-20vh", "--ar": "-4deg", "--as": "1.12" },
  clients: { "--ax": "-9vw", "--ay": "-25vh", "--ar": "2.5deg", "--as": "1.08" },
  raised: { "--ax": "24vw", "--ay": "-16vh", "--ar": "3.5deg", "--as": "1.1" },
  disciplines: { "--ax": "-25vw", "--ay": "21vh", "--ar": "-2.5deg", "--as": "1.08" },
  team: { "--ax": "26vw", "--ay": "23vh", "--ar": "4deg", "--as": "1.06" },
  composer: { "--ax": "6vw", "--ay": "25vh", "--ar": "-1.5deg", "--as": "1.05" },
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
          <div className="relative mx-auto w-full max-w-[1060px]">
            {/* The shell is the chrome only — ground, edge, sidebar. It sits
                behind the fragments and arrives last, which is what turns a
                scatter of cards into one surface. */}
            <div className="assembly__shell absolute inset-0 overflow-hidden rounded-[var(--radius-elevated)] border border-hairline bg-fog shadow-artifact">
              <div className="absolute inset-y-0 left-0 hidden w-[200px] border-r border-hairline bg-paper sm:block">
                <ShellSidebar />
              </div>
            </div>

            {/* The fragments. Left padding clears the sidebar rather than the
                grid being nested inside the shell, so the two can be
                revealed independently. */}
            <div className="relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:pl-[216px] lg:grid-cols-3">
              <div className="assembly__artifact" style={SCATTER.record}>
                <TrackRecordCard />
              </div>

              <div className="assembly__artifact" style={SCATTER.clients}>
                <ClientsCard />
              </div>

              <div
                className="assembly__artifact lg:row-span-2"
                style={SCATTER.raised}
              >
                <RaisedCard />
              </div>

              <div className="assembly__artifact" style={SCATTER.disciplines}>
                <DisciplinesCard />
              </div>

              <div className="assembly__artifact" style={SCATTER.team}>
                <TeamCard />
              </div>

              <div
                className="assembly__artifact sm:col-span-2 lg:col-span-3"
                style={SCATTER.composer}
              >
                <ComposerCard />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
