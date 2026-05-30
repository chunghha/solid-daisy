import path from 'node:path'
import solid from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

const solidAliases = {
  '@solidjs/testing-library': path.resolve(import.meta.dirname, 'tests/lib/solid-testing-library.ts'),
  'solid-js/web': '@solidjs/web',
  'solid-js/store': 'solid-js',
}

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
        inline: [/solid-js/, /@solidjs\/web/],
      },
    },
  },
  plugins: [solid()],
  resolve: {
    alias: solidAliases,
    conditions: ['development', 'browser'],
  },
})
