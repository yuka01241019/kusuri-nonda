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
        textMain: "#403B3D",
        lightPink: "#FFF2F2",
        darkPink: "#FFB1AB",
        submitBtn: "64C2B7",
      },
      fontSize: {
        heading1: "24px",
        heading2: "20px",
        base: "16px",
        small: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
