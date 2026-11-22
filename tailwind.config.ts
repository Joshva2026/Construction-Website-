import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#f2a900', // Signature construction amber/orange
          'primary-hover': '#d99400',
          'primary-light': '#fff8eb',
          ink: '#0f141c', // Deep steel dark
          'ink-2': '#161d28',
          'ink-3': '#222c3b',
          paper: '#f5f3ee',
          'paper-2': '#ebe8e0',
          line: '#d9d5cb',
          muted: '#64748b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
