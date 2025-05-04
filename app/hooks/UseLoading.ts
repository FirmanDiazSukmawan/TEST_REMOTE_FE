// hooks/usePageLoading.ts
import {useCallback} from 'react';
import {useLoadingState} from './LoadingState';

export const usePageLoading = (key: string) => {
  const state = useLoadingState(status => status.getStateByKey(key));
  const setLoading = useLoadingState(status => status.setLoading);
  const reset = useLoadingState(status => status.resetState);

  const startLoading = useCallback(() => {
    setLoading(key, 'loading', true);
  }, [key, setLoading]);

  const stopLoading = useCallback(() => {
    setLoading(key, 'loading', false);
  }, [key, setLoading]);

  const startRefreshing = useCallback(() => {
    setLoading(key, 'refreshing', true);
  }, [key, setLoading]);

  const stopRefreshing = useCallback(() => {
    setLoading(key, 'refreshing', false);
  }, [key, setLoading]);

  const startScrollLoading = useCallback(() => {
    setLoading(key, 'scrollLoading', true);
  }, [key, setLoading]);

  const stopScrollLoading = useCallback(() => {
    setLoading(key, 'scrollLoading', false);
  }, [key, setLoading]);

  return {
    loading: state.loading,
    refreshing: state.refreshing,
    scrollLoading: state.scrollLoading,
    startLoading,
    stopLoading,
    startRefreshing,
    stopRefreshing,
    startScrollLoading,
    stopScrollLoading,
    reset,
  };
};
