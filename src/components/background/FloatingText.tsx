'use client';

import { motion, useReducedMotion } from 'framer-motion';

const TEXT = 'THEBEAEVER '.repeat(6).trim();

// top: 줄의 세로 위치, duration: 한 바퀴 도는 시간(초), reverse: 흐르는 방향
const ROWS = [
  { top: '-30%', duration: 70, reverse: false },
  { top: '0%', duration: 30, reverse: true },
  { top: '30%', duration: 60, reverse: false },
  { top: '60%', duration: 40, reverse: true },
];

export function FloatingText() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden='true'
      className='fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03]'
    >
      {ROWS.map((row) => (
        <motion.div
          key={row.top}
          className='absolute whitespace-nowrap text-[20vw] font-black tracking-tighter'
          initial={{ x: row.reverse ? '-50%' : '0%' }}
          animate={
            prefersReducedMotion ? undefined : { x: row.reverse ? '0%' : '-50%' }
          }
          transition={{
            duration: row.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            top: row.top,
            // 큰 텍스트 레이어를 GPU 합성으로 넘겨 메인 스레드 페인트를 피한다.
            willChange: prefersReducedMotion ? undefined : 'transform',
          }}
        >
          {TEXT}
        </motion.div>
      ))}
    </div>
  );
}
