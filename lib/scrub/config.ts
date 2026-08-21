/**
 * Every tunable that shapes the scroll-linked handshake.
 * Values are ported verbatim from the original static build so the
 * migrated page scrubs with identical timing and identical framing.
 */

/** Which surface actually paints the handshake. */
export type RendererKind = "frames" | "video";

/**
 * "frames" — decoded image sequence painted to <canvas>. This is the
 *   default because `video.currentTime` seeking snaps to keyframes and
 *   visibly stutters, worst of all when scrubbing in reverse.
 * "video" — HTML5 <video> seeked directly by scroll progress. Fully
 *   implemented; flip this to compare on your own hardware.
 */
export const RENDERER: RendererKind = "frames";

/**
 * Lenis smooth scrolling, on for the whole page.
 *
 * The note that used to sit here warned that layering Lenis over the
 * scrub's own damped follower double-smooths the input. That is a real
 * effect, and it is handled rather than avoided: DAMPING_LENIS below
 * loosens the follower whenever this is true, so exactly one stage of
 * smoothing is doing the work at a time.
 */
export const USE_LENIS = true;

/**
 * How quickly Lenis catches up to where you actually scrolled, per frame.
 * Lower is smoother and glides longer; higher tracks the input tighter.
 * 0.08 gives a long, settled glide without feeling disconnected from the
 * wheel.
 */
export const LENIS_LERP = 0.08;

/**
 * Distance one wheel notch travels, as a multiple of the browser default.
 *
 * This is the knob for "a rushed flick should not fire you to the bottom
 * of the page". Damping alone does not fix that — it changes *how* you
 * arrive, not how far a single gesture carries. Below 1 every gesture
 * covers less ground, so reaching the end takes deliberate scrolling.
 */
export const LENIS_WHEEL_MULTIPLIER = 0.85;

/**
 * Touch is left on the browser's own momentum scrolling.
 *
 * Lenis can drive touch too (`syncTouch`), but it then competes with the
 * native fling physics that phones already do well, and the usual result
 * is a scroll that feels heavier and slightly behind the finger. The
 * "rush scroll" problem this was asked to solve is a wheel and trackpad
 * problem; touch already decelerates on its own.
 */
export const LENIS_SYNC_TOUCH = false;

// ── Source footage ────────────────────────────────────────────
export const FRAME_COUNT = 240; // 10s @ 24fps
export const VIDEO_DURATION = 10;
export const SRC_W = 1280;
export const SRC_H = 720;
export const SRC_RATIO = SRC_H / SRC_W;

export const framePath = (i: number) =>
  `/assets/frames/frame_${String(i).padStart(4, "0")}.jpg`;
export const VIDEO_SRC = "/assets/final.mp4";

/** Ambient hero background — the space clip from the build spec. */
export const BG_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";
/**
 * Scroll progress over which the ambient background hands off to the scrubbed
 * footage. The scrub itself is untouched — the background simply fades out on
 * top of it, so the page opens on the space clip and dissolves into the video.
 */
export const BG_FADE_OUT = 0.1;

// ── Motion ────────────────────────────────────────────────────
/** Follower stiffness per tick. Higher tracks the scroll more tightly. */
export const DAMPING = 0.155;
/**
 * Follower stiffness when Lenis is driving the page.
 *
 * Lenis already smooths the scroll position, so the 0.155 follower would
 * be a second lag stacked on the first and the footage would visibly
 * trail the page. Loosening it to 0.42 hands the smoothing to Lenis and
 * leaves this loop doing little more than rounding to whole frames.
 */
export const DAMPING_LENIS = 0.42;
/** Frame distance below which the follower is considered settled. */
export const SNAP_EPSILON = 0.015;
/** Minimum share of viewport height the footage may occupy. */
export const MIN_STAGE_H = 0.58;

// ── Progress checkpoints ──────────────────────────────────────
export const HERO_FADE_IN = 0.045;
export const HERO_FADE_OUT = 0.3;
/** Scroll progress over which the footage rises out of pure black. */
export const OPEN_FADE = 0.014;
/** Length of the scrub, in viewport heights. */
export const TRACK_VH = 760;

// ── Preload ───────────────────────────────────────────────────
export const PRELOAD_CONCURRENCY = 12;
