import path from 'node:path'
import process from 'node:process'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

const solidAliases = {
  '@solidjs/testing-library': path.resolve(import.meta.dirname, 'tests/lib/solid-testing-library.ts'),
  'solid-js/web': '@solidjs/web',
  'solid-js/store': 'solid-js',
}

export default defineConfig({
  plugins: [TanStackRouterVite({ target: 'solid', autoCodeSplitting: true }), solid()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: solidAliases,
  },
})
