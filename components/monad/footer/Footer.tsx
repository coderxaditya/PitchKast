import { Container } from "@/components/monad/Container";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "@/components/monad/footer-icons";
import { Logo } from "@/components/monad/Navbar";
import { SERVICES, serviceAnchor } from "@/content/services";
import { EMAIL, FOUNDER_EMAIL, HEADER_LINKS, SOCIAL_LINKS, WHATSAPP, isExternal } from "@/lib/site";

/**
 * Site footer, on monad.com's: the logo and "Follow us on" with round icon
 * links on the left; small uppercase column headings in Smoke over mono links
 * on the right; and a hairline above the legal row, where one blank line
 * separates the copyright from the parent-company disclosure.
 */
const ICON_FOR: Record<string, (p: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  X: XIcon,
};

const LINK = "inline-block py-1 text-body-sm text-off-black transition-colors hover:text-smoke";

function Column({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-caption tracking-[0.05em] text-smoke uppercase">{title}</h3>
      <ul className="mt-5 space-y-2">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-[var(--header-h)] pt-10 pb-8 lg:pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <div>
            <a href="#home" aria-label="PitchKast, back to top" className="inline-block">
              <Logo />
            </a>
            <p className="mt-10 text-caption tracking-[0.05em] text-smoke uppercase">Follow us on</p>
            <ul className="mt-3 flex gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICON_FOR[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={isExternal(social.href) ? "_blank" : undefined}
                      rel={isExternal(social.href) ? "noopener noreferrer" : undefined}
                      aria-label={social.label}
                      className="flex size-10 items-center justify-center rounded-pill bg-off-black text-parchment transition-colors hover:bg-lake"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={WHATSAPP.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex size-10 items-center justify-center rounded-pill bg-off-black text-parchment transition-colors hover:bg-lake"
                >
                  <WhatsAppIcon className="size-4" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[repeat(4,auto)] sm:justify-between lg:gap-x-16">
            <Column title="Services">
              {SERVICES.map((service, i) => (
                <li key={service.name}>
                  <a href={serviceAnchor(i)} className={LINK}>
                    {service.menuName}
                  </a>
                </li>
              ))}
            </Column>
            <Column title="Pages">
              {HEADER_LINKS.map((link) => (
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
            {/* Full width on a phone: the two addresses are too long for half. */}
            <Column title="Contact" className="col-span-2 sm:col-span-1">
              <li>
                <a href={`mailto:${EMAIL}`} className={LINK}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={`mailto:${FOUNDER_EMAIL}`} className={LINK}>
                  {FOUNDER_EMAIL}
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

        <div className="mt-12 flex flex-col gap-4 border-t border-ash pt-6 text-caption text-smoke sm:text-body-sm lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-[1.35em]">
            <p>&copy; copyright PitchKast 2026. All rights reserved.</p>
            <p className="max-w-[64ch]">
              PitchKast, a service brand operating under its parent company, Himadri Infrabuild Private Limited.
            </p>
          </div>
          <a href="/privacy" className="py-1 text-off-black hover:text-smoke">
            Privacy Policy
          </a>
        </div>
      </Container>
    </footer>
  );
}
