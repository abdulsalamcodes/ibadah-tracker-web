/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./App/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popRegular: ["Poppins-regular"],
        popBold: ["Poppins-bold"],
        popLight: ["Poppins-light"],
        popXtraBold: ["Poppins-extrabold"],
        popSemiBold: ["Poppins-semiBold"],
        popBoldItalics: ["Poppins-boldItalic"],
      },
    },
  },
  plugins: [],
};
