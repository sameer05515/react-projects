# Getting started

This workspace has two independent Next.js TypeScript projects. Run commands from each project folder, not from the workspace root.

## 1) `next-ts-basics`

```bash
cd next-ts-basics
npm install
npm run dev
```

- Dev URL: `http://localhost:5174`
- Why 5174: `package.json` uses `next dev -p 5174`.

Useful scripts:

- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - lint with Next ESLint config

### Local data prerequisites

`next-ts-basics` uses `better-sqlite3` and includes a local `meals.db`.  
If you want to reinitialize meal data, run:

```bash
node initdb.js
```

### External API dependencies used by some routes

Some playground/analytics/news utilities call local APIs:

- `http://127.0.0.1:3003/...`
- `http://127.0.0.1:8080/api/validateYaml`

If those services are down, affected pages/features may show fallback data or errors.

## 2) `spp-tweet-app-with-next-ts`

```bash
cd spp-tweet-app-with-next-ts
npm install
npm run dev
```

- Dev URL: default Next port (usually `http://localhost:3000`) unless overridden.

Useful scripts:

- `npm run build`
- `npm run start`
- `npm run lint`

### Key dependency

This project depends on:

- `@stparap/react-js-library-with-vite-receter-template`

The main page renders a client component (`src/components/Playground.tsx`) that imports and exercises components from that library.

## Troubleshooting quick tips

- **Port already in use**: change port (`next dev -p <port>`) temporarily.
- **Missing module errors**: delete `node_modules` and reinstall.
- **Version mismatch**: keep Node on a modern LTS version for Next 14/15 compatibility.
