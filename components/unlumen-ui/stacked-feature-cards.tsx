"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HeroCard {
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
  title: string;
  description: string;
  href?: string;
}

export interface FeatureCard {
  value: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  cardClassName?: string;
  iconClassName?: string;
  rotateClassName?: string;
  // Extra fields to match case studies content if needed
  location?: string;
  metrics?: string[];
  paragraphs?: string[];
}

export interface StackedFeatureCardsProps {
  id?: string;
  heroCard: HeroCard;
  featureCards: FeatureCard[];
  sectionTitle?: string;
  className?: string;
}

const Card = ({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: FeatureCard;
  index: number;
  total: number;
  scrollYProgress: any;
}) => {
  // Card stacking effect:
  // As we scroll down past this card, it scales down slightly.
  // target range for this card to scale down is when the NEXT cards come over it.

  // To keep it simple, we use standard CSS sticky + framer-motion scale.
  const targetScale = 1 - (total - index) * 0.05;

  const scale = useTransform(
    scrollYProgress,
    [index / total, (index + 1) / total],
    [1, 1 - 0.04] // subtle scale down
  );

  const springScale = useSpring(scale, { stiffness: 300, damping: 28 });

  return (
    <motion.div
      style={{
        top: `calc(120px + ${index * 20}px)`,
        scale: index === total - 1 ? 1 : springScale,
        transformOrigin: "top center",
      }}
      className={cn(
        "sticky mb-10 w-full overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0a] p-8 lg:p-10 shadow-2xl",
        card.cardClassName,
        card.rotateClassName
      )}
    >
      <div className="flex flex-col h-full">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-body text-xs font-bold uppercase tracking-widest text-gold/80">
          <span className="shrink-0 text-gold">CASE STUDY {card.value}</span>
          <span className="rounded-full bg-gold/10 px-3 py-1.5 text-center sm:text-right border border-gold/20">
            {card.location}
          </span>
        </div>

        <h3 className="font-body text-2xl font-bold tracking-[-0.02em] text-white lg:text-3xl">
          {card.title}
        </h3>

        {card.description && (
          <h4 className="font-body mt-2 text-lg text-gold/90 lg:text-xl font-medium">
            {card.description}
          </h4>
        )}

        {card.paragraphs && (
          <div className="mt-6 space-y-4 font-body text-sm leading-relaxed text-neutral-400 lg:text-[0.9375rem] lg:leading-[1.65]">
            {card.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {card.metrics && (
          <div className="mt-10 flex flex-wrap gap-2.5">
            {card.metrics.map((metric, mIdx) => (
              <span
                key={mIdx}
                className="rounded-full bg-gold/5 border border-gold/10 px-3.5 py-1.5 font-body text-xs font-medium text-gold lg:text-[13px]"
              >
                {metric}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export function StackedFeatureCards({
  id,
  heroCard,
  featureCards,
  sectionTitle,
  className,
}: StackedFeatureCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id={id} className={cn("relative bg-black py-28 lg:py-40 z-10", className)}>
      <div className="mx-auto w-full max-w-[var(--shell)] px-6 sm:px-8 lg:px-14">
        {sectionTitle && (
          <div className="mb-16 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="bg-gold/70 h-px w-8 shrink-0 lg:w-14"
            />
            <h2 className="font-heading text-display-md leading-[0.95] tracking-[-0.03em] text-white italic">
              {sectionTitle}
            </h2>
          </div>
        )}

        <div
          ref={containerRef}
          className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-24"
        >
          {/* Left: Sticky Hero Card */}
          <div className="sticky top-32 w-full shrink-0 lg:w-[400px] xl:w-[450px]">
            <div className="flex flex-col gap-6">
              {heroCard.badge && (
                <span className="font-body text-xs tracking-[0.24em] uppercase text-gold">
                  {heroCard.badge}
                </span>
              )}
              <h3 className="font-heading text-4xl lg:text-5xl tracking-[-0.02em] text-white italic">
                {heroCard.title}
              </h3>
              <p className="font-body text-neutral-400 text-lg leading-relaxed">
                {heroCard.description}
              </p>
            </div>
          </div>

          {/* Right: Stacked Cards */}
          <div className="relative w-full pb-32">
            {featureCards.map((card, idx) => (
              <Card
                key={idx}
                card={card}
                index={idx}
                total={featureCards.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
