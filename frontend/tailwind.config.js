/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#090713',
          card: '#0F0C21',
          sidebar: '#0C0A1B',
          border: '#1E1838',
          hover: '#191433',
        },
        purple: {
          accent: '#A855F7',
          glow: '#7C3AED',
          light: '#C084FC',
        }
      },
      boxShadow: {
        'purple-glow': '0 0 25px rgba(124, 58, 237, 0.35)',
        'card-glow': '0 0 20px rgba(15, 12, 33, 0.8)',
      }
    }
  },
  plugins: [],
}
