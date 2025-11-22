import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';

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
export const useDataFetching = <SliceState extends Record<string, any>>(
  fetchAction: (...args: any[]) => any,
  stateSelector: (state: RootState) => SliceState,
  forceFetch: boolean = false,
  dependencies: any[] = []
) => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<RootState, SliceState>(stateSelector);

  // Determine loading status based on slice structure
  const loading =
    (state as any)?.status === 'loading' ||
    (state as any)?.status === 'pending' ||
    (state as any)?.loading === 'pending' ||
    (state as any)?.loading === 'loading' ||
    ((state as any)?.fetchCategoryTreeResponse &&
      (state as any)?.fetchCategoryTreeResponse.loading === 'pending');
  
  const error = (state as any)?.error ?? null;
  const data = (state as any)?.data;
  const hasData =
    !!data &&
    (Array.isArray(data) ? data.length > 0 : typeof data === 'object' ? Object.keys(data as any).length > 0 : false);
  const isSuccess =
    (state as any)?.status === 'succeeded' ||
    (state as any)?.status === 'fulfilled' ||
    (state as any)?.loading === 'fulfilled' ||
    ((state as any)?.fetchCategoryTreeResponse &&
      (state as any)?.fetchCategoryTreeResponse.loading === 'fulfilled');

  // ✅ Extract complex expressions to variables for dependency array
  const stateStatus = (state as any)?.status;
  const stateLoading = (state as any)?.loading;

  useEffect(() => {
    // Fetch if:
    // 1. Force fetch is requested, OR
    // 2. No data exists and not currently loading, OR
    // 3. Previous fetch failed
    const shouldFetch =
      forceFetch ||
      (!hasData &&
        !loading &&
        stateStatus !== "loading" &&
        stateLoading !== "pending") ||
      (error && !loading);

    if (shouldFetch) {
      dispatch(fetchAction() as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchAction,
    hasData,
    loading,
    forceFetch,
    error,
    stateStatus,
    stateLoading,
    // Note: dependencies array is intentionally not spread to avoid unnecessary re-renders
  ]);

  const refetch = () => {
    dispatch(fetchAction() as any);
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

