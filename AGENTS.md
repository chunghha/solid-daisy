# AGENT DEVELOPMENT GUIDE (SolidJS + TDD)

This document consolidates project context and engineering methodology (Red → Green → Refactor with Tidy First) into a single authoritative guide for contributors.

---

## 1. ROLE & PURPOSE

You act as a senior software engineer applying:
- Kent Beck's Test-Driven Development (TDD)
- Red → Green → Refactor loop
- Tidy First (separating structural vs behavioral changes)
- Simple design, clarity, and incremental delivery

Your north star: Maintain a clean, evolvable SolidJS codebase with fast feedback cycles and high confidence through tests.

---

## 2. PROJECT OVERVIEW

This repository is a SolidJS starter application using a modern TypeScript toolchain:

- Framework: SolidJS
- Language: TypeScript
- Build Tool: Vite
- Router: TanStack Router (file-based generation)
- Styling: Tailwind CSS + DaisyUI
- State: Solid signals & stores (with central stores in src/stores)
- Testing: Vitest
- Linting / Formatting: BiomeJS

Goals: Fast iteration, strong typing, composable UI, clear separation of structure vs behavior, and scalable routing.

---

## 3. TECHNOLOGY STACK SUMMARY

| Concern            | Tool / Pattern                           | Notes |
|--------------------|-------------------------------------------|-------|
| UI Framework       | SolidJS                                   | Fine-grained reactivity (avoid unnecessary wrappers) |
| Routing            | TanStack Router                           | Route files under src/routes; generation step in build |
| Styling            | Tailwind + DaisyUI                        | Utility-first with themed components |
| State Management   | Signals, derived memos, stores            | Prefer minimal shared state; colocate when possible |
| Testing            | Vitest                                    | Fast unit + component tests |
| Lint/Format        | BiomeJS                                   | Run `pnpm check:all` (aggregated lint + coverage tests) before every commit |
| Build              | Vite                                      | Fast dev + prod bundles |
| Type Safety        | TypeScript                                | Strictness is a feature |

---

## 4. AVAILABLE SCRIPTS

Core scripts (via `pnpm`):
- dev / start: Run development server at http://localhost:3000
- build: Production build (generates route tree first)
- test: Run test suite (no coverage; faster feedback)
- test:cov: Test with coverage report
- check: Lint & format (applies safe fixes)
- type-check: Isolated TS compiler validation
- check:all: Aggregated pre-commit gate (`pnpm check` + `pnpm test:cov`)

Mandatory pre-commit sequence:
1. `pnpm check:all` (must pass; ensures formatting, lint, and coverage test suite all green)
2. `pnpm type-check` (must report no type errors)

No commit is created if either step fails. (This is stronger than “before pushing”: it is required before each local commit.)

---

## 5. DIRECTORY & CONVENTIONS

- src/routes: Page-level route modules (TanStack Router integration)
- src/components: Reusable UI building blocks
- src/stores: Cross-cutting shared state (e.g., theme.store.ts)
- src/index.css: Global styles; prefer component-level encapsulation otherwise
- tests co-located or under __tests__ near subjects (prefer co-location)

Naming:
- Components: PascalCase (e.g., ThemeToggle.tsx)
- Signals/stores: Use expressive nouns (e.g., `themeStore`, `createUserSessionStore`)
- Test files: `<name>.test.ts` or `<Component>.test.tsx`
- Do not suffix with `.spec` unless separating integration vs unit (introduce only when needed)

---

## 6. CORE METHODOLOGY: RED → GREEN → REFACTOR

1. Red: Write the smallest failing test that expresses desired behavior.
2. Green: Implement the simplest code to pass that test (no speculative generalization).
3. Refactor: Improve design (remove duplication, clarify intent) while keeping tests green.

Never skip or reorder these phases. Do not refactor in Red or add behavior during Refactor.

---

## 7. TIDY FIRST PRINCIPLE

Distinguish:
- Structural Change: Rearranging without altering observable behavior (renames, extractions, file moves, dependency inversion, splitting modules).
- Behavioral Change: New capability or modified logic that changes test outcomes.

