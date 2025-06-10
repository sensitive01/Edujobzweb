module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors based on the existing theme
        primary: "#4f46e5",
        secondary: "#f43f5e",
        // etc.
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // Add other fonts from your project
      },
    },
  },
  plugins: [],
}
