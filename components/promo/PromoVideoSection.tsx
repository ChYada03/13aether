"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useState } from "react";

const YOUTUBE_ID = "-5wGw58FJy8";

/**
 * YouTube embed that autoplays WITH sound.
 * Trick: iframe is not rendered until user has interacted with the page
 * (loading screen click counts as a gesture). Once mounted, autoplay+sound works.
 */
export function PromoVideoSection() {
  const { t } = useLocale();
  // Delay iframe mount until after a user gesture (loading screen click)
  // We use a small delay to ensure the gesture has been registered by the browser
  const [mounted, setMounted] = useState(false);

  // Mount iframe after a short delay (gives time for loading screen interaction to register)
  if (!mounted) {
    if (typeof window !== "undefined") {
      setTimeout(() => setMounted(true), 100);
    }
  }

  return (
    <section className="relative z-10 px-5 md:px-12 pt-24 md:pt-28">
      <div className="relative max-w-[980px] mx-auto">
        {/* Frame */}
        <div className="relative aspect-video bg-bg-void rounded overflow-hidden border-[1.5px] border-gold-primary shadow-[0_0_48px_rgba(216,168,72,0.2),0_24px_64px_rgba(0,0,0,0.6),inset_0_0_40px_rgba(216,168,72,0.04)] transition-shadow duration-500 hover:shadow-[0_0_80px_rgba(216,168,72,0.35),0_32px_80px_rgba(0,0,0,0.7),inset_0_0_40px_rgba(216,168,72,0.08)]">
          {/* Gold inner rim */}
          <div className="absolute inset-2 border border-gold-primary/25 rounded-sm pointer-events-none z-[5]" />
          {/* Corner ticks */}
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <span
              key={c}
              className={`absolute w-3.5 h-3.5 z-[6] ${
                c === "tl" ? "top-1 left-1 border-t-[1.5px] border-l-[1.5px]" :
                c === "tr" ? "top-1 right-1 border-t-[1.5px] border-r-[1.5px]" :
                c === "bl" ? "bottom-1 left-1 border-b-[1.5px] border-l-[1.5px]" :
                "bottom-1 right-1 border-b-[1.5px] border-r-[1.5px]"
              }`}
              style={{ borderColor: "var(--gold-warm)" }}
            />
          ))}

          {/* YouTube iframe — autoplay WITH sound (works because user clicked loading screen first) */}
          {mounted && (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_ID}&rel=0&modestbranding=1&showinfo=0&controls=1`}
              title="Vitheaon Promo"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full z-[1]"
              style={{ border: "none" }}
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mt-5 text-[11px] tracking-[3px] uppercase text-gold-deep"
        >
          {t("promo.caption")}
        </motion.div>
      </div>
    </section>
  );
}
