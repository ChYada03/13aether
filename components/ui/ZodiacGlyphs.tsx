/**
 * 13 zodiac glyph SVGs — bare line-art versions for use on the hero orbit ring.
 * Each is 24×24 viewBox, uses currentColor for stroke.
 * These are simplified astrological symbols matching the gold gothic theme.
 */

import type { ZodiacKey } from "@/lib/utils/constants";

interface GlyphProps extends React.SVGAttributes<SVGElement> {
  zodiac: ZodiacKey;
  size?: number | string;
}

export function ZodiacGlyph({ zodiac, size = 24, style, ...rest }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden
      {...rest}
    >
      {GLYPH_PATHS[zodiac]}
    </svg>
  );
}

const GLYPH_PATHS: Record<ZodiacKey, React.ReactNode> = {
  // Aries — ram horns
  aries: (
    <>
      <path d="M5 9 C 5 6, 8 4, 10 6 C 11 7, 12 9, 12 12 V 20" />
      <path d="M19 9 C 19 6, 16 4, 14 6 C 13 7, 12 9, 12 12" />
    </>
  ),
  // Taurus — bull head with horns
  taurus: (
    <>
      <circle cx="12" cy="15" r="4" />
      <path d="M5 6 C 7 9, 9 11, 12 11" />
      <path d="M19 6 C 17 9, 15 11, 12 11" />
    </>
  ),
  // Gemini — twin pillars
  gemini: (
    <>
      <path d="M6 5 C 9 4, 15 4, 18 5" />
      <path d="M6 19 C 9 20, 15 20, 18 19" />
      <line x1="9" y1="5" x2="9" y2="19" />
      <line x1="15" y1="5" x2="15" y2="19" />
    </>
  ),
  // Cancer — two reversed circles
  cancer: (
    <>
      <path d="M4 9 C 4 7, 6 5, 9 5 C 11 5, 12 6, 12 7" />
      <circle cx="7" cy="10" r="2" />
      <path d="M20 15 C 20 17, 18 19, 15 19 C 13 19, 12 18, 12 17" />
      <circle cx="17" cy="14" r="2" />
    </>
  ),
  // Leo — lion mane curl
  leo: (
    <>
      <circle cx="9" cy="14" r="4" />
      <path d="M12 12 C 14 10, 16 8, 17 6 C 18 4, 21 4, 21 7 C 21 10, 19 11, 18 11" />
    </>
  ),
  // Virgo — M with looped tail
  virgo: (
    <>
      <path d="M5 5 V 18 M5 5 C 7 6, 9 8, 9 11 V 18 M9 11 C 11 8, 13 6, 14 5 V 18" />
      <path d="M14 11 C 16 8, 18 6, 19 5" />
      <path d="M14 18 C 17 18, 19 17, 19 14 C 19 12, 17 11, 15 13" />
    </>
  ),
  // Libra — scales
  libra: (
    <>
      <path d="M4 19 H 20" />
      <path d="M5 16 H 19" />
      <path d="M7 16 C 7 12, 9 10, 12 10 C 15 10, 17 12, 17 16" />
    </>
  ),
  // Scorpio — M with tail/sting
  scorpio: (
    <>
      <path d="M4 7 V 17 M4 7 C 6 8, 7 10, 7 13 V 17 M7 13 C 8 10, 10 8, 11 7 V 17" />
      <path d="M11 13 C 13 10, 14 8, 16 7 V 17 L 19 17 L 19 14" />
      <path d="M19 17 L 21 19" />
    </>
  ),
  // Sagittarius — arrow
  sagittarius: (
    <>
      <line x1="5" y1="19" x2="19" y2="5" />
      <path d="M19 5 L 14 5 M19 5 L 19 10" />
      <path d="M9 11 L 13 15" />
    </>
  ),
  // Capricorn — sea-goat squiggle
  capricorn: (
    <>
      <path d="M5 7 L 7 14 L 9 9 L 11 14 V 8" />
      <path d="M11 14 C 13 14, 15 14, 16 12 C 17 10, 16 8, 14 8 C 13 8, 12 9, 12 10" />
      <circle cx="15" cy="16" r="2" />
    </>
  ),
  // Aquarius — water waves
  aquarius: (
    <>
      <path d="M4 9 C 6 7, 8 11, 10 9 C 12 7, 14 11, 16 9 C 18 7, 20 9, 20 9" />
      <path d="M4 15 C 6 13, 8 17, 10 15 C 12 13, 14 17, 16 15 C 18 13, 20 15, 20 15" />
    </>
  ),
  // Pisces — two fish back-to-back
  pisces: (
    <>
      <path d="M5 5 C 8 8, 10 11, 10 12 C 10 13, 8 16, 5 19" />
      <path d="M19 5 C 16 8, 14 11, 14 12 C 14 13, 16 16, 19 19" />
      <line x1="6" y1="12" x2="18" y2="12" />
    </>
  ),
  // Ophiuchus — serpent crossing a pillar
  ophiuchus: (
    <>
      <path d="M6 5 C 9 5, 15 5, 18 5" />
      <path d="M6 19 C 9 19, 15 19, 18 19" />
      <path d="M8 5 C 8 9, 16 9, 16 13 C 16 17, 8 17, 8 19" />
      <path d="M16 5 C 16 9, 8 9, 8 13 C 8 17, 16 17, 16 19" />
    </>
  ),
};
