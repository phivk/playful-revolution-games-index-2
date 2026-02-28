import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getGames, getGameBySlug } from '@/lib/games';
import { Pillar } from '@/types/game';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const pillarColors: Record<Pillar, string> = {
  intellectual: 'bg-blue-100 text-blue-800',
  social: 'bg-green-100 text-green-800',
  physical: 'bg-orange-100 text-orange-800',
};

const pillarIcons: Record<Pillar, string> = {
  intellectual: '🧠',
  social: '💬',
  physical: '🏃',
};

const energyColors: Record<number, string> = {
  1: 'bg-blue-500',
  2: 'bg-blue-400',
  3: 'bg-yellow-500',
  4: 'bg-red-500',
  5: 'bg-red-600',
};

const tagColors: Record<string, string> = {
  theatre: 'bg-purple-100 text-purple-800',
  collaborative: 'bg-emerald-100 text-emerald-800',
  movement: 'bg-cyan-100 text-cyan-800',
  circle: 'bg-indigo-100 text-indigo-800',
  ball: 'bg-amber-100 text-amber-800',
  table: 'bg-stone-100 text-stone-800',
  competitive: 'bg-rose-100 text-rose-800',
  social: 'bg-pink-100 text-pink-800',
};

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <main className="max-w-4xl mx-auto px-4 py-6">
        <article className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-[#111111] mb-4">
            {game.title}
          </h1>

          <p className="text-lg text-gray-700 mb-6">{game.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className={`text-sm px-3 py-1 rounded-full ${tagColors[tag] ?? 'bg-gray-100 text-gray-800'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex gap-2">
              {game.pillars.map((pillar) => (
                <span
                  key={pillar}
                  className={`text-sm px-3 py-1 rounded ${pillarColors[pillar]}`}
                >
                  {pillarIcons[pillar]} {pillar}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
              <span className="text-sm text-gray-600">Energy:</span>
              <span
                className={`w-3 h-3 rounded-full ${energyColors[game.energy] ?? 'bg-gray-400'}`}
              />
              <span className="text-sm font-medium">{game.energy}</span>
            </div>

            {game.duration > 0 && (
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="text-sm font-medium">{game.duration} min</span>
              </div>
            )}
          </div>

          <hr className="my-6 border-gray-200" />

          {game.resources.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
                Resources
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {game.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </section>
          )}

          <section
            className="text-gray-700 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_strong]:font-bold"
          >
            <ReactMarkdown>{game.body}</ReactMarkdown>
          </section>
        </article>
      </main>

      <footer className="bg-[#111111] text-white py-6 px-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-block bg-[#E53935] hover:bg-[#C62828] text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Browse More Games
          </Link>
          <p className="text-xs opacity-50 mt-4">
            Made with joy by Playful Revolution
          </p>
        </div>
      </footer>
    </div>
  );
}
