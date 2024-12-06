module.exports = {
  content: [
    "./src/App.js",
  ],
  theme: {
    extend: {
      animation: {
        scan: 'scan 1.5s infinite linear',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
