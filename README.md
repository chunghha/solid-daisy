# solid-daisy

A SolidJS demo application built with Vite, TanStack Router, Tailwind CSS, DaisyUI, TanStack Query, and Vitest.

The app includes a themed landing page, route-based navigation, a responsive breakpoint display, a theme switcher, and a country browser powered by the REST Countries API.

## Requirements

- Node.js `>=24.14.1 <25.0.0`
- pnpm `>=11.0.8 <12.0.0`

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server. |
| `pnpm start` | Alias for `pnpm dev`. |
| `pnpm build` | Generate the TanStack route tree and build for production. |
| `pnpm serve` | Preview the production build locally. |
| `pnpm generate-routes` | Generate `src/routeTree.gen.ts` from files in `src/routes`. |
| `pnpm watch-routes` | Watch route files and regenerate the route tree during development. |
| `pnpm test` | Run the Vitest test suite. |
| `pnpm test:cov` | Run tests with coverage reporting. |
| `pnpm check` | Run Biome checks and apply safe fixes under `src`. |
| `pnpm check:unsafe` | Run Biome checks with unsafe fixes under `src`. |
| `pnpm check:all` | Run Biome checks and coverage tests. |
| `pnpm type-check` | Run TypeScript type checking. |

## Project Structure

```text
src/
  components/      Reusable Solid components and icons
  lib/             Shared utilities
  models/          TypeScript domain types
  pages/           Page-level UI modules
  routes/          TanStack Router route files
  services/        API and data-fetching boundaries
  stores/          Shared Solid stores
  routeTree.gen.ts Generated TanStack route tree
```

## Routes

- `/` renders the home page.
- `/about` renders project information, breakpoint details, and the app version.
- `/country` renders a searchable, filterable country board.

## Quality Gate

Before committing, run:

```bash
pnpm check:all
pnpm type-check
```

## Deployment

Build the app with:

```bash
pnpm build
```

Deploy the generated `dist` directory to any static hosting provider.
