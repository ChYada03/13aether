"use client";

import { useLocale } from "@/lib/i18n/LocaleContext";
import { Icon } from "@/components/ui/IconSprite";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="relative z-10 px-5 md:px-12 py-12 md:py-16 text-center">
      <div className="opacity-30 mb-4">
        <Icon name="star" size={28} style={{ color: "var(--gold-primary)" }} />
      </div>
      <div className="inline-flex items-center gap-2 text-gold-warm font-cinzel font-bold tracking-[0.2em] uppercase">
        <Icon name="star" size={12} />
        VITHEAON
      </div>
      <div className="mt-2 text-text-muted text-sm tracking-wide">
        {t("footer.credits")}
      </div>
    </footer>
  );
}
