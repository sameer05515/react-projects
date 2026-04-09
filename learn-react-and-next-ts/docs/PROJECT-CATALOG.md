# Project catalog

## Overview

| Project | Stack | Primary purpose | Key notes |
|---|---|---|---|
| `next-ts-basics` | Next.js 14 + React 18 + TypeScript | Broad Next.js App Router training workspace | Multiple route groups and demos (`foodies`, `news-room`, `spp-analytics`, `playground`) |
| `spp-tweet-app-with-next-ts` | Next.js 15 + React 18 + TypeScript | Minimal integration playground for an external UI/component library | Main interaction is in `src/components/Playground.tsx` |

## `next-ts-basics` at a glance

- **Dev command**: `npm run dev` (`-p 5174`)
- **Data layer**:
  - Local SQLite (`meals.db`) via `better-sqlite3`
  - Server actions in `src/lib/actions.ts`
  - Utility data in `src/lib/news-room/*`, `src/lib/topics.ts`
- **Main route areas** (`src/app`):
  - `about`
  - `dummy-welcome`
  - `foodies`
  - `news-room`
  - `playground`
  - `resume-service`
  - `spp-analytics`

See `next-ts-basics/README.md` and `next-ts-basics/docs/ROUTES-AND-FEATURES.md` for details.

## `spp-tweet-app-with-next-ts` at a glance

- **Dev command**: `npm run dev`
- **Core files**:
  - `src/app/page.tsx` - renders `Playground`
  - `src/components/Playground.tsx` - imports `PremKaButton`, `PremKaLabel`, `PremKaCounter`, `PKJDV` from external library
- **Purpose**: verify and demo external component-library usage in a Next.js app.

See `spp-tweet-app-with-next-ts/README.md` for detailed setup and behavior.
