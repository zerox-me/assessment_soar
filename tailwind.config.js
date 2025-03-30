/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'label': {
          primary: '#232323',
          secondary: '#718EBF',
          tertiary: '#B1B1B1',
          title: '#343C6A',
          icon: '#F5F7FA',
        },
        'input': {
          border: '#DFEAF2',
          placeholder: '#8BA3CB',
          focus: '#396AFF',
        }
      },
    },
  },
  plugins: [],
} 