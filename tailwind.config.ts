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
        'void-black': 'var(--void-black)',
        'deep-space': 'var(--deep-space)',
        'electric-cyan': 'var(--electric-cyan)',
        'neon-blue': 'var(--neon-blue)',
        'pure-white': 'var(--pure-white)',
        'muted-silver': 'var(--muted-silver)',
        'midnight-navy': 'var(--midnight-navy)',
        'alert-red': 'var(--alert-red)',
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        space: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

