/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif']
      },
      height:{
        "1/10": "10%",
        "9/10": "90%"
      },
    },
  },
  plugins: [],
}
