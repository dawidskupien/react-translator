module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#393939',
      secondary: '#FFFFFF',
      typography: '#393939',
      background: '#F0EDE6',
      error: '#E40000',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
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
    screens: {
      md: '830px',
      sm: '350px',
    },
  },
  plugins: [],
};
