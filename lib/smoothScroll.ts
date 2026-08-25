import type Lenis from "lenis";
import type { LenisOptions } from "lenis";

import {
  LENIS_LERP,
  LENIS_RESPECT_REDUCED_MOTION,
  LENIS_SYNC_TOUCH,
  LENIS_SYNC_TOUCH_LERP,
  LENIS_TOUCH_INERTIA_EXPONENT,
  LENIS_TOUCH_MULTIPLIER,
  LENIS_WHEEL_MULTIPLIER,
} from "./scrub/config";

/**
 * The one set of Lenis options the site uses, wherever it is instantiated.
 *
 * There are two instantiation sites — the home page, where the handshake hook
 * owns the instance so the scrub and the smoothed scroll advance on the same
 * gsap tick, and `/gallery`, which has no scrub and runs its own. They must
 * feel identical: a reader following "View all" out of the gallery section and
 * back should not cross a boundary where the scroll changes character. Sharing
 * the object is what makes drift impossible rather than merely unlikely.
 */
export function lenisOptions(): LenisOptions {
  return {
    lerp: LENIS_LERP,
    wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
    syncTouch: LENIS_SYNC_TOUCH,
    syncTouchLerp: LENIS_SYNC_TOUCH_LERP,
    touchInertiaExponent: LENIS_TOUCH_INERTIA_EXPONENT,
    touchMultiplier: LENIS_TOUCH_MULTIPLIER,
    respectReducedMotion: LENIS_RESPECT_REDUCED_MOTION,

    /* A nested scrollable element scrolls itself instead of handing the
       gesture up to the page. The site already marks the two places this
       matters by hand — `data-lenis-prevent` on the gallery lightbox,
       `data-lenis-prevent-touch` on the globe — and this makes the general
       case work without anyone remembering to add an attribute. The manual
       markers stay: the globe is not a scroller, so only the explicit
       attribute covers it. */
    allowNestedScroll: true,

    /* Kills an in-flight fling when the route changes. Without it, tapping
       "View all" mid-flick carries the leftover velocity into the gallery
       route, which lands already scrolling. */
    stopInertiaOnNavigate: true,
  };
}

/**
 * The live instance, for code that needs to drive the scroll rather than
 * configure it — the nav anchors, most importantly.
 *
 * This used to be reachable only as `window.__lenis`, which the hook sets
 * behind a `NODE_ENV === "development"` guard. So in a production build
 * `scrollToSection` found nothing and fell back to
 * `scrollIntoView({ behavior: "smooth" })` — a native smooth scroll running
 * against a Lenis that is simultaneously animating the same scroll position.
 * The nav links were the one part of the site that was smooth in dev and
 * fought itself in the deployed build. A module-level registry is not
 * stripped by anything, so both builds behave the same.
 */
let current: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  current = instance;
}

export function getLenis(): Lenis | null {
  return current;
}
