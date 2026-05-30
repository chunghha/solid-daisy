# 0001 — Migrate to SolidJS 2.0.0-beta.14

**Date:** 2026-05-29
**Status:** Accepted
**Commit:** f72810c

---

## Context

SolidJS 2.0 introduces a new reactivity engine (`@solidjs/signals`), a separate rendering package (`@solidjs/web`), draft-first store mutations, and microtask-batched updates. The ecosystem (TanStack Router, TanStack Query, vite-plugin-solid) has published matching beta packages. Staying on v1 would mean falling behind on fixes and eventually facing a larger, riskier migration.

## Decision

Migrate the entire project to SolidJS 2.0.0-beta.14 (the current `next` tag on npm) in a single coordinated change, accepting the trade-off of depending on pre-release packages for the benefit of early adoption and a smaller incremental delta as the API stabilises toward a stable release.

## Key Changes

| Area | Before (v1) | After (v2) |
|------|-------------|------------|
| Rendering entry | `solid-js/web` | `@solidjs/web` |
| Store mutations | Path-based setters (`setStore('key', fn)`) | Draft-first callbacks (`setStore(s => { s.key = v })`) |
| Cleanup in effects | `onCleanup(fn)` inside effect body | `onSettled(() => { ...; return cleanup })` |
| Class binding | `classList={{ cls: bool }}` | `class={['static', { cls: bool }]}` |
| JSX transform | `jsxImportSource: "solid-js"` | `jsxImportSource: "@solidjs/web"` |
| Update batching | Synchronous | Microtask-batched (requires `flush()` in tests) |

## Ecosystem Workarounds

1. **`tests/lib/solid-testing-library.ts`** — Local shim because `@solidjs/testing-library@1.0.0-beta` is not yet published to npm. Remove once the official package ships.
2. **`src/lib/media-query.ts`** — Replaces `@solid-primitives/media` which uses the removed `getListener` internal API. Can be replaced when solid-primitives publishes a v2-compatible release.
3. **DaisyUI loading spinner** — Replaces `solid-spinner` which depends on removed `mergeProps` behaviour.
4. **Vite aliases** (`solid-js/web` -> `@solidjs/web`, `solid-js/store` -> `solid-js`) — Allows third-party packages still importing old paths to resolve correctly. Remove when upstream libraries update their imports.

## Risks

- Beta API may change before stable. Mitigation: pinned exact versions, small codebase, comprehensive test suite (40 tests).
- Third-party primitives may lag. Mitigation: local replacements are minimal and well-isolated.
- `flush()` in tests is a new requirement that could be forgotten. Mitigation: the `click()` test helper wraps it, and CI enforces all tests pass.

## Verification

```sh
pnpm check:all && pnpm type-check   # all green
pnpm dev                             # manual smoke test at localhost:3000
```

## References

- [Solid 2.0 MIGRATION.md](https://github.com/solidjs/solid/blob/next/documentation/solid-2.0/MIGRATION.md)
- [solid-js@2.0.0-beta.14 on npm](https://www.npmjs.com/package/solid-js/v/2.0.0-beta.14)
