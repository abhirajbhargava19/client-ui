import type { Config } from "tailwindcss"
import {fontFamily} from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Example: Using CSS variables (recommended with shadcn/ui)
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],

        // OR: If you're using Google Fonts or local imports
        // sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}

export default config
