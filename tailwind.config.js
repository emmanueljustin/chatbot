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
        rubik: ["RubikMonoOne-Regular", "sans-serif"],
        space: ["SpaceMono-Regular", "monospace"],
      }
    },
  },
  plugins: [],
}