export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        simba: {
          DEFAULT: '#D9531E',
          dark: '#B5410F',
          soft: '#FDEEE5',
          peach: '#F2A06B',
          deep: '#A5141F',
        },
        cream: '#F1EADF',
        ink: {
          DEFAULT: '#1B1714',
          soft: '#3A332D',
        },
        canvas: '#FAF7F2',
        sand: '#F2EDE4',
        line: '#E8E1D6',
        muted: '#6E655B',
        gold: {
          DEFAULT: '#9A6B12',
          bright: '#E3B34C',
          soft: '#F7EDD6',
          light: '#E9D6A8',
        },
        platinum: {
          DEFAULT: '#4F5866',
          soft: '#E9ECF0',
        },
        leaf: {
          DEFAULT: '#1E7048',
          soft: '#E3F1E8',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      // Executive deck type scale, drawn on a 1920px-wide slide (px ÷ 19.2 = vw).
      fontSize: {
        'deck-hero': '6.25vw', // 120px — hero numbers, cover title
        'deck-h': '3.75vw', // 72px — slide headlines
        'deck-value': '2.29vw', // 44px — card values
        'deck-body': '1.67vw', // 32px — card titles, body
        'deck-label': '1.25vw', // 24px — labels, chips, footers
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,23,20,0.04), 0 6px 20px rgba(27,23,20,0.06)',
        lift: '0 2px 4px rgba(27,23,20,0.06), 0 16px 40px rgba(27,23,20,0.12)',
        device: '0 30px 80px rgba(27,23,20,0.22), 0 8px 20px rgba(27,23,20,0.10)',
      },
    },
  },
}
