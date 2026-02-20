import Link from 'next/link';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

const pillarColors: Record<string, string> = {
  Intellectual: 'bg-[#1E3A8A] text-white',
  Social: 'bg-[#E53935] text-white',
  Physical: 'bg-[#43A047] text-white',
};

const pillarIcons: Record<string, string> = {
  Intellectual: '🧠',
  Social: '💬',
  Physical: '🏃',
};

const energyColors: Record<string, string> = {
  Low: 'bg-[#1E3A8A]',
  Medium: 'bg-[#FDD835]',
  High: 'bg-[#E53935]',
};

const tagColors: Record<string, string> = {
  'Social Spontaneity': 'bg-[#E53935] text-white',
  'Group Circle Games': 'bg-[#43A047] text-white',
  'Collaborative': 'bg-[#FDD835] text-[#111111]',
  'Competitive': 'bg-[#1E3A8A] text-white',
  'Ball Games': 'bg-[#E53935] text-white',
  'Theatre Sports': 'bg-[#43A047] text-white',
  'Movement': 'bg-[#FDD835] text-[#111111]',
  'Table Games': 'bg-[#1E3A8A] text-white',
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link 
      href={`/game/${game.slug}`}
      className="block bg-white rounded-xl border-3 border-[#111111] p-5 hover:border-[#E53935] hover:shadow-[4px_4px_0px_0px_#E53935] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
    >
      <h3 className="text-2xl font-display font-bold text-[#111111] mb-2 uppercase tracking-wide">{game.title}</h3>
      
      <p className="text-base text-gray-700 mb-4 line-clamp-2 font-medium">{game.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {game.tags.map((tag) => (
          <span 
            key={tag}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${tagColors[tag] || 'bg-gray-200 text-gray-800'}`}
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between border-t-2 border-gray-200 pt-4">
        <div className="flex gap-2">
          {game.pillars.map((pillar) => (
            <span 
              key={pillar}
              className={`text-sm px-3 py-2 rounded-lg font-bold border-2 border-[#111111] ${pillarColors[pillar]}`}
              title={pillar}
            >
              {pillarIcons[pillar]} {pillar}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-2" title={`Energy: ${game.energyLevel}`}>
          <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Energy:</span>
          <span className={`w-4 h-4 rounded-full border-2 border-[#111111] ${energyColors[game.energyLevel]}`}></span>
          <span className="text-sm font-bold text-gray-800">{game.energyLevel}</span>
        </div>
      </div>
    </Link>
  );
}
