"use client";

import { useState } from "react";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { IconSprite } from "@/components/ui/IconSprite";
import { BackgroundLayers } from "@/components/background/BackgroundLayers";
import { LoadingScreen } from "@/components/chrome/LoadingScreen";
import { StickyNavBar } from "@/components/chrome/StickyNavBar";
import { Footer } from "@/components/chrome/Footer";
import { PromoVideoSection } from "@/components/promo/PromoVideoSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { LoreSection } from "@/components/lore/LoreSection";
import { DistrictsSection } from "@/components/districts/DistrictsSection";
import { GlossarySection } from "@/components/glossary/GlossarySection";
import { CharactersSection } from "@/components/characters/CharactersSection";
import { CharacterModal } from "@/components/characters/CharacterModal";
import { useAmbientAudio } from "@/lib/audio/useAmbientAudio";
import type { CharacterId } from "@/lib/types";

export function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false);
  const audio = useAmbientAudio();
  const [activeCharacter, setActiveCharacter] = useState<CharacterId | null>(null);

  return (
    <LocaleProvider>
      <IconSprite />
      <BackgroundLayers />

      {!loadingDone && <LoadingScreen onComplete={() => setLoadingDone(true)} />}

      <StickyNavBar audioOn={audio.isOn} onToggleAudio={audio.toggle} />

      <main id="top" className="overflow-x-hidden">
        <PromoVideoSection />
        <HeroSection />
        <LoreSection />
        <DistrictsSection />
        <GlossarySection />
        <CharactersSection onOpenDetail={(id) => setActiveCharacter(id as CharacterId)} />
        <Footer />
      </main>

      <CharacterModal
        characterId={activeCharacter}
        onClose={() => setActiveCharacter(null)}
        onOpen={(id) => setActiveCharacter(id)}
      />
    </LocaleProvider>
  );
}
