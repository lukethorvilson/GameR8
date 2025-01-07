/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "button-color": "var(--button-background-color)",
        "primary-text-color": "var(--text-primary-color)",
        "secondary-text-color": "var(--text-secondary-color)",
      },
      fontFamily: {
        base: ["Russo One", "sans-serif"],
        header: ["Bungee", "sans-serif"],
      },
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
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
