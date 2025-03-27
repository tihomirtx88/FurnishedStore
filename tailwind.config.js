import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: true,
  },
};