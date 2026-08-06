const TEXT = 'THEBEAEVER '.repeat(6).trim();

// top: 줄의 세로 위치, duration: 한 바퀴 도는 시간(초), reverse: 흐르는 방향
const ROWS = [
  { top: '-30%', duration: 70, reverse: false },
  { top: '0%', duration: 30, reverse: true },
  { top: '30%', duration: 60, reverse: false },
  { top: '60%', duration: 40, reverse: true },
];

export function FloatingText() {
  return (
    <div
      aria-hidden='true'
      className='fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03]'
    >
      {ROWS.map((row) => (
        <div
          key={row.top}
          className='marquee absolute whitespace-nowrap text-[20vw] font-black tracking-tighter'
          style={{
            top: row.top,
            animationName: row.reverse ? 'marquee-reverse' : 'marquee',
            animationDuration: `${row.duration}s`,
          }}
        >
          {TEXT}
        </div>
      ))}
    </div>
  );
}
