"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { BackgroundEffects } from "./background-effects";
import { useUnlock } from "./unlock-provider";
import type { ReactNode } from "react";

/**
 * Wraps a page that's hidden until she's played something.
 *
 * The nav already hides these links, but this guards the route itself — a
 * bookmark or a typed URL would otherwise walk straight past the gate.
 */
export function LockedPage({ children }: { children: ReactNode }) {
  const { ready, memories } = useUnlock();

  // Render nothing until localStorage has been read, otherwise the lock screen
  // flashes up for a frame on every visit after the first.
  if (!ready) return null;

  if (memories) return <>{children}</>;

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />
      <div className="container mx-auto px-4 py-16 relative z-10 max-w-md">
        <div className="panel p-10 text-center animate-bounce-in">
          <Lock className="mx-auto text-muted mb-4" size={36} />
          <h1 className="text-2xl font-bold text-gold mb-3">Locked</h1>
          <p className="text-cream/70 mb-7">
            Finish one game and this opens.
          </p>
          <Link
            href="/games"
            className="inline-block bg-gold text-plum font-semibold px-7 py-3 rounded-full"
          >
            Play
          </Link>
        </div>
      </div>
    </div>
  );
}
