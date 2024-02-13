/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F2F2F2",
        red: "#dc2626",
        gray: "#808080",
        "dark-gray": "#0A0A0A",
      },
      fontFamily: {
        regular: "Inter_400Regular",
        medium: "Inter_500Medium",
        semibold: "Inter_600SemiBold",
        bold: "Inter_700Bold",
      },
    },
  },
  plugins: [],
};
