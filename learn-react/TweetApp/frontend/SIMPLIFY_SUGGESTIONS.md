# Frontend Simplification Suggestions

This is a targeted cleanup plan to reduce complexity, duplication, and “competing patterns” in the `frontend/` React app.

## Implementation status (highest ROI)

Done:

- **Routes:** Lazy pages live in `src/routes/lazyPages.js` (incl. `lazyNamed` helper). Feature chunks live under `src/routes/sections/`. `src/routes/v1.jsx` composes `MainLayout` + `getMainLayoutNestedRouteElements()` from `mainLayoutNestedRoutes.jsx`. Shell UI moved to `src/routes/AppLayout.jsx`.
- **Auth headers:** Shared logic in `src/common/service/authRequest.js`; used by `src/index.js` (axios) and `authenticatedFetch.js` (fetch).
- **Data fetching:** Single barrel `src/common/hooks/useDataFetching/index.js` exporting **`useFetchByUrl`** (URL + fetch) and **`useReduxDataFetching`** (Redux slice). All previous `v1` / `v2` import paths were updated to this barrel.
- **Reduce derived local state and effects:**
  - **`ViewTopicRouterPage` / `ViewTaskRouterPage`:** `pinnedTopics` / `pinnedTasks` and `isPinned` are already derived with **`useMemo`** from Redux (no sync `useEffect`).
  - **`MemoryMapListRouterPage`:** `selectedMemoryMap` is derived with **`useMemo`** from `location.state` (removed mirroring `useState` + `useEffect`).
  - **`SmartPreviewer` (`Smart/Editor/v3.jsx`):** YAML / skeleton preview values computed with **`useMemo`** instead of `useState` + `useEffect`.
  - **`CreateTopicBulkRouterPage`:** Parent id follows `?parent=` until the user changes the dropdown (`parentIdOverride` cleared when the URL param changes)—avoids “copy URL into state” sync.
  - **Debug noise:** Removed `console.trace` / stray logs from **`TopicSectionForm`**, **`ViewTaskRouterPage`**, and gated tag selectors + API URL helpers to **`development`** only (`console.debug` / `console.warn`). `useFetchByUrl` (`v1.jsx`) already logged errors only in development.
- **Quarantine v1/v2/v3 (playground):**
  - **`ApnaPlayground/utils.js`:** Registry uses **`React.lazy` + dynamic `import()`** per demo (code-split); **`ApnaPlayground/v1.jsx`** wraps the active demo in **`Suspense`** with a small fallback.
  - **Collapsed duplicate entries:** `MyFormWithValidationV1` / `MyFormWithValidationV2` → single **`MyFormWithValidation`** (canonical **`MyFormWithValidation/index.js`** → v2). `MetaLearningCycleV1`–`V3` → single **`MetaLearningCycle`** (**`MetaLearningCycle/index.js`** → v3). Older `v1`/`v2` files remain for reference but are not in the main playground list.
  - **`Welcome/v2.jsx`** imports **`MetaLearningCycle`** from the canonical barrel path instead of **`.../v3`**.
- **Small cleanups with clear wins:**
  - **`LineNumberFormatter/v1.jsx`:** Output is **`useMemo`**-derived from `text`, `padding`, and `start`; padding/start stay as controlled strings and are parsed once in the memo. **`appendLineNumbers`** is **named-exported** for tests. Removed the redundant **Format** button (live output).
  - **`useDataFetching/v2.js`:** Loading / idle / success checks live in **`sliceFetchState.js`** (`isSliceLoading`, `isSliceIdle`, `isSliceFetchSuccess`) with unit tests—legacy slice shapes stay supported in one place until slices are normalized.

## Highest ROI simplifications

1. Extract route composition out of `frontend/src/routes/v1.jsx`
  - The file is a single “mega-router” with many `lazy()` declarations and nested `<Routes>` blocks.
  - Split by feature/domain (e.g. `topic`, `task`, `links`, `tags`, `interview-mgmt`, `memory-maps`) and compose them into the final router.
  - Introduce a helper to standardize lazy defaults so you can avoid repeating `.then(module => ({ default: module.X }))` patterns across dozens of lines.
  - Remove commented-out routes/sections once the final structure is confirmed (commented blocks are currently used as a “second source of truth”).
2. Pick one “server data” fetching strategy (right now you have two)
  - `frontend/src/common/hooks/useDataFetching/v1.jsx` is a local-state fetch helper (`fetchFnWrapper` -> `authenticatedFetch`).
  - `frontend/src/common/hooks/useDataFetching/v2.js` is a Redux-driven cached fetch (`dispatch(fetchAction())` based on slice `status/loading`).
  - Consolidate usage to one approach:
    - If most server data already lives in Redux slices, prefer `v2` and remove `v1` usage from production components.
    - If you truly need local-fetch for some modules, keep `v1` but isolate it to those modules and remove the other path.
3. Consolidate auth header handling (axios interceptor vs `authenticatedFetch`)
  - `frontend/src/index.js` attaches a Bearer token via an `axios.interceptors.request` handler.
  - `frontend/src/common/service/authenticatedFetch.js` also attaches Bearer tokens via `fetch` (and clears token on 401).
  - To simplify mental load and reduce bugs:
    - Either use axios everywhere and remove `authenticatedFetch`, or
    - keep `authenticatedFetch` as the single entry point and remove the axios interceptor from `src/index.js`.

## Reduce derived local state and effects

1. Replace “derived data stored in component state” with `useMemo` *(partially done — see “Implementation status” above)*
   - Prefer computing derived arrays/booleans with `useMemo` and removing syncing `useEffect` + local state where the value is fully determined by props/Redux/router state.
   - `STATE_ISSUES.md` still lists other candidates (e.g. forms that should reset via `key` or explicit sync).
2. Remove debug logging/tracing from production paths *(partially done)*
   - Gate or remove `console.trace` / noisy logs in hooks, slices, and components; `useDataFetching/utils.js` has no tracing (keep it that way).

## Quarantine “v1/v2/v3” duplication (especially in the playground)

1. Playground registry *(done — see “Implementation status” above)*
  - Lazy-load each demo; one canonical entry per duplicated demo where we collapsed variants.
2. Broader codebase
  - Many `v1/v2/v3` paths remain outside the playground; trim over time using the same pattern: **canonical `index.js` re-export** → delete orphans when grep shows no imports.

## Small cleanups with clear wins

1. `LineNumberFormatter` *(done — see “Implementation status”)*
2. Redux slice fetch shape
  - **Now:** compatibility helpers in **`sliceFetchState.js`** used by **`useReduxDataFetching`**.
  - **Later:** normalize each slice to `status: idle | loading | succeeded | failed` (or RTK equivalents) and delete branches from **`sliceFetchState`** as slices migrate.

## Where this plan connects to your existing docs

1. Reuse the “state issues” and “optimization” findings you already captured
  - `frontend/STATE_ISSUES.md` (derived state, stale closures, slice update issues)
  - `frontend/state-mgmt-optimization.md` (selector factory/memoization issues, duplicate state)
  - `frontend/OPTIMIZATION.md` (bundle sizing and route loading improvements)

