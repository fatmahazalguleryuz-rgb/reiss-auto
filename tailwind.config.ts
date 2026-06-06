import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "#3a3a3c",
        "ink-deep": "#2b2b2d",
        "ink-soft": "#595758",
        line: "#e3e5e8",
        "line-dark": "#41434a",
        "bg-soft": "#f4f5f7",
        muted: "#6c7079",
        "muted-light": "#aab0ba",
        accent: "#c0392b",
        "accent-dark": "#a93226",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
