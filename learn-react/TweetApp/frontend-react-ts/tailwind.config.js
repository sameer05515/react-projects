/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom colors for HorizontalMenu and other components
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

