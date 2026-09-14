import { Check } from "lucide-react";

import type { CaseStudy } from "./studies";

/**
 * The picture behind a case study card.
 *
 * The reference sets a dark photograph of a dashboard behind each card: a
 * screen showing the headline number and a rising line. This draws the same
 * scene in code from the study itself, so the number on the screen is the
 * study's real result. A study whose results are the work rather than a
 * figure gets a checklist of that work instead.
 *
 * Everything sits in the top of the card, because the card fades to black
 * toward the bottom and its text lives there.
 */

/** Split "6,300+ Organic Followers" into its figure and what it counts. */
function figure(metric: string) {
  const match = /^([\d$][^\s]*)\s+(.+)$/.exec(metric);
  return match ? { value: match[1], label: match[2] } : null;
}

/* A rising line on a 400×160 box. Three shapes, so neighbouring cards do not
   repeat one another. */
const LINES = [
  "M0 150 C40 146 70 140 100 132 S160 120 190 104 S250 86 280 62 S340 30 400 10",
  "M0 140 C30 138 60 128 90 130 S150 112 180 108 S240 90 270 70 S330 52 400 18",
  "M0 152 C50 150 80 146 120 136 S180 128 210 110 S260 60 300 50 S360 30 400 6",
];

function Scene({ children, featured }: { children: React.ReactNode; featured?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* A warm glow and a faint grid, where the reference's photos have a
          lit office behind the screen. */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_18%,rgba(251,225,209,0.32),transparent_70%),radial-gradient(45%_40%_at_10%_0%,rgba(160,80,50,0.4),transparent_70%)]" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />

      <div
        className={`absolute right-[-8%] left-[8%] [transform:perspective(1400px)_rotateY(-14deg)_rotateX(6deg)] ${
          featured ? "top-[9%] h-[52%]" : "top-[24%] h-[62%] sm:left-[40%]"
        }`}
      >
        <div className="h-full rounded-[18px] border border-white/15 bg-gradient-to-b from-[#2a2d33] to-[#16181c] p-5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] sm:p-7">
          {children}
        </div>
      </div>
    </div>
  );
}

export function StudyVisual({ study, featured }: { study: CaseStudy; featured?: boolean }) {
  const lead = figure(study.metrics[0]);
  const context = study.metrics[1];

  if (lead) {
    const line = LINES[study.id % LINES.length];
    const gradient = `study-fill-${study.id}`;
    return (
      <Scene featured={featured}>
        <div className="flex h-full flex-col">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-white/70 uppercase">
            {lead.label}
          </p>
          <p className="mt-1 font-display text-[40px] leading-none tracking-[-0.02em] text-[#ffd9c2] [text-shadow:0_0_24px_rgba(251,225,209,0.45)] tabular-nums sm:text-[52px]">
            {lead.value}
          </p>
          {context ? (
            <p className="mt-1.5 text-[12px] text-white/60">{context}</p>
          ) : null}

          <svg
            viewBox="0 0 400 160"
            preserveAspectRatio="none"
            className="mt-auto h-[48%] w-full overflow-visible"
          >
            <defs>
              <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fbe1d1" stopOpacity="0.5" />
                <stop offset="1" stopColor="#fbe1d1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${line} L400 160 L0 160 Z`} fill={`url(#${gradient})`} />
            <path
              d={line}
              fill="none"
              stroke="#fbe1d1"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              className="drop-shadow-[0_0_8px_rgba(251,225,209,0.7)]"
            />
          </svg>
        </div>
      </Scene>
    );
  }

  return (
    <Scene featured={featured}>
      <p className="text-[11px] font-semibold tracking-[0.12em] text-white/55 uppercase">
        Engagement
      </p>
      <ul className="mt-4 space-y-2.5">
        {study.metrics.slice(0, 4).map((metric, i) => (
          <li
            key={metric}
            className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-peach text-sienna">
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span className="truncate text-[13px] text-white/80">{metric}</span>
            <span className="ml-auto h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full bg-peach/70"
                style={{ width: `${100 - i * 14}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </Scene>
  );
}
