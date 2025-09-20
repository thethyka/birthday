"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, PersonCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackgroundEffects } from "../../components/background-effects"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

export default function GalleryPage() {
  const [showContent, setShowContent] = useState(false)
  
  const people = [
    { name: "Angie", message: "Happy Birthday! You're amazing!", photoUrl: "/people/Angie/IMG_7196.JPG" },
    { name: "Bianca", message: "Wishing you the happiest of birthdays!", photoUrl: undefined },
    { name: "Bryce", message: "Hope your special day is wonderful!", photoUrl: "/people/Bryce/IMG_7198.JPG" },
    { name: "Caitlin", message: "Have the most fantastic birthday!", photoUrl: "/people/Caitlin/IMG_7201.JPG" },
    { name: "Cate", message: "Celebrating you today and always!", photoUrl: "/people/Cate/IMG_7188.JPG" },
    { name: "Ellie", message: "You deserve all the joy on your birthday!", photoUrl: "/people/Ellie/IMG_7186.JPG" },
    { name: "Karam", message: "Sending you birthday wishes and love!", photoUrl: undefined },
    { name: "Karan", message: "Hope your birthday is as special as you are!", photoUrl: undefined },
    { name: "Kayden", message: "Have an incredible birthday celebration!", photoUrl: "/people/Kayden/IMG_7205.JPG" },
    { name: "Luis", message: "Wishing you happiness on your special day!", photoUrl: undefined },
    { name: "Nathan", message: "Hope your birthday is filled with fun!", photoUrl: "/people/Nathan/IMG_7194.JPG" },
    { name: "Riva", message: "Celebrating another year of your awesomeness!", photoUrl: undefined },
    { name: "Robyn", message: "Have the best birthday ever!", photoUrl: "/people/Robyn/IMG_7199.JPG" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

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
