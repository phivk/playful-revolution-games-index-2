import DurationChip from "@/components/DurationChip";
import EnergyChip from "@/components/EnergyChip";
import PillarChip from "@/components/PillarChip";
import TagChip from "@/components/TagChip";
import { getGameBySlug, getGames } from "@/lib/games";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 py-6">
        <article className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {game.title}
          </h1>

          <p className="text-lg text-gray-700 mb-6">{game.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {game.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {game.pillars.map((pillar) => (
              <PillarChip key={pillar} pillar={pillar} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <EnergyChip level={(game.energy as 1 | 2 | 3) || 1} />

            {game.duration > 0 && <DurationChip duration={game.duration} />}
          </div>

          <hr className="my-6 border-gray-200" />

          {game.resources.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-deep-blue mb-4">
                Resources
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {game.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="text-gray-700 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_strong]:font-bold">
            <ReactMarkdown>{game.body}</ReactMarkdown>
          </section>
        </article>
      </main>

      <footer className="bg-foreground text-white py-6 px-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-block bg-revolution-red text-white font-bold py-3 px-6 rounded-lg border-2 border-foreground hover-btn"
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
