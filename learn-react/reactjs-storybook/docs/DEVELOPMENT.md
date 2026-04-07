# Development

## Prerequisites

- **Node.js** (LTS recommended). Use a version compatible with Vite 8 and Storybook 10.
- **npm** (comes with Node).

## First-time setup

```bash
cd learn-react/reactjs-storybook
npm install
```

## Common workflows

### Run the Vite playground

```bash
npm run dev
```

Opens the default Vite dev server (see terminal for the URL, often `http://localhost:5173`). `App.jsx` imports components from `./index` to verify the library entry locally.

### Run Storybook

```bash
npm run storybook
```

Defaults to [http://localhost:6006](http://localhost:6006). Use this for **component documentation**, visual states, and interaction tests.

### Build the library

```bash
npm run build
```

Writes `dist/`. Run this before `npm pack`, `npm publish`, or linking into another project.

### Lint

```bash
npm run lint
```

### Storybook interaction tests (Vitest + browser)

The project is wired for **Storybook’s Vitest integration** (Playwright/Chromium) via `vite.config.js` `test` projects. Exact commands depend on how you invoke Vitest (e.g. `npx vitest` with the Storybook project). If you add or change stories, see the [Storybook Vitest addon docs](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon).

## Adding a new component

1. **Implement** the component under `src/lib/` (e.g. `MyWidget.jsx` + `my-widget.css`).
2. **Export** it from `src/index.js`:

   ```js
   export { MyWidget } from './lib/MyWidget';
   ```

3. **Add a story** in `src/stories/` (e.g. `MyWidget.stories.js`) that imports from `../index`:

   ```js
   import { MyWidget } from '../index';
   ```

4. **Rebuild** the library (`npm run build`) and confirm Storybook still builds (`npm run build-storybook`).

Keeping stories importing from `../index` ensures the public API stays consistent.

## Styling conventions

- Co-locate CSS with the component under `src/lib/`.
- Class names in the sample components use a `storybook-*` prefix; you can rename to your design system as the library evolves.

## Previewing the production playground build

```bash
npm run build:playground
npm run preview
```

Useful to verify the Vite app build, separate from the library bundle.
