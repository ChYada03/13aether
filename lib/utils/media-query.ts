"use client";

import { useEffect, useState } from "react";

function subscribe(query: string, listener: (matches: boolean) => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  const mql = window.matchMedia(query);
  const handler = (e: MediaQueryListEvent) => listener(e.matches);
  // initial fire
  listener(mql.matches);
  if (mql.addEventListener) {
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }
  // fallback older browsers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (mql as any).addListener(handler);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return () => (mql as any).removeListener(handler);
}

/** True when the user has requested reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => subscribe("(prefers-reduced-motion: reduce)", setReduced), []);
  return reduced;
}

/** True when viewport width matches the desktop breakpoint (≥ 1280px). */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => subscribe("(min-width: 1280px)", setIsDesktop), []);
  return isDesktop;
}

/** True when viewport width matches the tablet+ breakpoint (≥ 768px). */
export function useIsTabletUp(): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => subscribe("(min-width: 768px)", setMatch), []);
  return match;
}

/** True when the device has a fine pointer + hover capability (i.e. desktop). */
export function useHasPointer(): boolean {
  const [hasPointer, setHasPointer] = useState(false);
  useEffect(
    () => subscribe("(hover: hover) and (pointer: fine)", setHasPointer),
    [],
  );
  return hasPointer;
}
