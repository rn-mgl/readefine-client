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

        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10%)" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1", transform: "translateY(0%)" },
        },

        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "80%": { transform: "translateY(10%)" },
          "100%": { transform: "translateY(0%)" },
        },

        dangle: {
          "0%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(20%)" },
        },

        shake: {
          "0%": { transform: "translateX(-10%)" },
          "20%": { transform: "translateX(10%)" },
          "40%": { transform: "translateY(-10%)" },
          "60%": { transform: "translateX(10%)" },
          "80%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(10%)" },
        },

        gradientLoader: {
          "0%": { backgroundSize: "100%" },
          "100%": { backgroundSize: "1000%" },
        },

        lightRays: {
          "0%": { transform: "rotate(0deg)", height: "100vh" },
          "50%": { transform: "rotate(180deg)", width: "100vww" },
          "100%": { transform: "rotate(360deg)", height: "100vh" },
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      animation: {
        float: "float 6s ease-in-out infinite alternate",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideDown: "slideDown 1s ease-in-out",
        dangle: "dangle 2s ease-in-out infinite alternate",
        shake: "shake 200ms ease-in-out",
        gradientLoader: "gradientLoader 2s ease-in-out infinite alternate",
        lightRays: "lightRays 5s ease-in-out infinite alternate",
      },
      boxShadow: {
        solid: "0px 5px rgba(0,0,0,0.3)",
        solidActive: "inset 0px 5px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
