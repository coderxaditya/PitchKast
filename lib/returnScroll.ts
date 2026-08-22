/**
 * Remembers where the reader was on the home page when they leave it for a
 * sub-route, so coming back puts them where they were.
 *
 * The hero deliberately forces `scrollRestoration = "manual"` and pins itself
 * to the top on mount: the scrub has to open on its first black frame, and a
 * browser-restored offset would drop the reader mid-sequence. That is right
 * for a fresh visit and wrong for a return, so the two cases are told apart by
 * this key rather than by weakening the rule.
 *
 * sessionStorage, not a module variable: the App Router unmounts the home page
 * when it navigates away, and anything held in memory goes with it.
 */
const KEY = "pk:return-scroll";

export function rememberScroll() {
  try {
    sessionStorage.setItem(KEY, String(Math.round(window.scrollY)));
  } catch {
    /* private mode, quota — a lost scroll position is not worth throwing over */
  }
}

/** Reads the stored offset without consuming it. */
export function peekScroll(): number | null {
  try {
    const v = sessionStorage.getItem(KEY);
    return v === null ? null : Number.parseInt(v, 10) || 0;
  } catch {
    return null;
  }
}

/** Reads and clears, so a later fresh visit still opens at the top. */
export function takeScroll(): number | null {
  const v = peekScroll();
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  return v;
}
