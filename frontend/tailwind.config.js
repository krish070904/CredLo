/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f29e0d",
        "background-light": "#f8f7f5",
        "background-dark": "#221b10",
        "brand-dark": "#060D0C", // Custom dark from user
        "brand-gray": "#3f3f46", // zinc-700 for inputs
        "brand-teal": "#2dd4bf", // teal-400/500 for accents
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        amiko: ["Amiko", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
