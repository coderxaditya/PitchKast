/**
 * Where the clients are.
 *
 * The eleven countries are yours. ⚠️ Every client COUNT below is a placeholder
 * — you asked for numbers to fill the layout and said the real ones follow.
 * They are deliberately grouped in one field so a single pass replaces them
 * all, and they are not summed or displayed as a total anywhere, so no
 * fabricated figure is ever stated as fact.
 *
 * `code` is the ISO 3166-1 alpha-2 code, and it also names the flag file:
 * `public/flags/<code>.png`. Real flag images rather than emoji, because emoji
 * flags render as bare letter pairs on Windows — which is most visitors. They
 * are rasterised to a uniform 120px by `scripts/build-flags.mjs`; the source
 * SVGs ranged from 164 bytes to 153KB.
 *
 * `short` is what the card shows under the code, matching the reference's
 * abbreviated labels. `name` is the full name, used for the flag's alt text.
 *
 * Coordinates are the capital or the main commercial city, and they feed the
 * map's arcs as well as the cards.
 */
export type Country = {
  code: string;
  /** Full name — alt text, and the accessible label. */
  name: string;
  /** Abbreviated label shown on the card. */
  short: string;
  /**
   * Cities within the country. Not rendered — the cards are down to flag,
   * name and count — but kept because it is real information, and putting it
   * back is one line in `Reach.tsx`.
   */
  detail?: string;
  clients: number;
  lat: number;
  lng: number;
};

/**
 * Where every arc starts, so the map reads as reach outward from home.
 *
 * The geographic centre of India rather than the office in Gurgaon. Gurgaon
 * sits well up in the north, which put the origin visibly above the landmass
 * and made the fan of arcs look like it was leaving from Pakistan. This is the
 * country's own centroid, so the origin reads as "India" at a glance.
 */
export const HOME = { lat: 22.5, lng: 79.0, name: "India" };

export const COUNTRIES: Country[] = [
  {
    code: "IN",
    name: "India",
    short: "India",
    detail: "Bangalore · Hyderabad · Pune · Gurgaon",
    clients: 6,
    lat: 28.4595,
    lng: 77.0266,
  },
  { code: "US", name: "United States", short: "USA", clients: 6, lat: 40.7128, lng: -74.006 },
  { code: "GB", name: "United Kingdom", short: "UK", clients: 3, lat: 51.5074, lng: -0.1278 },
  { code: "AE", name: "United Arab Emirates", short: "UAE", detail: "Dubai", clients: 3, lat: 25.2048, lng: 55.2708 },
  { code: "SA", name: "Saudi Arabia", short: "Saudi Arabia", clients: 2, lat: 24.7136, lng: 46.6753 },
  { code: "SG", name: "Singapore", short: "Singapore", clients: 2, lat: 1.3521, lng: 103.8198 },
  { code: "AU", name: "Australia", short: "Australia", clients: 2, lat: -33.8688, lng: 151.2093 },
  { code: "ES", name: "Spain", short: "Spain", clients: 1, lat: 40.4168, lng: -3.7038 },
  { code: "PL", name: "Poland", short: "Poland", clients: 1, lat: 52.2297, lng: 21.0122 },
  { code: "EG", name: "Egypt", short: "Egypt", clients: 1, lat: 30.0444, lng: 31.2357 },
  { code: "MV", name: "Maldives", short: "Maldives", clients: 1, lat: 4.1755, lng: 73.5093 },
  { code: "CA", name: "Canada", short: "Canada", clients: 1, lat: 43.6532, lng: -79.3832 },
];

/**
 * Destinations that are not their own country card.
 *
 * The United States already has a card, pinned to New York. This adds a second
 * landing point on the west coast so the map shows reach across the country
 * rather than a single dot on its eastern edge.
 */
const EXTRA_POINTS = [{ lat: 37.7749, lng: -122.4194, name: "San Francisco" }];

/**
 * One arc per destination, all radiating from home.
 *
 * India is skipped as a destination — an arc from the origin to the origin is
 * a zero-length path, which renders as nothing and animates as nothing.
 */
export const ARCS = [
  ...COUNTRIES.filter((c) => c.code !== "IN"),
  ...EXTRA_POINTS,
].map((point) => ({
  start: { lat: HOME.lat, lng: HOME.lng, label: HOME.name },
  end: { lat: point.lat, lng: point.lng, label: point.name },
}));
