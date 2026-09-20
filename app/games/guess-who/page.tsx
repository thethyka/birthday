"use client";

import { useEffect, useMemo, useState } from "react";
import { GameShell, GameDone } from "@/components/games/game-shell";
import { useUnlock } from "@/components/unlock-provider";

type Person = { name: string; message?: string; photoUrl?: string };

type Round = { answer: Person; options: Person[] };

const ROUNDS = 6;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GuessWhoPage() {
  const { complete } = useUnlock();
  const [people, setPeople] = useState<Person[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/people.json")
      .then((r) => r.json())
      .then((data: Person[]) => {
        setPeople(data.filter((p) => p.message && p.photoUrl));
      })
      .catch(() => setPeople([]));
  }, []);

  // Build the rounds once the data lands.
  useEffect(() => {
    if (people.length < 4) return;
    const picks = shuffle(people).slice(0, Math.min(ROUNDS, people.length));
    setRounds(
      picks.map((answer) => {
        const others = shuffle(people.filter((p) => p.name !== answer.name)).slice(
          0,
          3
        );
        return { answer, options: shuffle([answer, ...others]) };
      })
    );
  }, [people]);

  const round = rounds[index];
  const finished = rounds.length > 0 && index >= rounds.length;

  useEffect(() => {
    if (finished) complete("guess-who");
  }, [finished, complete]);

  const progressLabel = useMemo(
    () => (rounds.length ? `${Math.min(index + 1, rounds.length)} / ${rounds.length}` : ""),
    [index, rounds.length]
  );

  function choose(name: string) {
    if (picked) return;
    setPicked(name);
    if (name === round.answer.name) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setIndex((i) => i + 1);
  }

  return (
    <GameShell
      id="guess-who"
      title="Guess Who Wrote It"
      subtitle={finished ? undefined : progressLabel}
    >
      {rounds.length === 0 && (
        <p className="text-center text-muted py-16">loading…</p>
      )}

      {finished && (
        <GameDone>
          <span className="text-gold font-bold">{score}</span> out of{" "}
          {rounds.length}.
        </GameDone>
      )}

      {round && !finished && (
        <div className="space-y-6">
          <div className="panel p-6 whitespace-pre-line leading-relaxed text-cream/90 text-[15px] sm:text-base">
            {round.answer.message}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {round.options.map((opt) => {
              const isAnswer = opt.name === round.answer.name;
              const isPicked = picked === opt.name;
              const state = !picked
                ? "idle"
                : isAnswer
                  ? "right"
                  : isPicked
                    ? "wrong"
                    : "dim";

              return (
                <button
                  key={opt.name}
                  onClick={() => choose(opt.name)}
                  disabled={!!picked}
                  className={`panel p-3 flex flex-col items-center gap-2 transition-all duration-300 ${
                    state === "idle"
                      ? "card-hover"
                      : state === "right"
                        ? "border-gold ring-2 ring-gold"
                        : state === "wrong"
                          ? "border-coral ring-2 ring-coral animate-shake"
                          : "opacity-35"
                  }`}
                >
                  <img
                    src={opt.photoUrl}
                    alt=""
                    loading="lazy"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  />
                  <span className="font-semibold text-sm text-cream">
                    {opt.name}
                  </span>
                </button>
              );
            })}
          </div>

          {picked && (
            <div className="text-center animate-slide-up">
              <p className="mb-4 text-cream/80">
                {picked === round.answer.name
                  ? "Correct."
                  : `${round.answer.name} wrote it.`}
              </p>
              <button
                onClick={next}
                className="bg-gold text-plum font-semibold px-7 py-3 rounded-full"
              >
                {index + 1 === rounds.length ? "Finish" : "Next"}
              </button>
            </div>
          )}
        </div>
      )}
    </GameShell>
  );
}
