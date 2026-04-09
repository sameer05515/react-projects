# spp-tweet-app-with-next-ts

Focused Next.js TypeScript app used to test and demonstrate components from an external React library.

## Stack

- Next.js `^15.0.3`
- React `18`
- TypeScript
- External library: `@stparap/react-js-library-with-vite-receter-template`

## Run

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build`
- `npm run start`
- `npm run lint`

## What this app does

Home page (`src/app/page.tsx`) renders a client component (`src/components/Playground.tsx`) that imports and exercises:

- `PremKaButton` (aliased as `Button`)
- `PremKaLabel` (aliased as `Label`)
- `PremKaCounter`
- `PKJDV`

The page updates a local timestamp label on button click, making it easy to verify client interactivity and component behavior from the external package.

## Important files

| File | Purpose |
|---|---|
| `src/app/layout.tsx` | Root layout, local font setup (`GeistVF`, `GeistMonoVF`) and global styles |
| `src/app/page.tsx` | Root route; mounts `Playground` |
| `src/components/Playground.tsx` | Main integration/demo component |
| `src/app/globals.css` | Global styles |

## Integration notes

- `Playground.tsx` is marked `"use client"` because it uses React state and interactive third-party components.
- If external-library exports change, update imports in `Playground.tsx` first.
- Keep this project minimal; use it as a verification harness when iterating on shared libraries.

## Troubleshooting

- **Module import errors**: ensure package is installed and lockfile is up to date (`npm install`).
- **Hydration/client issues**: keep interactive components in client components (`"use client"`).
- **Font loading issues**: verify font files exist in `src/app/fonts/`.
