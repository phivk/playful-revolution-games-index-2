'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type PlaylistContextValue = {
  slugs: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  initializeFromSlugs: (slugs: string[]) => void;
};

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  const add = useCallback((slug: string) => {
    setSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setSlugs([]), []);

  const initializeFromSlugs = useCallback((newSlugs: string[]) => {
    setSlugs(Array.isArray(newSlugs) ? [...newSlugs] : []);
  }, []);

  const value = useMemo(
    () => ({ slugs, add, remove, clear, initializeFromSlugs }),
    [slugs, add, remove, clear, initializeFromSlugs]
  );

  return (
    <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const ctx = useContext(PlaylistContext);
  if (!ctx) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return ctx;
}

export function usePlaylistOptional() {
  return useContext(PlaylistContext);
}
