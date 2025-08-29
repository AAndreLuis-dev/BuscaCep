/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'horizon': {
          'bg': '#0d0d0d',
          'bg-secondary': '#121212',
          'contrast': '#2c2c2c',
          'contrast-light': '#333333',
          'primary': '#f9c806',
          'primary-hover': '#e6b800',
          'text': '#ffffff',
          'text-secondary': '#d1d1d1',
          'text-muted': '#999999',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}