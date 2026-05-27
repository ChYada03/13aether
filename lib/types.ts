import type { ZodiacKey } from "./utils/constants";

export type Locale = "th" | "en";

export type LocalizedText = Record<Locale, string>;

export type Faction =
  | "government-public"
  | "government-secret"
  | "hidden-council"
  | "infiltrator"
  | "rebel"
  | "civilian";

export interface FactionVisibility {
  publicKnows: boolean;
  governmentKnows: boolean;
  agencyType: "public" | "secret";
}

export type CharacterId = ZodiacKey;

export interface CharacterRelationship {
  targetId: CharacterId;
  label?: LocalizedText;
}

export interface Character {
  id: CharacterId;
  zodiac: ZodiacKey;
  name: LocalizedText;
  alias?: LocalizedText;
  occupation: LocalizedText;
  affiliation: LocalizedText;
  faction: Faction;
  visibility: FactionVisibility;
  bio: LocalizedText;
  quote: LocalizedText;
  /** Accent color used for portrait gradient backing and modal mood. */
  accent: string;
  /** Optional override portrait — defaults to /portraits/{nn}.jpg if missing. */
  portraitSrc?: string;
  relationships: CharacterRelationship[];
  externalLink?: string;
}

export type LoreEraId =
  | "year-zero"
  | "dark-age"
  | "decline"
  | "d-day"
  | "present";

export const LORE_ORDER: readonly LoreEraId[] = [
  "year-zero",
  "dark-age",
  "decline",
  "d-day",
  "present",
] as const;

export interface LorePanel {
  id: LoreEraId;
  yearLabel: LocalizedText;
  title: LocalizedText;
  body: LocalizedText[];
  /** Image path for the panel artwork. */
  image?: string;
  /** 0..1 driving background star density when this panel is centered. */
  starDensity: number;
  /** CSS color for nebula tint while this panel is active. */
  accent: string;
}

export type GlossaryEntryId =
  | "starborn"
  | "central-government"
  | "government-starborn"
  | "infiltrators"
  | "rebels";

export interface GlossarySubEntry {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
}

export interface GlossaryEntry {
  id: GlossaryEntryId;
  /** Icon key from the SVG sprite (matches Icon component name). */
  icon: "star" | "tower" | "scale" | "mask" | "swords";
  iconTint?: string;
  title: LocalizedText;
  teaser: LocalizedText;
  body: LocalizedText[];
  subEntries?: GlossarySubEntry[];
}

export interface PromoVideo {
  id: string;
  src: string | null; // null → placeholder slot
  title: LocalizedText;
  poster?: string;
}

export type UIStringKey =
  | "nav.lore"
  | "nav.glossary"
  | "nav.characters"
  | "nav.openMenu"
  | "nav.closeMenu"
  | "nav.switchLocale"
  | "nav.toggleAudio"
  | "hero.title"
  | "hero.titleTh"
  | "hero.tagline"
  | "hero.scrollCue"
  | "promo.caption"
  | "promo.placeholderLabel"
  | "promo.placeholderSub"
  | "promo.prev"
  | "promo.next"
  | "lore.sectionTitle"
  | "lore.sectionKicker"
  | "lore.scrollHint"
  | "glossary.sectionTitle"
  | "glossary.sectionKicker"
  | "glossary.expand"
  | "glossary.collapse"
  | "characters.sectionTitle"
  | "characters.sectionKicker"
  | "character.viewMore"
  | "character.relations"
  | "character.affiliation"
  | "character.occupation"
  | "character.quote"
  | "character.bio"
  | "modal.close"
  | "modal.externalLink"
  | "footer.credits"
  | "loading.alt";

export type UIStrings = Record<UIStringKey, LocalizedText>;
