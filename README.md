# agenciy® — scroll-linked handshake landing page

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger

## Run

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## How the scrub works

`ScrollTrigger` observes the tall `.track` element and reports raw, unsmoothed
progress. That progress maps **linearly** to a frame index — no easing on the
footage, which is what keeps it locked to the scroll. The weight you feel comes
from a damped follower running on `gsap.ticker`, which eases the playhead toward
the target index each frame and idles at zero cost once settled.

Progress never passes through React state. It is written straight to CSS custom
properties (`--heroFade`, `--heroY`, `--heroBlur`, `--outro`, `--scrim`) and to
the rendering surface, so scrubbing costs no re-renders.

## Renderers

`lib/scrub-config.ts` → `RENDERER`

| Value | Surface | Notes |
|---|---|---|
| `"frames"` *(default)* | `<canvas>` + preloaded image sequence | Frame N costs the same whichever direction you arrived from, so forward and reverse feel identical. |
| `"video"` | HTML5 `<video>`, seeked by scroll | Fully working. Seeking snaps to keyframes and re-decodes forward, so reverse scrubbing is notchier than the canvas path. |

Both share the same framing math (`lib/stage-math.ts`), so the hands enter from
the same edges at the same scale either way.

## Tuning

| Knob | Where | Effect |
|---|---|---|
| `DAMPING` | `lib/scrub-config.ts` | Higher tracks your finger more tightly. |
| `TRACK_VH` | `lib/scrub-config.ts` | How much scroll the sequence spans. |
| `USE_LENIS` | `lib/scrub-config.ts` | Smooth scrolling. Off by default — see below. |
| `HERO_FADE_*`, `OUTRO_*` | `lib/scrub-config.ts` | Where the copy enters and leaves. |

### Lenis

Wired up and ready, but **off by default**. The page already applies its own
damped follower to the scrub; layering Lenis on top double-smooths the input and
changes the established scroll feel. Set `USE_LENIS = true` to try it — it is
integrated the correct way (driven from `gsap.ticker`, with `lenis.on("scroll",
ScrollTrigger.update)`).

### Three.js / React Three Fiber

Not installed. The page has no interactive 3D — the dimensionality is
photographic, and adding a WebGL context would cost memory and battery for no
visual gain.

## Assets

`public/assets/frames/` holds 240 JPEGs (10s @ 24fps) decoded from
`public/assets/final.mp4` with AVFoundation. To regenerate at a different
quality or count, re-run the extraction and update `FRAME_COUNT`.

## Dev helper

In development only, `window.__stagePreview(0…1)` paints any progress without
scrolling — useful for inspecting the sequence frame by frame. Stripped from
production builds.

## `legacy/`

The original static build (`index.html` / `styles.css` / `main.js`), kept for
reference. Its asset paths point at the old `assets/` folder, which now lives at
`public/assets/`, so it will not run as-is.
