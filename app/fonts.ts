import {
  Cinzel,
  Cormorant_Garamond,
  Inter,
  IBM_Plex_Sans_Thai,
  IBM_Plex_Sans_Thai_Looped,
  Bai_Jamjuree,
} from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-thai",
  display: "swap",
});

export const plexThaiLooped = IBM_Plex_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-thai-looped",
  display: "swap",
});

export const baiJamjuree = Bai_Jamjuree({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bai",
  display: "swap",
});

export const fontVars = [
  cinzel.variable,
  cormorant.variable,
  inter.variable,
  plexThai.variable,
  plexThaiLooped.variable,
  baiJamjuree.variable,
].join(" ");
