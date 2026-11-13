'use client';

import { useEffect, useRef } from 'react';
import { NAV_ITEMS } from '@/constants/data';
import { useMotionStore } from '@/stores/useMotionStore';

// UI 를 걷어내고 배경 입자를 VJ 처럼 연주한다. 숫자키로 글자, 스페이스로 충격파, Esc 로 나간다.
export function LiveMode() {
  const { live, word, setLive, setWord, hit } = useMotionStore();
  const exitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!live) return;
    const root = document.documentElement;
    const background = [document.querySelector('nav'), document.getElementById('main'), document.querySelector('footer')];
    background.forEach((element) => element?.setAttribute('inert', ''));
    root.dataset.live = '';
    const opener = document.activeElement as HTMLElement | null;
    exitRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLive(false);
      else if (event.key === ' ') {
        event.preventDefault();
        hit();
      } else if (Number(event.key) >= 1 && Number(event.key) <= NAV_ITEMS.length) {
        setWord(Number(event.key) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      background.forEach((element) => element?.removeAttribute('inert'));
      delete root.dataset.live;
      opener?.focus();
    };
  }, [live, setLive, setWord, hit]);

  if (!live) return null;

  return (
    <div
      role='dialog'
      aria-label='라이브 모드'
      className='fixed inset-x-0 bottom-0 z-[60] px-6 pb-6 md:px-12 md:pb-10'
    >
      <div className='mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 font-mono text-small text-[var(--text-secondary)]'>
        <div className='flex flex-wrap gap-x-5 gap-y-2'>
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.word}
              onClick={() => setWord(index)}
              aria-pressed={word === index}
              className='hover:text-[var(--text-primary)] aria-pressed:text-[var(--text-primary)] aria-pressed:underline underline-offset-[0.3em]'
            >
              <span className='text-[var(--text-tertiary)]'>{index + 1}</span> {item.word}
            </button>
          ))}
          <button onClick={hit} className='hover:text-[var(--text-primary)]'>
            <span className='text-[var(--text-tertiary)]'>SPACE</span> PULSE
          </button>
        </div>
        <button
          ref={exitRef}
          onClick={() => setLive(false)}
          className='text-[var(--text-primary)] underline underline-offset-[0.3em]'
        >
          <span className='text-[var(--text-tertiary)]'>ESC</span> 나가기
        </button>
      </div>
    </div>
  );
}
