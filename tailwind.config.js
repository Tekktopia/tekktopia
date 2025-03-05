/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        purpleGradient:
          'linear-gradient(139.95deg, #766BF8 10.54%, #453F92 84.76%)',
        grayGradient:
          'linear-gradient(133.11deg, #1B293B 17.24%, #4A70A1 99.16%)',
        greenGradient:
          'linear-gradient(113.62deg, #1D925D 19.8%, #092C1C 95.33%)',
        blueGradient:
          'linear-gradient(175.05deg, #2B64F8 3.98%, #193B92 91.68%)',
        brownGradient:
          'linear-gradient(313.11deg, #3B2C1B 0.84%, #A1784A 82.76%)',
        // 'qualityAssuranceBg': 'url("./src/assets/images/qualityAssuranceBg.png")'
      },
    },
  },
  plugins: [],
};
