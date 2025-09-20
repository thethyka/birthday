"use client";

import { useState, useEffect } from "react";
import { BackgroundEffects } from "../../components/background-effects";

export default function GalleryPage() {
  const [showContent, setShowContent] = useState(false)

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


  const [people, setPeople] = useState<{ name: string; message: string; photoUrl: string }[]>([]);

  useEffect(() => {
  fetch("/people.json")
    .then((res) => res.json())
    .then((data) => setPeople(data));
  }, []);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden flex flex-col items-center">
      <BackgroundEffects />

      {/* Header */}
      <div
        className={`text-center mb-12 ${
          showContent ? "animate-bounce-in" : "opacity-0"
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
          Peeeeeeeeeple
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
          A collection of beautiful peeeeeeeeeple that adore your amazing spirit!
        </p>
      </div>

    </div>
  );
}
