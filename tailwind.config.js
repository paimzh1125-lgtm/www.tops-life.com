/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tops: {
          blue: '#40C4FF', // Sky Blue
          dark: '#0F172A', // Deep Space Blue
          white: '#F8FAFC', // Pure White
          gray: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['"HarmonyOS Sans"', '"MiSans"', '"Source Han Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
