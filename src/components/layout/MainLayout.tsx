'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { NoiseTexture } from '@/components/background/NoiseTexture';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LiveMode } from '@/components/layout/LiveMode';
import { useThemeStore } from '@/stores/useThemeStore';

// WebGL 은 브라우저 전용이고, 첫 페인트(LCP)를 막지 않도록 분리한다.
const ParticleField = dynamic(
  () =>
    import('@/components/background/ParticleField').then(
      (module) => module.ParticleField,
    ),
  { ssr: false },
);

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
    <div className='relative flex min-h-screen flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]'>
      <a
        href='#main'
        className='glass sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:px-4 focus:py-2'
      >
        본문으로 건너뛰기
      </a>
      <ParticleField />
      <NoiseTexture />
      <Header />
      <main id='main' tabIndex={-1} className='relative z-10 flex-1'>{children}</main>
      <Footer />
      <LiveMode />
    </div>
  );
}
