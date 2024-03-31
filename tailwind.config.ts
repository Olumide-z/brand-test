import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#98A2B3',
        secondary: '#DB9E04',
        white: '#FFF',
        black: '#000'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
        open: ['"Open Sans"', 'sans-serif'], 
        lato: ["Lato", 'sans-serif'],
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        popins: ['Poppins', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
