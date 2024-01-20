import { StoreApi, UseBoundStore, create } from 'zustand'
import { useMemo, useRef } from 'react';

export const useStoreSync = <T>(
    useStore: UseBoundStore<StoreApi<T>>,
    state: T
): UseBoundStore<StoreApi<T>> => {
    // Ref to store flag and avoid rerender.
    const unsynced = useRef(true);
    // Creating store hook with initial state from the server.
    const useServerStore = useMemo(() => create<T>(() => state), []);

    if (unsynced.current) {
        // Setting state and changing flag.
        useStore.setState(state);
        unsynced.current = false;
    }
    return window !== undefined ? useStore : useServerStore;
};