"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, PersonCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackgroundEffects } from "../../components/background-effects"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

export default function GalleryPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const [people, setPeople] = useState<{ name: string; message: string; photoUrl: string }[]>([]);

  useEffect(() => {
  fetch("/people.json")
    .then((res) => res.json())
    .then((data) => setPeople(data));
  }, []);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 ${showContent ? "animate-bounce-in" : "opacity-0"}`}>
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">Peeeeeeeeeple</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            {"A collection of beautiful peeeeeeeeeple that adore your amazing spirit!"}
          </p>
        </div>

        {/* People Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person) => (
            <PersonCard
              key={person.name}
              name={person.name}
              message={person.message}
              photoUrl={person.photoUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
