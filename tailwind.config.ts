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
        primary: {
          DEFAULT: '#0A6B5F', // Deep Teal
          foreground: '#FFFFFF',
          dark: '#02695C', // Darker Teal
          light: '#1B8C7E', // Lighter Teal Accent
        },
        secondary: {
          DEFAULT: '#0F172A', // Midnight Slate
          foreground: '#FFFFFF',
          dark: '#0B1121', // Deepest Slate
        },
        accent: '#F59E0B', // High-End Amber
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
