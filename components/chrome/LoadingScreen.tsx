"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useReducedMotion } from "@/lib/utils/media-query";

interface Props {
  onComplete: () => void;
  minDurationMs?: number;
}

export function LoadingScreen({ onComplete, minDurationMs = 2500 }: Props) {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const startedAt = useRef<number>(Date.now());
  const completed = useRef(false);

  const finish = () => {
    if (completed.current) return;
    completed.current = true;
    setVisible(false);
    setTimeout(onComplete, 600);
  };

  // Auto-finish after min duration
  useEffect(() => {
    const timer = setTimeout(finish, reduced ? 600 : minDurationMs + 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, minDurationMs]);

  // Skip on user gesture after 1s
  useEffect(() => {
    const onGesture = () => {
      if (Date.now() - startedAt.current > 1000) finish();
    };
    window.addEventListener("click", onGesture);
    window.addEventListener("keydown", onGesture);
    return () => {
      window.removeEventListener("click", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll while visible
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-busy="true"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-bg-void overflow-hidden"
        >
          <span className="sr-only">{t("loading.alt")}</span>
          {/* Background star scatter */}
          {!reduced &&
            Array.from({ length: 36 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-glow-starlight"
                style={{
                  left: `${(i * 47) % 100}%`,
                  top: `${(i * 73) % 100}%`,
                  boxShadow: "0 0 6px var(--glow-starlight)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.4, 1], scale: 1 }}
                transition={{
                  duration: 2.4,
                  delay: (i % 12) * 0.05,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          {/* Center title */}
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-cinzel text-3xl md:text-5xl font-bold uppercase text-gold-warm"
            style={{ textShadow: "0 0 24px rgba(240,192,96,0.6)" }}
          >
            VITHEAON
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1.6, delay: 0.6 }}
            className="mt-6 h-px bg-gold-warm shadow-[0_0_8px_var(--gold-warm)]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.4 }}
            className="mt-3 text-[11px] tracking-[3px] uppercase text-gold-deep"
          >
            {t("loading.alt")}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
