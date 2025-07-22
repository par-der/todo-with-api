import { create } from 'zustand/react';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface FilterState {
  dateFrom: string | null;
  dateTo: string | null;
  completed: boolean | null;
  patch: (p: Partial<Omit<FilterState, 'patch'>>) => void;
}

export const useFilterStore = create<FilterState>(
  subscribeWithSelector(
    persist(
      (set) => ({
        dateFrom: null,
        dateTo: null,
        completed: null,
        patch: (p) => set((s) => ({ ...s, ...p })),
      }),
      { name: 'todo-filters' },
    ),
  ),
);
