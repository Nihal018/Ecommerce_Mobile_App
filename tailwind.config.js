/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./screens/HomeOverview/**/*.{js,jsx,ts,tsx}",
    "./screens/Cart.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
