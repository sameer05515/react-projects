import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom hook for smart data fetching with caching
 * Only fetches data if it hasn't been loaded yet or if forced
 * 
 * @param {Function} fetchAction - Redux action creator for fetching data
 * @param {Object} stateSelector - Selector function to get slice state (state => state.sliceName)
 * @param {boolean} forceFetch - Force refetch even if data exists (default: false)
 * @param {Array} dependencies - Additional dependencies for useEffect (default: [])
 * 
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useDataFetching = (
  fetchAction,
  stateSelector,
  forceFetch = false,
  dependencies = []
) => {
  const dispatch = useDispatch();
  const state = useSelector(stateSelector);

  // Determine loading status based on slice structure
  const loading = state.status === 'loading' || 
                  state.status === 'pending' || 
                  state.loading === 'pending' ||
                  state.loading === 'loading' ||
                  (state.fetchCategoryTreeResponse && state.fetchCategoryTreeResponse.loading === 'pending');
  
  const error = state.error;
  const data = state.data;
  const hasData = data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0);
  const isSuccess = state.status === 'succeeded' || 
                    state.status === 'fulfilled' || 
                    state.loading === 'fulfilled' ||
                    (state.fetchCategoryTreeResponse && state.fetchCategoryTreeResponse.loading === 'fulfilled');

  useEffect(() => {
    // Fetch if:
    // 1. Force fetch is requested, OR
    // 2. No data exists and not currently loading, OR
    // 3. Previous fetch failed
    const shouldFetch =
      forceFetch ||
      (!hasData &&
        !loading &&
        state.status !== "loading" &&
        state.loading !== "pending") ||
      (error && !loading);

    if (shouldFetch) {
      dispatch(fetchAction());
    }
  }, [
    dispatch,
    fetchAction,
    hasData,
    loading,
    forceFetch,
    error,
    state.status,
    state.loading,
    dependencies,
  ]);

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

