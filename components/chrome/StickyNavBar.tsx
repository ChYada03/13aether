"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { Icon } from "@/components/ui/IconSprite";
import { cn } from "@/lib/utils/cn";

const SECTIONS = [
  { id: "sec-lore", labelKey: "nav.lore" as const },
  { id: "sec-glossary", labelKey: "nav.glossary" as const },
  { id: "sec-characters", labelKey: "nav.characters" as const },
];

interface Props {
  audioOn: boolean;
  onToggleAudio: () => void;
}

export function StickyNavBar({ audioOn, onToggleAudio }: Props) {
  const { t, toggle: toggleLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close drawer on outside click + ESC
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".js-mobile-drawer") && !target.closest(".js-burger")) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [drawerOpen]);

  const handleLinkClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = window.innerWidth < 768 ? 56 : 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
    setDrawerOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] flex h-14 md:h-16 items-center justify-between px-5 md:px-12 transition-all duration-300",
          scrolled
            ? "bg-bg-void/85 backdrop-blur-md border-b border-gold-primary/70 shadow-[0_1px_24px_rgba(0,0,0,0.5)]"
            : "bg-bg-void/40 backdrop-blur-sm border-b border-gold-primary/0",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-gold-warm font-cinzel font-bold tracking-[0.2em] text-sm md:text-base uppercase no-underline"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Icon name="star" size={16} />
          VITHEAON
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={handleLinkClick(s.id)}
              className={cn(
                "font-cinzel text-[13px] tracking-[2px] uppercase no-underline pb-0.5 border-b-[1.5px] border-transparent transition-colors duration-300",
                activeId === s.id
                  ? "text-gold-warm border-gold-primary"
                  : "text-text-primary/80 hover:text-gold-warm hover:border-gold-primary/60",
              )}
            >
              {t(s.labelKey)}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t("nav.switchLocale")}
            className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 text-[11px] md:text-xs tracking-[2px] border border-gold-deep text-gold-burnished hover:text-gold-warm hover:border-gold-primary hover:shadow-[0_0_12px_rgba(216,168,72,0.3)] rounded-sm transition-all"
          >
            <Icon name="globe" size={12} />
            TH / EN
          </button>
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={t("nav.toggleAudio")}
            aria-pressed={audioOn}
            className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 border border-gold-deep text-gold-burnished hover:text-gold-warm hover:border-gold-primary rounded-sm transition-all"
          >
            <Icon name={audioOn ? "music-on" : "music-off"} size={14} />
          </button>
          {/* Mobile burger */}
          <button
            type="button"
            className="js-burger md:hidden inline-flex items-center justify-center w-8 h-8 border border-gold-deep text-gold-burnished hover:text-gold-warm hover:border-gold-primary rounded-sm transition-all"
            aria-label={drawerOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <Icon name={drawerOpen ? "close" : "menu"} size={16} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav-drawer"
        role="menu"
        className={cn(
          "js-mobile-drawer fixed inset-x-0 top-14 z-[999] md:hidden",
          "bg-bg-void/95 backdrop-blur-lg border-b border-gold-primary",
          "px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
          "transition-all duration-300 origin-top",
          drawerOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none",
        )}
      >
        <div className="flex flex-col">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              role="menuitem"
              onClick={handleLinkClick(s.id)}
              className={cn(
                "block py-3.5 px-2 font-cinzel text-sm tracking-[2px] uppercase no-underline",
                "text-text-primary/80 hover:text-gold-warm",
                i < SECTIONS.length - 1 && "border-b border-gold-deep/30",
              )}
            >
              {t(s.labelKey)}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
