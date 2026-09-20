"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { BackgroundEffects } from "@/components/background-effects";
import { useUnlock } from "@/components/unlock-provider";
import type { GameId } from "@/lib/progress";
import type { ReactNode } from "react";

export function GameShell({
  id,
  title,
  subtitle,
  children,
}: {
  id: GameId;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const { ready, has } = useUnlock();
  const done = ready && has(id);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-6 sm:py-10 relative z-10 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/games"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-gold transition-colors"
          >
            <ArrowLeft size={15} />
            All games
          </Link>
          {done && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold">
              <Check size={14} /> done
            </span>
          )}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-gradient mb-2">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-cream/60">{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
}

/** Shown under every game once it's finished. */
export function GameDone({ children }: { children: ReactNode }) {
  return (
    <div className="panel p-6 text-center mt-6 animate-bounce-in border-gold/50">
      <div className="text-4xl mb-3">🎉</div>
      <div className="text-cream/80 mb-5">{children}</div>
      <Link
        href="/games"
        className="inline-flex items-center gap-2 bg-gold text-plum font-semibold px-6 py-2.5 rounded-full"
      >
        Back to games
      </Link>
    </div>
  );
}
