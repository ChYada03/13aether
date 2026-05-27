"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { lorePanels } from "@/lib/content/lore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useIsTabletUp } from "@/lib/utils/media-query";
import { Icon } from "@/components/ui/IconSprite";
import { cn } from "@/lib/utils/cn";

/**
 * Lore section: native horizontal scroll (touch / trackpad / mouse drag).
 * No GSAP pin, no vertical hijacking — the user moves panels left/right directly,
 * and dots/arrows let them jump to a specific era.
 */
export function LoreSection() {
  const { t, pick } = useLocale();
  const tabletUp = useIsTabletUp();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Track which panel is the most visible
  useEffect(() => {
    if (!tabletUp) return;
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const onScroll = () => {
      const { scrollLeft, clientWidth } = trackEl;
      const idx = Math.round(scrollLeft / clientWidth);
      const clamped = Math.max(0, Math.min(lorePanels.length - 1, idx));
      setActiveIdx(clamped);
    };
    trackEl.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => trackEl.removeEventListener("scroll", onScroll);
  }, [tabletUp]);

  const goto = useCallback(
    (idx: number) => {
      const trackEl = trackRef.current;
      if (!trackEl) return;
      if (tabletUp) {
        trackEl.scrollTo({
          left: idx * trackEl.clientWidth,
          behavior: "smooth",
        });
      } else {
        const child = trackEl.children[idx] as HTMLElement | undefined;
        if (child) {
          const offset = window.innerWidth < 768 ? 56 : 64;
          const top =
            child.getBoundingClientRect().top + window.scrollY - offset - 16;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    },
    [tabletUp],
  );

  // Click-and-drag (mouse) support — many laptop users only have mouse wheel + click
  useEffect(() => {
    if (!tabletUp) return;
    const trackEl = trackRef.current;
    if (!trackEl) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      // only primary button (mouse) or touch
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDown = true;
      startX = e.clientX;
      startScroll = trackEl.scrollLeft;
      trackEl.setPointerCapture(e.pointerId);
      trackEl.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      trackEl.scrollLeft = startScroll - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      try {
        trackEl.releasePointerCapture(e.pointerId);
      } catch {}
      trackEl.style.cursor = "";
    };

    trackEl.addEventListener("pointerdown", onDown);
    trackEl.addEventListener("pointermove", onMove);
    trackEl.addEventListener("pointerup", onUp);
    trackEl.addEventListener("pointercancel", onUp);
    trackEl.addEventListener("pointerleave", onUp);

    return () => {
      trackEl.removeEventListener("pointerdown", onDown);
      trackEl.removeEventListener("pointermove", onMove);
      trackEl.removeEventListener("pointerup", onUp);
      trackEl.removeEventListener("pointercancel", onUp);
      trackEl.removeEventListener("pointerleave", onUp);
    };
  }, [tabletUp]);

  // Convert vertical mouse wheel into horizontal scroll within the track
  useEffect(() => {
    if (!tabletUp) return;
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const onWheel = (e: WheelEvent) => {
      // If horizontal swipe (trackpad), let it pass through naturally
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      // Only intercept while pointer is over the track AND there is room to scroll
      const { scrollLeft, scrollWidth, clientWidth } = trackEl;
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        e.preventDefault();
        trackEl.scrollLeft += e.deltaY;
      }
    };
    trackEl.addEventListener("wheel", onWheel, { passive: false });
    return () => trackEl.removeEventListener("wheel", onWheel);
  }, [tabletUp]);

  return (
    <section
      id="sec-lore"
      className="relative z-10 bg-bg-surface/40 border-y border-gold-primary/15 backdrop-blur-[1px]"
    >
      {/* Header */}
      <div className="max-w-container mx-auto px-5 md:px-12 pt-12 md:pt-16 pb-6">
        <div className="text-[11px] tracking-[3px] uppercase text-gold-deep mb-2">
          {t("lore.sectionKicker")}
        </div>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 className="font-cormorant italic font-bold text-text-heading text-[clamp(28px,5vw,56px)] leading-tight">
            {t("lore.sectionTitle")}
          </h2>
          {tabletUp && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goto(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                aria-label="Previous era"
                className="w-10 h-10 rounded-full border border-gold-primary/60 bg-bg-void/60 text-gold-warm hover:bg-gold-primary/15 hover:border-gold-warm transition-all disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center justify-center"
              >
                <Icon name="chevron-left" size={16} />
              </button>
              <button
                type="button"
                onClick={() => goto(Math.min(lorePanels.length - 1, activeIdx + 1))}
                disabled={activeIdx === lorePanels.length - 1}
                aria-label="Next era"
                className="w-10 h-10 rounded-full border border-gold-primary/60 bg-bg-void/60 text-gold-warm hover:bg-gold-primary/15 hover:border-gold-warm transition-all disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center justify-center"
              >
                <Icon name="chevron-right" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className={cn(
          tabletUp
            ? "flex flex-row overflow-x-auto select-none cursor-grab"
            : "flex flex-col gap-8 px-5 md:px-12 pb-8",
        )}
        style={
          tabletUp
            ? {
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }
            : undefined
        }
      >
        {tabletUp && (
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        )}
        {lorePanels.map((panel) => (
          <article
            key={panel.id}
            className={cn(
              tabletUp
                ? "min-w-full snap-start grid md:grid-cols-2 gap-8 lg:gap-16 px-6 md:px-12 lg:px-20 py-8"
                : "rounded border border-gold-primary/15 bg-bg-deeper/40 p-6 md:p-10",
            )}
            style={tabletUp ? { scrollSnapAlign: "start" } : undefined}
          >
            <div
              className={cn(
                "relative overflow-hidden rounded border border-gold-primary/20",
                tabletUp ? "min-h-[260px] md:min-h-[380px]" : "aspect-video mb-4",
              )}
              style={{
                background: `radial-gradient(ellipse 70% 70% at 40% 50%, ${panel.accent}33, var(--bg-deeper))`,
              }}
            >
              {panel.image ? (
                <img
                  src={panel.image}
                  alt={pick(panel.title)}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gold-primary/30">
                  <Icon name="nebula" size={tabletUp ? 96 : 64} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-surface/80 pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[10px] tracking-[3px] uppercase text-gold-deep/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                {pick(panel.yearLabel)}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-cinzel text-[12px] tracking-[4px] uppercase text-gold-primary mb-3">
                {pick(panel.yearLabel)}
              </div>
              <h3 className="font-cormorant italic font-bold text-text-heading text-[clamp(24px,3.5vw,40px)] leading-tight mb-5">
                {pick(panel.title)}
              </h3>
              <div className="space-y-3 text-text-primary/80 leading-relaxed">
                {panel.body.map((p, j) => (
                  <p key={j}>{pick(p)}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Clickable dots — relative positioning so they always receive pointer events */}
      <div className="relative z-20 max-w-container mx-auto px-5 md:px-12 pt-6 pb-12 md:pb-16 flex justify-center gap-2">
        {lorePanels.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => goto(i)}
            aria-label={pick(p.title)}
            aria-current={i === activeIdx}
            className={cn(
              "h-2 rounded-full transition-all border border-gold-primary cursor-pointer",
              i === activeIdx
                ? "w-6 bg-gold-warm shadow-[0_0_8px_var(--gold-warm)]"
                : "w-2 bg-transparent opacity-50 hover:opacity-100 hover:bg-gold-primary/40",
            )}
          />
        ))}
      </div>

      {tabletUp && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          className="text-center pb-6 md:pb-10 px-5 text-[11px] tracking-[3px] uppercase text-gold-deep"
        >
          ← {t("lore.scrollHint")} →
        </motion.div>
      )}
    </section>
  );
}
