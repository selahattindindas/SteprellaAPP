/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        'menu-gradient': 'linear-gradient(to bottom right, #7668ef, #9d96f5)',
        'menu-gradient-hover': 'linear-gradient(135deg, rgba(119, 110, 239, 0.1) 0%, rgba(156, 150, 246, 0.1) 100%)',
      },
      colors: {
        admin: {
          custom: '#5f4be8',
          bg: '#f4f7fb',
        },
        customGray: '#29343d',
        customBackground: '#f4f7fb',
        teal: '#526b7a',
        ui:{
          bg: '#ed5221',
          customGray: '#666565',
          black: '#1c1e25',
          slateGray: '#525456',
          lightGray: '#f7f7f7',
        }
      },
      screens: {
        'xl2': '1600px',
        'max-xl2': {'max': '1599px'},
        'max-custom': {'max': '1300px'},
        'max-xl': {'max': '550px'},
        'min-xl': {'min': '550px'},
        'max-400': {'max': '400px'},
        'max-450': {'max': '450px'},
        'max-md': { 'max': '768px' },
      },
    },
  },
  
  plugins: [
    require('tailwindcss-gradients'),
    require('autoprefixer'),
  ],
}