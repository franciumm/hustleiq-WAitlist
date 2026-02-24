import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "terminal": "1100px",
        "stack": "700px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...fontFamily.sans],
        syne: ["Syne", ...fontFamily.sans],
        mono: ["DM Mono", ...fontFamily.mono],
      },
      colors: {
        border: "rgba(29, 255, 122, 0.12)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#050A06",
        foreground: "#F0FFF4",
        surface: "#0C130D",
        "surface-2": "#121A13",
        primary: {
          DEFAULT: "#1DFF7A",
          hover: "#18E66D",
          foreground: "#050A06",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-green": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "spin-border": {
          "to": { transform: "rotate(1turn)" }
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" }
        },
        "sq-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(29, 255, 122, 0.4)" },
          "50%": { boxShadow: "0 0 0 5px rgba(29, 255, 122, 0)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-green": "pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "marquee": "marquee 25s linear infinite",
        "spin-border": "spin-border 4s linear infinite",
        "blink": "blink 1.5s ease-in-out infinite",
        "sq-pulse": "sq-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
