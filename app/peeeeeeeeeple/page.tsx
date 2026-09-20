"use client";

import { useEffect, useState } from "react";
import { PersonCard } from "@/components/ui/card";
import { BackgroundEffects } from "@/components/background-effects";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { copy } from "@/content/copy";
import { LockedPage } from "@/components/locked-page";

type Person = {
  name: string;
  message: string;
  photoUrl?: string;
};

function LettersPageInner() {
  const [showContent, setShowContent] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPerson = people[currentIndex];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("/people.json")
      .then((res) => res.json())
      .then((data: Person[]) => setPeople(data.filter((p) => p.message)))
      .catch(() => setPeople([]));
  }, []);

  const goPrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : people.length - 1));
  const goNext = () =>
    setCurrentIndex((prev) => (prev < people.length - 1 ? prev + 1 : 0));

  // Arrow keys on desktop.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="min-h-screen pt-16 relative overflow-x-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
        <div
          className={`text-center mb-6 ${showContent ? "animate-bounce-in" : "opacity-0"}`}
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-gradient mb-2">
            {copy.lettersTitle}
          </h1>
          <p className="text-sm sm:text-base text-cream/60 max-w-lg mx-auto">
            {copy.lettersSubtitle}
          </p>
        </div>

        {currentPerson && (
          <div className="relative w-full max-w-5xl mx-auto flex justify-center">
            <PersonCard
              key={currentPerson.name}
              name={currentPerson.name}
              message={currentPerson.message}
              photoUrl={currentPerson.photoUrl}
            />

            <button
              onClick={goPrev}
              aria-label="Previous"
              className="absolute top-1/2 left-0 sm:-left-4 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-surface-2 text-cream border border-gold/25 shadow-lg hover:bg-surface"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={goNext}
              aria-label="Next"
              className="absolute top-1/2 right-0 sm:-right-4 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-surface-2 text-cream border border-gold/25 shadow-lg hover:bg-surface"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        {people.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 max-w-md">
            {people.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setCurrentIndex(i)}
                aria-label={p.name}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex ? "w-6 bg-gold" : "w-1.5 bg-cream/15"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LettersPage() {
  return (
    <LockedPage>
      <LettersPageInner />
    </LockedPage>
  );
}
