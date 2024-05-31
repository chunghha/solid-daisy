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
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
  // daisyUI config (optional)
  daisyui: {
    logs: false,
    themes: [
      {
        dawn: {
          primary: '#d7827e',
          secondary: '#286983',
          accent: '#b4637a',
          neutral: '#f2e9e1',
          'base-100': '#faf4ed',
          info: '#56949f',
          success: '#907aa9',
          warning: '#ea9d34',
          error: '#eb6f92',
          '--rounded-box': '0.25rem',
          '--rounded-btn': '0.125rem',
          '--rounded-badge': '0.125rem',
          '--animation-btn': '0',
          '--animation-input': '0',
          '--btn-focus-scale': '1',
        },
      },
      {
        rosepine: {
          primary: '#ea9a97',
          secondary: '#3e8fb0',
          accent: '#eb6f92',
          neutral: '#393552',
          'base-100': '#191724',
          info: '#9ccfd8',
          success: '#c4a7e7',
          warning: '#f6c177',
          error: '#b4637a',
          '--rounded-box': '0.25rem',
          '--rounded-btn': '0.125rem',
          '--rounded-badge': '0.125rem',
          '--animation-btn': '0',
          '--animation-input': '0',
          '--btn-focus-scale': '1',
        },
      },
    ],
  },
}
