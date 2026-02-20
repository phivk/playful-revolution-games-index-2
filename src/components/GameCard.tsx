import Link from 'next/link';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
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

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link 
      href={`/game/${game.slug}`}
      className="block bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-[#E53935] hover:shadow-lg transition-all duration-150 active:scale-[0.98]"
    >
      <h3 className="text-xl font-bold text-[#111111] mb-2">{game.title}</h3>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{game.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {game.tags.map((tag) => (
          <span 
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {game.pillars.map((pillar) => (
            <span 
              key={pillar}
              className={`text-xs px-2 py-1 rounded ${pillarColors[pillar] || 'bg-gray-100'}`}
              title={pillar}
            >
              {pillarIcons[pillar]} {pillar}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-1" title={`Energy: ${game.energyLevel}`}>
          <span className="text-xs text-gray-500 mr-1">Energy:</span>
          <span className={`w-3 h-3 rounded-full ${energyColors[game.energyLevel]}`}></span>
          <span className="text-xs text-gray-600">{game.energyLevel}</span>
        </div>
      </div>
    </Link>
  );
}
