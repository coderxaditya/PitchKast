import { ImageResponse } from "next/og";

import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const alt = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card that renders whenever the site is pasted into LinkedIn, WhatsApp,
 * Slack or X.
 *
 * Generated at build time rather than committed as a binary, so it cannot
 * drift out of step with the brand strings in lib/seo. Deliberately plain —
 * a share card is read at thumbnail size, where anything smaller than the
 * wordmark is illegible.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          /* Blue 600 — the hero's own ground, so a shared link and the page
             it opens are recognisably the same thing. Flat: a solid block of
             colour, no gradient and no bloom. */
          background: "#2563eb",
        }}
      >
        <div
          style={{
            fontSize: 116,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#fff",
            display: "flex",
          }}
        >
          PitchKast
        </div>
        <div
          style={{
            marginTop: 28,
            width: 120,
            height: 6,
            background: "#fcd34d",
            display: "flex",
          }}
        />
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            color: "#ffffff",
            letterSpacing: "0.02em",
            display: "flex",
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    size,
  );
}
