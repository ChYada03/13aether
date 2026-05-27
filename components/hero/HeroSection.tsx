"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { ZodiacOrbitRing } from "./ZodiacOrbitRing";
import { useReducedMotion, useIsTabletUp } from "@/lib/utils/media-query";
import { Icon } from "@/components/ui/IconSprite";

export function HeroSection() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const tabletUp = useIsTabletUp();
  const orbitSize = tabletUp ? 480 : 280;

  const title = t("hero.title");
  const letters = title.split("");

  return (
    <section
      id="sec-hero"
      className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-5 text-center pt-24 md:pt-28 pb-16"
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: orbitSize, height: orbitSize }}
      >
        <ZodiacOrbitRing size={orbitSize} />

        {/* Center: gold star + VITHEAON wordmark — clean, no circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduced ? 0 : 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute flex flex-col items-center justify-center gap-2"
          style={{
            width: orbitSize * 0.34,
            height: orbitSize * 0.34,
          }}
        >
          <motion.span
            animate={reduced ? undefined : { opacity: [0.8, 1, 0.8] }}
            transition={reduced ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-gold-warm"
            style={{ filter: "drop-shadow(0 0 14px rgba(240,192,96,0.6))" }}
          >
            <Icon name="star" size={tabletUp ? 42 : 30} />
          </motion.span>
          <span
            className="font-cinzel font-bold tracking-[3px] uppercase text-gold-warm"
            style={{
              fontSize: tabletUp ? 13 : 10,
              textShadow: "0 0 12px rgba(240,192,96,0.45)",
            }}
          >
            VITHEAON
          </span>
        </motion.div>
      </div>

      <h1
        className="font-cinzel font-bold uppercase text-gold-warm mt-10 tracking-[0.15em] text-[clamp(40px,8vw,88px)] leading-tight"
        style={{ textShadow: "0 0 48px rgba(240,192,96,0.4), 0 0 96px rgba(240,192,96,0.15)" }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduced ? 0 : 1.0 + i * 0.06,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 1.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-bai text-gold-burnished mt-2 text-[clamp(24px,4vw,40px)]"
      >
        {t("hero.titleTh")}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: reduced ? 0 : 2.2, duration: 0.7 }}
        className="text-text-primary/75 mt-6 max-w-xl leading-relaxed text-base md:text-lg"
      >
        {t("hero.tagline")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 2.6 }}
        className="mt-12 flex flex-col items-center gap-2 text-gold-deep text-[11px] tracking-[3px] uppercase"
      >
        <div className="w-px h-10 bg-gold-deep/50" />
        <motion.div
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={
            reduced ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
          className="text-gold-warm"
        >
          <Icon name="chevron-down" size={18} />
        </motion.div>
        <span>{t("hero.scrollCue")}</span>
      </motion.div>
    </section>
  );
}
