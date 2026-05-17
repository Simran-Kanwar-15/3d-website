/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royalBlue: '#1B2A6B',
        desertOrange: '#E8853D',
        gold: '#D4AF37',
        bgDark: '#0A0A14',
        textLight: '#F5ECD7',
      },
      fontFamily: {
        cinzel: ['Cinzel Decorative', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}