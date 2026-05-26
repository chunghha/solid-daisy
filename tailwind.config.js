import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extends: {},
    fontFamily: {
      'space-grotesk': ['Space Grotesk', 'sans-serif'],
      'montagu-slab': ['Montagu Slab', 'serif'],
      'fira-mono': ['fira-mono'],
    },
  },
  plugins: [typography, forms],
}
