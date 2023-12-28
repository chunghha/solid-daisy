/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  test: {
    environment: 'jsdom',
    server: {
      deps: {
        inline: [/solid-js/],
      },
    },
  },
  plugins: [solid()],
  resolve: {
    conditions: ['development', 'browser'],
  },
})
