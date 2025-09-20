import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "../components/music-provider";
import { Navigation } from "../components/navigation";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Birthday Sashah! 🎉",
  description: "A special birthday website created with love for Sashah",
  generator: "Shivam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <MusicProvider>
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-500">
              <Navigation />
              <main className="relative">{children}</main>
            </div>
          </MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
