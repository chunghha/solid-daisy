import { afterEach } from 'vitest';
import { cleanup } from '@solidjs/testing-library';

/**
 * Global Vitest setup.
 *
 * Goals:
 * 1. Ensure DOM is cleaned between tests to avoid duplicate nodes (multiple root renders).
 * 2. Provide a safe fallback for APP_VERSION during tests when Vite define is absent.
 * 3. Central place for future global resets (e.g., clearing singletons).
 *
 * Aligned with AGENTS.md:
 * - Fast, deterministic tests.
 * - Avoid cross-test state leakage.
 */

// 1. Clean up rendered Solid components after each test (prevents duplicate query matches).
afterEach(() => {
  cleanup();
});

// 2. Provide a fallback APP_VERSION if not injected by build tooling or explicitly stubbed in a test.
if (!(globalThis as any).APP_VERSION) {
  (globalThis as any).APP_VERSION = '0.0.0-test';
}

// 3. Export a hook for future global resets (stores, timers, etc.) if needed.
export function resetGlobals() {
  // Intentionally empty for now—extend as new global singletons are introduced.
  // Example placeholder:
  // resetCounter();
  // setTheme('isDark', false);
}

/**
 * NOTE:
 * To activate this setup file, ensure vitest.config.mts includes:
 * test: { setupFiles: ['./vitest.setup.ts'], ... }
 */
