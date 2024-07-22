/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '360px',
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
          '2xl': "1320px",
        },
      },
      colors: {
        primary: '#f0e8e8',
        red: '#F24949',
        secondaryRed: '#e94141',
        yellow: '#FFC90D',
        yellowSecondary: '#FFCE25',
      },
    },
  },
  plugins: [],
}
