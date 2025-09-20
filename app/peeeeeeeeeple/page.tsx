"use client";

import { useState, useEffect } from "react";
import { PersonCard } from "../../components/ui/card";
import { BackgroundEffects } from "../../components/background-effects";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Person = {
  name: string;
  message?: string;
  photoUrl?: string;
};

export default function PeopleCarouselPage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Animate header
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch people.json
  useEffect(() => {
    fetch("/people.json")
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  const currentPerson = people[currentIndex];

  // Navigation handlers
  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : people.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < people.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen pt-16 relative">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-12 relative z-10 h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div
          className={`text-center mb-6 ${showContent ? "animate-bounce-in" : "opacity-0"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            Peeeeeeeeeple
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            A collection of beautiful peeeeeeeeeple that adore your amazing
            spirit!
          </p>
        </div>

        {/* Carousel */}
        <div className="flex-1 flex items-center justify-center relative">
          {currentPerson && (
            <>
              {/* Left Button */}
              <button
                onClick={goPrev}
                className="absolute left-0 p-3 bg-white rounded-full shadow hover:bg-gray-100 -translate-x-1/2"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Card Container: limit height to 80% of carousel area */}
              <div className="max-h-[80%] aspect-square">
                <PersonCard
                  key={currentPerson.name}
                  name={currentPerson.name}
                  message={currentPerson.message}
                  photoUrl={currentPerson.photoUrl}
                />
              </div>

              {/* Right Button */}
              <button
                onClick={goNext}
                className="absolute right-0 p-3 bg-white rounded-full shadow hover:bg-gray-100 translate-x-1/2"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
        </div>

        {/* Footer / Index */}
        {people.length > 0 && (
          <p className="mt-6 text-gray-600 text-center">
            {currentIndex + 1} / {people.length}
          </p>
        )}
      </div>
    </div>
  );
}
