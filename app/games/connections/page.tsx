"use client";

import { useEffect, useMemo, useState } from "react";
import { GameShell, GameDone } from "@/components/games/game-shell";
import { useUnlock } from "@/components/unlock-provider";
import { board, afterword, type ConnectionsGroup } from "@/content/connections";

const MISTAKES_ALLOWED = 4;

const DIFFICULTY_STYLES: Record<number, string> = {
  1: "bg-[#E8C79A] text-cream",
  2: "bg-[#D9A87A] text-cream",
  3: "bg-[#C98B6E] text-cream",
  4: "bg-[#A9757F] text-cream",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ConnectionsPage() {
  const { complete } = useUnlock();

  const allTiles = useMemo(() => board.flatMap((g) => g.items), []);

  // Tiles are matched by their text, so two identical tiles make the board
  // unplayable. That happens naturally while the placeholders are still in
  // place, so say so rather than rendering something subtly broken.
  const duplicates = useMemo(() => {
    const seen = new Set<string>();
    const dupes = new Set<string>();
    for (const t of allTiles) {
      if (seen.has(t)) dupes.add(t);
      seen.add(t);
    }
    return [...dupes];
  }, [allTiles]);
  const [tiles, setTiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<ConnectionsGroup[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);

  useEffect(() => setTiles(shuffle(allTiles)), [allTiles]);

  const lost = mistakes >= MISTAKES_ALLOWED;
  const won = solved.length === board.length;
  const over = lost || won;

  useEffect(() => {
    if (over) complete("connections");
  }, [over, complete]);

  // On a loss, lay out the answers so she still gets to see the joke.
  useEffect(() => {
    if (!lost) return;
    const remaining = board.filter(
      (g) => !solved.some((s) => s.name === g.name)
    );
    if (remaining.length) setSolved((s) => [...s, ...remaining]);
    setTiles([]);
    setSelected([]);
  }, [lost]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggle(tile: string) {
    if (over) return;
    setSelected((sel) =>
      sel.includes(tile)
        ? sel.filter((t) => t !== tile)
        : sel.length < 4
          ? [...sel, tile]
          : sel
    );
  }

  function submit() {
    if (selected.length !== 4) return;
    const match = board.find(
      (g) =>
        !solved.some((s) => s.name === g.name) &&
        g.items.every((item) => selected.includes(item))
    );

    if (match) {
      setSolved((s) => [...s, match]);
      setTiles((t) => t.filter((tile) => !match.items.includes(tile)));
      setSelected([]);
    } else {
      setMistakes((m) => m + 1);
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
  }

  if (duplicates.length) {
    return (
      <GameShell id="connections" title="Connections">
        <div className="panel p-6 text-center border-coral">
          <p className="text-coral font-semibold mb-3">
            The board has repeated tiles
          </p>
          <p className="text-cream/70 text-sm leading-relaxed">
            {duplicates.map((d) => (
              <code key={d} className="text-gold mx-1">
                &quot;{d}&quot;
              </code>
            ))}
            {duplicates.length === 1 ? "appears" : "appear"} more than once, so
            tiles can&apos;t be told apart. All 16 need to be different.
            <br />
            Fix it in <code>content/connections.ts</code>.
          </p>
        </div>
      </GameShell>
    );
  }

  return (
    <GameShell
      id="connections"
      title="Connections"
      subtitle={over ? undefined : "Find four groups of four."}
    >
      <div className="space-y-3">
        {/* Solved groups */}
        {solved.map((g) => (
          <div
            key={g.name}
            className={`rounded-xl p-4 text-center animate-bounce-in ${
              DIFFICULTY_STYLES[g.difficulty] ?? DIFFICULTY_STYLES[1]
            }`}
          >
            <div className="font-bold text-sm uppercase tracking-wide">
              {g.name}
            </div>
            <div className="text-sm opacity-80 mt-1">{g.items.join(" · ")}</div>
          </div>
        ))}

        {/* Remaining tiles */}
        {tiles.length > 0 && (
          <div
            className={`grid grid-cols-4 gap-2 ${wrongShake ? "animate-shake" : ""}`}
          >
            {tiles.map((tile) => {
              const on = selected.includes(tile);
              return (
                <button
                  key={tile}
                  onClick={() => toggle(tile)}
                  className={`aspect-square rounded-lg px-1 text-[11px] sm:text-sm font-semibold leading-tight transition-all duration-150 break-words ${
                    on
                      ? "bg-gold text-plum scale-95"
                      : "bg-surface-2 text-cream hover:bg-surface"
                  }`}
                >
                  {tile}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {!over && (
        <>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted">
            <span>Mistakes left:</span>
            {Array.from({ length: MISTAKES_ALLOWED }).map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < MISTAKES_ALLOWED - mistakes ? "bg-coral" : "bg-cream/10"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3 justify-center mt-5">
            <button
              onClick={() => setSelected([])}
              disabled={!selected.length}
              className="px-5 py-2.5 rounded-full border border-cream/15 text-cream/80 disabled:opacity-30"
            >
              Clear
            </button>
            <button
              onClick={() => setTiles((t) => shuffle(t))}
              className="px-5 py-2.5 rounded-full border border-cream/15 text-cream/80"
            >
              Shuffle
            </button>
            <button
              onClick={submit}
              disabled={selected.length !== 4}
              className="px-6 py-2.5 rounded-full bg-gold text-plum font-semibold disabled:opacity-30"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {over && (
        <GameDone>
          {won ? "Solved." : "Out of guesses."}
          {afterword && afterword !== "TODO" && (
            <p className="mt-3 text-cream/70">{afterword}</p>
          )}
        </GameDone>
      )}
    </GameShell>
  );
}
