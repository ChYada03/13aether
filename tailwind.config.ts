import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        bg: {
          void: "#000018",
          deeper: "#000030",
          surface: "#101030",
          elevated: "#181848",
        },
        gold: {
          warm: "#f0c060",
          primary: "#d8a848",
          burnished: "#c09048",
          deep: "#786030",
        },
        text: {
          primary: "#f0f0f0",
          heading: "#c09048",
          muted: "#786048",
        },
        glow: {
          starlight: "#6090c0",
          nebula: "#a878d8",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        bai: ["var(--font-bai)", "sans-serif"],
        "plex-thai": ["var(--font-plex-thai)", "sans-serif"],
        "plex-thai-looped": ["var(--font-plex-thai-looped)", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
