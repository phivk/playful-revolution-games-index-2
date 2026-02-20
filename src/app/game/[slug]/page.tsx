import { notFound } from 'next/navigation';
import Link from 'next/link';
import gamesData from '@/data/games.json';
import { Game } from '@/types/game';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const pillarColors: Record<string, string> = {
  Intellectual: 'bg-blue-100 text-blue-800',
  Social: 'bg-green-100 text-green-800',
  Physical: 'bg-orange-100 text-orange-800',
};

const pillarIcons: Record<string, string> = {
  Intellectual: '🧠',
  Social: '💬',
  Physical: '🏃',
};

const energyColors: Record<string, string> = {
  Low: 'bg-blue-500',
  Medium: 'bg-yellow-500',
  High: 'bg-red-500',
};

const tagColors: Record<string, string> = {
  'Social Spontaneity': 'bg-purple-100 text-purple-800',
  'Group Circle Games': 'bg-indigo-100 text-indigo-800',
  'Collaborative': 'bg-emerald-100 text-emerald-800',
  'Competitive': 'bg-rose-100 text-rose-800',
  'Ball Games': 'bg-amber-100 text-amber-800',
  'Theatre Sports': 'bg-pink-100 text-pink-800',
  'Movement': 'bg-cyan-100 text-cyan-800',
  'Table Games': 'bg-stone-100 text-stone-800',
};

export async function generateStaticParams() {
  const games = gamesData.games as Game[];
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const games = gamesData.games as Game[];
  const game = games.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <header className="bg-[#E53935] text-white py-4 px-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link 
            href="/" 
            className="text-white hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Playful Revolution</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <article className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-[#111111] mb-4">{game.title}</h1>
          
          <p className="text-lg text-gray-700 mb-6">{game.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {game.tags.map((tag) => (
              <span 
                key={tag}
                className={`text-sm px-3 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
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
                  className={`text-sm px-3 py-1 rounded ${pillarColors[pillar] || 'bg-gray-100'}`}
                >
                  {pillarIcons[pillar]} {pillar}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
              <span className="text-sm text-gray-600">Energy:</span>
              <span className={`w-3 h-3 rounded-full ${energyColors[game.energyLevel]}`}></span>
              <span className="text-sm font-medium">{game.energyLevel}</span>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Facilitation Guide</h2>
            
            {game.materials.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#43A047] mb-2">Materials Needed</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {game.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                  {game.materials.length === 0 && (
                    <li className="text-gray-500 italic">No materials needed</li>
                  )}
                </ul>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#43A047] mb-2">Setup</h3>
              <p className="text-gray-700 leading-relaxed">{game.setup}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#43A047] mb-2">How to Play</h3>
              <ol className="space-y-3">
                {game.howToPlay.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#FDD835] text-[#111111] font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
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
