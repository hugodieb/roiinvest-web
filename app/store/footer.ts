// lib/store.ts
import { create } from 'zustand';

interface FooterStore {
  isVisible: boolean;
  toggleFooter: () => void;
  setVisible: (visible: boolean) => void;
  visibleRoutes: string[];
  setVisibleRoutes: (routes: string[]) => void;
}

const useFooterStore = create<FooterStore>((set) => ({
  isVisible: true,
  toggleFooter: () => set((state) => ({ isVisible: !state.isVisible })),
  setVisible: (visible) => set({ isVisible: visible }),
  visibleRoutes: [],
  setVisibleRoutes: (routes) => set({ visibleRoutes: routes }),
}));

export default useFooterStore;