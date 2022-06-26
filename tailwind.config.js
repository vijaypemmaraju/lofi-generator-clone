/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#3b82f6',

          secondary: '#D926A9',

          accent: '#1FB2A6',

          neutral: '#111827',

          'base-100': '#343446',

          info: '#3ABFF8',

          success: '#36D399',

          warning: '#FBBD23',

          error: '#F87272',
        },
      },
    ],
  },
  // eslint-disable-next-line
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
