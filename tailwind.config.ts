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
        // WebsUp brand — oranje is de enige accentkleur
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // primary accent
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Dark section helpers (hero, CTA, dark backgrounds)
        ink: {
          DEFAULT: '#0A0F1A',
          surface: '#111827',
          'surface-2': '#1F2937',
        },
      },
      boxShadow: {
        'ambient': '0 20px 50px rgba(9, 29, 45, 0.05)',
        'card-hover': '0 20px 50px rgba(249, 115, 22, 0.14)',
        'glass': '0 8px 32px rgba(9, 29, 45, 0.08)',
        'orange-glow': '0 0 80px rgba(249, 115, 22, 0.18)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
      },
    },
  },
  plugins: [],
}

export default config
