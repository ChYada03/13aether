/** Tailwind-aligned breakpoints (px). */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

/** Particle caps per device class. */
export const PARTICLE_CAPS = {
  desktop: 200,
  mobile: 80,
} as const;

/** Nav bar heights — kept in sync with CSS variables. */
export const NAV_HEIGHTS = {
  desktop: 64,
  mobile: 56,
} as const;

/** Hero intro choreography timing in seconds. */
export const HERO_INTRO_TIMINGS = {
  starsScatter: { from: 0.0, to: 0.8 },
  constellationLines: { from: 0.8, to: 1.6 },
  orbitMorph: { from: 1.6, to: 2.2 },
  orbitResolve: { from: 2.2, to: 2.8 },
  logoFadeIn: { from: 2.8, to: 3.6 },
  titleReveal: { from: 3.4, to: 4.4 },
  taglineFadeIn: { from: 4.4, to: 4.8 },
  steadyState: 4.8,
} as const;

export const ZODIAC_KEYS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
  "ophiuchus",
] as const;

export type ZodiacKey = (typeof ZODIAC_KEYS)[number];

/** Image index (1-based) for each zodiac in `public/symbols/{n}.png` and `public/portraits/{nn}.jpg`. */
export const ZODIAC_IMAGE_INDEX: Record<ZodiacKey, number> = {
  aries: 1,
  taurus: 2,
  gemini: 3,
  cancer: 4,
  leo: 5,
  virgo: 6,
  libra: 7,
  scorpio: 8,
  sagittarius: 10,
  capricorn: 11,
  aquarius: 9,
  pisces: 12,
  ophiuchus: 13,
};

export const STORAGE_KEYS = {
  locale: "vitheaon.locale",
  audio: "vitheaon.audio",
  heroIntroPlayed: "vitheaon.heroIntroPlayed",
} as const;
