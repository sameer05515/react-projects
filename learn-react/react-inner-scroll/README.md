# react-inner-scroll (`innerscroll`)

Legacy **Create React App** demo that combines:

- A small **reusable scroll helper** (`ScrollView` + `ScrollElement`) built on [`scroll-into-view`](https://www.npmjs.com/package/scroll-into-view)
- A **scrollable panel** with buttons that jump to matching sections
- **Sample data** loaded from a public placeholder API ([JSONPlaceholder](https://jsonplaceholder.typicode.com/))

> **Stack note:** This project targets **React 15** and **react-scripts 1.0.7**. Expect install warnings and the need for an older **Node** (often Node 10–14) if you hit tooling errors. It is kept as a learning artifact, not a modern production baseline.

## What it does

1. On mount, `App` requests **`GET /posts?_limit=12`** via Axios (`src/axios.js`).
2. Each post is mapped to `{ id, title, description }` (`description` comes from the post `body`).
3. Each item is rendered as:
   - a **button** (`onClick` → `scrollTo(id)`)
   - a **block** inside a fixed-height scroll area (`ScrollElement` with `name={group.id}`)
4. Clicking a button scrolls the inner container so the matching block aligns to the top (500ms animation, `align.top: 0`).

There is also **commented-out** code that used static data from `src/data.js` (names + images) instead of the API.

## Project layout

| Path | Role |
|------|------|
| `src/scroller.js` | `ScrollView` (registers refs, exposes `scrollTo(name)`) and `ScrollElement` (child context + ref forwarding) |
| `src/App.js` | UI: buttons + scroll area; fetches posts and maps fields |
| `src/axios.js` | Axios instance: `baseURL` → `https://jsonplaceholder.typicode.com` |
| `src/data.js` | Static list used by the old commented demo (not active by default) |
| `src/Wysiwyg.js` | Trix-based editor wrapper (not used by current `App`) |
| `src/App.css` | `.scroller` is **300×300px** with `overflow: auto` |

## Network

The app calls **HTTPS** `jsonplaceholder.typicode.com` from the browser. No local backend is required.

If the request fails, the list stays empty (`views: []`).

## Run locally

```bash
cd learn-react/react-inner-scroll
npm install
npm start
```

- Opens the CRA dev server (default **port 3000** unless `PORT` is set).
- `package.json` uses `"homepage": "."` for a neutral relative asset base when building.

## Static demo (no API)

In `src/App.js`, the block that uses `items` from `./data` and `ScrollView`/`ScrollElement` is **commented out**. To run fully offline:

1. Add `import items from "./data"`.
2. Uncomment the first `ScrollView` / button block that uses `items`.
3. Remove or comment out `componentDidMount` and the `views`-based UI.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Development server |
| `npm run build` | Production build |
| `npm test` | Tests (CRA) |
| `npm run eject` | Eject CRA config (irreversible) |

## Dependencies (high level)

- **Scrolling:** `scroll-into-view`
- **HTTP:** `axios`
- **Editors (mostly unused in current UI):** `react-quill`, `jodit-react`, `react-trix`, `trix`

## Ideas for modernization (optional)

If you revisit this repo: upgrade to current React + Vite or CRA successor, replace legacy context APIs with modern patterns, and swap `findDOMNode` (deprecated) for refs/callback refs. The scroll behavior itself can stay as a small hook or wrapper around `scroll-into-view` or `element.scrollIntoView`.
