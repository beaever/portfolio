import { create } from 'zustand';

interface MotionState {
  paused: boolean;
  togglePaused: () => void;
  // 라이브 모드: UI 를 걷어내고 배경을 키보드로 연주한다.
  live: boolean;
  word: number;
  beat: number;
  setLive: (live: boolean) => void;
  setWord: (word: number) => void;
  hit: () => void;
}

export const useMotionStore = create<MotionState>()((set) => ({
  paused: false,
  togglePaused: () => set((state) => ({ paused: !state.paused })),
  live: false,
  word: 0,
  beat: 0,
  setLive: (live) => set(live ? { live, paused: false } : { live }),
  setWord: (word) => set({ word }),
  hit: () => set((state) => ({ beat: state.beat + 1 })),
}));
