"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
let registrationFailed = false;

/** Register GSAP plugins exactly once. Idempotent. */
export function ensureGsapReady(): { ok: boolean; gsap: typeof gsap } {
  if (typeof window === "undefined") {
    return { ok: false, gsap };
  }
  if (registered) return { ok: true, gsap };
  if (registrationFailed) return { ok: false, gsap };
  try {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
    return { ok: true, gsap };
  } catch (err) {
    registrationFailed = true;
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[gsap] Failed to register ScrollTrigger", err);
    }
    return { ok: false, gsap };
  }
}

export { gsap, ScrollTrigger };
