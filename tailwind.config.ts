import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./public/**/*.svg"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-bruno-ace)"],
        mono: ["var(--font-body)"],
        sans: ["var(--font-body)"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
