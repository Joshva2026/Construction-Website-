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
          primary: '#F59E0B', // Vivid Construction Safety Gold / Amber
          'primary-hover': '#D97706',
          'primary-light': '#FEF3C7',
          'primary-dark': '#B45309',
          ink: '#0F172A', // High-contrast structural slate
          'ink-2': '#1E293B',
          'ink-3': '#334155',
          paper: '#F8FAFC', // Clean modern architectural canvas
          'paper-2': '#F1F5F9',
          line: '#E2E8F0',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'construction': '0 4px 20px -2px rgba(15, 23, 42, 0.12), 0 2px 6px -1px rgba(245, 158, 11, 0.15)',
        'construction-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.2), 0 4px 12px -2px rgba(245, 158, 11, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
