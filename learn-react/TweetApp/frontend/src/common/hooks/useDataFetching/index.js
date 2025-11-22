/**
 * Central entry for data-fetching hooks.
 *
 * - **useFetchByUrl** — local React state + `authenticatedFetch` (URL-driven).
 * - **useReduxDataFetching** — Redux slice + thunk (cached / shared server state).
 *
 * Prefer `useReduxDataFetching` when the resource already has a slice + async thunk.
 */
export { default as useFetchByUrl } from "./v1.jsx";
export {
  default as useReduxDataFetching,
  useDataFetching as useReduxDataFetchingExplicit,
} from "./v2.js";
