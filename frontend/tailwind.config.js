/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFF0',
        surface: '#FFFFFF',
        primary: '#FF90E8',
        primaryHover: '#FF70E0',
        secondary: '#FFC900',
        accent: '#23A094',
        textMain: '#000000',
        textMuted: '#4B5563',
        borderMain: '#000000',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        head: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'neo-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neo-active': '0px 0px 0px 0px rgba(0,0,0,1)',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
