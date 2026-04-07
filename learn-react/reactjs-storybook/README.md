# reactjs-storybook

A **React component library** (Vite library mode) with **Storybook** for local development and documentation.

## Documentation

| Resource | Description |
|----------|-------------|
| **[docs/README.md](./docs/README.md)** | Documentation index (architecture, development, API, consuming, troubleshooting). |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Library vs playground vs Storybook, dual Vite configs, publish layout. |
| [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) | Setup, workflows, adding components, lint, builds. |
| [docs/API.md](./docs/API.md) | `Button`, `Header`, `Page` props and styling notes. |
| [docs/CONSUMING.md](./docs/CONSUMING.md) | Installing in another app (npm, `file:`, link), CSS imports, bundlers. |
| [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) | Common issues and fixes. |

## Quick start

```bash
cd learn-react/reactjs-storybook
npm install
npm run dev          # Vite playground
npm run storybook    # http://localhost:6006
npm run build        # library → dist/
```

## Layout

| Path | Role |
|------|------|
| `src/lib/` | Published components (`Button`, `Header`, `Page`) and their CSS |
| `src/index.js` | Library entry (public API) |
| `src/App.jsx` | Vite playground app (consumes `./index` like any app would) |
| `src/stories/` | Storybook stories |
| `vite.config.js` | Vite app + Vitest/Storybook test integration |
| `vite.lib.config.js` | **Library** build → `dist/` |
| `docs/` | Detailed guides (see table above) |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server for the playground (`index.html`) |
| `npm run build` | **Build the library** to `dist/` (ESM + CJS + one CSS file) |
| `npm run build:playground` | Static build of the Vite app only (not the npm package) |
| `npm run storybook` | Storybook at [http://localhost:6006](http://localhost:6006) |
| `npm run build-storybook` | Static Storybook to `storybook-static/` |
| `npm run lint` | ESLint |

## Build output (`dist/`)

- `reactjs-storybook.js` — ES module
- `reactjs-storybook.cjs` — CommonJS
- `reactjs-storybook.css` — bundled styles

`react` and `react-dom` are **peer dependencies**; `prop-types` is a **dependency** of this package.

## Using the library in another project

See **[docs/CONSUMING.md](./docs/CONSUMING.md)** for `npm link`, `file:`, and CSS. Minimal example:

```jsx
import { Button, Header, Page } from 'reactjs-storybook';
import 'reactjs-storybook/style.css';
```

After `npm run build`, you can use `npm pack` to produce a tarball for local installs.

## Publishing

1. Bump `version` in `package.json`.
2. `npm run build`
3. `npm publish`

See [docs/CONSUMING.md](./docs/CONSUMING.md) and [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for registry naming and common issues. Prefer a **scoped** package name (`@org/...`) on the public npm registry if the unscoped name is taken.
