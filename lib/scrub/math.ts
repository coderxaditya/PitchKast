import { MIN_STAGE_H, SRC_RATIO } from "./config";

export const clamp = (v: number, a: number, b: number) =>
  v < a ? a : v > b ? b : v;

export const norm = (v: number, a: number, b: number) =>
  clamp((v - a) / (b - a), 0, 1);

/** Gentle ease used for the copy — never for the footage itself. */
export const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Fit the footage to the full viewport width so the hands always enter
 * from the true left and right edges. Only on unusually tall (portrait)
 * viewports do we scale up and let the sides crop, so the handshake
 * never shrinks into a stamp.
 */
export function frameRect(vw: number, vh: number): Rect {
  let w = vw;
  let h = w * SRC_RATIO;

  if (h < vh * MIN_STAGE_H) {
    h = vh * MIN_STAGE_H;
    w = h / SRC_RATIO;
  }
  return { x: (vw - w) / 2, y: (vh - h) / 2, w, h };
}
