"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { districts } from "@/lib/content/lore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useIsTabletUp } from "@/lib/utils/media-query";
import { Icon } from "@/components/ui/IconSprite";
import { cn } from "@/lib/utils/cn";

export function DistrictsSection() {
  const { pick } = useLocale();
  const tabletUp = useIsTabletUp();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!tabletUp) return;
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const onScroll = () => {
      const { scrollLeft, clientWidth } = trackEl;
      const idx = Math.round(scrollLeft / clientWidth);
      setActiveIdx(Math.max(0, Math.min(districts.length - 1, idx)));
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
        trackEl.scrollTo({ left: idx * trackEl.clientWidth, behavior: "smooth" });
      }
    },
    [tabletUp],
  );

  // Mouse drag support
  useEffect(() => {
    if (!tabletUp) return;
    const trackEl = trackRef.current;
    if (!trackEl) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDown = true;
      startX = e.clientX;
      startScroll = trackEl.scrollLeft;
      trackEl.setPointerCapture(e.pointerId);
      trackEl.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      trackEl.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      try { trackEl.releasePointerCapture(e.pointerId); } catch {}
      trackEl.style.cursor = "";
    };
    trackEl.addEventListener("pointerdown", onDown);
    trackEl.addEventListener("pointermove", onMove);
    trackEl.addEventListener("pointerup", onUp);
    trackEl.addEventListener("pointercancel", onUp);
    return () => {
      trackEl.removeEventListener("pointerdown", onDown);
      trackEl.removeEventListener("pointermove", onMove);
      trackEl.removeEventListener("pointerup", onUp);
      trackEl.removeEventListener("pointercancel", onUp);
    };
  }, [tabletUp]);

  // Wheel → horizontal
  useEffect(() => {
    if (!tabletUp) return;
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
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
    <section className="relative z-10 bg-bg-surface/30 border-y border-gold-primary/15 backdrop-blur-[1px]">
      {/* Header */}
      <div className="max-w-container mx-auto px-5 md:px-12 pt-12 md:pt-16 pb-6">
        <div className="text-[11px] tracking-[3px] uppercase text-gold-deep mb-2">
          Megacity
        </div>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 className="font-cormorant italic font-bold text-text-heading text-[clamp(28px,5vw,56px)] leading-tight">
            {pick({ th: "เขตของวิเทียออน", en: "Districts of Vitheaon" })}
          </h2>
          {tabletUp && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goto(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border border-gold-primary/60 bg-bg-void/60 text-gold-warm hover:bg-gold-primary/15 hover:border-gold-warm transition-all disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center justify-center"
              >
                <Icon name="chevron-left" size={16} />
              </button>
              <button
                type="button"
                onClick={() => goto(Math.min(districts.length - 1, activeIdx + 1))}
                disabled={activeIdx === districts.length - 1}
                aria-label="Next"
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
            ? { scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }
            : undefined
        }
      >
        {districts.map((district) => (
          <article
            key={district.id}
            className={cn(
              tabletUp
                ? "min-w-full snap-start grid md:grid-cols-2 gap-8 lg:gap-16 px-6 md:px-12 lg:px-20 py-8"
                : "rounded border border-gold-primary/15 bg-bg-deeper/40 p-5 md:p-8",
            )}
            style={tabletUp ? { scrollSnapAlign: "start" } : undefined}
          >
            <div
              className={cn(
                "relative overflow-hidden rounded border border-gold-primary/20",
                tabletUp ? "min-h-[260px] md:min-h-[380px]" : "aspect-video mb-4",
              )}
            >
              <img
                src={district.image}
                alt={pick(district.name)}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-void/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[10px] tracking-[3px] uppercase text-gold-warm drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                {pick(district.name)}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-cormorant italic font-bold text-text-heading text-[clamp(22px,3vw,36px)] leading-tight mb-5">
                {pick(district.name)}
              </h3>
              <div className="text-text-primary/80 leading-relaxed text-sm md:text-base">
                {pick(district.description)}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="max-w-container mx-auto px-5 md:px-12 pt-6 pb-12 md:pb-16 flex justify-center gap-2">
        {districts.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => goto(i)}
            aria-label={pick(d.name)}
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        className="text-center pb-8 px-5 text-[11px] tracking-[3px] uppercase text-gold-deep italic"
      >
        {pick({
          th: "เพราะในวิเทียออน ความสงบไม่เคยหมายถึงสันติภาพ มันเป็นเพียงช่วงเวลาสั้นๆ ก่อนที่ความจริงจะถูกขุดขึ้นมาอีกครั้ง",
          en: "Because in Vitheaon, peace never means peace. It is merely a brief pause before the truth is unearthed once more.",
        })}
      </motion.div>
    </section>
  );
}
