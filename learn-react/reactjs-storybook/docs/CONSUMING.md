# Consuming the library in another project

## Requirements

- **React** and **ReactDOM** satisfying `peerDependencies` in this package’s `package.json` (currently `>=18.0.0`).
- A bundler that understands **ES modules** or **CommonJS** (Vite, Webpack, Next.js, etc.).

## Install

### From npm (after publishing)

```bash
npm install reactjs-storybook
```

Use a **scoped name** (e.g. `@your-org/ui`) if you publish to a private registry; change the `name` field in `package.json` first.

### From a local tarball

```bash
cd learn-react/reactjs-storybook
npm run build
npm pack
# In the consumer app:
npm install /absolute/path/to/reactjs-storybook-0.1.0.tgz
```

### From a relative path (`file:`)

In the consumer’s `package.json`:

```json
{
  "dependencies": {
    "reactjs-storybook": "file:../learn-react/reactjs-storybook"
  }
}
```

Run `npm install` in the consumer. **Always run `npm run build` in the library** so `dist/` exists before installing.

### `npm link`

```bash
cd learn-react/reactjs-storybook
npm run build
npm link

cd /path/to/consumer
npm link reactjs-storybook
```

Rebuild the library after source changes (`npm run build`). Some consumers need `preserveSymlinks` or similar depending on the bundler.

## Import JavaScript and CSS

### ESM (recommended)

```jsx
import { Button, Header, Page } from 'reactjs-storybook';
import 'reactjs-storybook/style.css';
```

The subpath `style.css` is declared in `package.json` `exports`.

### CommonJS

```js
const { Button } = require('reactjs-storybook');
require('reactjs-storybook/style.css');
```

Ensure your bundler processes CSS from `node_modules` (most do, including `vite` and `create-react-app`).

## Next.js (App Router)

- Prefer **client components** (`'use client'`) when using these components, since they are interactive.
- Import the CSS in a client layout or the component file (or globally in `app/layout` depending on your CSS setup).

## Server-side rendering (SSR)

These components are written as client-friendly React components. If you SSR, ensure `react` and `react-dom` versions match your framework’s expectations and that no browser-only APIs are used without guards (the current sample does not use `window` in the components themselves).

## Tree-shaking

The package marks CSS as having side effects (`sideEffects` in `package.json`) so bundlers do not drop imported styles. If you import only a subset of components, you still typically import the full stylesheet once; for finer control, split CSS per component in the source and adjust the library build (advanced).

## Version alignment

Keep **React** versions aligned between the consuming app and what you test in this repo. Mismatched React versions can cause subtle hook or context issues.
