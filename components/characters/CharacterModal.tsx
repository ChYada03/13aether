"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { characters } from "@/lib/content/characters";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { Icon } from "@/components/ui/IconSprite";
import { ZODIAC_IMAGE_INDEX } from "@/lib/utils/constants";
import type { Character } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface Props {
  characterId: Character["id"] | null;
  onClose: () => void;
  onOpen: (id: Character["id"]) => void;
}

export function CharacterModal({ characterId, onClose, onOpen }: Props) {
  const { t } = useLocale();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const character =
    characterId !== null
      ? characters.find((c) => c.id === characterId) ?? null
      : null;

  // Lock scroll while open + focus close on open + ESC
  useEffect(() => {
    if (!character) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [character, onClose]);

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          key={character.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 md:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[960px] max-h-[90svh] overflow-y-auto bg-bg-elevated border-[1.5px] border-gold-primary rounded shadow-[0_0_60px_rgba(216,168,72,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalContent character={character} onChip={onOpen} />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t("modal.close")}
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full border border-gold-primary text-gold-warm bg-bg-void/60 hover:bg-gold-primary/15 hover:shadow-[0_0_14px_rgba(216,168,72,0.4)] transition-all"
            >
              <Icon name="close" size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalContent({
  character,
  onChip,
}: {
  character: Character;
  onChip: (id: Character["id"]) => void;
}) {
  const { pick, t } = useLocale();
  const n = ZODIAC_IMAGE_INDEX[character.zodiac];
  const portraitDefault = `/portraits/${String(n).padStart(2, "0")}.jpg`;
  const isOphi = character.zodiac === "ophiuchus";

  // 2 slides: Slide 1 = face portrait, Slide 2 = symbol on body (existing 01-13.jpg)
  const faceExtMap: Record<string, string> = {
    aries: "png", taurus: "png", gemini: "png", cancer: "webp",
    leo: "jpg", virgo: "png", libra: "png", scorpio: "jpg",
    sagittarius: "png", capricorn: "png", aquarius: "png", pisces: "png",
    ophiuchus: "jpg",
  };
  const ext = faceExtMap[character.zodiac] ?? "png";
  const faceSrc = `/portraits/${character.zodiac}-face.${ext}`;
  const symbolSrc = character.portraitSrc ?? portraitDefault;
  const slides: string[] = [faceSrc, symbolSrc];

  // External link: default to whif.io profile slot if not yet provided
  const externalHref =
    character.externalLink ?? `https://whif.io/?character=${character.id}`;
  const externalIsLive = Boolean(character.externalLink);

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-0">
      {/* Portrait carousel column */}
      <div className="relative bg-bg-deeper p-5 md:p-6 flex flex-col gap-3">
        <PortraitCarousel
          key={character.id}
          slides={slides}
          fallbackSrc={`/symbols/${n}.png`}
          accent={character.accent}
          alt={pick(character.name)}
        />
        <div className="flex items-center justify-center gap-2 mt-1">
          <Image
            src={`/symbols/${n}.png`}
            alt=""
            width={28}
            height={28}
            className="object-contain"
            style={{
              filter: isOphi
                ? "drop-shadow(0 0 8px rgba(168,120,216,0.6))"
                : "drop-shadow(0 0 8px rgba(216,168,72,0.4))",
            }}
          />
          <span
            className="font-cinzel uppercase tracking-[3px] text-xs"
            style={{ color: isOphi ? "var(--glow-nebula)" : "var(--gold-burnished)" }}
          >
            {character.zodiac}
          </span>
        </div>
      </div>

      {/* Content column */}
      <div className="p-5 md:p-7">
        <div
          id="modal-title"
          className="font-cinzel font-bold uppercase tracking-[3px] text-xl md:text-2xl"
          style={{ color: isOphi ? "var(--glow-nebula)" : "var(--gold-warm)" }}
        >
          {character.name.en}
        </div>
        <div className="font-bai text-lg md:text-xl text-gold-burnished mt-1">
          {character.name.th}
          {character.alias && (
            <span className="ml-2 text-sm text-text-muted">
              ({pick(character.alias)})
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
          <div>
            <div className="uppercase tracking-[2px] text-gold-deep">
              {t("character.occupation")}
            </div>
            <div className="text-text-primary/85">{pick(character.occupation)}</div>
          </div>
          <div>
            <div className="uppercase tracking-[2px] text-gold-deep">
              {t("character.affiliation")}
            </div>
            <div className="text-text-primary/85">{pick(character.affiliation)}</div>
          </div>
        </div>

        <div className="mt-5 border-t border-gold-deep/30 pt-4">
          <p className="font-cormorant italic text-base md:text-lg text-text-primary/80 leading-relaxed">
            {pick(character.quote)}
          </p>
        </div>

        <div className="mt-5 border-t border-gold-deep/30 pt-4">
          <div className="uppercase tracking-[2px] text-[11px] text-gold-deep mb-2">
            {t("character.bio")}
          </div>
          <div className="text-text-primary/85 leading-relaxed text-sm space-y-3">
            {pick(character.bio).split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-5 border-t border-gold-deep/30 pt-4">
          <div className="uppercase tracking-[2px] text-[11px] text-gold-deep mb-3">
            {t("character.relations")}
          </div>
          <div className="flex flex-wrap gap-2">
            {character.relationships.map((r) => {
              const target = characters.find((c) => c.id === r.targetId);
              if (!target) return null;
              const tn = ZODIAC_IMAGE_INDEX[target.zodiac];
              return (
                <button
                  key={r.targetId}
                  type="button"
                  onClick={() => onChip(target.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-bg-deeper/70 border border-gold-deep/60 hover:border-gold-primary hover:bg-gold-primary/10 text-xs text-text-primary/85 transition-all"
                >
                  <Image
                    src={`/symbols/${tn}.png`}
                    alt=""
                    width={14}
                    height={14}
                    className="object-contain"
                  />
                  <span>{pick(target.name)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* External link — always visible. If not yet provided, link to whif.io stub. */}
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!externalIsLive}
          onClick={(e) => {
            if (!externalIsLive) {
              e.preventDefault();
            }
          }}
          className={cn(
            "mt-6 inline-flex items-center gap-2 px-4 py-2.5 border rounded-sm text-xs uppercase tracking-[2px] font-semibold transition-all",
            externalIsLive
              ? "border-gold-primary text-gold-warm bg-gold-primary/10 hover:bg-gold-primary/20 hover:shadow-[0_0_14px_rgba(216,168,72,0.4)]"
              : "border-gold-deep text-gold-burnished/80 bg-transparent cursor-not-allowed",
          )}
          title={externalIsLive ? undefined : "Coming soon — whif.io profile pending"}
        >
          <span>{t("modal.externalLink")}</span>
          <Icon name="arrow-right" size={12} />
          {!externalIsLive && (
            <span className="ml-1 text-[10px] tracking-normal text-text-muted/70 normal-case">
              (เร็ว ๆ นี้)
            </span>
          )}
        </a>
      </div>
    </div>
  );
}

function PortraitCarousel({
  slides,
  fallbackSrc,
  accent,
  alt,
}: {
  slides: string[];
  fallbackSrc: string;
  accent: string;
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const total = slides.length;

  const go = (delta: number) => {
    setActive((prev) => (prev + delta + total) % total);
  };

  return (
    <div className="relative">
      <div
        className="relative w-full overflow-hidden rounded border border-gold-primary/30 aspect-[3/4]"
        style={{ background: `linear-gradient(135deg, ${accent}, var(--bg-deeper))` }}
      >
        {slides.map((src, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              i === active ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="280px"
              className="object-cover"
              style={{ filter: "brightness(0.95) contrast(1.05)", objectPosition: "center 20%" }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (el.src !== fallbackSrc) {
                  el.src = fallbackSrc;
                  el.style.objectFit = "contain";
                  el.style.padding = "32px";
                }
              }}
            />
          </div>
        ))}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-[2] w-8 h-8 rounded-full border border-gold-primary/60 bg-bg-void/60 backdrop-blur-sm text-gold-warm hover:bg-gold-primary/15 hover:border-gold-warm transition-all"
            >
              <Icon name="chevron-left" size={14} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-[2] w-8 h-8 rounded-full border border-gold-primary/60 bg-bg-void/60 backdrop-blur-sm text-gold-warm hover:bg-gold-primary/15 hover:border-gold-warm transition-all"
            >
              <Icon name="chevron-right" size={14} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "w-2 h-2 rounded-full transition-all border border-gold-primary",
                i === active
                  ? "bg-gold-warm scale-125 shadow-[0_0_6px_var(--gold-warm)]"
                  : "bg-transparent opacity-50 hover:opacity-100",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
