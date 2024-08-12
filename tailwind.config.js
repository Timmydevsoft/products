/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "redrose": "#c73a0f",
        "burnt-rose": "#2b140d"
      }
    },
  },
  plugins: [],
}