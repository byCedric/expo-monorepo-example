import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Listen to app state events using a simple hook.
 * This accepts a callback that is triggered whenever the app state changes.
 */
export function useAppState(callback: (state: AppStateStatus) => void, deps: any[] = []) {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', callback);
    return () => subscription.remove();
  }, [callback, ...deps]);
}
