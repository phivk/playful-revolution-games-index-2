'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

export type PlaylistAnimationEvent = {
  sourceRect: DOMRect;
  id: number;
};

type PlaylistAnimationContextValue = {
  targetRef: RefObject<HTMLButtonElement | null>;
  triggerAddAnimation: (sourceRect: DOMRect) => void;
  animationEvent: PlaylistAnimationEvent | null;
  showPlusOne: boolean;
  onAnimationEnd: () => void;
};

const PlaylistAnimationContext =
  createContext<PlaylistAnimationContextValue | null>(null);

export function PlaylistAnimationProvider({ children }: { children: ReactNode }) {
  const targetRef = useRef<HTMLButtonElement | null>(null);
  const [animationEvent, setAnimationEvent] = useState<PlaylistAnimationEvent | null>(null);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const triggerAddAnimation = useCallback((sourceRect: DOMRect) => {
    idRef.current += 1;
    setAnimationEvent({ sourceRect, id: idRef.current });
  }, []);

  const onAnimationEnd = useCallback(() => {
    setAnimationEvent(null);
    setShowPlusOne(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowPlusOne(false), 700);
  }, []);

  return (
    <PlaylistAnimationContext.Provider
      value={{
        targetRef,
        triggerAddAnimation,
        animationEvent,
        showPlusOne,
        onAnimationEnd,
      }}
    >
      {children}
    </PlaylistAnimationContext.Provider>
  );
}

export function usePlaylistAnimation() {
  const ctx = useContext(PlaylistAnimationContext);
  if (!ctx) {
    throw new Error(
      'usePlaylistAnimation must be used within a PlaylistAnimationProvider'
    );
  }
  return ctx;
}
