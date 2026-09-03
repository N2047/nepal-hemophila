import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F3A66", // Deep medical blue
          light: "#1A508B",
          dark: "#082442",
          50: "#F0F5FA",
          100: "#DCE7F3",
          200: "#B8CFE6",
          500: "#0F3A66",
          600: "#0C3054",
          700: "#092440",
          800: "#061A2E",
          900: "#030D17",
        },
        accent: {
          DEFAULT: "#DC2626", // Blood/Hemophilia crimson red
          light: "#EF4444",
          dark: "#B91C1C",
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#DC2626",
          600: "#B91C1C",
          700: "#991B1B",
        },
        medical: {
          teal: "#0D9488",
          emerald: "#059669",
          amber: "#D97706",
          navy: "#0A192F",
          slate: "#334155",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        nepali: ["var(--font-noto-nepali)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
