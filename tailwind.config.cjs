// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
};

module.exports = config;
