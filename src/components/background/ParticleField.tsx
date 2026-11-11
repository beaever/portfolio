'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/data';
import { useMotionStore } from '@/stores/useMotionStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { createParticleEngine } from './particleEngine';

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ReturnType<typeof createParticleEngine>>(null);
  const theme = useThemeStore((state) => state.theme);
  const paused = useMotionStore((state) => state.paused);
  const pathname = usePathname();
  const routeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.href === pathname),
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    let engine: ReturnType<typeof createParticleEngine> = null;
    try {
      engine = createParticleEngine(canvasRef.current);
    } catch (error) {
      // 장식용 배경이 실패해도 본문은 보여야 한다.
      console.warn('입자 배경을 끕니다:', error);
    }
    engineRef.current = engine;
    return () => {
      engine?.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setRoute(routeIndex);
  }, [routeIndex]);

  useEffect(() => {
    engineRef.current?.refreshTheme();
  }, [theme]);

  useEffect(() => {
    engineRef.current?.setPaused(paused);
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className='fixed inset-0 w-full h-full pointer-events-none z-0'
    />
  );
}
