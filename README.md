# PitchKast — landing page

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger · Framer Motion

## Run

```bash
npm install
npm run dev
```

Dev serves on **http://localhost:4321**. `predev` and `prebuild` regenerate the
frame sequence first (see [Assets](#assets)), so a fresh clone works with no
extra steps.

```bash
npm run build && npm start   # production
npm run typecheck            # tsc --noEmit
```

## Layout

```
app/                     layout, page, globals.css (theme + glass + reveal CSS)
components/
  stage/                 scroll track, canvas, ambient background, loader
  hero/                  navbar, headline, stat cards, GROWTH word
  partners/              white "trusted by" band + logo marquee
  about/                 the seven About panels + shared reveal hook
  motion/                Rise, BlurText — the two entrance primitives
  ui/                    vendored registry components (shadcn / magicui / react-bits)
hooks/useHandshakeStage  owns the entire scroll-linked scrub
lib/scrub/               config, math, and the two renderers
scripts/extract-frames   mp4 → JPEG sequence via ffmpeg-static
```

## How the scrub works

`ScrollTrigger` observes the tall track element and reports raw, unsmoothed
progress. That progress maps **linearly** to a frame index — no easing on the
footage, which is what keeps it locked to the scroll. The weight you feel comes
from a damped follower running on `gsap.ticker`, which eases the playhead toward
the target index each frame and idles at zero cost once settled.

Progress never passes through React state. It is written straight to CSS custom
properties on `:root` — `--heroFade`, `--heroY`, `--heroFilter`, `--bgFade` — and
to the rendering surface, so scrubbing costs no re-renders.

One subtlety worth knowing before you touch `--heroFilter`: it resolves to `none`
below half a pixel of blur rather than `blur(0px)`. A filter of *any* length makes
the hero a backdrop root, which would cut every `.liquid-glass` child off from the
video behind it and render them as flat plates.

## Renderers

`lib/scrub/config.ts` → `RENDERER`

| Value | Surface | Notes |
|---|---|---|
| `"frames"` *(default)* | `<canvas>` + preloaded image sequence | Frame N costs the same whichever direction you arrived from, so forward and reverse feel identical. |
| `"video"` | HTML5 `<video>`, seeked by scroll | Fully working. Seeking snaps to keyframes and re-decodes forward, so reverse scrubbing is notchier than the canvas path. |

Both share the framing math in `lib/scrub/math.ts`, so the hands enter from the
same edges at the same scale either way.

## Tuning

All knobs live in `lib/scrub/config.ts`.

| Knob | Effect |
|---|---|
| `DAMPING` | Higher tracks your finger more tightly. |
| `TRACK_VH` | How much scroll the sequence spans. |
| `HERO_FADE_IN` / `HERO_FADE_OUT` | Where the hero copy clears out. |
| `BG_FADE_OUT` | How fast the ambient space clip dissolves into the footage. |
| `FRAME_COUNT` | Must match what `npm run frames` produced. |
| `USE_LENIS` | Smooth scrolling. Off by default — see below. |

### Lenis

Wired up and ready, but **off by default**. The page already applies its own
damped follower to the scrub; layering Lenis on top double-smooths the input and
changes the established scroll feel. Set `USE_LENIS = true` to try it — it is
integrated the correct way (driven from `gsap.ticker`, with
`lenis.on("scroll", ScrollTrigger.update)`).

Note that `components/ui/ScrollStack.tsx` ships its own Lenis instance. If you
use that component, reconcile it with this one first — two smooth-scroll engines
both writing `scrollTop` will fight.

## Assets

`public/assets/final.mp4` (2.8MB) is the source of truth. `npm run frames`
decodes it into `public/assets/frames/` as 240 JPEGs (~11MB) using the ffmpeg
binary from `ffmpeg-static`, so it runs identically on macOS and on CI.

The frames are **derived artifacts and are gitignored** — `predev`/`prebuild`
rebuild them. Change `FRAME_COUNT` if you regenerate at a different count.

## Reveal animations

The About section's panels reveal once, on first entry, and then stay — see
`components/about/useInView.ts`. The flag latches `true` and the observer
disconnects, so scrolling back over the section doesn't replay a wall of copy.

`.reveal-figure` in `globals.css` is the image variant (clip-path wipe + scale,
ported from a StringTune tutorial). No figures are currently in the grid, but the
wiring is intact — add an entry to `FIGURES` in `About.tsx` to drop a photo into
any free slot.

## Dev helper

In development only, `window.__stagePreview(0…1)` paints any scroll progress
without scrolling — useful for inspecting the sequence frame by frame. Stripped
from production builds.

## Placeholders to replace before launch

| What | Where |
|---|---|
| Partner logos — invented names, not real clients | `components/partners/logos.tsx` |
| About imagery — `picsum.photos` URLs, external dependency | `components/about/About.tsx` |
| Founder photograph — deliberately unnamed placeholder | `components/about/FounderPortrait.tsx` |
| Ambient hero video — hosted on a CloudFront URL, not local | `BG_VIDEO_SRC` in `lib/scrub/config.ts` |
| Navbar links — still the reference site's labels | `components/hero/Navbar.tsx` |

## `legacy/`

The original static build (`index.html` / `styles.css` / `main.js`) from before
the Next.js migration, kept for reference. Two design generations stale and its
asset paths point at the old `assets/` folder, so it will not run as-is.
