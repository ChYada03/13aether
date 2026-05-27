"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { glossaryEntries } from "@/lib/content/glossary";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { Icon, type IconName } from "@/components/ui/IconSprite";
import { useIsTabletUp } from "@/lib/utils/media-query";
import { cn } from "@/lib/utils/cn";

export function GlossarySection() {
  const { t, pick } = useLocale();
  const tabletUp = useIsTabletUp();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        // Mobile: only one open at a time
        if (!tabletUp) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="sec-glossary" className="relative z-10 px-5 md:px-12 py-16 md:py-24 max-w-container mx-auto">
      <div className="text-[11px] tracking-[3px] uppercase text-gold-deep mb-2">
        {t("glossary.sectionKicker")}
      </div>
      <h2 className="font-cormorant italic font-bold text-text-heading text-[clamp(28px,5vw,56px)] leading-tight mb-10">
        {t("glossary.sectionTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {glossaryEntries.map((entry) => {
          const isOpen = expanded.has(entry.id);
          return (
            <motion.div
              key={entry.id}
              layout
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative bg-bg-elevated/60 border border-gold-deep/60 rounded p-5 md:p-6 cursor-pointer",
                "hover:border-gold-primary hover:shadow-[0_0_28px_rgba(216,168,72,0.18)] transition-shadow",
                isOpen && "border-gold-primary shadow-[0_0_28px_rgba(216,168,72,0.25)]",
              )}
              onClick={() => toggle(entry.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(entry.id);
                }
              }}
            >
              <div
                className="mb-4 inline-flex items-center justify-center w-12 h-12 border border-gold-primary/20 rounded"
                style={{ color: entry.iconTint || "var(--gold-primary)", opacity: isOpen ? 1 : 0.85 }}
              >
                <Icon name={entry.icon as IconName} size={24} />
              </div>
              <h3 className="font-cinzel uppercase tracking-[2px] text-gold-warm text-base mb-2">
                {pick(entry.title)}
              </h3>
              <p className="text-text-primary/75 text-sm leading-relaxed">
                {pick(entry.teaser)}
              </p>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gold-deep/40 space-y-3 text-text-primary/80 text-sm leading-relaxed">
                      {entry.body.map((p, i) => (
                        <p key={i}>{pick(p)}</p>
                      ))}
                      {entry.subEntries && (
                        <div className="mt-4 space-y-3 border-l border-gold-deep/40 pl-4">
                          {entry.subEntries.map((sub) => (
                            <div key={sub.id}>
                              <div className="font-cinzel text-xs tracking-[2px] uppercase text-gold-burnished mb-1">
                                {pick(sub.title)}
                              </div>
                              <div className="text-text-primary/70">{pick(sub.body)}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-gold-burnished">
                <span>{t(isOpen ? "glossary.collapse" : "glossary.expand")}</span>
                <Icon
                  name="chevron-down"
                  size={12}
                  style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
