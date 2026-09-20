"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { GameShell, GameDone } from "@/components/games/game-shell";
import { useUnlock } from "@/components/unlock-provider";
import { quote, afterword } from "@/content/quote";
import { Gallows } from "@/components/games/gallows";

const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export default function QuotePage() {
  const { complete } = useUnlock();
  const [guessed, setGuessed] = useState<string[]>([]);

  const text = quote.text.toUpperCase();

  /** Split into words so long quotes wrap on word boundaries, not mid-word. */
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const neededLetters = useMemo(
    () => new Set(text.split("").filter((c) => /[A-Z]/.test(c))),
    [text]
  );

  const wrong = useMemo(
    () => guessed.filter((g) => !neededLetters.has(g)),
    [guessed, neededLetters]
  );

  const solved = useMemo(
    () => [...neededLetters].every((c) => guessed.includes(c)),
    [neededLetters, guessed]
  );

  const dead = wrong.length >= quote.lives;
  const over = solved || dead;

  useEffect(() => {
    if (over) complete("quote");
  }, [over, complete]);

  const press = useCallback(
    (letter: string) => {
      if (over || guessed.includes(letter)) return;
      setGuessed((g) => [...g, letter]);
    },
    [over, guessed]
  );

  // Physical keyboard, since he'll be playing this on a laptop.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toUpperCase());
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  // Sizing scales with the length of the quote so long ones still fit.
  const total = text.replace(/\s/g, "").length;
  const tile =
    total > 40
      ? "w-5 h-7 sm:w-7 sm:h-9 text-[11px] sm:text-base"
      : total > 24
        ? "w-6 h-8 sm:w-8 sm:h-10 text-xs sm:text-lg"
        : "w-8 h-10 sm:w-10 sm:h-12 text-base sm:text-xl";

  return (
    <GameShell
      id="quote"
      title={quote.title}
      subtitle={over ? undefined : quote.hint}
    >
      {/* The phrase */}
      <div className="panel p-4 sm:p-6">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2.5">
          {words.map((word, wi) => (
            <div key={wi} className="flex gap-1">
              {word.split("").map((char, ci) => {
                const isLetter = /[A-Z]/.test(char);
                const show = !isLetter || guessed.includes(char) || over;
                return (
                  <div
                    key={ci}
                    className={`${tile} grid place-items-center font-bold uppercase rounded-[3px] transition-all duration-300 ${
                      !isLetter
                        ? "text-cream/60"
                        : show
                          ? guessed.includes(char)
                            ? "bg-gold text-plum"
                            : "bg-coral/70 text-plum"
                          : "border-b-2 border-cream/25 text-transparent"
                    }`}
                  >
                    {show ? char : "•"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {!over && (
        <>
          <div className="flex flex-col items-center mt-6">
            <Gallows wrong={wrong.length} lives={quote.lives} />
            <p className="text-sm text-muted mt-1">
              {quote.lives - wrong.length} wrong guesses left
            </p>
            {wrong.length > 0 && (
              <p className="text-sm text-coral/80 mt-2 tracking-[0.2em] font-semibold">
                {wrong.join(" ")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 items-center mt-6">
            {KEY_ROWS.map((row, i) => (
              <div key={i} className="flex gap-1 w-full justify-center">
                {row.split("").map((k) => {
                  const used = guessed.includes(k);
                  const hit = used && neededLetters.has(k);
                  return (
                    <button
                      key={k}
                      onClick={() => press(k)}
                      disabled={used}
                      className={`flex-1 max-w-[2.4rem] h-12 rounded text-sm font-bold uppercase transition-colors ${
                        hit
                          ? "bg-gold text-plum"
                          : used
                            ? "bg-cream/5 text-cream/25"
                            : "bg-surface-2 text-cream hover:bg-surface"
                      }`}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}

      {dead && (
        <div className="flex justify-center mt-6">
          <Gallows wrong={quote.lives} lives={quote.lives} />
        </div>
      )}

      {over && (
        <GameDone>
          {solved ? "Solved." : "Out of guesses."}
          {afterword && afterword !== "TODO" && (
            <p className="mt-3 text-cream/70">{afterword}</p>
          )}
        </GameDone>
      )}
    </GameShell>
  );
}
