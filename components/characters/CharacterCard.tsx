"use client";

import { useState } from "react";
import Image from "next/image";
import type { Character } from "@/lib/types";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useIsTabletUp, useReducedMotion } from "@/lib/utils/media-query";
import { ZODIAC_IMAGE_INDEX } from "@/lib/utils/constants";
import { cn } from "@/lib/utils/cn";

const FACTION_DOT: Record<Character["faction"], string> = {
  "government-public": "#4488cc",
  "government-secret": "#aa44cc",
  "hidden-council": "#cc8844",
  infiltrator: "#7aa890",
  rebel: "#c87878",
  civilian: "#888888",
};

interface Props {
  character: Character;
  onOpenDetail: (id: Character["id"]) => void;
  /** Special tinted styling for Ophiuchus. */
  special?: boolean;
}

export function CharacterCard({ character, onOpenDetail, special }: Props) {
  const { pick, t } = useLocale();
  const tabletUp = useIsTabletUp();
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

  const n = ZODIAC_IMAGE_INDEX[character.zodiac];
  // Card back uses face portrait (same as Modal slide 1)
  const faceExtMap: Record<string, string> = {
    aries: "png", taurus: "png", gemini: "png", cancer: "webp",
    leo: "jpg", virgo: "png", libra: "png", scorpio: "jpg",
    sagittarius: "png", capricorn: "png", aquarius: "png", pisces: "png",
    ophiuchus: "jpg",
  };
  // Per-character vertical focus: lower % = show more top (face higher up)
  const facePositionMap: Record<string, string> = {
    aries: "center 10%",
    taurus: "center 10%",
    gemini: "center 10%",
    cancer: "center 20%",    // ดีอยู่แล้ว
    leo: "center 10%",
    virgo: "center 20%",     // ดีมิทรี — default OK
    libra: "center 10%",
    scorpio: "center 10%",
    sagittarius: "center 35%",  // ขยับต่ำลง
    capricorn: "center 10%",
    aquarius: "center 35%",     // ขยับต่ำลง
    pisces: "center 20%",       // ดีอยู่แล้ว
    ophiuchus: "center 20%",    // เอสเคล — ดีอยู่แล้ว
  };
  const ext = faceExtMap[character.zodiac] ?? "png";
  const portraitSrc = `/portraits/${character.zodiac}-face.${ext}`;
  const facePosition = facePositionMap[character.zodiac] ?? "center 20%";

  const onActivate = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((v) => !v);
  };

  const onMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenDetail(character.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${pick(character.name)} ${pick(character.affiliation)}`}
      aria-pressed={flipped}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate(e);
        }
      }}
      className="relative w-full cursor-pointer focus:outline-none"
      style={{ aspectRatio: "3 / 4", perspective: "1200px" }}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionDuration: reduced ? "0ms" : undefined,
        }}
      >
        {/* FRONT */}
        <div
          className={cn(
            "absolute inset-0 rounded-md overflow-hidden bg-bg-deeper",
            "border-[1.5px]",
            special ? "border-glow-nebula/70" : "border-gold-deep",
            "transition-all duration-500",
            "hover:-translate-y-1.5 hover:border-gold-primary",
            !special && "hover:shadow-[0_0_28px_rgba(216,168,72,0.35),0_12px_40px_rgba(0,0,0,0.55)]",
            special && "hover:shadow-[0_0_28px_rgba(168,120,216,0.4),0_12px_40px_rgba(0,0,0,0.55)]",
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {!imageError ? (
            <Image
              src={`/symbols/${n}.png`}
              alt={pick(character.name)}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ filter: "brightness(0.85) saturate(1.1)" }}
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${character.accent}, var(--bg-deeper))`,
              }}
            >
              <span className="font-cinzel text-gold-warm uppercase tracking-[2px] text-sm">
                {character.name.en}
              </span>
            </div>
          )}

          {/* Vignette + bottom shadow plate */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 35%, rgba(0,0,30,0) 0%, rgba(0,0,30,0.55) 100%), linear-gradient(180deg, rgba(0,0,24,0) 30%, rgba(0,0,24,0.85) 100%)",
            }}
          />
          {/* Inner gold rim */}
          <div className="absolute inset-1.5 border border-gold-primary/30 rounded-sm pointer-events-none z-[3]" />
          {/* Corner ticks */}
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <span
              key={c}
              className={cn(
                "absolute w-3 h-3 z-[4]",
                c === "tl" && "top-1.5 left-1.5 border-t-[1.5px] border-l-[1.5px]",
                c === "tr" && "top-1.5 right-1.5 border-t-[1.5px] border-r-[1.5px]",
                c === "bl" && "bottom-1.5 left-1.5 border-b-[1.5px] border-l-[1.5px]",
                c === "br" && "bottom-1.5 right-1.5 border-b-[1.5px] border-r-[1.5px]",
              )}
              style={{
                borderColor: special ? "var(--glow-nebula)" : "var(--gold-primary)",
                opacity: 0.85,
              }}
            />
          ))}

          {/* Name band (always visible on mobile, hover-only on desktop) */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-[4] flex flex-col items-center gap-0.5 px-3 pb-3 pt-3 text-center transition-all",
              tabletUp
                ? "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                : "opacity-100",
            )}
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,24,0) 0%, rgba(0,0,16,0.9) 60%)",
            }}
          >
            <div
              className="font-cinzel font-bold uppercase tracking-[2px] text-[11px] md:text-xs"
              style={{
                color: special ? "var(--glow-nebula)" : "var(--gold-warm)",
                textShadow: "0 1px 8px rgba(0,0,0,0.85)",
              }}
            >
              {character.name.en}
            </div>
            <div
              className="text-[10px] md:text-[11px] text-text-primary/85"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
            >
              {pick(character.name)}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 rounded-md overflow-hidden p-3 md:p-3.5 flex flex-col gap-2",
            "bg-gradient-to-b from-bg-elevated to-bg-surface",
            "border-[1.5px]",
            special ? "border-glow-nebula/80" : "border-gold-burnished",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Corner ticks */}
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <span
              key={c}
              className={cn(
                "absolute w-3 h-3",
                c === "tl" && "top-1.5 left-1.5 border-t-[1.5px] border-l-[1.5px]",
                c === "tr" && "top-1.5 right-1.5 border-t-[1.5px] border-r-[1.5px]",
                c === "bl" && "bottom-1.5 left-1.5 border-b-[1.5px] border-l-[1.5px]",
                c === "br" && "bottom-1.5 right-1.5 border-b-[1.5px] border-r-[1.5px]",
              )}
              style={{ borderColor: "var(--gold-primary)", opacity: 0.7 }}
            />
          ))}

          {/* Portrait */}
          <div
            className="relative w-full overflow-hidden rounded-sm border border-gold-primary/30 bg-bg-deeper flex-shrink-0"
            style={{ aspectRatio: "16 / 10" }}
          >
            <Image
              src={portraitSrc}
              alt={pick(character.name)}
              fill
              sizes="(max-width: 767px) 50vw, 200px"
              className="object-cover"
              style={{ filter: "brightness(0.92) contrast(1.05)", objectPosition: facePosition }}
              onError={(e) => {
                // fall back to symbol if portrait missing
                const t = e.currentTarget as HTMLImageElement;
                t.src = `/symbols/${n}.png`;
              }}
            />
          </div>

          <div
            className="font-cinzel font-bold text-center text-sm leading-tight"
            style={{ color: special ? "var(--glow-nebula)" : "var(--gold-warm)" }}
          >
            {pick(character.name)}
          </div>
          <div className="text-center text-[9px] tracking-[1.5px] uppercase text-text-muted -mt-0.5">
            {pick(character.affiliation)}
          </div>
          <p
            className="text-center text-[10.5px] italic text-text-primary/70 leading-snug px-0.5 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {pick(character.quote)}
          </p>
          <button
            type="button"
            onClick={onMore}
            className={cn(
              "mt-auto px-3 py-2 w-full rounded-sm border text-[10px] tracking-[2px] uppercase font-semibold",
              "bg-gold-primary/10 hover:bg-gold-primary/20 hover:shadow-[0_0_12px_rgba(216,168,72,0.4)]",
              "transition-all flex-shrink-0",
            )}
            style={{
              borderColor: special ? "var(--glow-nebula)" : "var(--gold-primary)",
              color: special ? "var(--glow-nebula)" : "var(--gold-warm)",
            }}
          >
            {t("character.viewMore")}
          </button>
        </div>
      </div>
    </div>
  );
}
