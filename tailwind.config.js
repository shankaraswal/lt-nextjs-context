/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        maroon: {
          '50': '#fdf2f4',
          '100': '#fce7eb',
          '200': '#f8d0d7',
          '300': '#f2a9b8',
          '400': '#e97792',
          '500': '#db4d70',
          '600': '#c52b50',
          '700': '#a62141',
          '800': '#8a1e38',
          '900': '#741c32',
          '950': '#410b18',
        },
      },
    },
  },
  plugins: [],
}; 