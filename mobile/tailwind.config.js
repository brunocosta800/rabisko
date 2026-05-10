/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.{js,jsx,ts,tsx}", "./index.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094', // Main color from mockups (the beige/tan)
          600: '#a18072',
          700: '#846358',
          800: '#43302b',
          900: '#211816',
        },
        secondary: '#000000',
        background: '#f8f9fa',
        card: '#f2e8e5',
        text: '#000000',
        muted: '#6c757d',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
