"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  GAMES_REQUIRED,
  completedCount,
  isUnlocked,
  markBypass,
  markComplete,
  markFanfareSeen,
  memoriesUnlocked,
  readProgress,
  resetProgress,
  type GameId,
  type Progress,
} from "@/lib/progress";

type UnlockContextvalue = {
  /** False until localStorage has been read, so SSR and first paint agree. */
  ready: boolean;
  progress: Progress;
  count: number;
  required: number;
  unlocked: boolean;
  /** Gallery + 2025 letters: open after one game. */
  memories: boolean;
  /** True while the unlock animation should be on screen. */
  celebrating: boolean;
  complete: (id: GameId) => void;
  has: (id: GameId) => boolean;
  endCelebration: () => void;
  bypass: () => void;
  reset: () => void;
};

const UnlockContext = createContext<UnlockContextvalue | undefined>(undefined);

const INITIAL: Progress = { completed: [], fanfareSeen: false, bypass: false };

export function UnlockProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(INITIAL);
  const [ready, setReady] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  // Read on mount rather than during render: the server render has no
  // localStorage, and reading during render would mismatch the hydrated HTML.
  useEffect(() => {
    setProgress(readProgress());
    setReady(true);
  }, []);

  const complete = useCallback((id: GameId) => {
    const next = markComplete(id);
    setProgress(next);
    if (isUnlocked(next) && !next.fanfareSeen) setCelebrating(true);
  }, []);

  const endCelebration = useCallback(() => {
    setCelebrating(false);
    setProgress(markFanfareSeen());
  }, []);

  const bypass = useCallback(() => {
    setProgress(markBypass());
  }, []);

  const reset = useCallback(() => {
    setProgress(resetProgress());
    setCelebrating(false);
  }, []);

  const value = useMemo<UnlockContextvalue>(
    () => ({
      ready,
      progress,
      count: completedCount(progress),
      required: GAMES_REQUIRED,
      unlocked: isUnlocked(progress),
      memories: memoriesUnlocked(progress),
      celebrating,
      complete,
      has: (id: GameId) => progress.completed.includes(id),
      endCelebration,
      bypass,
      reset,
    }),
    [ready, progress, celebrating, complete, endCelebration, bypass, reset]
  );

  return (
    <UnlockContext.Provider value={value}>{children}</UnlockContext.Provider>
  );
}

export function useUnlock() {
  const ctx = useContext(UnlockContext);
  if (!ctx) throw new Error("useUnlock must be used within an UnlockProvider");
  return ctx;
}
