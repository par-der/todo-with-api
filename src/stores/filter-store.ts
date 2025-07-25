import { create } from 'zustand/react';

interface FilterState {
  dateFrom: string | null;
  dateTo: string | null;
  completed: boolean | null;
  set: (patch: Partial<Omit<FilterState, 'set'>>) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  dateFrom: null,
  dateTo: null,
  completed: null,
  set: (patch) => set(patch),
}));
