/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-gold': '#C4A672',
        'luxury-bronze': '#B8945F',
        'luxury-brown': '#6B5D4F',
        'luxury-dark': '#5C4E3F',
        'luxury-cream': '#F5F5DC',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #C4A672 0%, #B8945F 100%)',
        'luxury-overlay': 'linear-gradient(to bottom, rgba(92, 78, 63, 0.9), rgba(196, 166, 114, 0.85))',
      },
    },
  },
  plugins: [],
}