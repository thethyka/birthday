"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackgroundEffects } from "../../components/background-effects";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);

  const photos = [
    {
      src: "/images/dummy1.jpg",
      title: "Dummy Photo 1",
      description: "This is a placeholder description for photo 1.",
    },
    {
      src: "/images/dummy2.jpg",
      title: "Dummy Photo 2",
      description: "This is a placeholder description for photo 2.",
    },
    {
      src: "/images/dummy3.jpg",
      title: "Dummy Photo 3",
      description: "This is a placeholder description for photo 3.",
    },
    {
      src: "/images/dummy4.jpg",
      title: "Dummy Photo 4",
      description: "This is a placeholder description for photo 4.",
    },
    {
      src: "/images/dummy5.jpg",
      title: "Dummy Photo 5",
      description: "This is a placeholder description for photo 5.",
    },
    {
      src: "/images/dummy6.jpg",
      title: "Dummy Photo 6",
      description: "This is a placeholder description for photo 6.",
    },
    {
      src: "/images/dummy7.jpg",
      title: "Dummy Photo 7",
      description: "This is a placeholder description for photo 7.",
    },
    {
      src: "/images/dummy8.jpg",
      title: "Dummy Photo 8",
      description: "This is a placeholder description for photo 8.",
    },
    {
      src: "/images/dummy9.jpg",
      title: "Dummy Photo 9",
      description: "This is a placeholder description for photo 9.",
    },
    {
      src: "/images/dummy10.jpg",
      title: "Dummy Photo 10",
      description: "This is a placeholder description for photo 10.",
    },
    {
      src: "/images/dummy11.jpg",
      title: "Dummy Photo 11",
      description: "This is a placeholder description for photo 11.",
    },
    {
      src: "/images/dummy12.jpg",
      title: "Dummy Photo 12",
      description: "This is a placeholder description for photo 12.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(
        selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1,
      );
    }
  };

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 ${showContent ? "animate-bounce-in" : "opacity-0"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            Photo Gallery 📸
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            {
              "A collection of beautiful memories and moments that capture your amazing spirit!"
            }
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {photos.map((photo, index) => (
            <Card
              key={index}
              className={`card-hover glass-effect border-2 border-pink-200 cursor-pointer overflow-hidden ${
                showContent ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPhoto(index)}
            >
              <CardContent className="p-0">
                <div className="relative group">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="font-bold text-lg">{photo.title}</h4>
                      <p className="text-sm opacity-90">{photo.description}</p>
                    </div>
                  </div>
                  <Heart
                    className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size={24}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Photo Modal */}
        {selectedPhoto !== null && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <Button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-12 h-12 p-0"
              >
                ✕
              </Button>

              <Button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-12 h-12 p-0"
              >
                <ChevronLeft size={24} />
              </Button>

              <Button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-12 h-12 p-0"
              >
                <ChevronRight size={24} />
              </Button>

              <Card className="glass-effect border-2 border-white/20">
                <CardContent className="p-0">
                  <img
                    src={photos[selectedPhoto].src || "/placeholder.svg"}
                    alt={photos[selectedPhoto].title}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">
                      {photos[selectedPhoto].title}
                    </h3>
                    <p className="text-gray-700 text-lg">
                      {photos[selectedPhoto].description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Gallery Stats */}
        <Card
          className={`max-w-2xl mx-auto glass-effect border-2 border-purple-200 ${showContent ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "1s" }}
        >
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              Gallery Stats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-500">
                  {photos.length}
                </div>
                <div className="text-gray-600">Photos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-500">∞</div>
                <div className="text-gray-600">Memories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-500">100%</div>
                <div className="text-gray-600">Amazing</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
