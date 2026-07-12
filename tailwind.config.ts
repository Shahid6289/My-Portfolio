import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", "var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        // Slow wandering paths for the ambient hero orbs (run with
        // direction: alternate so they drift back and forth)
        "drift-1": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(40px, -50px) scale(1.08)" },
        },
        "drift-2": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(-50px, 30px) scale(0.95)" },
        },
        "drift-3": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(25px, 40px) scale(1.05)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        // orbit + orbit-reverse share one duration so a counter-rotating child
        // exactly cancels its parent's spin (keeps orbiting chips upright)
        orbit: "spin-slow 50s linear infinite",
        "orbit-reverse": "spin-slow 50s linear infinite reverse",
        shimmer: "shimmer 8s linear infinite",
        "drift-1": "drift-1 22s ease-in-out infinite alternate",
        "drift-2": "drift-2 28s ease-in-out infinite alternate",
        "drift-3": "drift-3 25s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
