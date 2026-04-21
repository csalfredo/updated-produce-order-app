/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        'charted':['"Jersey 10 Charted"', 'sans-serif'],
        'sans':['Open Sans', 'sans-serif'],
        'instrument':['"Instrument Serif Static"', 'serif'],
      }
    },
  },
  plugins: [],
};
