/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {
        borderRadius: {
          'custom-large': '2.5rem',
        },
        screens: {
          landscape: { raw: '(orientation: landscape)' },
        },
        colors: {
          customBlue: '#0052A4', // 기본 색상
          lineColors: {
            '2호선': '#00A84D',
            '3호선': '#EF7C1C',
            '4호선': '#00A5DE',
            '5호선': '#996CAC',
            '6호선': '#CD7C2F',
            '7호선': '#747F00',
            '8호선': '#E6186C',
          },
        },
      },
    },
    variants: {},
    plugins: [],
  };