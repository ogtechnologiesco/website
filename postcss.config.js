// import tailwind from 'tailwindcss'
// import autoprefixer from 'autoprefixer'
// import tailwindConfig from './src/css/tailwind.config.js'

// export default {
//   plugins: [tailwind(tailwindConfig), autoprefixer],
// }
// Convert ES Module imports to CommonJS require
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// Since require cannot import JSON or JS modules in the same way as ES Module import,
// ensure that your Tailwind config is appropriately exported for CommonJS.
const tailwindConfig = require('./src/css/tailwind.config.js');

// Exporting as a CommonJS module
module.exports = {
  plugins: [
    tailwind(tailwindConfig),
    autoprefixer
  ],
};