import { useState, useMemo } from 'react';
import { Game, Tag, Pillar } from '@/types/game';

export interface FilterState {
  tags: Tag[];
  pillars: Pillar[];
  energyLevels: number[];
  searchQuery: string;
}

export interface UseGameFiltersReturn {
  filters: FilterState;
  filteredGames: Game[];
  setTag: (tag: Tag) => void;
  removeTag: (tag: Tag) => void;
  setPillar: (pillar: Pillar) => void;
  removePillar: (pillar: Pillar) => void;
  setEnergyLevel: (level: number) => void;
  removeEnergyLevel: (level: number) => void;
  setSearchQuery: (query: string) => void;
  clearAll: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function useGameFilters(games: Game[]): UseGameFiltersReturn {
  const [filters, setFilters] = useState<FilterState>({
    tags: [],
    pillars: [],
    energyLevels: [],
    searchQuery: '',
  });

  const setTag = (tag: Tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags : [...prev.tags, tag],
    }));
  };

  const removeTag = (tag: Tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const setPillar = (pillar: Pillar) => {
    setFilters((prev) => ({
      ...prev,
      pillars: prev.pillars.includes(pillar) ? prev.pillars : [...prev.pillars, pillar],
    }));
  };

  const removePillar = (pillar: Pillar) => {
    setFilters((prev) => ({
      ...prev,
      pillars: prev.pillars.filter((p) => p !== pillar),
    }));
  };

  const setEnergyLevel = (level: number) => {
    setFilters((prev) => ({
      ...prev,
      energyLevels: prev.energyLevels.includes(level)
        ? prev.energyLevels
        : [...prev.energyLevels, level],
    }));
  };

  const removeEnergyLevel = (level: number) => {
    setFilters((prev) => ({
      ...prev,
      energyLevels: prev.energyLevels.filter((e) => e !== level),
    }));
  };

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const clearAll = () => {
    setFilters({
      tags: [],
      pillars: [],
      energyLevels: [],
      searchQuery: '',
    });
  };

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some((tag) => game.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      if (filters.pillars.length > 0) {
        const hasMatchingPillar = filters.pillars.some((pillar) =>
          game.pillars.includes(pillar)
        );
        if (!hasMatchingPillar) return false;
      }

      if (filters.energyLevels.length > 0) {
        if (!filters.energyLevels.includes(game.energy)) {
          return false;
        }
      }

      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const titleMatch = game.title.toLowerCase().includes(query);
        const descriptionMatch = game.description.toLowerCase().includes(query);
        if (!titleMatch && !descriptionMatch) return false;
      }

      return true;
    });
  }, [games, filters]);

  const activeFilterCount =
    filters.tags.length + filters.pillars.length + filters.energyLevels.length;

  const hasActiveFilters = activeFilterCount > 0 || filters.searchQuery.trim() !== '';

  return {
    filters,
    filteredGames,
    setTag,
    removeTag,
    setPillar,
    removePillar,
    setEnergyLevel,
    removeEnergyLevel,
    setSearchQuery,
    clearAll,
    hasActiveFilters,
    activeFilterCount,
  };
}
