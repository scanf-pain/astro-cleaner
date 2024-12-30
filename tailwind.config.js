// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
    }),
  ],
};
