/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f0f9ff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        accent: '#0891b2', // Darker cyan (700) for better text contrast
        accentLight: '#06b6d4', // Cyan 500
        textColor: '#020617', // Very dark slate/black
        muted: '#475569', // Slate 600 for secondary text
        mutedLight: '#64748b', // Slate 500
      },
    },
  },
  plugins: [],
};
