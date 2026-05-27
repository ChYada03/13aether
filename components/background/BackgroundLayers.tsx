"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/utils/media-query";

/**
 * Lightweight 4-layer background:
 * 1. CSS gradient (static)
 * 2. Star particles canvas (drift + twinkle)
 * 3. Nebula blur with subtle parallax (CSS-only via scroll listener)
 * 4. (constellation lines layer reserved for later)
 */
export function BackgroundLayers() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);

  // Star canvas: drift + twinkle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const isMobile = window.innerWidth < 768;
    const STAR_COUNT = isMobile ? 80 : 200;

    type Star = {
      x: number;
      y: number;
      r: number;
      vy: number;
      phase: number;
      pSpeed: number;
      hue: number;
    };
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.4 + 0.3) * dpr,
        vy: reduced ? 0 : (Math.random() * 0.04 + 0.01) * dpr,
        phase: Math.random() * Math.PI * 2,
        pSpeed: 0.005 + Math.random() * 0.015,
        hue: Math.random() < 0.15 ? 200 : 45, // mostly gold, occasional cool blue
      });
    }

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.phase += s.pSpeed;
        const alpha = 0.4 + Math.sin(s.phase) * 0.4;
        if (!reduced) {
          s.y += s.vy;
          if (s.y > canvas.height) {
            s.y = -2;
            s.x = Math.random() * canvas.width;
          }
        }
        ctx.beginPath();
        ctx.fillStyle =
          s.hue === 200
            ? `rgba(96,144,192,${alpha})`
            : `rgba(240,200,120,${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      running = false;
    };
  }, [reduced]);

  // Nebula parallax
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      if (!nebulaRef.current) return;
      const y = window.scrollY * 0.05;
      nebulaRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none">
      {/* Layer 1: gradient */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000060 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, #2a0050 0%, transparent 65%), #000018",
        }}
      />
      {/* Layer 2: particles */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-20" />
      {/* Layer 3: nebula blur */}
      <div
        ref={nebulaRef}
        className="fixed inset-0 -z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 25% 30%, rgba(96,144,192,0.12), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(168,120,216,0.10), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
