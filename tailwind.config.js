/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#353345',
        'background': '#e6e6e6',
        'primary': '#897064',
        'secondary': '#bfbed7',
        'accent': '#8b8aa0',
        
       },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

