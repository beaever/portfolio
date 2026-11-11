import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme-storage';
export const DEFAULT_THEME: Theme = 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

// DOM 반영은 MainLayout 이 전담한다. 스토어에서 클래스를 직접 건드리면
// 전환 트랜지션 처리가 상태 로직과 표현 로직으로 쪼개진다.
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: THEME_STORAGE_KEY,
    },
  ),
);
