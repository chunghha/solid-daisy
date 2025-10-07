/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		coverage: {
			reporter: ['text', 'lcov'],
			lines: 70,
			statements: 70,
			functions: 70,
			branches: 60,
			include: ['src/**/*.ts', 'src/**/*.tsx'],
			exclude: ['src/routeTree.gen.ts']
		},
		server: {
			deps: {
				inline: [/solid-js/]
			}
		}
	},
	plugins: [solid()],
	resolve: {
		conditions: ['development', 'browser']
	}
});
