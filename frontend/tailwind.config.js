/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "formBg": "#1e1e1e",
        "submitBtn": "#8e05c2",
        "subHover": "#b700ff",
        "newAcc": "#b907ff",
        "inputBg": "#121212",
        "inputBr": "#333",
        "gradientStart": "#4c1d95", // Equivalent to purple-900
        "gradientEnd": "#000000",  // Black
      },
      boxShadow: {
        custom: "4px 0px 7px rgb(236, 196, 62)",
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(to bottom right, #4c1d95, #000000)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
