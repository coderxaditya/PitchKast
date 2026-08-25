import type { MetadataRoute } from "next";

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo";

/**
 * Installability is a small signal in its own right, but the real reason this
 * is here is that a manifest is what supplies the name and icon when someone
 * saves the site to a phone home screen.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/brand/logo-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/logo-180.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
