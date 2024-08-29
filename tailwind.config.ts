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
        border: 'rgba(255, 255, 255, .3)',
        borderw: 'rgba(255, 255, 255, .8)',
      }
    },
  },
  plugins: [],
};
export default config;
