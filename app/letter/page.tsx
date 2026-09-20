"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { BackgroundEffects } from "@/components/background-effects";
import { useUnlock } from "@/components/unlock-provider";

export default function LetterPage() {
  const { ready, unlocked, count, required } = useUnlock();
  const [body, setBody] = useState<string | null>(null);

  useEffect(() => {
    fetch("/letter.json")
      .then((r) => r.json())
      .then((d) => setBody(d.body ?? ""))
      .catch(() => setBody(""));
  }, []);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-10 sm:py-16 relative z-10 max-w-2xl">
        {!ready ? null : !unlocked ? (
          <div className="panel p-10 text-center animate-bounce-in">
            <Lock className="mx-auto text-muted mb-4" size={40} />
            <h1 className="text-2xl font-bold text-gold mb-3">Not yet</h1>
            <p className="text-cream/70 mb-7">
              {required - count} more {required - count === 1 ? "game" : "games"}{" "}
              and this opens.
            </p>
            <Link
              href="/games"
              className="inline-block bg-gold text-plum font-semibold px-7 py-3 rounded-full"
            >
              Go play
            </Link>
          </div>
        ) : (
          <article className="animate-slide-up">
            <div className="text-center mb-10">
              <div className="text-5xl mb-4">💌</div>
              <h1 className="text-3xl sm:text-5xl font-bold text-gradient">
                For Sashah
              </h1>
            </div>

            <div className="panel p-7 sm:p-10">
              {body === null ? (
                <p className="text-muted text-center">loading…</p>
              ) : body ? (
                <div className="whitespace-pre-line leading-[1.85] text-cream/90 text-[16px] sm:text-lg">
                  {body}
                </div>
              ) : (
                <p className="text-coral text-center">
                  The letter is still empty — write it in{" "}
                  <code>content/letter.md</code>.
                </p>
              )}
            </div>

            <p className="text-center text-sm text-muted mt-8">
              This stays unlocked.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
