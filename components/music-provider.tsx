"use client";

import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMusic: () => void;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

/** Add or remove entries here; one is picked at random on load. */
const TRACKS = ["/september.mp3", "/lets-groove.mp3"];

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [track, setTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Picked after mount, not during render: the server has no idea which one it
  // rolled, so choosing during render would mismatch the hydrated HTML.
  useEffect(() => {
    setTrack(TRACKS[Math.floor(Math.random() * TRACKS.length)]);
  }, []);

  useEffect(() => {
    if (!track) return;
    const el = audioRef.current;
    if (!el) return;

    // Try immediately — works when the browser allows it (media autoplay
    // permitted, or she's interacted with the site before).
    el.play().catch(() => {
      /* blocked; the listeners below cover it */
    });

    // Otherwise start on the first thing she touches. Browsers treat a pointer
    // or key event as the gesture that unblocks audio, so by the time she's
    // tapped into anything the track is already running.
    const start = () => {
      el.play().catch(() => {});
    };
    const opts = { once: true } as const;
    window.addEventListener("pointerdown", start, opts);
    window.addEventListener("keydown", start, opts);
    window.addEventListener("touchstart", start, opts);

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
    };
  }, [track]);

  const toggleMusic = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) el.pause();
    else el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <MusicContext.Provider
      value={{ isPlaying, isMuted, toggleMusic, toggleMute }}
    >
      {/* preload="metadata" so an 8MB track isn't pulled down before she's
          even decided to stay on the page. */}
      {track && (
        <audio
          ref={audioRef}
          src={track}
          loop
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="glass-effect rounded-full w-11 h-11 grid place-items-center text-gold hover:bg-cream/10"
        >
          {isPlaying ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="glass-effect rounded-full w-11 h-11 grid place-items-center text-gold hover:bg-cream/10"
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
