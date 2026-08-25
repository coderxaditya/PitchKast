import { ImageResponse } from "next/og";

import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
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
          background: "#000",
          /* The gold the site already uses for eyebrows, as a soft bloom so
             the card is not a flat black rectangle in a feed. */
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(200,169,106,0.18), rgba(0,0,0,0) 55%)",
        }}
      >
        <div
          style={{
            fontSize: 116,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "#fff",
            display: "flex",
          }}
        >
          PITCHKAST
        </div>
        <div
          style={{
            marginTop: 28,
            width: 120,
            height: 2,
            background: "#c8a96a",
            display: "flex",
          }}
        />
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            color: "#bdbdbd",
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
