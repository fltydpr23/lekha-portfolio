import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earth tone palette
        terracotta: {
          DEFAULT: "#C4714A",
          light: "#D4896A",
          dark: "#A05A38",
        },
        rose: {
          dusty: "#D4A5A5",
          muted: "#C08B8B",
        },
        olive: {
          muted: "#8B8B6B",
          light: "#A5A585",
          dark: "#6B6B50",
        },
        beige: {
          DEFAULT: "#F2EDE4",
          warm: "#EDE5D8",
          deep: "#D9CFC0",
        },
        burgundy: {
          DEFAULT: "#5C1F2E",
          light: "#7A2B3D",
          dark: "#3E1420",
        },
        charcoal: {
          DEFAULT: "#2A2825",
          light: "#3D3B37",
          dark: "#1A1916",
        },
        gold: {
          soft: "#C9A96E",
          light: "#D9BC8A",
          muted: "#B8955A",
        },
        // Neutral tones
        ink: "#1C1A18",
        ash: "#8A8580",
        fog: "#C5BEB5",
        linen: "#F7F3EE",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "display-sm": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.1" }],
        "display-md": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.05" }],
        "display-lg": ["clamp(4rem, 10vw, 8rem)", { lineHeight: "1" }],
        "display-xl": ["clamp(5rem, 14vw, 12rem)", { lineHeight: "0.95" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "50": "12.5rem",
        "58": "14.5rem",
        "66": "16.5rem",
        "74": "18.5rem",
        "82": "20.5rem",
        "90": "22.5rem",
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
      },
      letterSpacing: {
        widest: "0.25em",
        editorial: "0.15em",
        caps: "0.08em",
      },
      lineHeight: {
        "editorial": "1.7",
        "display": "0.95",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
        "1500": "1500ms",
        "2000": "2000ms",
      },
      transitionTimingFunction: {
        "editorial": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "reveal": "cubic-bezier(0.16, 1, 0.3, 1)",
        "gentle": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1.2s ease forwards",
        "line-grow": "lineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineGrow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      gridTemplateColumns: {
        "masonry-2": "repeat(2, 1fr)",
        "masonry-3": "repeat(3, 1fr)",
        "masonry-4": "repeat(4, 1fr)",
        "editorial": "1fr 1.618fr",
        "editorial-reverse": "1.618fr 1fr",
      },
      aspectRatio: {
        "2/3": "2 / 3",
        "3/4": "3 / 4",
        "4/5": "4 / 5",
        "5/4": "5 / 4",
        "5/3": "5 / 3",
        "7/5": "7 / 5",
        "16/10": "16 / 10",
      },
      maxWidth: {
        "prose-editorial": "68ch",
        "prose-narrow": "52ch",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      backdropBlur: {
        "xs": "2px",
      },
    },
  },
  plugins: [],
};

export default config;
