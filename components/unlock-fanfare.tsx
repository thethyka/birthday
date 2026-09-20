"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUnlock } from "./unlock-provider";
import { copy } from "@/content/copy";

type Stage = "locks" | "envelope" | "open" | "done";

const CONFETTI_COLORS = ["#B5713F", "#CBA06B", "#C98B6E", "#A9757F"];

/**
 * Plays once, the moment the third game is finished. Tapping anywhere skips
 * straight to the letter — it should never feel like something she has to sit
 * through.
 */
export function UnlockFanfare() {
  const { celebrating, endCelebration } = useUnlock();
  const [stage, setStage] = useState<Stage>("locks");
  const router = useRouter();

  useEffect(() => {
    if (!celebrating) return;
    setStage("locks");
    const timers = [
      setTimeout(() => setStage("envelope"), 1100),
      setTimeout(() => setStage("open"), 2100),
      setTimeout(() => setStage("done"), 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [celebrating]);

  useEffect(() => {
    if (stage === "done" && celebrating) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, celebrating]);

  function finish() {
    endCelebration();
    router.push("/letter");
  }

  if (!celebrating) return null;

  return (
    <div
      onClick={finish}
      role="presentation"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-plum/95 backdrop-blur-md px-6 cursor-pointer"
    >
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute block w-2 h-3 animate-confetti"
            style={{
              left: `${(i * 37) % 100}%`,
              backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
              animationDelay: `${(i % 12) * 0.13}s`,
            }}
          />
        ))}
      </div>

      {/* Three locks snapping together */}
      {stage === "locks" && (
        <div className="flex items-center gap-6 text-6xl">
          {[-1, 0, 1].map((pos, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                ["--lx" as string]: `${pos * 90}px`,
                animation: "lock-converge 1s cubic-bezier(.5,-0.4,.3,1.5) both",
              }}
            >
              🔓
            </span>
          ))}
        </div>
      )}

      {/* Envelope */}
      {(stage === "envelope" || stage === "open") && (
        <div
          className="relative"
          style={{
            animation:
              stage === "envelope" ? "envelope-drop .9s ease-out both" : undefined,
          }}
        >
          <div className="relative w-[17rem] sm:w-80 h-44 sm:h-52 [perspective:900px]">
            {/* The letter itself, sliding up out of the envelope */}
            <div
              className="absolute left-4 right-4 top-2 bottom-8 rounded-sm bg-white shadow-xl border border-cream/10"
              style={{
                animation:
                  stage === "open"
                    ? "letter-rise .9s .45s cubic-bezier(.2,.8,.3,1) both"
                    : undefined,
                opacity: stage === "open" ? undefined : 0,
              }}
            >
              <div className="p-5 space-y-2">
                <div className="h-2 w-2/3 rounded bg-cream/20" />
                <div className="h-2 w-full rounded bg-cream/12" />
                <div className="h-2 w-5/6 rounded bg-cream/12" />
                <div className="h-2 w-3/4 rounded bg-cream/12" />
              </div>
            </div>

            {/* Body */}
            <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#EFE2D2] to-[#E3D2BD] border border-gold/30 shadow-lg" />

            {/* Flap */}
            <div
              className="absolute left-0 right-0 top-0 h-1/2 origin-top rounded-t-md border-x border-t border-gold/30 bg-gradient-to-b from-[#E8D9C6] to-[#DCC8B0]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                animation:
                  stage === "open"
                    ? "flap-open .55s ease-in both"
                    : undefined,
                transformStyle: "preserve-3d",
              }}
            />

            {/* Wax seal */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold shadow-md grid place-items-center text-plum font-bold text-lg z-10"
              style={{
                animation:
                  stage === "open" ? "seal-crack .45s ease-in both" : undefined,
              }}
            >
              25
            </div>
          </div>
        </div>
      )}

      <p className="relative mt-10 text-center text-xl sm:text-2xl font-semibold text-gold max-w-md">
        {copy.unlockLine}
      </p>
      <p className="relative mt-3 text-sm text-muted">tap to keep going</p>
    </div>
  );
}
