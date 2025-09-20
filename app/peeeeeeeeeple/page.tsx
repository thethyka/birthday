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

        {/* Single Person Card */}
        {currentPerson && (
          <div className="relative w-full max-w-md mx-auto">
            <PersonCard
              key={currentPerson.name}
              name={currentPerson.name}
              message={currentPerson.message}
              photoUrl={currentPerson.photoUrl}
            />

            {/* Navigation Buttons */}
            <button
              onClick={goPrev}
              className="absolute top-1/2 -left-12 transform -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-100"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={goNext}
              className="absolute top-1/2 -right-12 transform -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-100"
            >
              <ChevronRight size={28} />
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
