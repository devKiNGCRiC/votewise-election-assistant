"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

// Tiny localStorage-backed state. useSyncExternalStore keeps SSR and the first
// client render identical (server snapshot = fallback), then syncs.
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function read(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useStoredState<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );

  const value = useMemo<T>(() => {
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // fallback is expected to be a stable literal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  const set = useCallback(
    (next: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // storage blocked (private mode) — state just won't persist
      }
      listeners.forEach((l) => l());
    },
    [key],
  );

  return [value, set] as const;
}
