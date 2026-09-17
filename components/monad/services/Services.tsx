import {
  CodeXml,
  Globe,
  Megaphone,
  Presentation,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { SERVICES, SERVICES_INTRO, type Service } from "@/content/services";

/**
 * Services, on monad.com's "How Monad Works" bento.
 *
 * One tall card on the left and the rest stacked on the right, every card a
 * 1px hairline at 20% Off-Black with a 16px radius and no shadow. Each carries
 * a small icon, the serif title at 24px, a sans paragraph at 80% Off-Black,
 * and an illustration: a heavily blurred pastel wash (Monad's own gradients,
 * read off their cards) with a few crisp hairline pills on top that sketch
 * what the service actually does.
 *
 * The five names are the company's; the leads are the placeholder copy in
 * `content/services.ts`.
 */

const ICONS: LucideIcon[] = [Megaphone, CodeXml, TrendingUp, Globe, Presentation];

function Chip({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-caption tracking-[0.05em] uppercase whitespace-nowrap sm:text-body-sm ${
        dark
          ? "border-off-black bg-off-black text-parchment"
          : "border-off-black/20 bg-parchment/85 text-off-black"
      }`}
    >
      {children}
    </span>
  );
}

function Connector({ vertical }: { vertical?: boolean }) {
  return vertical ? (
    <span aria-hidden="true" className="mx-auto block h-5 w-px bg-off-black/25" />
  ) : (
    <span aria-hidden="true" className="block h-px w-4 shrink-0 bg-off-black/25 sm:w-6" />
  );
}

/* ── Illustrations, one per service ──────────────────────────── */

/** Founder & Company Branding: a profile turning into inbound, top to bottom. */
function BrandingArt() {
  const steps = ["Positioning", "Profile rebuilt", "Weekly posts", "Engagement", "Inbound"];
  return (
    <div className="relative mt-10 flex min-h-[420px] flex-1 items-center justify-center overflow-hidden rounded-[12px]">
      <div
        className="wash inset-x-[-10%] top-[12%] bottom-[-8%]"
        style={{ background: "linear-gradient(rgba(255,148,115,0.8) 7%, rgba(160,181,235,0.8) 84%)" }}
      />
      <ol className="relative flex flex-col items-center">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-center">
            {i > 0 ? <Connector vertical /> : null}
            <Chip dark={i === steps.length - 1}>
              <span className="text-smoke">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </Chip>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Product & Technology: an idea resolving into the pieces of a product. */
function ProductArt() {
  return (
    <Art wash="radial-gradient(60% 60% at 40% 50%, rgba(160,181,235,0.9), rgba(167,252,205,0.8))">
      <div className="flex flex-col items-center gap-2">
        <Chip>MVP</Chip>
        <div className="flex flex-wrap justify-center gap-2">
          <Chip>Web</Chip>
          <Chip>Mobile</Chip>
          <Chip>APIs</Chip>
          <Chip>Cloud</Chip>
        </div>
        <Chip dark>Launch</Chip>
      </div>
    </Art>
  );
}

/** LinkedIn Lead Generation: research to reply, left to right. */
function LeadsArt() {
  return (
    <Art wash="linear-gradient(270deg, rgba(226,193,97,0.7) 24%, rgba(243,122,10,0.7) 76%)">
      <div className="flex items-center">
        <Chip>ICP</Chip>
        <Connector />
        <Chip>Verified</Chip>
        <Connector />
        <Chip dark>Reply</Chip>
      </div>
    </Art>
  );
}

/** Sales & Market Expansion: one story, shaped per market. */
function MarketsArt() {
  return (
    <Art wash="linear-gradient(rgb(160,181,235), rgb(167,252,205))">
      <div className="flex items-center">
        <Chip dark>Core story</Chip>
        <svg viewBox="0 0 40 80" aria-hidden="true" className="h-20 w-8 shrink-0 sm:w-10">
          <path d="M0 40 C20 40 20 8 40 8 M0 40 H40 M0 40 C20 40 20 72 40 72" fill="none" stroke="#242424" strokeOpacity="0.25" />
        </svg>
        <div className="flex flex-col gap-2">
          <Chip>Market one</Chip>
          <Chip>Market two</Chip>
          <Chip>Market three</Chip>
        </div>
      </div>
    </Art>
  );
}

/** Fundraising & Growth Decks: the slides an investor reads, in order. */
function DeckArt() {
  const slides = ["Problem", "Market", "Traction", "The ask"];
  return (
    <Art wash="radial-gradient(60% 70% at 30% 40%, rgba(255,148,115,0.85), rgba(236,218,152,0.8))">
      <div className="relative h-[150px] w-[220px]">
        {slides.map((slide, i) => (
          <div
            key={slide}
            className="absolute flex h-[104px] w-[160px] flex-col justify-between rounded-[10px] border border-off-black/20 bg-parchment/90 p-3"
            style={{ left: i * 18, top: i * 14 }}
          >
            <span className="text-caption tracking-[0.05em] text-smoke uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-serif text-[18px] leading-none">{slide}</span>
          </div>
        ))}
      </div>
    </Art>
  );
}

function Art({ wash, children }: { wash: string; children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-[12px] md:min-h-0">
      <div className="wash inset-[6%]" style={{ background: wash }} />
      <div className="relative">{children}</div>
    </div>
  );
}

const ART = [BrandingArt, ProductArt, LeadsArt, MarketsArt, DeckArt];

function CardText({ service, index }: { service: Service; index: number }) {
  const Icon = ICONS[index];
  return (
    <div>
      <Icon className="size-5 text-off-black" strokeWidth={1.25} aria-hidden="true" />
      <h3 className="mt-5 font-serif text-subheading font-normal text-ink">{service.name}</h3>
      <p className="mt-3 max-w-[46ch] font-sans text-body leading-[1.35] text-off-black/80">
        {service.lead}
      </p>
      {service.badge ? (
        <p className="mt-4 inline-block rounded-pill border border-ash px-3 py-1 text-caption tracking-[0.05em] text-graphite uppercase">
          {service.badge}
        </p>
      ) : null}
    </div>
  );
}

export function Services() {
  const [first, ...rest] = SERVICES;
  const FirstArt = ART[0];

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <SectionHeading
          id="services-title"
          title={`${SERVICES_INTRO.titleLead} ${SERVICES_INTRO.titleAccent}`}
          lead={SERVICES_INTRO.description}
        />

        <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-[443fr_897fr]">
          {/* ── The tall card ── */}
          <article
            id="service-1"
            className="flex scroll-mt-[calc(var(--header-h)+16px)] flex-col rounded-card border border-off-black/20 p-6 sm:p-10"
          >
            <CardText service={first} index={0} />
            <FirstArt />
          </article>

          {/* ── The stack ── */}
          <div className="grid gap-3">
            {rest.map((service, i) => {
              const Illustration = ART[i + 1];
              return (
                <article
                  key={service.name}
                  id={`service-${i + 2}`}
                  className="grid scroll-mt-[calc(var(--header-h)+16px)] gap-6 rounded-card border border-off-black/20 p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
                >
                  <CardText service={service} index={i + 1} />
                  <Illustration />
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
