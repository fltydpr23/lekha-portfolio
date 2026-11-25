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
        canvas: "#ffffff",
        ink: "#000000",
        greige: "#e2e2e0",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        "display-sm": ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.1" }],
        "display-md": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.05" }],
        "display-lg": ["clamp(4rem, 10vw, 8rem)", { lineHeight: "1" }],
        "display-xl": ["clamp(5rem, 14vw, 9.875rem)", { lineHeight: "0.95" }],
      },
      letterSpacing: {
        widest: "0.25em",
        editorial: "0.14em",
        caps: "0.08em",
      },
      lineHeight: {
        editorial: "1.7",
        display: "0.95",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
