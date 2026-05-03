import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f5ff",
          100: "#e0ebff",
          200: "#c2d6ff",
          500: "#4a7aff",
          600: "#3360e0",
          700: "#2249b8",
          800: "#1a3a8f",
          900: "#142d6b",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8f9fb",
          border: "#e5e7eb",
        },
        clinical: {
          policy: "#7c3aed",
          sog: "#0891b2",
          info: "#65a30d",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
