# Routes and features

This file maps the major route groups in `next-ts-basics` and highlights what each area demonstrates.

## Root (`/`)

- File: `src/app/page.tsx`
- Purpose: landing index with links to all major route groups.
- Uses: static intro text from `@/common/constants/project-introduction`.

## `/about`

- `about/page.tsx`
- `about/[slug]/page.tsx`
- Purpose: basic dynamic segment demo.

## `/dummy-welcome`

- `dummy-welcome/page.tsx`
- `dummy-welcome/[name]/page.tsx`
- Purpose: client-side dynamic param access via `useParams`.

## `/foodies`

- Main area:
  - `foodies/page.tsx`
  - `foodies/community/page.tsx`
  - `foodies/meals/page.tsx`
  - `foodies/meals/[placeHolder]/page.tsx`
  - `foodies/meals/share/page.tsx`
- Feature highlights:
  - Suspense-based loading in meals list page
  - Route-level error boundary (`foodies/meals/error.tsx`)
  - Route-level loading component (`loading-out.tsx`)
  - Metadata generation in dynamic meal detail page
  - Server action form submission (`shareMeal` from `src/lib/actions.ts`)

### Data flow for meals

1. `foodies/meals/page.tsx` calls `getMeals()`
2. `src/lib/meals.ts` reads SQLite (`meals.db`)
3. Share form posts to server action (`shareMeal`)
4. Action calls `saveMeal()`, then `revalidatePath('/foodies/meals')`, then redirects

## `/news-room`

`news-room` demonstrates advanced App Router techniques.

### Route groups

- `(marketing)` contains landing content (`news-room` home).
- `(content)` contains archive/news pages.

### Archive with parallel routes

- `archive/@archive/[[...filter]]/page.tsx`
- `archive/@latest/default.tsx`
- Features:
  - Optional catch-all filter segments
  - Date-based filtering logic
  - Validation and custom error flow (`error.tsx`)
  - Separate "latest news" slot

### News detail + intercepted modal

- `news/[id]/page.tsx` - detail page
- `news/[id]/image-fs/page.tsx` - fullscreen image route
- `news/[id]/@modal/(.)image-fs/page.tsx` - intercepted modal version
- `news/[id]/@modal/default.tsx` - null fallback slot

### Route handler

- `news-room/route-handler/route.tsx`
- Demonstrates a basic `GET` route returning plain text response.

## `/playground`

- File: `playground/page.tsx`
- Renders: `PlaygroundBaseClientComponent` from `src/components/main`.
- Purpose: large sandbox for component/hook experiments and versioned subcomponents.

## `/resume-service`

- `resume-service/page.tsx`
- `resume-service/personal-projects/page.tsx`
- Purpose: navigation + content structure for resume-related UI ideas.

## `/spp-analytics`

- `spp-analytics/page.tsx`
- `spp-analytics/analytics/layout.tsx`
- Parallel slots:
  - `analytics/@tasks/page.tsx`
  - `analytics/@topics/page.tsx`
  - `analytics/@interviews/page.tsx`
- Purpose: demonstrate slot-based composition using parallel routes.

## Notes for contributors

- The codebase intentionally contains experimental and in-progress code.
- Favor additive changes and preserve route examples; many pages are educational references.
- If you tighten validation or refactor file naming, update this document and `README.md`.
