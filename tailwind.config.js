import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */

export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: 'rgba(28, 28, 28, 0.05)',
        light: '#ffffff',
        dark: '#1E1E1E',
        darker: '#000000',
        // primary: '#FFB200',
        primary: '#000000',
        secondary: '#2A2A2A',
        success: '#4CAF50',
      },
      typography: {
        customDark: {
          css: {
            color: '#000000',
            a: { color: '#1e40af', '&:hover': { color: '#1d4ed8' } },
            strong: { color: '#000' },
            h2: { color: '#111' },
            p: { color: '#000000' },
            ul: { color: '#000000' },
            li: { marginTop: '0.25em', marginBottom: '0.25em' },
          },
        },
      },
      animation: {
        'rotate-360': 'rotate360 0.5s ease-in-out',
      },
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [typography],
};
