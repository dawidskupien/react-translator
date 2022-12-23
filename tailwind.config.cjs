module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#6fadce',
      typography: '#ddf3ff',
      background: '#182731',
      error: '#ff1e1e',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      height: {
        '1/12': '8%',
        '10/12': '84%',
      },
      keyframes: {
        loading: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        loading: 'loading 1s ease-in-out alternate infinite',
      },
    },
  },
  plugins: [],
};
