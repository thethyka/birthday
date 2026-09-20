"use client";

import { useCallback, useEffect, useState } from "react";
import { Delete, CornerDownLeft } from "lucide-react";
import { GameShell, GameDone } from "@/components/games/game-shell";
import { useUnlock } from "@/components/unlock-provider";
import { rounds } from "@/content/sashle";

const MAX_GUESSES = 6;
const MIN_LEN = 3;
const MAX_LEN = 9;

const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

type LetterState = "correct" | "present" | "absent" | "empty";

/** Letters only — spaces, apostrophes and punctuation are stripped out. */
function normalise(word: string): string {
  return (word ?? "").toUpperCase().replace(/[^A-Z]/g, "");
}

/**
 * Standard Wordle scoring, including the duplicate-letter rule: a letter only
 * scores "present" as many times as it actually appears in the answer, and
 * exact matches get first claim on those slots.
 */
function scoreGuess(guess: string, answer: string): LetterState[] {
  const len = answer.length;
  const result: LetterState[] = Array(len).fill("absent");
  const counts: Record<string, number> = {};

  for (let i = 0; i < len; i++) {
    if (guess[i] === answer[i]) result[i] = "correct";
    else counts[answer[i]] = (counts[answer[i]] ?? 0) + 1;
  }

  for (let i = 0; i < len; i++) {
    if (result[i] === "correct") continue;
    const c = guess[i];
    if (counts[c] > 0) {
      result[i] = "present";
      counts[c] -= 1;
    }
  }

  return result;
}

const TILE_STYLES: Record<LetterState, string> = {
  correct: "bg-gold text-plum border-gold",
  present: "bg-amber text-cream border-amber",
  absent: "bg-surface-2 text-cream/40 border-cream/10",
  empty: "bg-transparent text-cream border-cream/12",
};

/** Long words need smaller tiles to stay on a phone screen. */
function tileSize(len: number): string {
  if (len <= 5) return "w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl";
  if (len <= 7) return "w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl";
  return "w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-lg";
}

