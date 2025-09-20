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

export default function GalleryPage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch people.json
  useEffect(() => {
    fetch("/people.json")
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  // Navigation handlers
  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : people.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < people.length - 1 ? prev + 1 : 0));
  };

  const currentPerson = people[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <BackgroundEffects />

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Peeeeeeeeeple
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          A collection of beautiful peeeeeeeeeple that adore your amazing spirit!
        </p>
      </div>

      {/* Carousel Container */}
      {currentPerson && (
        <div className="relative flex items-center">
          {/* Left Button */}
          <button
            onClick={goPrev}
            className="absolute left-[-50px] p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Person Card */}
          <PersonCard
            key={currentPerson.name}
            name={currentPerson.name}
            message={currentPerson.message}
            photoUrl={currentPerson.photoUrl}
          />

          {/* Right Button */}
          <button
            onClick={goNext}
            className="absolute right-[-50px] p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      {/* Footer / index */}
      {people.length > 0 && (
        <p className="mt-6 text-gray-600">
          {currentIndex + 1} / {people.length}
        </p>
      )}
    </div>
  );
}
