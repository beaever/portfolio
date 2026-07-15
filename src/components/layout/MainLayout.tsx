'use client';

import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

// globals.css 의 .theme-transition 지속시간과 맞춘다.
const THEME_TRANSITION_MS = 400;

export function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useThemeStore();
  const isFirstApply = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    let timer: number | undefined;

    // 최초 적용(새로고침 직후)에는 트랜지션을 걸지 않는다.
    // 인라인 스크립트가 이미 올바른 테마를 칠해둔 상태라, 여기서 트랜지션을 켜면
    // 바뀐 게 없는데도 색이 흐르는 것처럼 보인다.
    if (!isFirstApply.current) {
      root.classList.add('theme-transition');
      timer = window.setTimeout(() => {
        root.classList.remove('theme-transition');
      }, THEME_TRANSITION_MS);
    }
    isFirstApply.current = false;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [theme]);

  return (
    <div className='min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]'>
      <main>{children}</main>
    </div>
  );
}
