'use client';

import { Pillar } from '@/types/game';
import { PILLAR_COLORS, PILLAR_LABELS } from '@/lib/constants';

const ALL_PILLARS: Pillar[] = ['intellectual', 'social', 'physical'];

interface PillarChartProps {
  pillarMinutes: Record<Pillar, number>;
}

export default function PillarChart({ pillarMinutes }: PillarChartProps) {
  const maxMinutes = Math.max(
    1,
    ...ALL_PILLARS.map((p) => pillarMinutes[p] ?? 0)
  );

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-[#111111] uppercase tracking-wide">
        Pillar coverage
      </h3>
      <div className="space-y-2">
        {ALL_PILLARS.map((pillar) => {
          const minutes = pillarMinutes[pillar] ?? 0;
          const widthPercent = maxMinutes > 0 ? (minutes / maxMinutes) * 100 : 0;
          return (
            <div key={pillar} className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium text-gray-800 shrink-0">
                {PILLAR_LABELS[pillar]}
              </span>
              <div className="flex-1 h-6 bg-gray-200 rounded-md overflow-hidden border-2 border-[#111111]">
                <div
                  className="h-full rounded transition-[width] duration-300"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: PILLAR_COLORS[pillar],
                  }}
                />
              </div>
              <span className="text-sm font-bold text-[#111111] w-12 shrink-0">
                {minutes} min
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
