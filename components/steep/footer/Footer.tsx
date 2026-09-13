import { ArrowRight } from "lucide-react";

import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import {
  BOOKING_URL,
  EMAIL,
  NAV_LINKS,
  SOCIAL_LINKS,
  WHATSAPP,
  isExternal,
} from "@/lib/site";
import { SocialDock } from "./SocialDock";

/**
 * `py-1 -my-1` grows the tap target without moving anything: at 16px the
 * links are 24px tall, and the padding takes the hittable box past the 24px
 * floor while the negative margin gives the space straight back to the layout.
 */
const LINK =
  /* `min-w-6` for the one-letter "X", which was an 11px-wide target. */
  "inline-block -my-1 min-w-6 py-1 text-[16px] text-slate transition-colors duration-200 hover:text-ink";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[16px] font-[480] text-ink">{title}</h3>
      {/* The reference sets its footer links on a 40px pitch. */}
      <ul className="mt-5 flex flex-col gap-4">{children}</ul>
    </div>
  );
}

/**
 * Site footer, on the reference's footer.
 *
 * steep.app ends on a quiet white footer: the identity on the left, link
 * columns on the right with 16px/480 ink headings over 16px Slate Gray links,
 * and a bottom row in 15px Slate Gray. This is that arrangement.
 *
 * Everything you asked for on the previous footer is still here: the orange
 * tile beside the name, the social dock with its tooltips (LinkedIn first),
 * the Socials column in the same order as the dock, the Privacy Policy link,
 * the booking call to action, the parent-company disclosure, and the large
 * wordmark bleeding off the bottom edge. The one new column is Contact,
 * holding the email address and WhatsApp number the dock already links to,
 * written out for anyone who wants to copy them.
 *
 * Instagram and X are still `#` placeholders in `lib/site.ts`.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-paper pt-20 lg:pt-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          {/* ── Identity ── */}
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5" aria-label="PitchKast, back to top">
              {/* The supplied artwork as a square tile, cropped by
                  `scripts/build-footer-logo.mjs` around the measured line art.
                  The orange field and black ink are the file's own. */}
              <img
                src="/brand/footer-mark-256.png"
                alt=""
                width={256}
                height={256}
                className="size-9 rounded-[10px]"
              />
              <span className="text-[19px] font-[500] tracking-[-0.009em] text-ink">
                PitchKast
              </span>
            </a>

            <div className="mt-8">
              <SocialDock />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button asChild size="md">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a discovery call
                </a>
              </Button>
              <a
                href="#case-studies"
                className="inline-flex items-center gap-1.5 py-1 text-[17px] font-[430] text-ink underline-offset-4 hover:underline"
              >
                View case studies
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ── Links ── */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-[repeat(3,200px)]">
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
                    rel={isExternal(social.href) ? "noopener noreferrer" : undefined}
                    className={LINK}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </Column>

            <Column title="Contact">
              <li>
                <a href={`mailto:${EMAIL}`} className={LINK}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                  {WHATSAPP.display}
                </a>
              </li>
            </Column>
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-8 text-[15px] text-slate lg:mt-20 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="space-y-1.5">
            <p>&copy; copyright PitchKast 2026. All rights reserved.</p>
            {/* Legal provenance, a step quieter than the copyright. */}
            <p className="max-w-[60ch] text-[14px] text-ash">
              PitchKast, a service brand operating under its parent company,
              Himadri Infrabuild Private Limited.
            </p>
          </div>
          <a href="/privacy" className={LINK}>
            Privacy Policy
          </a>
        </div>
      </Container>

      {/* ── The wordmark ──────────────────────────────────────────
          A div, not a heading. It is decoration bleeding off the bottom of the
          page; as a heading it would tell a crawler the page's subject is the
          company's own name. Hidden from assistive tech, since the name is
          already in the title, the logo link and the copyright.

          Set in the display serif at weight 400 like every heading in the
          system, in ink at 5%, so it reads as a watermark on paper. It sits
          high in its clipping box and still loses the bottom of its
          descenders to the page edge.

          Tracking is only -0.01em, looser than the -0.025em the system gives
          display type. At 19vw every hundredth of an em is several pixels, and
          the previous build's wordmark ran its "s" into its "t" at tighter
          settings. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-10 flex h-28 justify-center overflow-hidden select-none sm:h-40 lg:mt-14 lg:h-52"
      >
        <span className="translate-y-[4%] font-display text-[22vw] leading-none font-normal tracking-[-0.01em] text-ink/[0.05] lg:text-[19vw]">
          PitchKast
        </span>
      </div>
    </footer>
  );
}
