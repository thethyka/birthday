"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, Heart, Lock, Mail } from "lucide-react";
import { BackgroundEffects } from "@/components/background-effects";
import { useUnlock } from "@/components/unlock-provider";
import { copy } from "@/content/copy";

export default function HomePage() {
  const [show, setShow] = useState(false);
  const { ready, count, required, unlocked, memories } = useUnlock();

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-10 sm:py-16 relative z-10">
        {/* Hero */}
        <div
          className={`text-center mb-14 ${show ? "animate-bounce-in" : "opacity-0"}`}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-gradient mb-6 leading-[1.05]">
            {copy.heroTitle}
          </h1>

          <p className="text-base sm:text-xl text-cream/75 max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
            {copy.heroSubtitle}
          </p>
        </div>

        {/* Primary CTA — without this she never finds the games. */}
        <div
          className={`max-w-xl mx-auto mb-14 ${show ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "0.25s" }}
        >
          <Link
            href="/games"
            className="group block panel p-7 sm:p-9 text-center card-hover animate-glow"
          >
            <div className="text-5xl mb-4">🎁</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-3">
              {copy.gamesTitle}
            </h2>
            <p className="text-cream/70 mb-6">{copy.gamesIntro}</p>

            <span className="inline-flex items-center gap-2 bg-gold text-plum font-semibold px-7 py-3 rounded-full group-hover:gap-3 transition-all">
              {copy.gamesCta}
              <ArrowRight size={18} />
            </span>

            {ready && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
                {unlocked ? (
                  <>
                    <Mail size={15} className="text-coral" />
                    <span>Letter unlocked.</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>
                      {count} of {required} — something opens at {required}
                    </span>
                  </>
                )}
              </div>
            )}
          </Link>
        </div>

        {/* Secondary routes — hidden until she's finished one game. */}
        {ready && memories && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto animate-slide-up"
          >
            <Link href="/peeeeeeeeeple" className="panel p-6 card-hover">
              <Heart className="text-coral mb-3" size={26} />
              <h3 className="text-lg font-bold text-gold mb-1.5">
                {copy.lettersTitle}
              </h3>
              <p className="text-sm text-cream/60">{copy.lettersSubtitle}</p>
            </Link>

            <Link href="/gallery" className="panel p-6 card-hover">
              <Camera className="text-gold mb-3" size={26} />
              <h3 className="text-lg font-bold text-gold mb-1.5">
                {copy.galleryTitle}
              </h3>
              <p className="text-sm text-cream/60">2025 and 2026.</p>
            </Link>
          </div>
        )}

        <footer className="mt-20 text-center text-sm text-muted">
          <p>{copy.footer}</p>
        </footer>
      </div>
    </div>
  );
}