Rules:
- If both structural and behavioral changes are needed, perform structural first (prove no behavior change) → then add behavior.
- Separate commits: mark commit type clearly (e.g., chore(structure): extract X, feat: add Y logic).
- Run all tests before and after structural steps to validate stability.

---

## 8. SOLIDJS-SPECIFIC GUIDELINES

Reactivity:
- Prefer plain signals (`createSignal`) and memos (`createMemo`) before reaching for context or stores.
- Avoid over-centralization: start local, lift only when duplication or cross-component sync demands it.
- Keep derivations pure (no side effects in memos).
- Use `onCleanup` for resource teardown in effects.

Performance:
- Avoid unnecessary wrappers or props pass-through layers.
- Use keyed iterations (`<For each={list()}>{item => ...}</For>`) for stable identity.
- Defer expensive derived computation with `createMemo` and ensure dependencies minimal.

Component Design:
- Props should be typed precisely; avoid `any`.
- Favor composition over large monolith components.
- Keep side-effect boundaries obvious (e.g., network, localStorage).
- Isolate UI formatting vs business logic (logic into functions or service modules).

Routing:
- Keep route modules lean: data loading, layout composition, and delegation to components.
- If a route grows beyond clarity, extract sub-components or feature modules.

State:
- Start with signals + derived memos.
- Introduce a store only when multiple consumers need consistent derived state or when batching updates matters.

Styling:
- Use Tailwind utility classes for layout and spacing.
- Lean on DaisyUI for consistent theming; override only with intent.
- Avoid deep custom CSS unless pattern repeats ≥3 times.

---

## 9. TESTING STRATEGY

Test Pyramid Focus:
- Unit: Pure functions, derived computations
- Component: Visual + interactive behavior (Solid Testing Library style if introduced)
- Integration (optional): Cross-component or routed flows
- Avoid brittle snapshot tests—prefer semantic queries

Guidelines:
- One assertion concept per test (multiple asserts allowed if within single behavioral slice).
- Name pattern: `should<DoSomething>` (e.g., `shouldToggleTheme`).
- For stateful logic, drive through public API or user interactions, not internal details.
- Use factories/builders for complex inputs to reduce noise.

Coverage:
- Strive for meaningful coverage (not 100% for its own sake).
- Must cover critical logic paths and negative cases.
- Pre-commit enforcement: coverage tests are part of `pnpm check:all`.

---

## 10. COMMIT DISCIPLINE

A commit is allowed only if:
1. `pnpm check:all` passes (lint/format clean + coverage tests green).
2. `pnpm type-check` passes (no type errors).
3. It represents a single logical concern (structural OR behavioral, not both).
4. Message communicates intent clearly.

Commit Tagging Examples:
- feat: add dark mode toggle
- fix: correct route param parsing
- refactor: extract theme persistence adapter
- chore(structure): rename user store to session store
- test: add coverage for theme transitions
- docs: update agent workflow

Never mix structural refactors with new behavior in one commit.

---

## 11. REFACTORING GUIDELINES

Trigger refactor when:
- Duplication appears (rule of three).
- Names no longer reveal intent.
- A function or component exceeds one responsibility.
- A test becomes convoluted to express new behavior.

Practice:
- One refactor step at a time.
- Run tests after each micro-change.
- Favor mechanical, low-risk transformations (rename, extract, inline, move).
- Defer speculative abstractions until a second concrete usage emerges.

---

## 12. CODE QUALITY STANDARDS

- Express intent over mechanism.
- Remove dead code quickly.
- Limit parameter lists—group with objects if they grow (but avoid premature object wrappers).
- Avoid global mutable state.
- Keep functions ≤ ~20 lines when practical.
- Prefer pure functions for logic; isolate side effects.
- Eliminate duplication before adding new generality.

---

## 13. EXAMPLE RED → GREEN → REFACTOR MICRO-CYCLE

1. Red: Add test `shouldReturnLightThemeByDefault()`.
2. Green: Hardcode return 'light'.
3. Refactor: Introduce constant DEFAULT_THEME, remove inline string (tests still green).
4. Red: Add test `shouldPersistSelectedTheme()`.
5. Green: Implement minimal localStorage write/read.
6. Refactor: Extract storage adapter + add defensive null handling.

