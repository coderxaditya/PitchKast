import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/flat/Button";
import { Container } from "@/components/flat/Container";
import { SocialDock } from "./SocialDock";
import {
  BOOKING_URL,
  NAV_LINKS,
  SOCIAL_LINKS,
  isExternal,
} from "@/lib/site";

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-eyebrow font-bold tracking-[0.12em] text-action uppercase">
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3.5">{children}</ul>
    </div>
  );
}

/**
 * `py-1 -my-1` grows the tap target without moving anything.
 *
 * At the footer's text size these links were 20px tall, under the 24px floor
 * for a pointer target. The padding takes the box to 28px; the matching
 * negative margin takes the same amount back out of the layout, so the column's
 * spacing is unchanged and only the hittable area grows.
 */
const LINK =
  "inline-block py-1 -my-1 text-white/70 transition-colors duration-200 hover:text-white";

/**
 * Site footer.
 *
 * Same content as before — mark and wordmark, copyright, the parent-company
 * disclosure, the social dock, the booking call to action, and three link
 * columns — restyled to the flat system.
 *
 * The dock is the previous build's component, brought back unchanged apart
 * from its colours, which were tuned for a page carrying shadcn's dark tokens.
 * This page does not, so left alone it would paint dark icons on a dark bar.
 *
 * Navigation is plain anchors. The document scrolls smoothly on its own, so
 * the scripted handler the old footer used has nothing left to add.
 */
export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink pt-20 sm:pt-24">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* ── Identity ── */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              {/* The supplied artwork as a square tile, cropped by
                  `scripts/build-footer-logo.mjs`. That source is black line
                  art on a solid orange field with the art covering 4% of a
                  2400x1792 canvas, so using it directly renders an almost
                  empty orange rectangle. The script crops a square around the
                  measured artwork and changes nothing else — the orange field
                  and the black ink are the file's own.

                  The radius is applied here rather than baked into the file,
                  so it stays tied to the system's own value. */}
              <img
                src="/brand/footer-mark-256.png"
                alt=""
                width={256}
                height={256}
                className="size-9 rounded-flat"
              />
              <span className="text-[1.375rem] font-extrabold tracking-[-0.02em] text-white">
                PitchKast
              </span>
            </div>

            <p className="mt-6 text-sm text-white/70">
              &copy; copyright PitchKast 2026. All rights reserved.
            </p>

            {/* Corporate disclosure — a step quieter than the copyright above
                it, since it is legal provenance rather than a claim the reader
                needs to act on. */}
            <p className="mt-3 max-w-[46ch] text-xs leading-relaxed text-pretty text-white/55">
              PitchKast &mdash; A service brand operating under its parent
              company, Himadri Infrabuild Private Limited.
            </p>

            {/* The dock from the previous build, restored as it was. */}
            <div className="mt-8">
              <SocialDock />
            </div>

            <Button asChild size="md" className="mt-8">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a Discovery Call
                <ArrowUpRight className="size-5" strokeWidth={2.5} />
              </a>
            </Button>
          </div>

          {/* ── Links ── */}
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:mt-0">
            <Column title="Pages">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </Column>

            <Column title="Socials">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={isExternal(social.href) ? "_blank" : undefined}
                    rel={
                      isExternal(social.href) ? "noopener noreferrer" : undefined
                    }
                    className={LINK}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </Column>

            <Column title="Legal">
              <li>
                <a href="/privacy" className={LINK}>
                  Privacy Policy
                </a>
              </li>
            </Column>
          </div>
        </div>
      </Container>

      {/* ── The wordmark ──────────────────────────────────────────
          A div, not a heading. It is decoration bleeding off the bottom of the
          page; as an h1 it was the highest-ranked heading in the document, so
          it told a crawler the page's subject was the company's own name
          rather than what the company does. Hidden from assistive tech, since
          the name is already in the title, the logo link and the copyright.

          Two things set its height. The top margin is effectively nothing,
          because the left column ends at the call to action while the right
          ends at the last link, so the grid row already leaves a stretch of
          empty space under the shorter side. And the glyphs are nudged down
          only slightly inside their clipping box, which is what makes the
          wordmark sit high and still bleed off the bottom edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-0 flex h-32 select-none justify-center overflow-hidden sm:mt-2 sm:h-44 lg:h-56"
      >
        <span /* Tracking opened from -0.05em. At this size that was tight enough for
             the "st" pair to overlap — the t's crossbar ran into the s. Outfit's
             own kerning handles the pair correctly at -0.02em. */
          className="translate-y-[6%] text-[20vw] leading-none font-extrabold tracking-[-0.02em] text-white/[0.07] lg:text-[18vw]">
          PitchKast
        </span>
      </div>
    </footer>
  );
}
