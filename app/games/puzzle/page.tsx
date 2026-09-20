"use client";

import { useEffect, useState } from "react";
import { GameShell, GameDone } from "@/components/games/game-shell";
import { useUnlock } from "@/components/unlock-provider";

const GRID = 4; // 4 x 4 = 16 pieces
const COUNT = GRID * GRID;
const IMAGE = "/tilePuzzle/puzzle.jpg";
const IMAGE_ASPECT = 1200 / 1040;

/**
 * Tap one tile, tap another, they swap. Deliberately not drag-and-drop:
 * dragging on a phone fights the browser's own scroll and long-press
 * behaviour, and this has to work one-handed in bed.
 */
export default function PuzzlePage() {
  const { complete } = useUnlock();
  const [order, setOrder] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [peek, setPeek] = useState(false);

  const solved = order.length > 0 && order.every((v, i) => v === i);

  useEffect(() => {
    // Shuffle until it isn't accidentally already solved.
    const next = Array.from({ length: COUNT }, (_, i) => i);
    do {
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
    } while (next.every((v, i) => v === i));
    setOrder(next);
  }, []);

  useEffect(() => {
    if (solved) complete("puzzle");
  }, [solved, complete]);

  function tap(slot: number) {
    if (solved) return;
    if (picked === null) {
      setPicked(slot);
      return;
    }
    if (picked === slot) {
      setPicked(null);
      return;
    }
    setOrder((o) => {
      const next = [...o];
      [next[picked], next[slot]] = [next[slot], next[picked]];
      return next;
    });
    setPicked(null);
    setMoves((m) => m + 1);
  }

  return (
    <GameShell
      id="puzzle"
      title="Jigsaw"
      subtitle={solved ? undefined : "Tap two pieces to swap them."}
    >
      <div
        className="relative mx-auto w-full max-w-md rounded-xl overflow-hidden panel p-1.5"
        style={{ aspectRatio: String(IMAGE_ASPECT) }}
      >
        <div
          className="grid w-full h-full gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${GRID}, 1fr)`,
            gridTemplateRows: `repeat(${GRID}, 1fr)`,
          }}
        >
          {order.map((piece, slot) => {
            const row = Math.floor(piece / GRID);
            const col = piece % GRID;
            return (
              <button
                key={slot}
                onClick={() => tap(slot)}
                aria-label={`Piece ${slot + 1}`}
                className={`relative rounded-[3px] overflow-hidden transition-all duration-200 ${
                  picked === slot
                    ? "ring-2 ring-gold scale-95 z-10"
                    : "hover:brightness-110"
                } ${solved ? "ring-0" : ""}`}
                style={{
                  backgroundImage: `url(${IMAGE})`,
                  backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                  backgroundPosition: `${(col / (GRID - 1)) * 100}% ${
                    (row / (GRID - 1)) * 100
                  }%`,
                }}
              />
            );
          })}
        </div>

        {/* Solved: fade the seams away so she sees the whole photo. */}
        {solved && (
          <div
            className="absolute inset-1.5 rounded-lg bg-cover bg-center animate-bounce-in"
            style={{ backgroundImage: `url(${IMAGE})` }}
          />
        )}

        {peek && !solved && (
          <div
            className="absolute inset-1.5 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${IMAGE})` }}
          />
        )}
      </div>

      {!solved && (
        <div className="flex items-center justify-center gap-4 mt-5 text-sm text-muted">
          <span>{moves} moves</span>
          <span className="opacity-40">·</span>
          <button
            onMouseDown={() => setPeek(true)}
            onMouseUp={() => setPeek(false)}
            onMouseLeave={() => setPeek(false)}
            onTouchStart={() => setPeek(true)}
            onTouchEnd={() => setPeek(false)}
            className="underline underline-offset-4 hover:text-gold"
          >
            hold to peek
          </button>
        </div>
      )}

      {solved && (
        <GameDone>
          Solved in <span className="text-gold font-bold">{moves}</span> moves.
        </GameDone>
      )}
    </GameShell>
  );
}
