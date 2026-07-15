import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  basePath: '/portfolio',
  images: {
    unoptimized: true,
  },
  turbopack: {
    // 홈 디렉터리에도 pnpm-lock.yaml 이 있어 Next 가 상위를 워크스페이스 루트로 추론한다.
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  experimental: {
    // 배럴 export 라 개별 모듈로 풀어줘야 트리셰이킹이 된다.
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
