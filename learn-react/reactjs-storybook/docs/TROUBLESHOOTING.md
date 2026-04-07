# Troubleshooting

## `Cannot find module 'reactjs-storybook'` or empty package

- Run **`npm run build`** in `learn-react/reactjs-storybook` so `dist/` exists.
- For `file:`/`npm link` installs, reinstall the consumer after rebuilding (`npm install` in the consumer).

## Styles missing in the consumer app

- Add **`import 'reactjs-storybook/style.css'`** (or the path your bundler resolves) in a file that runs on load (e.g. app entry or layout).
- Confirm your bundler is configured to process **CSS** from `node_modules`.

## Storybook fails to start or shows a blank canvas

- Delete caches if needed: `node_modules/.cache`, Storybook’s cache under `node_modules`, then `npm install` again.
- Run `npm run storybook` from the **project root** (`learn-react/reactjs-storybook`), not from a parent folder.

## `npm run build` (library) fails

- Ensure `src/index.js` only imports files that exist under `src/lib/`.
- Do not import `src/App.jsx` or `src/stories/` from `src/index.js` (they would bloat the library or pull in dev-only code).

## Peer dependency warnings

- Install **React** and **ReactDOM** in the **consumer** app; this package does not bundle them.

## Port already in use

- **Vite:** `npm run dev -- --port 5174` (or another free port).
- **Storybook:** `npm run storybook -- --port 6007` (Storybook CLI accepts port flags; see [Storybook CLI](https://storybook.js.org/docs/api/cli-options)).

## Publishing: package name already taken

`reactjs-storybook` may be unavailable on the public npm registry. Change `name` in `package.json` to a **scoped** name (e.g. `@your-username/reactjs-storybook`) before `npm publish`.
