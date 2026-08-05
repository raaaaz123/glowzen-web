/**
 * The single source of truth for facts about the site and the app.
 *
 * Three consumers need the same numbers and wording: the page copy, the
 * structured data crawlers read, and llms.txt. Anything duplicated across
 * those three drifts, and drifted structured data is worse than none — Google
 * treats a mismatch between markup and visible copy as spam.
 */

export const SITE_URL = "https://glowzen.app";
export const SITE_NAME = "GlowZen";
export const TAGLINE = "Facial exercise, personalised to your face";

export const DESCRIPTION =
  "Sculpt, lift and glow — naturally, in just 8 minutes a day. GlowZen builds a personalised facial exercise plan and guides you through it with video demos and voice coaching.";

/** Platform facts, mirrored from the Cta and Hero sections. */
export const PLATFORM = "iOS";
export const MIN_OS = "iOS 17";
export const EXERCISE_COUNT = 18;
export const ZONE_COUNT = 7;
export const SESSION_MINUTES = 8;

/**
 * The App Store listing. Still empty while the app is in review — the Cta
 * button and the structured data both key off this, so filling it in here is
 * the only edit needed when the listing goes live.
 */
export const APP_STORE_URL = "";
