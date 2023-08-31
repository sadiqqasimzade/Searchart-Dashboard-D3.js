/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        chartCardHeaderText: '#A7B4CA',
        chartCardHeader: '#0D1F3D',
        chartCardInner: '#051124',
        chartTableRow: '#152134',
        darkbg: '#051124',
        selectInner: '#293F64',
        scroll:"#4A628A",
        lightTableText:'#727272',
        lightChartHead:'#EDEDED',
        headLink:'#0C1E3A',
        darkHeadLinkBorder:'#283B5A',
      }
    }
  },
  plugins: [],
}
