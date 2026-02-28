import type { Metadata } from "next";
import "./globals.css";
import gamesData from "@/data/games.json";
import NavBar from "@/components/NavBar";
import { Game } from "@/types/game";

export const metadata: Metadata = {
  title: "Playful Revolution Games",
  description: "A living collection of physical, social, and spontaneous games with facilitation instructions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const games = gamesData.games as Game[];
  return (
    <html lang="en">
      <body className="antialiased">
        <NavBar games={games} />
        {children}
      </body>
    </html>
  );
}
