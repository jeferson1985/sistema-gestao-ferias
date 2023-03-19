/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      screens: {
        'tablet': '750px',
        'mobile': '425px',
        'a51': '412px'
      },
      width: {
        128: "50rem",
      },
      height: {
        img: "35rem",
        small: "30rem",
        average: "48rem",
        big: "50rem",
      },
      colors: {
        tabColor: "#ffa500",
        "gradient-1": "#daaeee",
        "gradient-2": "#9c1cad",
        "gradient-3": "#94bbe9",
      },
    },
  },
  plugins: [],
};
