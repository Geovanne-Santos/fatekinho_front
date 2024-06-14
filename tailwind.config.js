/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ED1836",
        secondary: "#FAF755",
        background: "#0F1923",
        "true-black": "#090f15",
        "true-gray": "#d4d4d4",
      },
    },
  },
  plugins: [],
};
