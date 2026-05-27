"use client";

import { motion } from "framer-motion";
import { characters } from "@/lib/content/characters";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { Icon } from "@/components/ui/IconSprite";
import { CharacterCard } from "./CharacterCard";
import { cn } from "@/lib/utils/cn";

const UNIVERSE_LINK = "https://www.whif.io/universes/16f89005-265b-4abf-9797-d39dcc495ec1";

// Desktop layout (5×3 row-major). On smaller breakpoints CSS order moves the logo to the top.
const SLOTS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "__LOGO__",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
  "ophiuchus",
  "__UNIVERSE__",
] as const;

interface Props {
  onOpenDetail: (id: string) => void;
}

export function CharactersSection({ onOpenDetail }: Props) {
  const { t } = useLocale();
  return (
    <section
      id="sec-characters"
      className="relative z-10 px-5 md:px-12 py-16 md:py-24 max-w-container mx-auto"
    >
      <div className="text-[11px] tracking-[3px] uppercase text-gold-deep mb-2">
        {t("characters.sectionKicker")}
      </div>
      <h2 className="font-cormorant italic font-bold text-text-heading text-[clamp(28px,5vw,56px)] leading-tight mb-10">
        {t("characters.sectionTitle")}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
        {SLOTS.map((slot, i) => {
          if (slot === "__LOGO__") return <LogoSlot key="logo" />;
          if (slot === "__UNIVERSE__") return <UniverseSlot key="universe" />;
          const c = characters.find((ch) => ch.id === slot);
          if (!c) return null;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.55,
                delay: (i % 5) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <CharacterCard
                character={c}
                onOpenDetail={(id) => onOpenDetail(id)}
                special={false}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function LogoSlot() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full order-last md:order-none"
      style={{ aspectRatio: "3 / 4" }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-md border-[1.5px] border-gold-primary",
          "flex flex-col items-center justify-center gap-3 md:gap-5 p-4",
        )}
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(216,168,72,0.18), transparent 65%), radial-gradient(circle, rgba(24,24,72,0.95), rgba(0,0,24,0.9))",
          boxShadow:
            "0 0 40px rgba(216,168,72,0.25), inset 0 0 32px rgba(216,168,72,0.08)",
        }}
      >
        <span
          className="text-gold-warm"
          style={{ filter: "drop-shadow(0 0 18px rgba(240,192,96,0.65))" }}
        >
          <Icon name="star" size={48} />
        </span>
        <span
          className="font-cinzel uppercase tracking-[3px] text-gold-warm font-bold text-sm md:text-base"
          style={{ textShadow: "0 0 12px rgba(240,192,96,0.45)" }}
        >
          VITHEAON
        </span>
      </div>
    </motion.div>
  );
}

function UniverseSlot() {
  return (
    <motion.a
      href={UNIVERSE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full no-underline order-last md:order-none"
      style={{ aspectRatio: "3 / 4" }}
      aria-label="UniverseCollab 13aether on whif.io"
    >
      <div
        className={cn(
          "absolute inset-0 rounded-md border-[1.5px] border-glow-nebula/60 overflow-hidden",
          "flex flex-col items-center justify-center gap-3 p-4 text-center",
          "transition-all duration-500",
          "group-hover:border-glow-nebula group-hover:shadow-[0_0_28px_rgba(168,120,216,0.4),0_12px_40px_rgba(0,0,0,0.55)]",
          "group-hover:-translate-y-1.5",
        )}
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(168,120,216,0.18), transparent 60%), radial-gradient(circle, rgba(40,24,72,0.85), rgba(0,0,24,0.9))",
          boxShadow:
            "0 0 24px rgba(168,120,216,0.18), inset 0 0 28px rgba(168,120,216,0.06)",
        }}
      >
        {/* Corner ticks */}
        {(["tl", "tr", "bl", "br"] as const).map((c) => (
          <span
            key={c}
            className={cn(
              "absolute w-3 h-3 z-[3] opacity-80",
              c === "tl" && "top-1.5 left-1.5 border-t-[1.5px] border-l-[1.5px]",
              c === "tr" && "top-1.5 right-1.5 border-t-[1.5px] border-r-[1.5px]",
              c === "bl" && "bottom-1.5 left-1.5 border-b-[1.5px] border-l-[1.5px]",
              c === "br" && "bottom-1.5 right-1.5 border-b-[1.5px] border-r-[1.5px]",
            )}
            style={{ borderColor: "var(--glow-nebula)" }}
          />
        ))}

        <div
          className="text-glow-nebula"
          style={{
            filter: "drop-shadow(0 0 14px rgba(168,120,216,0.65))",
          }}
        >
          <Icon name="nebula" size={44} />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div
            className="font-cinzel uppercase tracking-[2.5px] text-[10px] font-semibold opacity-80"
            style={{ color: "var(--glow-nebula)" }}
          >
            UniverseCollab
          </div>
          <div
            className="font-cinzel font-bold uppercase tracking-[3px] text-base md:text-lg"
            style={{
              color: "var(--glow-nebula)",
              textShadow: "0 0 14px rgba(168,120,216,0.5)",
            }}
          >
            13aether
          </div>
        </div>

        <div className="mt-1 inline-flex items-center gap-1.5 text-[9px] tracking-[1.5px] uppercase text-text-muted/80">
          <span>whif.io</span>
          <Icon name="arrow-right" size={10} />
        </div>
      </div>
    </motion.a>
  );
}
