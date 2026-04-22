import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-title)', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // WebsUp brand (Stitch design)
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#493ee5', // primary
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        'ambient': '0 20px 50px rgba(9, 29, 45, 0.05)',
        'card-hover': '0 20px 50px rgba(73, 62, 229, 0.12)',
        'glass': '0 8px 32px rgba(9, 29, 45, 0.08)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #493ee5 0%, #502cfb 100%)',
      },
    },
  },
  plugins: [],
}

export default config
