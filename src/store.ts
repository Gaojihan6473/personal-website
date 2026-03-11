import { create } from 'zustand';

interface StoreState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  hasVisitedIntro: boolean;
  setHasVisitedIntro: (visited: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  hasVisitedIntro: false,
  setHasVisitedIntro: (visited) => set({ hasVisitedIntro: visited }),
}));
