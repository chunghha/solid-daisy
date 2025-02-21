module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extends: {},
    fontFamily: {
      'space-grotesk': ['Space Grotesk', 'sans-serif'],
      'montagu-slab': ['Montagu Slab', 'serif'],
      'fira-mono': ['fira-mono'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
