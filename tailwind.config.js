/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefdf5',
          100: '#d6fae6',
          200: '#b0f3d0',
          300: '#7ce7b3',
          400: '#43d391',
          500: '#1eb877',
          600: '#12945f',
          700: '#12764e',
          800: '#135e41',
          900: '#124d37',
          950: '#052b1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
