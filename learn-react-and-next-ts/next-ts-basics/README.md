# next-ts-basics

Next.js + TypeScript training project with multiple App Router demos in a single codebase.

## Stack

- Next.js `14.2.11`
- React `18`
- TypeScript
- `better-sqlite3` (local meals DB)
- `xss`, `js-yaml`, `react-icons`

## Run

```bash
npm install
npm run dev
```

App runs on `http://localhost:5174`.

Other scripts:

- `npm run build`
- `npm run start`
- `npm run lint`

## Project shape

### Route modules (`src/app`)

- `about` - simple dynamic route example (`about/[slug]`).
- `dummy-welcome` - dynamic client route (`dummy-welcome/[name]`).
- `foodies` - meals discovery + share flow (server/data examples).
- `news-room` - advanced routing examples (route groups, parallel routes, interception).
- `playground` - large client-side experimentation dashboard.
- `resume-service` - UI flow + navigation example for resume-oriented pages.
- `spp-analytics` - parallel-route style page sections (`@tasks`, `@topics`, `@interviews`).

### Components (`src/components`)

- `foodies-sub-components`
- `news-room-sub-components`
- `playground-sub-components`
- `resume-service-sub-components`
- plus common wrappers/utils

### Data & server logic (`src/lib`)

- `meals.ts` - SQLite reads/writes, basic sanitization.
- `actions.ts` - server action (`shareMeal`) with `revalidatePath` + redirect.
- `news-room/news.ts` - filter helpers for news archive pages.
- `topics.ts` - graph transformation + external fetch helpers.

## Notable behavior and caveats

- Root layout (`src/app/layout.tsx`) currently renders a prominent warning banner with a local link (`http://localhost:3002/notifications`) on every page.
- `getMeals()` introduces an artificial delay (`setTimeout`) and filters out one record.
- `saveMeal()` currently hardcodes creator/image fields and has commented-out image upload logic.
- Some route files include intentional experiments, commented alternatives, and non-final naming (e.g. `loading-out.tsx`, `loadin.module.css`).

## DB bootstrap / refresh

Database file is `meals.db` at project root.

To seed meals data:

```bash
node initdb.js
```

## Routing features showcased

- Dynamic segments: `[slug]`, `[placeHolder]`
- Nested layouts
- Error boundaries (`error.tsx`)
- Loading states
- Route handlers (`route.tsx`)
- Parallel routes (`@archive`, `@latest`, `@tasks`, `@topics`, `@interviews`)
- Intercepted modal routes (`(.)image-fs`)

See `docs/ROUTES-AND-FEATURES.md` for a route-by-route map.
