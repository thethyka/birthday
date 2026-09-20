"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BackgroundEffects } from "@/components/background-effects";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { copy } from "@/content/copy";
import { LockedPage } from "@/components/locked-page";

function GalleryPageInner() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/gallery-images.json")
      .then((res) => res.json())
      .then((files: string[]) => {
        const arr = [...files];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        if (!cancelled) setPhotos(arr.map((f) => `/groupImages/${f}`));
      })
      .catch((e) => console.warn(e));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 250);
    return () => clearTimeout(t);
  }, []);

  const next = useCallback(
    () => setSelected((s) => (s === null ? s : (s + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () =>
      setSelected((s) =>
        s === null ? s : s === 0 ? photos.length - 1 : s - 1
      ),
    [photos.length]
  );

  // Keyboard controls for the lightbox — Esc especially, which the old
  // version had no handler for at all.
  useEffect(() => {
    if (selected === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, next, prev]);

  // Lock background scroll while the lightbox is open.
  useEffect(() => {
    if (selected === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  }

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div
          className={`text-center mb-10 ${showContent ? "animate-bounce-in" : "opacity-0"}`}
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-gradient mb-3">
            {copy.galleryTitle}
          </h1>
          <p className="text-sm text-muted">{photos.length} photos</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((src, index) => (
            <button
              key={src}
              onClick={() => setSelected(index)}
              className={`group relative rounded-xl overflow-hidden panel p-0 card-hover ${
                showContent ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${Math.min(index * 0.04, 0.8)}s` }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-40 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-plum/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      {selected !== null && photos[selected] && (
        <div
          className="fixed inset-0 bg-plum-deep/95 backdrop-blur-sm z-50 flex items-center justify-center p-3"
          onClick={() => setSelected(null)}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <ChevronRight size={22} />
          </button>

          <img
            src={photos[selected]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />

          <p className="absolute bottom-5 left-0 right-0 text-center text-xs text-muted">
            {selected + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <LockedPage>
      <GalleryPageInner />
    </LockedPage>
  );
}