export default function SashlePage() {
  const { complete } = useUnlock();
  const [roundIndex, setRoundIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [shake, setShake] = useState(false);

  const round = rounds[roundIndex];
  const answer = normalise(round?.word ?? "");
  const len = answer.length;
  const valid = len >= MIN_LEN && len <= MAX_LEN;

  const solved = guesses.includes(answer);
  const exhausted = guesses.length >= MAX_GUESSES;
  const roundOver = solved || exhausted || revealed;
  const allDone = roundIndex >= rounds.length;

  useEffect(() => {
    if (allDone) complete("sashle");
  }, [allDone, complete]);

  const press = useCallback(
    (key: string) => {
      if (roundOver || !valid) return;
      if (key === "ENTER") {
        if (current.length !== len) {
          setShake(true);
          setTimeout(() => setShake(false), 500);
          return;
        }
        setGuesses((g) => [...g, current]);
        setCurrent("");
      } else if (key === "BACK") {
        setCurrent((c) => c.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && current.length < len) {
        setCurrent((c) => c + key);
      }
    },
    [current, roundOver, valid, len]
  );

  // Physical keyboard, for when she's on a laptop.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter") press("ENTER");
      else if (e.key === "Backspace") press("BACK");
      else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toUpperCase());
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  function nextRound() {
    setRoundIndex((i) => i + 1);
    setGuesses([]);
    setCurrent("");
    setRevealed(false);
  }

  // Best-known state per letter, for colouring the keyboard.
  const keyState: Record<string, LetterState> = {};
  if (valid) {
    for (const g of guesses) {
      const s = scoreGuess(g, answer);
      g.split("").forEach((c, i) => {
        const prev = keyState[c];
        if (s[i] === "correct" || prev === undefined) keyState[c] = s[i];
        else if (s[i] === "present" && prev === "absent") keyState[c] = "present";
      });
    }
  }

  if (allDone) {
    return (
      <GameShell id="sashle" title="Sashle">
        <GameDone>That&apos;s all of them.</GameDone>
      </GameShell>
    );
  }

  // A word that can't be played would otherwise ship as a game she can never
  // win, so fail loudly here instead of silently.
  if (!valid) {
    return (
      <GameShell id="sashle" title="Sashle">
        <div className="panel p-6 text-center border-coral">
          <p className="text-coral font-semibold mb-3">
            Word {roundIndex + 1} won&apos;t work
          </p>
          <p className="text-cream/70 text-sm leading-relaxed">
            <code className="text-gold">&quot;{round?.word}&quot;</code> comes out
            as {len} letter{len === 1 ? "" : "s"} once spaces and punctuation are
            stripped. It needs to be between {MIN_LEN} and {MAX_LEN}.
            <br />
            Fix it in <code>content/sashle.ts</code>.
          </p>
        </div>
      </GameShell>
    );
  }

  const size = tileSize(len);

  const rows = [
    ...guesses.map((g) => ({ word: g, states: scoreGuess(g, answer) })),
    ...(roundOver
      ? []
      : [
          {
            word: current.padEnd(len),
            states: Array(len).fill("empty") as LetterState[],
          },
        ]),
    ...Array.from({
      length: Math.max(0, MAX_GUESSES - guesses.length - (roundOver ? 0 : 1)),
    }).map(() => ({
      word: " ".repeat(len),
      states: Array(len).fill("empty") as LetterState[],
    })),
  ];

  return (
    <GameShell
      id="sashle"
      title="Sashle"
      subtitle={`Word ${roundIndex + 1} of ${rounds.length} · ${len} letters`}
    >
      <div className="flex flex-col items-center gap-1.5 mb-6">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`flex gap-1.5 ${
              shake && !roundOver && r === guesses.length ? "animate-shake" : ""
            }`}
          >
            {Array.from({ length: len }).map((_, c) => (
              <div
                key={c}
                className={`${size} grid place-items-center rounded-md border-2 font-bold uppercase ${
                  TILE_STYLES[row.states[c]]
                } ${row.states[c] !== "empty" ? "animate-flip-in" : ""}`}
                style={{ animationDelay: `${c * 0.07}s` }}
              >
                {row.word[c]?.trim() || ""}
              </div>
            ))}
          </div>
        ))}
      </div>

      {roundOver ? (
        <div className="panel p-6 text-center animate-bounce-in">
          <p className="text-2xl font-bold text-gold mb-1 tracking-widest">
            {answer}
          </p>
          {round.caption && round.caption !== "TODO" && (
            <p className="text-cream/80 mt-3 leading-relaxed">{round.caption}</p>
          )}
          <button
            onClick={nextRound}
            className="mt-6 bg-gold text-plum font-semibold px-7 py-3 rounded-full"
          >
            {roundIndex + 1 === rounds.length ? "Finish" : "Next word"}
          </button>
        </div>
      ) : (
        <>
          {/* On-screen keyboard — the mobile keyboard can't be relied on here. */}
          <div className="flex flex-col gap-1.5 items-center">
            {KEY_ROWS.map((row, i) => (
              <div key={i} className="flex gap-1 w-full justify-center">
                {i === 2 && (
                  <button
                    onClick={() => press("ENTER")}
                    className="px-2 sm:px-3 h-12 rounded bg-surface-2 text-cream grid place-items-center"
                    aria-label="Enter"
                  >
                    <CornerDownLeft size={16} />
                  </button>
                )}
                {row.split("").map((k) => (
                  <button
                    key={k}
                    onClick={() => press(k)}
                    className={`flex-1 max-w-[2.4rem] h-12 rounded text-sm font-bold uppercase transition-colors ${
                      keyState[k] === "correct"
                        ? "bg-gold text-plum"
                        : keyState[k] === "present"
                          ? "bg-amber text-cream"
                          : keyState[k] === "absent"
                            ? "bg-cream/5 text-cream/30"
                            : "bg-surface-2 text-cream"
                    }`}
                  >
                    {k}
                  </button>
                ))}
                {i === 2 && (
                  <button
                    onClick={() => press("BACK")}
                    className="px-2 sm:px-3 h-12 rounded bg-surface-2 text-cream grid place-items-center"
                    aria-label="Backspace"
                  >
                    <Delete size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setRevealed(true)}
              className="text-xs text-muted/70 underline underline-offset-4 hover:text-muted"
            >
              stuck? show me
            </button>
          </div>
        </>
      )}
    </GameShell>
  );
}
