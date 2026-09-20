"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Camera, Heart, Gamepad2, Mail, Cake } from "lucide-react";
import { useUnlock } from "./unlock-provider";

const navItems = [
  { href: "/", label: "Home", icon: Home, gated: false },
  { href: "/gallery", label: "Gallery", icon: Camera, gated: true },
  { href: "/peeeeeeeeeple", label: "Letters", icon: Heart, gated: true },
  { href: "/games", label: "Games", icon: Gamepad2, gated: false },
];

export function Navigation() {
  const pathname = usePathname();
  const { ready, count, required, unlocked, memories } = useUnlock();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-gold/15">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-gold font-bold text-base sm:text-xl shrink-0"
          >
            <Cake size={22} className="text-coral" />
            <span className="hidden xs:inline sm:inline">Sashah</span>
          </Link>

          <div className="flex items-center gap-0.5 sm:gap-1">
            {navItems
              .filter((item) => !item.gated || (ready && memories))
              .map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
                    active
                      ? "bg-gold text-plum font-semibold shadow-lg"
                      : "text-cream/80 hover:bg-cream/8 hover:text-gold"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              );
            })}

            {/* Appears only once she's earned it, then stays forever. */}
            {ready && unlocked && (
              <Link
                href="/letter"
                className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
                  pathname === "/letter"
                    ? "bg-coral text-plum font-semibold shadow-lg"
                    : "text-coral hover:bg-cream/8"
                }`}
              >
                <Mail size={16} />
                <span className="hidden md:inline">Letter</span>
                {pathname !== "/letter" && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral animate-sparkle" />
                )}
              </Link>
            )}
          </div>

          {/* Lock progress — she needs to see there's something to unlock. */}
          {ready && !unlocked && (
            <div
              className="flex items-center gap-1 shrink-0"
              title={`${count} of ${required}`}
              aria-label={`${count} of ${required} games done`}
            >
              {Array.from({ length: required }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm sm:text-base transition-all duration-500 ${
                    i < count ? "opacity-100 scale-110" : "opacity-30 grayscale"
                  }`}
                >
                  {i < count ? "🔓" : "🔒"}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
