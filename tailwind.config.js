/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta original da Prime Estofados (preservada)
        teal: {
          DEFAULT: '#3aaa9e',
          mid: '#2d9088',
          dark: '#1e4a5c',
          deep: '#0d2d28',
          light: '#e4f6f4',
        },
        sky: {
          DEFAULT: '#e8f5fa',
          mid: '#c8e8f2',
        },
        navy: '#1a3a4a',
        ink: '#34322d',
        muted: '#858481',
        whatsapp: '#25d366',
        canvas: '#f5fbfd',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        teal: '0 4px 24px rgba(58,170,158,0.20), 0 1px 4px rgba(58,170,158,0.12)',
        card: '0 2px 12px rgba(26,58,74,0.08), 0 1px 3px rgba(26,58,74,0.05)',
        'card-hover': '0 8px 32px rgba(64,176,164,0.15), 0 2px 8px rgba(3,68,93,0.08)',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'float-y': 'float-y 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
