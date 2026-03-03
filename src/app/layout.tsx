import type { Metadata } from 'next';
import './globals.css';
import { getGames } from '@/lib/games';
import NavBar from '@/components/NavBar';
import PlaylistAnimations from '@/components/PlaylistAnimations';
import { PlaylistProvider } from '@/contexts/PlaylistContext';
import { PlaylistAnimationProvider } from '@/contexts/PlaylistAnimationContext';

export const metadata: Metadata = {
  title: 'Playful Revolution Games',
  description:
    'A living collection of physical, social, and spontaneous games with facilitation instructions',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const games = await getGames();
  return (
    <html lang="en">
      <body className="antialiased">
        <PlaylistProvider>
          <PlaylistAnimationProvider>
            <NavBar games={games} />
            {children}
            <PlaylistAnimations />
          </PlaylistAnimationProvider>
        </PlaylistProvider>
      </body>
    </html>
  );
}
