"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";

const AUDIO_SRC = "/audio/ambient.mp3";
const TARGET_VOLUME = 0.4;
const FADE_DURATION_MS = 800;

interface AudioState {
  isOn: boolean;
  isReady: boolean;
  toggle: () => void;
}

/**
 * Ambient background audio with fade in/out + persistence.
 * Audio defaults to OFF on first visit and never autoplays before user gesture.
 */
export function useAmbientAudio(): AudioState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);
  const [isOn, setIsOn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Lazy-create the audio element once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (audioRef.current) return;
    const el = new Audio(AUDIO_SRC);
    el.loop = true;
    el.preload = "metadata";
    el.volume = 0;
    el.addEventListener("canplaythrough", () => setIsReady(true), { once: true });
    el.addEventListener("error", () => {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn("[ambient audio] failed to load", AUDIO_SRC);
      }
      setIsReady(false);
    });
    audioRef.current = el;
    // we deliberately do NOT call play() here — wait for user gesture
  }, []);

  // Fade helper
  const fadeTo = useCallback((target: number, duration = FADE_DURATION_MS) => {
    const el = audioRef.current;
    if (!el) return Promise.resolve();
    if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);
    return new Promise<void>((resolve) => {
      const start = performance.now();
      const from = el.volume;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        el.volume = from + (target - from) * t;
        if (t < 1) {
          fadeRafRef.current = requestAnimationFrame(step);
        } else {
          fadeRafRef.current = null;
          resolve();
        }
      };
      fadeRafRef.current = requestAnimationFrame(step);
    });
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setIsOn((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEYS.audio, next ? "on" : "off");
      } catch {}
      if (next) {
        // First user gesture — start playback then fade in
        const playPromise = el.play();
        if (playPromise) {
          playPromise
            .then(() => fadeTo(TARGET_VOLUME))
            .catch(() => {
              // browser blocked — revert state
              setIsOn(false);
            });
        }
      } else {
        fadeTo(0).then(() => {
          el.pause();
        });
      }
      return next;
    });
  }, [fadeTo]);

  return { isOn, isReady, toggle };
}
