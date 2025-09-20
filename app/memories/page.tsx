"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundEffects } from "../../components/background-effects";
import { Heart, Star, Sparkles, Gift } from "lucide-react";

export default function MemoriesPage() {
  const [showContent, setShowContent] = useState(false);

  const memories = [
    {
      title: "Your Infectious Laughter",
      content:
        "The way you light up a room with your genuine laughter is absolutely magical. It's impossible not to smile when you're around! 😊",
      icon: "😄",
      color: "pink",
    },
    {
      title: "Your Kind Heart",
      content:
        "Your compassion and kindness towards everyone you meet is truly inspiring. You make the world a better place just by being in it! 💕",
      icon: "💖",
      color: "red",
    },
    {
      title: "Your Amazing Spirit",
      content:
        "Your positive energy and zest for life is contagious. You approach every challenge with grace and every opportunity with enthusiasm! ✨",
      icon: "🌟",
      color: "yellow",
    },
    {
      title: "Your Friendship",
      content:
        "Having you as a friend is one of life's greatest gifts. Your loyalty, support, and genuine care mean more than words can express! 🤗",
      icon: "👭",
      color: "purple",
    },
    {
      title: "Your Strength",
      content:
        "The way you handle life's ups and downs with such grace and resilience is truly admirable. You're stronger than you know! 💪",
      icon: "💪",
      color: "blue",
    },
    {
      title: "Your Dreams",
      content:
        "Watching you pursue your dreams with such passion and determination is incredibly inspiring. Keep reaching for the stars! 🌠",
      icon: "🌟",
      color: "indigo",
    },
  ];

  const birthdayWishes = [
    "May this new year bring you endless joy and beautiful surprises! 🎉",
    "Here's to another year of amazing adventures and wonderful memories! ✨",
    "May all your dreams come true and your heart be filled with happiness! 💝",
    "Wishing you love, laughter, and everything your heart desires! 💕",
    "May this birthday be the beginning of your best year yet! 🌟",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      pink: "border-pink-200 bg-pink-50",
      red: "border-red-200 bg-red-50",
      yellow: "border-yellow-200 bg-yellow-50",
      purple: "border-purple-200 bg-purple-50",
      blue: "border-blue-200 bg-blue-50",
      indigo: "border-indigo-200 bg-indigo-50",
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 ${
            showContent ? "animate-bounce-in" : "opacity-0"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            Sweet Memories 💝
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            {
              "A collection of thoughts, wishes, and all the reasons why you're absolutely amazing!"
            }
          </p>
        </div>

        {/* Memories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {memories.map((memory, index) => (
            <Card
              key={index}
              className={`card-hover glass-effect border-2 ${getColorClasses(
                memory.color
              )} ${showContent ? "animate-slide-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{memory.icon}</div>
                  <h3 className="text-xl font-bold text-purple-600">
                    {memory.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  {memory.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Birthday Wishes */}
        <div className="mb-16">
          <h2
            className={`text-4xl font-bold text-center text-purple-600 mb-8 ${
              showContent ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.8s" }}
          >
            Birthday Wishes 🎂
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {birthdayWishes.map((wish, index) => (
              <Card
                key={index}
                className={`glass-effect border-2 border-pink-200 card-hover ${
                  showContent ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">
                    {["🎉", "✨", "💝", "💕", "🌟"][index]}
                  </div>
                  <p className="text-gray-700 font-medium text-lg">{wish}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <Card
          className={`max-w-4xl mx-auto glass-effect border-2 border-pink-300 ${
            showContent ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "1.5s" }}
        >
          <CardContent className="p-8 md:p-12 text-center bg-gradient-animated">
            <Gift
              className="mx-auto text-white mb-6 animate-bounce"
              size={64}
            />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The Greatest Gift
            </h3>
            <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
              {`The greatest gift isn't something that can be wrapped or bought - it's having someone like you 
              in our lives. Your presence is a present, your friendship is a treasure, and your birthday is 
              a celebration of all the joy you bring to this world. Thank you for being exactly who you are, 
              Sashah. You are loved, appreciated, and celebrated today and always!`}
            </p>
            <div className="flex justify-center items-center gap-4 text-4xl">
              <Heart className="text-red-300 animate-pulse" size={32} />
              <Sparkles className="text-yellow-300 animate-sparkle" size={32} />
              <Star className="text-blue-300 animate-spin" size={32} />
              <Sparkles className="text-pink-300 animate-sparkle" size={32} />
              <Heart className="text-purple-300 animate-pulse" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
