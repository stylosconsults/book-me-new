const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gray-1000': '#050505',
        gray: colors.neutral,
        'co-green': '#58c17c',
        'co-black': '#23262F',
        'co-gray': '#e7e8ec',
        'co-blue': '#0142eb',
      },
      boxShadow: {
        'co-search': '0px 40px 64px -32px rgb(15 15 15 / 10%)',
      },
      backgroundImage: {
        'co-search':
          'linear-gradient(83.59deg, #FCFCFD 36.52%, rgba(252, 252, 253, 0.83) 98.8%)',
      },
    },
    fontFamily: {
      sans: ['DM Sans', ...fontFamily.sans],
    },
  },
  plugins: [],
}
