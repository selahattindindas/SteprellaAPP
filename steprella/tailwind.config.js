/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
    
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {

    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // veya seçtiğiniz font
      },

    },
  },
  plugins: [
    require('tailwindcss-gradients'),
    require('autoprefixer'),
  ],
}