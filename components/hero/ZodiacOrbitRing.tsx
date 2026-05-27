"use client";

import { motion } from "framer-motion";
import { ZODIAC_KEYS } from "@/lib/utils/constants";
import { useReducedMotion } from "@/lib/utils/media-query";
import { ZodiacGlyph } from "@/components/ui/ZodiacGlyphs";

interface Props {
  /** Diameter in px. */
  size?: number;
}

const GLYPH_SIZE = 28;
const HALO_SIZE = 56;
const TWINKLE_DOTS = [
  { dx: -22, dy: -10, delay: 0 },
  { dx: 20, dy: -14, delay: 0.6 },
  { dx: 18, dy: 18, delay: 1.2 },
  { dx: -16, dy: 20, delay: 0.3 },
  { dx: -2, dy: -24, delay: 0.9 },
  { dx: 0, dy: 24, delay: 1.5 },
];

/**
 * 13 zodiac glyphs revolving around a center, sitting precisely on the orbit ring.
 * Each glyph stays upright (carousel feel) and is haloed with a glowing aura
 * plus a few twinkling particles.
 */
export function ZodiacOrbitRing({ size = 480 }: Props) {
  const reduced = useReducedMotion();
  // Place glyphs exactly on the outer ring (size/2 from center).
  // The ring border is at inset:0 ⇒ stroke at size/2 px from center.
  const radius = size / 2;

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Static decorative rings */}
      <div className="absolute inset-0 rounded-full border border-gold-primary/30 shadow-[0_0_60px_rgba(96,144,192,0.1),inset_0_0_60px_rgba(96,144,192,0.04)] pointer-events-none" />
      <div className="absolute inset-5 rounded-full border border-gold-primary/15 pointer-events-none" />

      {/* Rotating orbit container */}
      <motion.div
        className="absolute inset-0"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={
          reduced
            ? undefined
            : { duration: 120, ease: "linear", repeat: Infinity }
        }
      >
        {ZODIAC_KEYS.map((key, i) => {
          const angle = (i / ZODIAC_KEYS.length) * 360;
          return (
            <div
              key={key}
              className="absolute left-1/2 top-1/2"
              style={{
                width: 0,
                height: 0,
                transform: `rotate(${angle}deg) translate(0, -${radius}px)`,
                transformOrigin: "0 0",
              }}
            >
              {/* Counter-rotate so glyph stays upright */}
              <motion.div
                className="absolute"
                style={{
                  transform: "translate(-50%, -50%)",
                  width: HALO_SIZE,
                  height: HALO_SIZE,
                }}
                animate={reduced ? undefined : { rotate: -360 }}
                transition={
                  reduced
                    ? undefined
                    : { duration: 120, ease: "linear", repeat: Infinity }
                }
              >
                <OrbitGlyph
                  zodiac={key}
                  twinkleSeed={i}
                  reduced={reduced}
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function OrbitGlyph({
  zodiac,
  twinkleSeed,
  reduced,
}: {
  zodiac: (typeof ZODIAC_KEYS)[number];
  twinkleSeed: number;
  reduced: boolean;
}) {
  const auraColor = "rgba(240,200,120,0.28)";
  const glyphColor = "var(--gold-warm)";
  // Randomized timing per glyph — different durations so they twinkle like real stars
  const baseDuration = 3.0 + (twinkleSeed * 0.37) % 2.5;
  const baseDelay = (twinkleSeed * 0.73) % 3.0;
  const dotDuration = 2.5 + (twinkleSeed * 0.53) % 2.0;

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ color: glyphColor }}
    >
      {/* Soft pulsing aura — subtle */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${auraColor} 0%, transparent 70%)`,
        }}
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.4, 0.85, 0.4],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: baseDuration,
                delay: baseDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* Twinkling sparkle dots — fewer + smaller + flickering */}
      {!reduced &&
        TWINKLE_DOTS.slice(0, 3).map((t, k) => (
          <motion.span
            key={k}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              left: "50%",
              top: "50%",
              backgroundColor: "#ffe6a8",
              boxShadow: "0 0 5px rgba(240,192,96,0.85)",
              transform: `translate(${t.dx * 0.7}px, ${t.dy * 0.7}px)`,
            }}
            animate={{
              opacity: [0, 1, 0, 0.3, 0],
              scale: [0.4, 1, 0.4, 0.8, 0.4],
            }}
            transition={{
              duration: dotDuration + k * 0.6,
              delay: t.delay + baseDelay * 0.5 + k * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.7, 1],
            }}
          />
        ))}

      {/* The glyph — gentle drop-shadow, not blown out */}
      <ZodiacGlyph
        zodiac={zodiac}
        size={GLYPH_SIZE}
        style={{
          position: "relative",
          zIndex: 2,
          filter: "drop-shadow(0 0 6px rgba(240,200,120,0.8))",
        }}
      />
    </div>
  );
}
