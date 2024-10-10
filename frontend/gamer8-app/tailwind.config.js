/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "100%": { opacity: 1 },
          "0%": { opacity: 0 },
        },
      },
      animation: {
        fadeIn: "fadIn 0.5s ease-in-out",
        fadeOut: 'fadeOut 0.5s ease-in-out'
      },
    },
  },
  plugins: [],
};