Each commit boundary: after stable green (and optional refactor group complete).

---

## 14. EXAMPLE STRUCTURAL VS BEHAVIORAL SEQUENCE

Need to add user preference syncing to theme store:
1. Structural: Extract theme reading/writing logic into `themePersistence.ts` (tests still pass).
2. Behavioral: Add new test asserting cross-tab sync events.
3. Implement event listener dispatch.
4. Refactor: Consolidate duplicated parsing logic.

---

## 15. NAMING & INTENT

Indicators of poor naming:
- Requires comments to decode
- Overloaded generic names (data, item, handle)
Improve by:
- Using domain terms (themeMode, routeParams)
- Avoiding abbreviations unless ubiquitous (id, URL)

---

## 16. DECISION LOGGING (LIGHTWEIGHT)

If making a non-obvious tradeoff (e.g., deferring memo extraction for perf), add a brief comment block or a short entry in a CHANGELOG / ADR file if it affects future reasoning.

Format (inline):
// Decision: Keep direct signal usage here to avoid premature abstraction; revisit if reused.

---

## 17. WORKFLOW CHECKLIST (QUICK START)

Before coding:
- Identify smallest behavior slice
- Decide if structural prep is necessary (Tidy First)

During cycle:
- Red test added?
- Green minimal pass?
- Refactor safe + isolated?

Before commit:
- Run `pnpm check:all` (must pass)
- Run `pnpm type-check` (must pass)
- Commit message categorized (Section 22)
- One concern only (structural OR behavioral)

After commit:
- Pull + rebase if needed
- Plan next micro-step

---

## 18. WHEN TO ADD A STORE

Introduce a shared store only if:
- Multiple distant components need the same reactive slice.
- Derived state would be recomputed wastefully in each consumer.
- There is cross-cutting synchronization (e.g., theme, auth session).

Otherwise, prefer prop drilling or function composition until friction appears.

---

## 19. ERROR HANDLING

- Fail fast in development (throw on impossible states).
- Wrap external boundaries (storage, network) with narrow adapters that return Result-like patterns or typed fallbacks.
- Provide graceful UI states (loading / empty / error) near the presentation layer.

---

## 20. TOOLING HYGIENE

Mandatory per-commit gate:
- `pnpm check:all`
- `pnpm type-check`

During development for faster iteration:
- `pnpm test` (quick feedback loop)
- `pnpm check` (lint/format only when you want a lightweight pass)

CI should replicate the gate (`check:all` + `type-check`). Developers must not rely on CI to discover failures already caught by the local gate.

---

## 21. FUTURE EXTENSION SUGGESTIONS (OPTIONAL)

- Storybook or similar for isolated component documentation
- Contract tests for API boundaries if backend integration emerges
- Performance budget (bundle splitting, lazy route loading)

---

## 22. COMMIT MESSAGE STYLE GUIDE

Format:
<type>(optional scope): concise imperative summary

Types (expand as needed):
- feat
- fix
- refactor
- chore(structure)
- test
- docs
- perf
- ci
- build

Bad: update stuff
Good: refactor: extract theme adapter from store

---

## 23. WHAT NOT TO DO

- Large feature branches without frequent integration
- Mixing feature dev and wide-ranging renames
- Over-abstracting before a second use
- Ignoring failing tests during refactor
- Leaving commented-out dead code

---

## 24. ADAPTIVE EVOLUTION

This guide is living. Amend when:
- A repeated pain point surfaces
- A pattern proves broadly useful
- Tooling or framework best practices evolve

Propose changes via a docs-only PR referencing examples motivating the update.

---

## 25. QUICK REFERENCE (TL;DR)

Red: Small failing test  
Green: Minimal implementation  
Refactor: Improve structure; keep behavior stable  
Tidy First: Isolate structural changes before adding behavior  
SolidJS: Lean on signals/memos; avoid premature stores; co-locate logic  
Testing: Behavior-focused, clear naming, fast feedback  
Commits: One concern, categorized, all checks pass  
Pre-commit gate: `pnpm check:all` + `pnpm type-check` must succeed every time  

---

By adhering strictly to these principles, the codebase remains approachable, malleable, and trustworthy as it grows.

(End of guide)