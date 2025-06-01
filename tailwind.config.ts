import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: {
        "4xl": ["2.5rem", { lineHeight: "3rem" }],
        "3xl": ["2rem", { lineHeight: "2.375rem" }],
        "2xl": ["1.5rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.5rem" }],
        "2lg": ["1.125rem", { lineHeight: "1.3125rem" }],
        lg: ["1rem", { lineHeight: "1.1875rem" }],
        md: ["0.875rem", { lineHeight: "1.0625rem" }],
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      colors: {
        "brand-primary": "#10b981",
        "brand-secondary": "#34d399",
        "brand-tertiary": "#a3e635",
        "point-purple": "#a855f7",
        "point-blue": "#3b82f6",
        "point-cyan": "#06b6d4",
        "point-pink": "#ec4899",
        "point-rose": "#f4ef5e",
        "point-orange": "#f97316",
        "point-yellow": "#eab308",
        "bg-primary": "#0f172a",
        "bg-secondary": "#1e293b",
        "bg-tertiary": "#334155",
        "bg-inverse": "#ffffff",
        "interaction-inactive": "#94a3b8",
        "interaction-hover": "#059669",
        "interaction-pressed": "#047857",
        "interaction-focus": "#10b981",
        "border-primary": "#f8fafc80",
        "text-primary": "#f8fafc",
        "text-secondary": "#cbd5e1",
        "text-tertiary": "#e2e8f0",
        "text-default": "#64748b",
        "text-inverse": "#ffffff",
        "text-disabled": "#94a3b8",
        "status-danger": "#dc2626",
        "icon-primary": "#64748b",
        "icon-inverse": "#f8fafc",
        "icon-brand": "#10b981",
        "card-border": "#4c4c4c",
      },
    },
  },
  plugins: [],
};

export default config;
