'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShortlistState {
  shortlist: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  clear: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      shortlist: [],
      add: (id: string) =>
        set((state) => ({
          shortlist: state.shortlist.includes(id) ? state.shortlist : [...state.shortlist, id],
        })),
      remove: (id: string) =>
        set((state) => ({
          shortlist: state.shortlist.filter((item) => item !== id),
        })),
      toggle: (id: string) => {
        const { shortlist } = get();
        if (shortlist.includes(id)) {
          set({ shortlist: shortlist.filter((item) => item !== id) });
        } else {
          set({ shortlist: [...shortlist, id] });
        }
      },
      isShortlisted: (id: string) => get().shortlist.includes(id),
      clear: () => set({ shortlist: [] }),
    }),
    {
      name: 'spinny-shortlist',
    }
  )
);
