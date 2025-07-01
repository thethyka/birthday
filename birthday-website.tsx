"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  Sparkles,
  Gift,
} from "lucide-react";

export default function BirthdayWebsite() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder photos - replace with actual photos later
  const photos = [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ];

  const birthdayMessages = [
    "Happy Birthday to the most amazing person! 🎉",
    "Another year of wonderful memories ahead! ✨",
    "You make every day brighter just by being you! 💖",
    "Here's to celebrating YOU today and always! 🥳",
    "May your special day be filled with love and laughter! 🎂",
  ];

  // Auto-play music when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          console.log("Autoplay prevented by browser");
        });
        setIsPlaying(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Confetti effect
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating balloons */}
        <div className="absolute top-10 left-10 animate-bounce">
          <div className="w-8 h-10 bg-pink-400 rounded-full"></div>
          <div className="w-1 h-8 bg-gray-300 mx-auto"></div>
        </div>
        <div className="absolute top-20 right-20 animate-bounce delay-300">
          <div className="w-8 h-10 bg-purple-400 rounded-full"></div>
          <div className="w-1 h-8 bg-gray-300 mx-auto"></div>
        </div>
        <div className="absolute top-40 left-1/4 animate-bounce delay-700">
          <div className="w-8 h-10 bg-yellow-400 rounded-full"></div>
          <div className="w-1 h-8 bg-gray-300 mx-auto"></div>
        </div>

        {/* Floating hearts */}
        <Heart
          className="absolute top-32 right-1/4 text-pink-300 animate-pulse"
          size={24}
        />
        <Heart
          className="absolute top-64 left-1/3 text-red-300 animate-pulse delay-500"
          size={20}
        />
        <Star
          className="absolute top-48 right-1/3 text-yellow-400 animate-spin"
          size={16}
        />
        <Sparkles
          className="absolute top-80 left-1/4 text-purple-400 animate-pulse delay-1000"
          size={20}
        />

        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 animate-bounce ${
                  [
                    "bg-pink-400",
                    "bg-purple-400",
                    "bg-yellow-400",
                    "bg-red-400",
                    "bg-blue-400",
                  ][i % 5]
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
        {/* Replace with actual birthday song */}
      </audio>

      {/* Music controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={toggleMusic}
          size="sm"
          variant="outline"
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        <Button
          onClick={toggleMute}
          size="sm"
          variant="outline"
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </Button>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              Happy Birthday
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-purple-600 mt-4 animate-bounce">
              Sashah! 🎉
            </h2>
          </div>

          <div className="flex justify-center items-center gap-4 mb-8">
            <Gift className="text-pink-500 animate-spin" size={32} />
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              {"A special day for a special person! ✨"}
            </p>
            <Gift className="text-purple-500 animate-spin" size={32} />
          </div>

          <div className="text-6xl animate-bounce">🎂🎈🎊</div>
        </div>

        {/* Photo Gallery Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Beautiful Memories 📸
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {photos.map((photo, index) => (
              <Card
                key={index}
                className={`overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  index === currentPhotoIndex
                    ? "ring-4 ring-pink-400 scale-105"
                    : ""
                }`}
              >
                <CardContent className="p-0">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50">
                    <p className="text-sm text-gray-600 text-center">
                      Beautiful Memory #{index + 1}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 italic">
              {"Click on any photo to view it larger (feature coming soon!)"}
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Special Video Message 🎬
          </h3>

          <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-pink-100 to-purple-100 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎥</div>
                  <p className="text-xl text-gray-600 mb-4">
                    Your special video will go here!
                  </p>
                  <p className="text-sm text-gray-500">
                    (Replace this placeholder with your video)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Birthday Messages Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Birthday Wishes 💝
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthdayMessages.map((message, index) => (
              <Card
                key={index}
                className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 bg-gradient-to-br from-pink-50 to-purple-50">
                  <div className="text-center">
                    <div className="text-3xl mb-3">
                      {["🎉", "✨", "💖", "🥳", "🎂"][index]}
                    </div>
                    <p className="text-gray-700 font-medium">{message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-pink-100 via-purple-100 to-yellow-100 border-2 border-pink-300">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">🎊🎈🎂🎈🎊</div>
              <h4 className="text-2xl font-bold text-purple-600 mb-4">
                Hope Your Day Is As Special As You Are!
              </h4>
              <p className="text-lg text-gray-700 mb-4">
                {
                  "May this new year of your life be filled with joy, laughter, love, and all the wonderful things you deserve. You're amazing, and I'm so grateful to have you in my life!"
                }
              </p>
              <div className="text-3xl">💕✨🌟✨💕</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
