import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./public/**/*.svg"],
  theme: {
    extend: {
      // Gentle side-to-side drift for the homepage clouds.
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "drift-slow": "drift 26s ease-in-out infinite reverse",
        // Plane crosses the screen every 12s; "fly-lanes" moves it to a new
        // height between passes. Both use transforms only, so they run
        // smoothly off the main thread.
        fly: "fly 12s linear infinite",
        "fly-lanes": "fly-lanes 36s linear infinite",
        prop: "prop 0.12s steps(2) infinite",
        bob: "bob 1.6s ease-in-out infinite alternate",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(32px)" },
        },
        fly: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100vw)" },
        },
        // Applied to a full-height wrapper, so percentages are of the hero's
        // height. Each jump lands while the plane is off-screen.
        "fly-lanes": {
          "0%, 33.33%": { transform: "translateY(8%)" },
          "33.34%, 66.66%": { transform: "translateY(40%)" },
          "66.67%, 100%": { transform: "translateY(72%)" },
        },
        // Steps between the two sprite frames to spin the propeller.
        prop: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "200% 0" },
        },
        bob: {
          from: { transform: "translateY(-6px)" },
          to: { transform: "translateY(6px)" },
        },
      },
      fontFamily: {
        // Silkscreen: nav and other display text.
        display: ["var(--font-display)"],
        // Press Start 2P: the homepage heading.
        "display-header": ["var(--font-display-header)"],
        mono: ["var(--font-body)"],
        sans: ["var(--font-body)"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
