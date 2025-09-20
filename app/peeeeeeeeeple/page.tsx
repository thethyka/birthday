"use client";

import { useState, useEffect } from "react";
import { PersonCard } from "@/components/ui/card";
import { BackgroundEffects } from "../../components/background-effects";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Person = {
  name: string;
  message: string;
  photoUrl?: string;
};

export default function GalleryPage() {
  const [showContent, setShowContent] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get current person
  const currentPerson = people[currentIndex];

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

  // Handle navigation
  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : people.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < people.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen pt-16 relative overflow-x-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-12 relative z-10 h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div
          className={`text-center mb-6 ${showContent ? "animate-bounce-in" : "opacity-0"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            ❤️❤️❤️
          </h1>
        </div>

        {/* Single Person Card (larger) */}
        {currentPerson && (
          <div className="relative w-full max-w-5xl mx-auto flex justify-center">
            <PersonCard
              key={currentPerson.name}
              name={currentPerson.name}
              message={currentPerson.message}
              photoUrl={currentPerson.photoUrl}
            />

            {/* Navigation Buttons */}
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goNext}
              aria-label="Next"
              className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

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
