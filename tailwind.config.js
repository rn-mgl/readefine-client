/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#EBF0F9",
        prmColor1: "#3966bf",
        prmColor2: "#223459",
        scndColor1: "#ff7bac",
        scndColor2: "#f24182",
        accntColor1: "#f2e85e",
        accntColor2: "#f2c53d",
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
        mukta: ["var(--font-mukta)"],
        poppins: ["var(--font-poppins)"],
      },
      animation: {
        float: "float 8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
