/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
          '50': '#fef2f2',
          '100': '#fee2e2',
          '200': '#fecaca',
          '300': '#fca5a5',
          '400': '#f87171',
          '500': '#ef4444',
          '600': '#dc2626',
          '700': '#b91c1c',
          '800': '#991b1b',
          '900': '#7f1d1d',
          '950': '#450a0a',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-20deg)' },
          '100%': { transform: 'translateX(300%) skewX(-20deg)' },
        },
        'loading-bar': {
          '0%': { transform: 'scaleX(0)' },
          '49.99%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scaleX(1) translateX(0)' },
          '100%': { transform: 'scaleX(1) translateX(100%)' },
        },
        'loading-shine': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'loading-bar': 'loading-bar 2s cubic-bezier(0.85, 0, 0.15, 1) infinite',
        'loading-shine': 'loading-shine 2s linear infinite',
        pulse: 'pulse 1.5s ease-in-out infinite',
      },
      backgroundSize: {
        'size-200': '200% 100%',
      },
    },
  },
  plugins: [],
}; 