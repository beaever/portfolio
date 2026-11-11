import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'THEBEAEVER Portfolio',
    short_name: 'THEBEAEVER',
    description: '사용자 경험을 중시하는 프론트엔드 개발자 포트폴리오입니다.',
    start_url: '/portfolio/',
    display: 'standalone',
    background_color: '#0B0E14',
    theme_color: '#0B0E14',
    icons: [
      {
        src: '/portfolio/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/portfolio/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/portfolio/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/portfolio/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
