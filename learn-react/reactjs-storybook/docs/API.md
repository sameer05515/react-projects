# Component API

All exports come from the package entry (`src/index.js` → `dist/`). Import:

```js
import { Button, Header, Page } from 'reactjs-storybook';
```

Styles are bundled into `reactjs-storybook.css`; see [CONSUMING.md](./CONSUMING.md) for how to load CSS in your app.

---

## `Button`

Primary interactive button with optional primary styling and sizes.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Button text. |
| `primary` | `boolean` | `false` | Primary (filled) vs secondary style. |
| `backgroundColor` | `string` | `null` | Inline background color when set. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant. |
| `onClick` | `function` | — | Click handler. |
| `...props` | — | — | Spread to the underlying `<button>` (e.g. `disabled`, `aria-*`). |

### Notes

- Renders a native `<button type="button">`.
- PropTypes are defined for development-time checks.

---

## `Header`

Header bar with logo, title, and auth actions using `Button`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | `{ name: string }` | `null` | When set, shows welcome text and **Log out**; otherwise **Log in** / **Sign up**. |
| `onLogin` | `function` | — | **Required.** Called when Log in is clicked. |
| `onLogout` | `function` | — | **Required.** Called when Log out is clicked. |
| `onCreateAccount` | `function` | — | **Required.** Called when Sign up is clicked. |

### Notes

- Includes inline SVG artwork and heading text “Acme” (customize in source as needed).

---

## `Page`

Full example page combining `Header` and a body section with marketing copy (Storybook tutorial text).

### Props

None. The component manages internal `user` state for the demo flow (login / logout).

### Notes

- Useful as a **composition example**; for production you may split layout and copy into smaller components.

---

## CSS classes (for consumers who override styles)

The bundled stylesheet uses classes such as:

- `storybook-button`, `storybook-button--primary`, `storybook-button--secondary`, `storybook-button--small|medium|large`
- `storybook-header`, `storybook-header` children
- `storybook-page`, `storybook-page` typography and `.tip` / `.tip-wrapper`

Targeting these in your app is optional; prefer design tokens or your own class API if you fork the components.
