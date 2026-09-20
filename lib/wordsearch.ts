/**
 * Word-search grid generator.
 *
 * Seeded on purpose: the same word list always produces the same grid, so a
 * refresh mid-game doesn't scramble everything she's already found.
 */

export type Cell = [number, number];

export type Placement = {
  /** As written in the content file, e.g. "CLOCK IT". */
  display: string;
  /** Letters only, e.g. "CLOCKIT". */
  letters: string;
  cells: Cell[];
};

export type Puzzle = {
  size: number;
  grid: string[][];
  placements: Placement[];
  /** Words that wouldn't fit anywhere, so the UI can say so instead of lying. */
  unplaced: string[];
};

/** Left-to-right / top-to-bottom: the ones that read naturally. */
const FORWARD: Cell[] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
];

/** Backwards and upwards — harder to spot. */
const BACKWARD: Cell[] = [
  [0, -1],
  [-1, 0],
  [-1, -1],
  [1, -1],
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Small deterministic PRNG (mulberry32). */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function normalise(word: string): string {
  return word.toUpperCase().replace(/[^A-Z]/g, "");
}

function tryBuild(
  entries: { display: string; letters: string }[],
  size: number,
  seed: number
): Puzzle | null {
  const rng = makeRng(seed);
  const grid: (string | null)[][] = Array.from({ length: size }, () =>
    Array<string | null>(size).fill(null)
  );
  const placements: Placement[] = [];
  const unplaced: string[] = [];

  for (const entry of entries) {
    const { letters } = entry;
    if (letters.length > size) {
      unplaced.push(entry.display);
      continue;
    }

    // Walk the directions in a shuffled order and take the first that fits,
    // rather than re-rolling a random direction each attempt. Picking at
    // random skews hard towards horizontal, because long words have very few
    // legal diagonal positions and keep losing the coin flip.
    //
    // Forward directions go first roughly 70% of the time: a grid where
    // everything reads backwards is technically valid and miserable to play.
    const shuffled = (src: Cell[]) => {
      const a = [...src];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    const dirs =
      rng() < 0.7
        ? [...shuffled(FORWARD), ...shuffled(BACKWARD)]
        : [...shuffled(BACKWARD), ...shuffled(FORWARD)];

    let placed = false;
    for (const [dr, dc] of dirs) {
      for (let attempt = 0; attempt < 80 && !placed; attempt++) {
        const row = Math.floor(rng() * size);
        const col = Math.floor(rng() * size);

        const endR = row + dr * (letters.length - 1);
        const endC = col + dc * (letters.length - 1);
        if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

        // Overlaps are fine as long as the letters agree.
        let ok = true;
        for (let i = 0; i < letters.length; i++) {
          const existing = grid[row + dr * i][col + dc * i];
          if (existing !== null && existing !== letters[i]) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;

        const cells: Cell[] = [];
        for (let i = 0; i < letters.length; i++) {
          const r = row + dr * i;
          const c = col + dc * i;
          grid[r][c] = letters[i];
          cells.push([r, c]);
        }
        placements.push({ display: entry.display, letters, cells });
        placed = true;
      }
      if (placed) break;
    }

    if (!placed) return null; // caller retries with a bigger grid
  }

  // Fill the gaps. Drawing from letters the words already use makes the
  // filler blend in instead of standing out as random noise.
  const pool = entries.map((e) => e.letters).join("") + ALPHABET;
  const filled = grid.map((row) =>
    row.map((c) => c ?? pool[Math.floor(rng() * pool.length)])
  );

  return { size, grid: filled, placements, unplaced };
}

export function buildPuzzle(rawWords: string[], seed = 20260921): Puzzle {
  const entries = rawWords
    .map((w) => ({ display: w.trim(), letters: normalise(w) }))
    .filter((e) => e.letters.length > 1)
    // Longest first: the hard ones get the empty grid.
    .sort((a, b) => b.letters.length - a.letters.length);

  const longest = entries.reduce((m, e) => Math.max(m, e.letters.length), 3);
  const byVolume = Math.ceil(
    Math.sqrt(entries.reduce((n, e) => n + e.letters.length, 0) * 2.2)
  );
  let size = Math.max(longest, byVolume, 8);

  // Grow the grid (and reshuffle) until everything fits.
  for (let attempt = 0; attempt < 24; attempt++) {
    const puzzle = tryBuild(entries, size, seed + attempt * 977);
    if (puzzle) return puzzle;
    if (attempt % 3 === 2) size += 1;
  }

  // Shouldn't happen for any sane list, but never throw on her birthday.
  return (
    tryBuild(entries.slice(0, 6), size + 4, seed) ?? {
      size,
      grid: Array.from({ length: size }, () => Array(size).fill("A")),
      placements: [],
      unplaced: rawWords,
    }
  );
}

/** The straight line between two cells, or null if they don't line up. */
export function lineBetween(a: Cell, b: Cell): Cell[] | null {
  const dr = b[0] - a[0];
  const dc = b[1] - a[1];
  if (dr === 0 && dc === 0) return [a];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;

  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  const sr = Math.sign(dr);
  const sc = Math.sign(dc);
  return Array.from(
    { length: steps + 1 },
    (_, i) => [a[0] + sr * i, a[1] + sc * i] as Cell
  );
}

export function sameCells(a: Cell[], b: Cell[]): boolean {
  if (a.length !== b.length) return false;
  const fwd = a.every((c, i) => c[0] === b[i][0] && c[1] === b[i][1]);
  if (fwd) return true;
  return a.every(
    (c, i) =>
      c[0] === b[b.length - 1 - i][0] && c[1] === b[b.length - 1 - i][1]
  );
}
