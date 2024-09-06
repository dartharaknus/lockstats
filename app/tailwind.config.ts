import { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import scrollbar from 'tailwind-scrollbar';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      data: {
        on: 'state="on"',
        off: 'state="off"',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      gridTemplateColumns: {
        '2': 'repeat(auto-fill, minmax(29rem, 1fr))',
        '3': 'repeat(auto-fill, minmax(23rem, 1fr))',
        '4': 'repeat(auto-fill, minmax(17rem, 1fr))',
      },
      height: {
        '0.25': '0.0625rem',
      },
      width: {
        '0.25': '0.0625rem',
        '180': '45rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [animate, scrollbar],
};

export default config;
