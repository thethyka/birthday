"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Lock, Mail } from "lucide-react";
import { BackgroundEffects } from "@/components/background-effects";
import { useUnlock } from "@/components/unlock-provider";
import { copy } from "@/content/copy";
import type { GameId } from "@/lib/progress";

const games: {
  id: GameId;
  href: string;
  title: string;
  blurb: string;
  emoji: string;
}[] = [
  {
    id: "guess-who",
    href: "/games/guess-who",
    title: "Guess Who Wrote It",
    blurb: "Match each message to whoever wrote it.",
    emoji: "💌",
  },
  {
    id: "connections",
    href: "/games/connections",
    title: "Connections",
    blurb: "Sort sixteen tiles into four groups.",
    emoji: "🔗",
  },
  {
    id: "sashle",
    href: "/games/sashle",
    title: "Sashle",
    blurb: "Guess the word in six tries.",
    emoji: "🟨",
  },
  {
    id: "puzzle",
    href: "/games/puzzle",
    title: "Jigsaw",
    blurb: "Sixteen pieces. Tap two to swap.",
    emoji: "🧩",
  },
  {
    id: "quote",
    href: "/games/quote",
    title: "Hangman",
    blurb: "Guess the sentence one letter at a time.",
    emoji: "💀",
  },
  {
    id: "word-search",
    href: "/games/word-search",
    title: "Word Search",
    blurb: "Twelve words hidden in a grid.",
    emoji: "🔤",
  },
];

export default function GamesPage() {
  const { ready, has, count, required, unlocked, bypass } = useUnlock();
  const [showEscape, setShowEscape] = useState(false);

  // The escape hatch only appears after she's been sitting here a while, so a
  // first-time visitor never sees a "skip the whole thing" button. It exists
  // for the case where she already played on her phone and opens this on a
  // laptop, where localStorage starts empty again.
  useEffect(() => {
    if (unlocked) return;
    const t = setTimeout(() => setShowEscape(true), 4 * 60 * 1000);
    return () => clearTimeout(t);
  }, [unlocked]);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-10 sm:py-14 relative z-10">
        <div className="text-center mb-10 animate-bounce-in">
          <h1 className="text-4xl sm:text-6xl font-bold text-gradient mb-4">
            {copy.gamesTitle}
          </h1>
          <p className="text-cream/70 max-w-xl mx-auto">{copy.gamesIntro}</p>

          {ready && (
            <div className="mt-7 inline-flex items-center gap-3 panel px-5 py-3">
              {Array.from({ length: required }).map((_, i) => (
                <span
                  key={i}
                  className={`text-xl transition-all duration-500 ${
                    i < count ? "scale-110" : "opacity-30 grayscale"
                  }`}
                >
                  {i < count ? "🔓" : "🔒"}
                </span>
              ))}
              <span className="text-sm text-muted ml-1">
                {unlocked ? "unlocked" : `${count} / ${required}`}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {games.map((g, i) => {
            const done = ready && has(g.id);
            return (
              <Link
                key={g.id}
                href={g.href}
                className={`panel p-6 card-hover relative animate-slide-up ${
                  done ? "border-gold/50" : ""
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {done && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-gold">
                    <Check size={14} /> done
                  </span>
                )}
                <div className="text-4xl mb-3">{g.emoji}</div>
                <h2 className="text-xl font-bold text-gold mb-2">{g.title}</h2>
                <p className="text-sm text-cream/60">{g.blurb}</p>
              </Link>
            );
          })}
        </div>

        {ready && unlocked && (
          <div className="mt-10 text-center animate-slide-up">
            <Link
              href="/letter"
              className="inline-flex items-center gap-2 bg-coral text-plum font-semibold px-7 py-3 rounded-full"
            >
              <Mail size={18} />
              Read your letter
            </Link>
          </div>
        )}

        {ready && !unlocked && showEscape && (
          <div className="mt-12 text-center">
            <button
              onClick={bypass}
              className="text-xs text-muted/70 underline underline-offset-4 hover:text-muted inline-flex items-center gap-1.5"
            >
              <Lock size={12} />
              already did these on another device?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
