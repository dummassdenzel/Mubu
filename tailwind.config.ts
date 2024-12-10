/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFF8A7",
        secondary: "#BF3D3D",
        accent: "#FFFDF0",
        hot: "#BF3D3D",
      },
      fontFamily: {
        dynapuff: ['"DynaPuff"', "sans-serif"],
        caveat: ['"Caveat Brush"', "sans-serif"],
        karla: ['"Karla"', "sans-serif"],
        macondo: ['"Macondo"', "sans-serif "],
        concert: ['"Concert One"', "sans-serif"],
        primary: ['"Montserrat"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
