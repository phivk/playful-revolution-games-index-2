"use client";

import { useState } from "react";
import { X } from "lucide-react";
import TagChip from "@/components/TagChip";
import PillarChip from "@/components/PillarChip";
import EnergyChip from "@/components/EnergyChip";
import DurationChip from "@/components/DurationChip";
import PlaylistButton from "@/components/PlaylistButton";
import { PlaylistAnimationProvider } from "@/contexts/PlaylistAnimationContext";

export default function ComponentShowcasePage() {
  const [tagSelected, setTagSelected] = useState(false);
  const [pillarSelected, setPillarSelected] = useState(false);
  const [energySelected, setEnergySelected] = useState(false);
  const [durationSelected, setDurationSelected] = useState(false);
  const [inPlaylist, setInPlaylist] = useState(false);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-2">Component Showcase</h1>
      <p className="text-sm text-gray-500 mb-10">
        Dev-only — not linked from public navigation.
      </p>

      {/* TagChip */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">TagChip</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">Inactive (interactive)</p>
            <TagChip tag="theatre" onClick={() => {}} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Selected (interactive)</p>
            <TagChip tag="collaborative" selected={true} onClick={() => {}} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Non-interactive</p>
            <TagChip tag="movement" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Live toggle demo</p>
            <TagChip
              tag="circle"
              selected={tagSelected}
              onClick={() => setTagSelected((v) => !v)}
            />
          </div>
        </div>
      </section>

      {/* PillarChip */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">PillarChip</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">Inactive (interactive)</p>
            <PillarChip pillar="intellectual" onClick={() => {}} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Selected (interactive)</p>
            <PillarChip pillar="social" selected={true} onClick={() => {}} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Non-interactive</p>
            <PillarChip pillar="physical" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Icon only</p>
            <PillarChip pillar="intellectual" iconOnly={true} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Live toggle demo</p>
            <PillarChip
              pillar="social"
              selected={pillarSelected}
              onClick={() => setPillarSelected((v) => !v)}
            />
          </div>
        </div>
      </section>

      {/* EnergyChip */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">EnergyChip</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">Inactive (interactive)</p>
            <EnergyChip level={2} onClick={() => {}} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Selected (interactive)</p>
            <EnergyChip level={3} selected={true} onClick={() => {}} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Non-interactive</p>
            <EnergyChip level={1} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Live toggle demo</p>
            <EnergyChip
              level={2}
              selected={energySelected}
              onClick={() => setEnergySelected((v) => !v)}
            />
          </div>
        </div>
      </section>

      {/* DurationChip */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">DurationChip</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">Inactive (interactive)</p>
            <DurationChip duration={30} onClick={() => {}} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Selected (interactive)</p>
            <DurationChip duration={60} selected={true} onClick={() => {}} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Non-interactive</p>
            <DurationChip duration={15} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Live toggle demo</p>
            <DurationChip
              duration={45}
              selected={durationSelected}
              onClick={() => setDurationSelected((v) => !v)}
            />
          </div>
        </div>
      </section>

      {/* PlaylistButton */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">PlaylistButton</h2>
        <PlaylistAnimationProvider>
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <p className="text-xs text-gray-400 mb-1">
                Inactive (not in playlist)
              </p>
              <PlaylistButton
                inPlaylist={false}
                onAddToPlaylist={() => {}}
                onRemoveFromPlaylist={() => {}}
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Active (in playlist)</p>
              <PlaylistButton
                inPlaylist={true}
                onAddToPlaylist={() => {}}
                onRemoveFromPlaylist={() => {}}
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Live toggle demo</p>
              <PlaylistButton
                inPlaylist={inPlaylist}
                onAddToPlaylist={() => setInPlaylist(true)}
                onRemoveFromPlaylist={() => setInPlaylist(false)}
              />
            </div>
          </div>
        </PlaylistAnimationProvider>
      </section>

      {/* Clear all button */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Clear all button</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="w-48">
            <p className="text-xs text-gray-400 mb-1">Default</p>
            <button
              onClick={() => {}}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border-3 border-foreground hover:border-revolution-red hover:text-revolution-red text-sm font-bold uppercase tracking-wider text-foreground min-h-[44px] transition-all duration-100"
            >
              <X size={14} strokeWidth={3} />
              Clear all
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
