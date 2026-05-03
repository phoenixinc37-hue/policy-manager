# Policy Manager - Style Design Configuration

## 1. tailwind.config.ts
This sets the primary brand color palette to `#2e7d32`.

```typescript
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
          50: "#e8f5e9",
          100: "#c8e6c9",
          200: "#a5d6a7",
          300: "#81c784",
          400: "#66bb6a",
          500: "#4caf50",
          600: "#43a047",
          700: "#388e3c",
          800: "#2e7d32", // Primary brand color
          900: "#1b5e20",
          DEFAULT: "#2e7d32",
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
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

## 2. app/globals.css
This applies the `#2e7d32` green to the buttons, borders, and inputs.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

@layer base {
  :root {
    color-scheme: light;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-slate-100 text-slate-900 font-sans antialiased;
    font-family: "Inter", system-ui, sans-serif;
    background-image:
      radial-gradient(circle at top, rgba(46, 125, 50, 0.05), transparent 28%),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.96), rgba(241, 245, 249, 0.94));
  }
  h1 {
    @apply text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl;
  }
  h2 {
    @apply text-xl font-semibold tracking-tight text-slate-950;
  }
  h3 {
    @apply text-lg font-medium text-slate-950;
  }
}

@layer components {
  .badge-policy {
    @apply inline-flex items-center rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2.5 py-1 text-xs font-semibold text-fuchsia-800;
  }

  .badge-sog {
    @apply inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800;
  }

  .badge-info {
    @apply inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800;
  }

  .card {
    @apply rounded-3xl border border-white/70 bg-white p-5 shadow-[0_14px_45px_-24px_rgba(15,23,42,0.3)] backdrop-blur-xl;
  }

  .card-muted {
    @apply rounded-3xl border border-slate-200/80 bg-slate-50/90 p-5;
  }

  .btn-primary {
    @apply inline-flex items-center justify-center rounded-xl bg-[#2e7d32] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#1b5e20] hover:shadow-lg hover:shadow-[#2e7d32]/40 disabled:cursor-not-allowed disabled:opacity-50;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#2e7d32] transition hover:-translate-y-0.5 hover:border-[#2e7d32] hover:bg-slate-50;
  }

  .input {
    @apply w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/20;
  }

  .textarea {
    @apply input min-h-[180px] resize-y font-mono;
  }

  .surface-dark {
    @apply rounded-3xl border border-white/10 bg-slate-950 text-white shadow-[0_18px_60px_-32px_rgba(15,23,42,0.8)];
  }

  .section-label {
    @apply text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700;
  }
}
