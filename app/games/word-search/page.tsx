"use client";

import { useEffect, useMemo, useState } from "react";
import { GameShell, GameDone } from "@/components/games/game-shell";
import { useUnlock } from "@/components/unlock-provider";
import { words, afterword } from "@/content/wordsearch";
import {
  buildPuzzle,
  lineBetween,
  sameCells,
  type Cell,
} from "@/lib/wordsearch";

export default function WordSearchPage() {
  const { complete } = useUnlock();
  const puzzle = useMemo(() => buildPuzzle(words), []);

  const [found, setFound] = useState<string[]>([]);
  const [anchor, setAnchor] = useState<Cell | null>(null);
  const [hover, setHover] = useState<Cell | null>(null);
  const [wrong, setWrong] = useState(false);

  const total = puzzle.placements.length;
  const done = total > 0 && found.length === total;

  useEffect(() => {
    if (done) complete("word-search");
  }, [done, complete]);

  const foundCells = useMemo(() => {
    const set = new Set<string>();
    for (const p of puzzle.placements) {
      if (found.includes(p.letters)) {
        for (const [r, c] of p.cells) set.add(`${r},${c}`);
      }
    }
    return set;
  }, [found, puzzle.placements]);

  // Preview line while she's picking the second cell.
  const previewCells = useMemo(() => {
    if (!anchor) return new Set<string>();
    const end = hover ?? anchor;
    const line = lineBetween(anchor, end);
    const set = new Set<string>();
    if (line) for (const [r, c] of line) set.add(`${r},${c}`);
    else set.add(`${anchor[0]},${anchor[1]}`);
    return set;
  }, [anchor, hover]);

  function tap(r: number, c: number) {
    if (done) return;
    const cell: Cell = [r, c];

    if (!anchor) {
      setAnchor(cell);
      setHover(cell);
      return;
    }

    // Tapping the anchor again cancels.
    if (anchor[0] === r && anchor[1] === c) {
      setAnchor(null);
      setHover(null);
      return;
    }

    const line = lineBetween(anchor, cell);
    if (line) {
      const hit = puzzle.placements.find(
        (p) => !found.includes(p.letters) && sameCells(line, p.cells)
      );
      if (hit) {
        setFound((f) => [...f, hit.letters]);
        setAnchor(null);
        setHover(null);
        return;
      }
    }

    setWrong(true);
    setTimeout(() => setWrong(false), 400);
    // Treat the miss as the start of a new attempt — less tapping for her.
    setAnchor(cell);
    setHover(cell);
  }

  function revealAll() {
    setFound(puzzle.placements.map((p) => p.letters));
    setAnchor(null);
  }

  return (
    <GameShell
      id="word-search"
      title="Word Search"
      subtitle={
        done ? undefined : `Tap the first letter, then the last. ${found.length}/${total}`
      }
    >
      <div
        className={`panel p-2 sm:p-3 select-none ${wrong ? "animate-shake" : ""}`}
      >
        <div
          className="grid gap-px w-full"
          style={{ gridTemplateColumns: `repeat(${puzzle.size}, 1fr)` }}
          onMouseLeave={() => anchor && setHover(anchor)}
        >
          {puzzle.grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r},${c}`;
              const isFound = foundCells.has(key);
              const isPreview = previewCells.has(key);
              const isAnchor = anchor?.[0] === r && anchor?.[1] === c;

              return (
                <button
                  key={key}
                  onClick={() => tap(r, c)}
                  onMouseEnter={() => anchor && setHover([r, c])}
                  className={`aspect-square grid place-items-center rounded-[3px] font-bold uppercase transition-colors duration-100 ${
                    isFound
                      ? "bg-gold text-plum"
                      : isAnchor
                        ? "bg-coral text-plum"
                        : isPreview
                          ? "bg-coral/40 text-cream"
                          : "bg-surface-2 text-cream/85 hover:bg-surface"
                  }`}
                  style={{
                    fontSize: `clamp(8px, ${Math.floor(220 / puzzle.size)}px, 16px)`,
                  }}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Word list */}
      <div className="mt-5 flex flex-wrap gap-2 justify-center">
        {puzzle.placements.map((p) => {
          const got = found.includes(p.letters);
          return (
            <span
              key={p.letters}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                got
                  ? "bg-gold/15 text-gold line-through opacity-60"
                  : "bg-surface-2 text-cream/85"
              }`}
            >
              {p.display}
            </span>
          );
        })}
      </div>

      {puzzle.unplaced.length > 0 && (
        <p className="mt-4 text-center text-xs text-coral">
          Too long for the grid, so left out:{" "}
          {puzzle.unplaced.join(", ")}
        </p>
      )}

      {!done && (
        <div className="text-center mt-6">
          <button
            onClick={revealAll}
            className="text-xs text-muted/70 underline underline-offset-4 hover:text-muted"
          >
            stuck? show me
          </button>
        </div>
      )}

      {done && (
        <GameDone>
          All {total} found.
          {afterword && afterword !== "TODO" && (
            <p className="mt-3 text-cream/70">{afterword}</p>
          )}
        </GameDone>
      )}
    </GameShell>
  );
}
