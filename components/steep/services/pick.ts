/**
 * Open one service's tab in the services section.
 *
 * Used by every link that names a service (the navbar dropdown, the footer's
 * Services column) alongside `href="#services"`, which does the scrolling.
 */
export const pickService = (i: number) =>
  window.dispatchEvent(new CustomEvent("pitchkast:service", { detail: i }));
