"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundEffects } from "../components/background-effects";
import { ArrowRight, Gift, Sparkles, Heart } from "lucide-react";
import { getBirthdayPersonName } from "@/lib/config";

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);
  const birthdayPersonName = getBirthdayPersonName();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div
          className={`text-center mb-16 ${
            showContent ? "animate-bounce-in" : "opacity-0"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gradient mb-4">
              Happy Birthday
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-purple-600 animate-bounce">
              {birthdayPersonName}! 🎉
            </h2>
          </div>

          <div className="flex justify-center items-center gap-4 mb-8">
            <Gift className="text-pink-500 animate-spin" size={32} />
            <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl">
              {
                "Welcome to your very special birthday celebration! This website was created with love just for you ✨"
              }
            </p>
            <Gift className="text-purple-500 animate-spin" size={32} />
          </div>

          <div className="text-6xl md:text-8xl animate-bounce mb-8">🎂🎈🎊</div>
        </div>

        {/* Welcome Message */}
        <Card
          className={`max-w-4xl mx-auto mb-16 glass-effect border-2 border-pink-200 ${
            showContent ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          <CardContent className="p-8 md:p-12 text-center">
            <Sparkles
              className="mx-auto text-purple-500 mb-6 animate-sparkle"
              size={48}
            />
            <h3 className="text-3xl md:text-4xl font-bold text-purple-600 mb-6">
              A Special Day for a Special Person
            </h3>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              {`Today is all about celebrating YOU, ${birthdayPersonName}! Your kindness, your laughter, your amazing spirit - 
              everything that makes you absolutely wonderful. This website is filled with memories, love, and 
              all the reasons why you're so special to everyone who knows you.`}
            </p>
            <div className="flex justify-center gap-4 text-4xl">💕✨🌟✨💕</div>
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="/gallery">
            <Card
              className={`card-hover glass-effect border-2 border-pink-200 h-full ${
                showContent ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                <div className="text-6xl mb-4">📸</div>
                <h4 className="text-2xl font-bold text-purple-600 mb-4">
                  Photo Gallery
                </h4>
                <p className="text-gray-600 mb-4">
                  Beautiful memories captured in time
                </p>
                <ArrowRight className="mx-auto text-pink-500" size={24} />
              </CardContent>
            </Card>
          </Link>

          <Link href="/video">
            <Card
              className={`card-hover glass-effect border-2 border-purple-200 h-full ${
                showContent ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.8s" }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                <div className="text-6xl mb-4">🎬</div>
                <h4 className="text-2xl font-bold text-purple-600 mb-4">
                  Special Video
                </h4>
                <p className="text-gray-600 mb-4">
                  A heartfelt message just for you
                </p>
                <ArrowRight className="mx-auto text-purple-500" size={24} />
              </CardContent>
            </Card>
          </Link>

        </div>

        {/* Birthday Countdown or Age Celebration */}
        <Card
          className={`max-w-2xl mx-auto glass-effect border-2 border-pink-300 ${
            showContent ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "1.2s" }}
        >
          <CardContent className="p-8 text-center bg-gradient-animated">
            <Heart
              className="mx-auto text-red-500 mb-4 animate-pulse"
              size={48}
            />
            <h4 className="text-3xl font-bold text-white mb-4">
              Another Year of Awesome!
            </h4>
            <p className="text-white text-lg mb-4">
              {
                "Here's to another year of adventures, laughter, and making beautiful memories together!"
              }
            </p>
            <div className="text-4xl">🥳🎉🎂🎉🥳</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
