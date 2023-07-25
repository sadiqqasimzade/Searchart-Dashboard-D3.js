const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
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
};
