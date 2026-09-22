/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F9F5EC',
          200: '#F1E9DA',
          300: '#E6D7C2',
          400: '#D5BE9E',
        },
        earth: {
          100: '#F2ECE5',
          200: '#E0D2C2',
          300: '#C7B099',
          400: '#A68263',
          500: '#8B5A2B',
          600: '#75461E',
          700: '#5C3516',
          800: '#43250E',
          900: '#2C1607',
          950: '#1A0C03',
        },
        gold: {
          300: '#F5DE88',
          400: '#E5CA63',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#8C6504',
        },
        terracotta: {
          400: '#E27647',
          500: '#C85A27',
          600: '#A94315',
        },
        whatsapp: {
          light: '#25D366',
          DEFAULT: '#25D366',
          dark: '#128C7E',
          teal: '#075E54'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(44, 22, 7, 0.05)',
        'premium': '0 10px 30px -4px rgba(44, 22, 7, 0.08), 0 4px 10px -2px rgba(44, 22, 7, 0.04)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
