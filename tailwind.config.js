/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customBlue: "hsl(208, 41%, 76%)",
      },
      fontFamily: {
        sans: "Trebuchet MS",
      },
      boxShadow: {
        glow: "0 0 5px 0px hsl(208, 41%, 76%)",
      },
      keyframes: {
        pulseShadow: {
          "0%, 100%": { boxShadow: "0 0 2px 1px rgba(169, 195, 219, 1)" },
          "50%": { boxShadow: "0 0 1px 0.5px rgba(169, 195, 219, 1)" },
        },
      },
      animation: {
        pulseShadow: "pulseShadow 2s infinite",
      },
    },
  },
  plugins: [],
};
