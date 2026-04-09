# learn-react-and-next-ts

Workspace for learning **Next.js + TypeScript** using two separate applications:

- `next-ts-basics` - a broad App Router playground with multiple feature areas and experiments.
- `spp-tweet-app-with-next-ts` - a focused Next.js app that consumes an external React component library.

There is no shared root `package.json`; install and run each project in its own folder.

## Quick start

### next-ts-basics

```bash
cd next-ts-basics
npm install
npm run dev
```

Runs on `http://localhost:5174` (custom dev port in `package.json`).

### spp-tweet-app-with-next-ts

```bash
cd spp-tweet-app-with-next-ts
npm install
npm run dev
```

Runs on Next.js default port unless overridden.

## Documentation map

| Document | Description |
|----------|-------------|
| `docs/GETTING-STARTED.md` | Setup flow, scripts, and practical run/deploy notes for both apps. |
| `docs/PROJECT-CATALOG.md` | Detailed comparison of both projects and where to edit. |
| `next-ts-basics/README.md` | Route-by-route overview of the large training app. |
| `next-ts-basics/docs/ROUTES-AND-FEATURES.md` | Focused deep dive into App Router patterns and data flow. |
| `spp-tweet-app-with-next-ts/README.md` | Notes for the component-library integration app. |

## Notes

- Both projects use the App Router (`src/app`).
- Dependencies and Next.js versions differ intentionally (`next-ts-basics` uses Next 14, `spp-tweet-app-with-next-ts` uses Next 15).
- Keep project-level `README.md` files as source-of-truth for project-specific behavior.
