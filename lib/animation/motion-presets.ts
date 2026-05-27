import type { Transition, Variants } from "framer-motion";

export const EASE_DECEL = [0.22, 1, 0.36, 1] as const;
export const EASE_BACK = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const scaleFade: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export const fadeUpTransition: Transition = {
  duration: 0.8,
  ease: EASE_DECEL,
};

export const cardFlipTransition: Transition = {
  duration: 0.75,
  ease: EASE_BACK,
};

export const modalEnterTransition: Transition = {
  duration: 0.35,
  ease: EASE_DECEL,
};

export const glowPulseAnimate = {
  boxShadow: [
    "0 0 12px rgba(240,192,96,0.2)",
    "0 0 28px rgba(240,192,96,0.5)",
    "0 0 12px rgba(240,192,96,0.2)",
  ],
};

export const glowPulseTransition: Transition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut",
};
