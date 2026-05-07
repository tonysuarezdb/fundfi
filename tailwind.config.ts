import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fundfi: {
          navy: '#0D1B2A',
          dark: '#1B263B',
          teal: '#18B7A0',
          bg: '#F8FAFC',
          border: '#E2E8F0',
          card: '#FFFFFF',
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#DC2626',
          textPrimary: '#0D1B2A',
          textSecondary: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
