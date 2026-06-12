import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#0F0F14",
        line: "#1E1E2C",
        primary: {
          DEFAULT: "#02FA8B",
          dim: "#01C26A",
          glow: "rgba(2,250,139,0.35)",
        },
        accent: {
          DEFAULT: "#BA1BFA",
          dim: "#8F12C2",
          glow: "rgba(186,27,250,0.35)",
        },
        muted: "#9090A0",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        neon:         "0 0 18px rgba(2,250,139,0.45), 0 0 60px rgba(2,250,139,0.18)",
        "neon-soft":  "0 0 12px rgba(2,250,139,0.25)",
        accent:       "0 0 18px rgba(186,27,250,0.45), 0 0 60px rgba(186,27,250,0.18)",
        "accent-soft":"0 0 12px rgba(186,27,250,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
