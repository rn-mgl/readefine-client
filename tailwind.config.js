const tw = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prmColor: "#542ACA",
        scndColor: "#4BFCE1",
        accntColor: "#F6F6F6",
      },
      screens: {
        "m-s": "320px",
        "m-m": "375px",
        "m-l": "425px",
        t: "768px",
        "l-s": "1024px",
        "l-l": "1440px",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(-4%)" },
          "50%": { transform: "translateY(4%)" },
          "100%": { transform: "translateY(-4%)" },
        },
      },
      fontFamily: {
        mukta: ["var(--font-mukta)", tw.fontFamily.sans],
        poppins: ["var(--font-poppins)", tw.fontFamily.sans],
      },
      animation: {
        float: "float 8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
