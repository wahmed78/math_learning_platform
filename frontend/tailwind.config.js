/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#4F46E5',
            dark: '#4338CA',
            light: '#818CF8'
          },
          secondary: {
            DEFAULT: '#06B6D4',
            dark: '#0891B2',
            light: '#67E8F9'
          },
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          background: '#F9FAFB'
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '2rem',
        },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'bounce-slow': 'bounce 3s infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        boxShadow: {
          'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        }
      },
    },
    plugins: [],
    darkMode: 'class',
    future: {
      hoverOnlyWhenSupported: true,
    },
    variants: {
      extend: {
        opacity: ['disabled'],
        cursor: ['disabled'],
        backgroundColor: ['active', 'disabled'],
        borderColor: ['active', 'disabled'],
        textColor: ['active', 'disabled'],
      },
    },
  }