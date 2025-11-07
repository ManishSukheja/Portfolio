/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        accent: '#06b6d4',
        accentLight: '#22d3ee',
        textColor: '#e2e8f0',
      },
    },
  },
  plugins: [],
};
