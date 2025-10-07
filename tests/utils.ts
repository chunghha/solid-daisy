/**
 * Test utilities for Solid Daisy project
 *
 * Exports:
 * - createTestQueryClient: QueryClient configured for tests (no retries, no refetch on window focus)
 * - createDeferred: small deferred promise helper to control async timing in tests
 * - stubFetchSuccess: factory for a fetch stub that resolves with given data
 * - stubFetchDeferred: factory for a fetch stub that resolves with a deferred.Promise (useful to test loading states)
 * - stubFetchFailure: factory for a fetch stub that rejects (error path)
 *
 * These helpers are intentionally free of test-runner globals so tests can choose how to register the stub
 * (e.g. `vi.stubGlobal('fetch', stub)` or `globalThis.fetch = stub`).
 */

import { QueryClient } from '@tanstack/solid-query'

/**
 * Small Deferred helper type
 */
export type Deferred<T> = {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

/**
 * createDeferred
 *
 * Creates a deferred promise with `resolve` and `reject` handles.
 */
export function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: any) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

/**
 * createTestQueryClient
 *
 * Returns a fresh QueryClient configured for test runs:
 * - retry: 0 (don't retry failed queries in tests)
 * - refetchOnWindowFocus: false
 *
 * Use a fresh client per test to avoid cache pollution.
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  })
}

/**
 * ResponseLike - the minimal shape our components expect from `fetch`
 * We only need `json()` in the current codebase.
 */
type ResponseLike = {
  json: () => Promise<any>
}

/**
 * stubFetchSuccess
 *
 * Returns a function suitable to be used as a global `fetch` replacement that
 * resolves to an object whose `json()` resolves to `data`.
 *
 * Example usage in a test:
 * const stub = stubFetchSuccess([{ name: { official: 'X' } }])
 * vi.stubGlobal('fetch', stub)
 */
export function stubFetchSuccess(data: unknown): (...args: unknown[]) => Promise<ResponseLike> {
  return async () => {
    return {
      json: async () => data,
    }
  }
}

/**
 * stubFetchDeferred
 *
 * Returns a fetch stub that resolves to an object whose `json()` returns
 * the supplied deferred.promise. This is useful to assert loading states
 * before the test resolves the deferred.
 *
 * Example:
 * const d = createDeferred<Country[]>()
 * const stub = stubFetchDeferred(d)
 * vi.stubGlobal('fetch', stub)
 * // render → assert spinner
 * d.resolve(mockData) // now UI will update to success
 */
export function stubFetchDeferred<T>(deferred: Deferred<T>): (...args: unknown[]) => Promise<ResponseLike> {
  return async () => {
    return {
      json: async () => deferred.promise,
    }
  }
}

/**
 * stubFetchFailure
 *
 * Returns a fetch stub that rejects with the provided error. Useful to test error flows.
 *
 * Example:
 * const stub = stubFetchFailure(new Error('network'))
 * vi.stubGlobal('fetch', stub)
 */
export function stubFetchFailure(error: unknown): (...args: unknown[]) => Promise<never> {
  return async () => {
    return Promise.reject(error)
  }
}

/**
 * restoreGlobalFetch
 *
 * Small convenience to restore the platform `fetch` to its original value.
 * Tests that stubbed `globalThis.fetch` directly can call this in afterEach.
 *
 * Note: If you're using `vi.stubGlobal('fetch', ...)` prefer `vi.unstubAllGlobals()` in tests.
 */
export function restoreGlobalFetch() {
  // Only restore if we previously replaced it; otherwise leave platform as-is.
  // Keep implementation minimal to avoid coupling with test framework.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof (restoreGlobalFetch as any)._originalFetch !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.fetch = (restoreGlobalFetch as any)._originalFetch
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete (restoreGlobalFetch as any)._originalFetch
  }
}

/**
 * Optionally capture the initial fetch implementation so restoreGlobalFetch can put it back.
 * This runs on module import and is safe (idempotent).
 */
;(function captureInitialFetch() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof globalThis.fetch !== 'undefined' && typeof (restoreGlobalFetch as any)._originalFetch === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ;(restoreGlobalFetch as any)._originalFetch = globalThis.fetch
  }
})()
