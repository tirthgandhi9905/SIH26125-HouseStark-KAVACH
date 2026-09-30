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
        primary: "#0ea5e9", // A shade of sky blue
        secondary: "#10b981", // Emerald green
        background: "#0f172a", // Slate 900
        surface: "#1e293b", // Slate 800
      }
    },
  },
  plugins: [],
};
export default config;
