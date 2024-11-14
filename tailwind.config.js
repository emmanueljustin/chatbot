/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/nativewind/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-VariableFont_wght", "sans-serif"],
        rubikItalic: ["Rubik-Italic-VariableFont_wght", "sans-serif"],
        rubikMono: ["RubikMonoOne-Regular", "sans-serif"],
        space: ["SpaceMono-Regular", "monospace"],
      }
    },
  },
  plugins: [],
}