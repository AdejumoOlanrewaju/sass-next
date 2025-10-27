/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // enables dark mode support
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#111827", // dark gray / black
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1f2937",
          foreground: "#f9fafb",
        },
        accent: {
          DEFAULT: "#3b82f6", // blue accent
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
