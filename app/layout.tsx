import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "../components/music-provider";
import { Navigation } from "../components/navigation";
import { UnlockProvider } from "../components/unlock-provider";
import { UnlockFanfare } from "../components/unlock-fanfare";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Birthday Sashah 🎂",
  description: "Birthday website for Sashah.",
};

export const viewport: Viewport = {
  themeColor: "#FAF6F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-plum text-cream`}>
        <UnlockProvider>
          <MusicProvider>
            <div className="min-h-screen bg-plum">
              <Navigation />
              <main className="relative">{children}</main>
            </div>
            <UnlockFanfare />
          </MusicProvider>
        </UnlockProvider>
      </body>
    </html>
  );
}
