/**
 * Normalizes legacy Redux slice shapes for `useReduxDataFetching` (v2).
 *
 * Slices historically used mixed field names (`status` vs `loading`, string vs RTK-style).
 * These helpers keep that compatibility in one place; prefer new slices to use
 * `status: 'idle' | 'loading' | 'succeeded' | 'failed'` (or RTK `pending`/`fulfilled`/`rejected`).
 */

/** @param {Record<string, unknown> | null | undefined} state */
export const isSliceLoading = (state) => {
  if (!state || typeof state !== "object") return false;
  return Boolean(
    state.status === "loading" ||
      state.status === "pending" ||
      state.loading === "pending" ||
      state.loading === "loading" ||
      (state.fetchCategoryTreeResponse &&
        state.fetchCategoryTreeResponse.loading === "pending")
  );
};

/** @param {Record<string, unknown> | null | undefined} state */
export const isSliceIdle = (state) => {
  if (!state || typeof state !== "object") return true;
  return Boolean(
    state.loading === "idle" ||
      state.status === "idle" ||
      (state.fetchCategoryTreeResponse &&
        state.fetchCategoryTreeResponse.loading === "idle")
  );
};

/** @param {Record<string, unknown> | null | undefined} state */
export const isSliceFetchSuccess = (state) => {
  if (!state || typeof state !== "object") return false;
  return Boolean(
    state.status === "succeeded" ||
      state.status === "fulfilled" ||
      state.loading === "fulfilled" ||
      (state.fetchCategoryTreeResponse &&
        state.fetchCategoryTreeResponse.loading === "fulfilled")
  );
};
