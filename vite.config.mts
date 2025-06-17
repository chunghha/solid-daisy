import process from 'node:process'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

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
})
