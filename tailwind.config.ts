import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      transitionDuration: { "250": "250ms", "400": "400ms" },
      animation: {
        "fade-in":      "fadeIn 0.5s ease-out both",
        "fade-in-slow": "fadeIn 0.9s ease-out both",
        "slide-up":     "slideUp 0.5s ease-out both",
        "float-in":     "floatIn 0.55s ease-out both",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatIn: {
          "0%":   { opacity: "0", transform: "translateY(32px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
