/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            maxWidth: 'none',
            h1: {
              color: theme('colors.white'),
              fontFamily: theme('fontFamily.serif'),
            },
            h2: {
              color: theme('colors.white'),
              fontFamily: theme('fontFamily.serif'),
            },
            h3: {
              color: theme('colors.white'),
              fontFamily: theme('fontFamily.serif'),
            },
            strong: {
              color: theme('colors.white'),
            },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.gray.800'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            'ol > li::before': {
              color: theme('colors.gray.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.400'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.700'),
              backgroundColor: theme('colors.gray.800/50'),
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            thead: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.gray.700'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
            },
            figure: {
              margin: '2rem 0',
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
              fontSize: '0.875rem',
              textAlign: 'center',
              marginTop: '0.5rem',
            },
            pre: {
              backgroundColor: theme('colors.gray.800/50'),
              border: `1px solid ${theme('colors.gray.700')}`,
              borderRadius: '0.5rem',
            },
            table: {
              width: '100%',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderCollapse: 'separate',
              borderSpacing: 0,
              borderRadius: '0.5rem',
              overflow: 'hidden',
              border: `1px solid ${theme('colors.gray.700')}`,
            },
            'th, td': {
              padding: '1rem',
              borderBottom: `1px solid ${theme('colors.gray.700')}`,
              borderRight: `1px solid ${theme('colors.gray.700')}`,
            },
            'th:last-child, td:last-child': {
              borderRight: 'none',
            },
            'tr:last-child td': {
              borderBottom: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};