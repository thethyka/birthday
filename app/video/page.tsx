"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackgroundEffects } from "../../components/background-effects"
import { Play, Heart, Star } from "lucide-react"

export default function VideoPage() {
  const [showContent, setShowContent] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  const videoSources = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://samplelib.com/mp4/sample-5s.mp4"
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handlePlay = () => {
    setShowPlayer(true)
    setCurrentVideo(0)
  }

  const handleEnded = () => {
    setCurrentVideo((prev) => (prev + 1) % videoSources.length)
  }

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 ${showContent ? "animate-bounce-in" : "opacity-0"}`}>
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">Special Video 🎬</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            {"A heartfelt video message created especially for your special day!"}
          </p>
        </div>

        {/* Video Section */}
        <Card
          className={`max-w-5xl mx-auto glass-effect border-2 border-pink-200 mb-12 ${showContent ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 aspect-video flex items-center justify-center rounded-t-lg">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">🎥</div>
                <h3 className="text-3xl font-bold text-purple-600 mb-4">Your Special Video</h3>
                <p className="text-xl text-gray-600 mb-6 max-w-2xl">
                  {" "}
                </p>
                {showPlayer ? (
                  <video
                    key={currentVideo}
                    src={videoSources[currentVideo]}
                    controls
                    autoPlay
                    onEnded={handleEnded}
                    className="rounded-lg mx-auto max-h-[60vh]"
                  />
                ) : (
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full text-lg" onClick={handlePlay}>
                    <Play className="mr-2" size={20} />
                    Play Video
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card
            className={`glass-effect border-2 border-pink-200 card-hover ${showContent ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: "0.6s" }}
          >
            <CardContent className="p-8 text-center">
              <Heart className="mx-auto text-red-500 mb-4 animate-pulse" size={48} />
              <h4 className="text-xl font-bold text-purple-600 mb-3">Made with Love</h4>
              <p className="text-gray-600">Every frame crafted with care and affection just for you</p>
            </CardContent>
          </Card>

          <Card
            className={`glass-effect border-2 border-purple-200 card-hover ${showContent ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: "0.8s" }}
          >
            <CardContent className="p-8 text-center">
              <Star className="mx-auto text-yellow-500 mb-4 animate-sparkle" size={48} />
              <h4 className="text-xl font-bold text-purple-600 mb-3">Special Moments</h4>
              <p className="text-gray-600">Capturing the essence of what makes you extraordinary</p>
            </CardContent>
          </Card>

          <Card
            className={`glass-effect border-2 border-yellow-200 card-hover ${showContent ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: "1s" }}
          >
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h4 className="text-xl font-bold text-purple-600 mb-3">Birthday Magic</h4>
              <p className="text-gray-600">Celebrating another year of your amazing journey</p>
            </CardContent>
          </Card>
        </div>

        {/* Video Message */}
        <Card
          className={`max-w-3xl mx-auto glass-effect border-2 border-pink-300 ${showContent ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "1.2s" }}
        >
          <CardContent className="p-8 text-center bg-gradient-animated">
            <div className="text-5xl mb-4">💝</div>
            <h3 className="text-3xl font-bold text-white mb-4">A Message from the Heart</h3>
            <p className="text-white text-lg leading-relaxed">
              {`This video was created to show you just how special you are. Every smile, every laugh, 
              every moment of joy you bring to others - it all deserves to be celebrated. You're not just 
              having another birthday; you're marking another year of being absolutely wonderful!`}
            </p>
            <div className="text-4xl mt-6">✨💕✨</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
