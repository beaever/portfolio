import { create } from 'zustand';

interface MotionState {
  paused: boolean;
  togglePaused: () => void;
}

export const useMotionStore = create<MotionState>()((set) => ({
  paused: false,
  togglePaused: () => set((state) => ({ paused: !state.paused })),
}));
