import solid from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 70,
        statements: 70,
        functions: 70,
        branches: 60,
      },
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/routeTree.gen.ts'],
    },
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
