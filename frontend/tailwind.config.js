/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'; // Import the Flowbite plugin

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',  // Include Flowbite's JavaScript files
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Include Flowbite React components if you're using Flowbite React
  ],
  theme: {
    extend: {
      çolors:{
        'turquoise': '#86C5D8',
      }
    },
  },
  plugins: [
    flowbitePlugin,  // Use the Flowbite plugin here
  ],
};
