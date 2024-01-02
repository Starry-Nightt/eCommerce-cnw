/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        chart: "400px",
      },
      height: {
        chart: "500px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
