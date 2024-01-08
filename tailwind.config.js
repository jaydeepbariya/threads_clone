/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode:"class",
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark']
    }
  },
  theme: {
  },

  plugins: [],
};
