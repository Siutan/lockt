/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          10: '#FFE6A7',
          20: '#BB9457',
          30: '#99582A',
          40: '#432818',
          50: '#6F1D1B',
          60: '#1e1e1e',
        }
      },
    },
  },
  plugins: [],
}

