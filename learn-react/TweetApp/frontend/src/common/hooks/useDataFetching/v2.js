import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isSliceFetchSuccess,
  isSliceIdle,
  isSliceLoading,
} from "./sliceFetchState";

// Stable empty array: passing this as dependencies prevents the hook from re-running the effect every render
const EMPTY_DEPS = [];

/**
 * Custom hook for smart data fetching with caching
 * Only fetches data if it hasn't been loaded yet or if forced
 *
 * @param {Function} fetchAction - Redux action creator for fetching data
 * @param {Object} stateSelector - Selector function to get slice state (state => state.sliceName)
 * @param {boolean} forceFetch - Force refetch even if data exists (default: false)
 * @param {Array} dependencies - Additional dependencies for useEffect (default: stable empty array)
 *
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useDataFetching = (
  fetchAction,
  stateSelector,
  forceFetch = false,
  dependencies
) => {
  const dispatch = useDispatch();
  const state = useSelector(stateSelector);
  const stableDeps = dependencies && dependencies.length > 0 ? dependencies : EMPTY_DEPS;

  const loading = isSliceLoading(state);
  const error = state.error;
  const data = state.data;
  const hasData =
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0);
  const isSuccess = isSliceFetchSuccess(state);

  /* eslint-disable react-hooks/exhaustive-deps -- narrow slice fields + optional caller deps; avoids refetch on unrelated slice updates */
  useEffect(
    () => {
      // Fetch only when slice is idle (never fetched) and we have no data, or when forceFetch.
      // Do not fetch when loading or when a previous attempt failed (rejected/failed) to avoid infinite retry loops (e.g. 401).
      const idle = isSliceIdle(state);
      const shouldFetch = forceFetch || (!hasData && !loading && idle);

      if (shouldFetch) {
        dispatch(fetchAction());
      }
    },
    [
      dispatch,
      fetchAction,
      hasData,
      loading,
      forceFetch,
      state.status,
      state.loading,
      state.fetchCategoryTreeResponse?.loading,
      ...stableDeps,
    ]
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  const refetch = () => {
    dispatch(fetchAction());
  };

  return {
    data,
    loading,
    error,
    refetch,
    hasData,
    isSuccess
  };
};

export default useDataFetching;

