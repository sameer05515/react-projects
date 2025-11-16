/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'menu-dark': '#2C3E50',
        'menu-darker': '#34495E',
        'menu-yellow': '#FFC107',
        'menu-light': '#ECF0F1',
        'menu-red': '#E74C3C',
        'menu-red-dark': '#C0392B',
      },
    },
  },
  plugins: [],
}


