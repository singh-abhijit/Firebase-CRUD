/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      margin: {
        DEFAULT: "auto",
      },
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.8125rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    extend: {
      colors: {
        label: "#3F3F3F",
        primary: "#375A9E",
        "light-gray": "#EFEFEF",
        "secondary-actions": "#F07777",
      },
    },
  },
  plugins: [],
};
