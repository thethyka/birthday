/**
 * Game progress, kept in localStorage.
 *
 * The site is a static export with no backend by design — nobody is watching
 * what she does. That means progress lives on whichever device she played on,
 * which is why `markBypass` exists: a quiet escape hatch so the letter is never
 * lost if she opens the site somewhere else later.
 */

export const GAME_IDS = [
  "guess-who",
  "connections",
  "sashle",
  "puzzle",
  "word-search",
  "quote",
] as const;

export type GameId = (typeof GAME_IDS)[number];

/**
 * How many she needs before the letter opens. Deliberately fewer than the
 * number of games, so a single one she can't crack never blocks her.
 */
export const GAMES_REQUIRED = 3;

const KEY = "sashah-2026-progress";

export type Progress = {
  completed: GameId[];
  /** Set once the unlock animation has played, so it only happens once. */
  fanfareSeen: boolean;
  /** Manual override — see note above. */
  bypass: boolean;
};

const EMPTY: Progress = { completed: [], fanfareSeen: false, bypass: false };

/**
 * Every read and write is wrapped: localStorage throws in private windows and
 * with site data blocked, and the page has to work anyway.
 */
export function readProgress(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    const completed = Array.isArray(parsed.completed)
      ? parsed.completed.filter((id): id is GameId =>
          (GAME_IDS as readonly string[]).includes(id)
        )
      : [];
    return {
      completed,
      fanfareSeen: Boolean(parsed.fanfareSeen),
      bypass: Boolean(parsed.bypass),
    };
  } catch {
    return EMPTY;
  }
}

function write(next: Progress): Progress {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Non-fatal: she just won't keep progress between visits.
  }
  return next;
}

export function markComplete(id: GameId): Progress {
  const current = readProgress();
  if (current.completed.includes(id)) return current;
  return write({ ...current, completed: [...current.completed, id] });
}

export function markFanfareSeen(): Progress {
  return write({ ...readProgress(), fanfareSeen: true });
}

export function markBypass(): Progress {
  return write({ ...readProgress(), bypass: true });
}

export function resetProgress(): Progress {
  return write(EMPTY);
}

export function completedCount(p: Progress): number {
  return p.completed.length;
}

export function isUnlocked(p: Progress): boolean {
  return p.bypass || p.completed.length >= GAMES_REQUIRED;
}

/**
 * The gallery and the 2025 letters open after a single game, rather than
 * waiting for all three. Keeps the site from feeling empty on arrival while
 * still making her do something first.
 */
export function memoriesUnlocked(p: Progress): boolean {
  return p.bypass || p.completed.length >= 1;
}
