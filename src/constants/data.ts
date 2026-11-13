import type { Experience, PortfolioProject, MediaItem } from '@/types';

export const PROFILE = {
  logo: 'THEBEAEVER',
  name: '김진영',
  nameEn: 'Jinyoung Kim',
  title: 'Frontend Developer · VJ',
  description:
    '사내 ITSM과 운영 시스템을 설계해 온 프론트엔드 개발자이자, 코드로 실시간 비주얼을 만드는 VJ·비주얼 디렉터입니다. 서비스를 만드는 같은 손으로 무대 위 영상도 움직입니다.',
  highlights: [
    '화면 구현을 넘어 상태 설계 · API 계약 · 사용자 흐름까지 함께 설계합니다.',
    '공연·행사 VJ, 영상 연출, 인터랙티브 웹까지 비주얼을 기획부터 코드까지 끝냅니다.',
  ],
  email: 'thebeaever@gmail.com',
  github: 'https://github.com/beaever',
};

export const EXPERIENCES: Experience[] = [
  {
    company: 'NCITS',
    position: 'Frontend Developer',
    period: '2022.01 ~ 2025.04',
    projects: [
      {
        title: 'ITSM Monorepo 구축 및 공통 인프라 개발',
        period: '2024.01 ~ 2025.04',
        description:
          '대규모 ITSM 프로젝트의 유지보수성과 확장성을 위해 Turborepo 기반 Monorepo 아키텍처 설계 및 구축',
        details: [
          'pnpm을 패키지 매니저로 채택하여 의존성 관리 및 설치 속도 개선',
          'Turborepo Remote Cache 적용으로 반복 빌드 제거 및 개발 생산성 향상',
          '@itsm-theme: headless design token 개념을 참고하여 브랜드 단위 테마 구조 설계',
          '@itsm-shared: toss/slash 구조를 참고해 범용성과 확장성을 고려한 공통 utils, custom hook 설계',
          '@itsm-components: Compound Pattern 적용으로 확장성과 조합 유연성 확보',
          '@itsm-icons: React 기반 Icon 컴포넌트 패키지 개발, Figma Open API 연동 고려',
        ],
      },
      {
        title: 'ITSM Incident(NCI) 장애 관리 시스템 개발 (WEB)',
        period: '2024.01 ~ 2025.04',
        description:
          '사내 서비스 및 게임 장애를 관리하는 운영자용 웹 시스템 개발',
        details: [
          'Next.js, React, TypeScript 기반으로 페이지 단위 책임 개발',
          'Opsgenie Open API 연동 데이터를 WebSocket 기반 BFF를 통해 10초 단위 실시간 갱신',
          'getServerSideProps를 활용한 서버 사이드 데이터 패칭 및 동적 라우팅 구현',
        ],
      },
      {
        title: 'ITSM 공용 UI 컴포넌트 Storybook',
        period: '2022.01 ~ 2025.04',
        description: '모노레포 구조에서 공통 UI 컴포넌트 Storybook 개발',
        details: [
          '모든 서비스에서 일관된 UI 컴포넌트를 위한 Storybook 개발',
          'Compound Pattern을 활용한 컴포넌트 조합 유연성 확보',
          '사내 디자인 시스템 기반의 디자인 토큰 구조 설계 및 정의',
          'Emotion을 활용한 CSS-in-JS 구조 설계',
          '유연한 스타일 관리 및 유지보수를 위한 컴포넌트 설계',
        ],
      },
      {
        title: 'ITSM Servicedesk 개발 (WEB)',
        period: '2022.01 ~ 2023.10',
        description: 'Lerna 기반 Monorepo 환경에서 ITSM 서비스 개발 및 운영',
        details: [
          'core 역할의 template-engine을 분리하여 웹/모바일 공통 적용 구조 설계',
          'React 16 Legacy 코드를 React 18 + Hooks 기반 구조로 마이그레이션',
          'GraphQL 기반 데이터 구조를 React Query 중심 구조로 전환',
          'Dynamic Import, Code Splitting, Minify 적용으로 Lighthouse 성능 점수 40 → 80 개선',
          'Sentry 도입으로 운영 중 오류 모니터링 및 빠른 대응 환경 구축',
          'storage-manager, event-bus 등 공통 유틸 개발 후 팀 내 공유',
        ],
      },
      {
        title: 'ITSM Servicedesk 개발 (MOBILE)',
        period: '2022.01 ~ 2023.10',
        description: 'React Native, Expo 기반 모바일 앱 개발',
        details: [
          '모바일 환경에 최적화된 UI 컴포넌트 추가 개발',
          'FCM 기반 알림 기능 구현',
        ],
      },
    ],
  },
  {
    company: 'HubDnc',
    position: 'Frontend Developer',
    period: '2021.07 ~ 2021.12',
    projects: [
      {
        title: 'Meple – 게임 친구 매칭 서비스',
        period: '2021.07 ~ 2021.12',
        description: 'Next.js 기반 SSR 서비스 개발',
        details: [
          'React, TypeScript를 사용한 메인 프론트엔드 개발',
          'Redux 대신 SWR을 활용해 서버 상태 관리 및 캐싱 구조 설계',
          'SWR Mutate를 활용한 실시간 데이터 갱신 처리',
          '회원가입, 메인 페이지, 이미지 크롭, 프로필 등록 기능 개발',
        ],
      },
      {
        title: 'Edubrain – 영어 교육 서비스',
        period: '2021.07 ~ 2021.12',
        description: 'React, TypeScript 기반 CSR 서비스 개발',
        details: [
          '시험, 학습, 성적 데이터 API 연동',
          '로딩 및 사용자 피드백을 고려한 UX 개선 작업 수행',
        ],
      },
      {
        title: 'Wemac – 광고 촬영 매칭 플랫폼',
        period: '2021.07 ~ 2021.12',
        description: 'Next.js 기반 SSR 서비스 개발',
        details: [],
      },
    ],
  },
];

// 순서가 페이지 이동 순서이자 라이브 모드 숫자키 순서다. word 는 배경 입자가 그리는 글자다.
export const NAV_ITEMS = [
  { label: 'About', href: '/', word: 'THEBEAEVER' },
  { label: 'Experience', href: '/experience', word: 'EXPERIENCE' },
  { label: 'Projects', href: '/projects', word: 'PROJECTS' },
  { label: 'Visual', href: '/media', word: 'VISUAL' },
  { label: 'Contact', href: '/contact', word: 'CONTACT' },
];

// 경력 기간은 EXPERIENCES 의 period 하나만 고치면 된다. 진행 중이면 '2025.05 ~ Present' 로 적는다.
export const EXPERIENCES_DATE = EXPERIENCES.map(({ period }) => {
  const [from, to] = period.split(' ~ ');
  return { from, to };
});

// Visual 페이지와 외주 문의에서 보여 주는 작업 범위
export const VISUAL_SERVICES = [
  {
    title: 'VJ · 실시간 비주얼',
    description: '공연과 행사 현장에서 음악과 무대에 맞춰 영상을 실시간으로 운용합니다.',
  },
  {
    title: '비주얼 디렉팅',
    description: '영상과 모션의 톤, 흐름, 화면 구성을 기획하고 결과물까지 함께 맞춥니다.',
  },
  {
    title: '인터랙티브 웹',
    description: 'WebGL과 셰이더로 움직이는 웹사이트, 랜딩, 브랜드 경험을 설계하고 개발합니다.',
  },
];

// public/ 이미지를 쓸 때는 basePath 를 포함한다. 예: '/portfolio/media/cover.jpg'
export const MEDIA_ITEMS: MediaItem[] = [];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: 'WHOLLY',
    description:
      '호주 워킹홀리데이 준비부터 정착까지를 단계별로 안내하는 웹·앱 서비스. 워홀 정보의 문제는 양이 아니라 최신성이라고 보고, 모든 정보에 공식 출처와 검증일을 붙여 신선도 자체를 제품의 핵심으로 설계했습니다.',
    period: '2026.02 ~ 진행 중 (2026.08 iOS 앱 출시)',
    highlights: [
      '사용 비중이 출국 준비에 쏠린다는 점을 근거로 웹을 본체로 두고 모바일은 Expo WebView 셸로 결정. 대신 도메인 로직을 headless 컴포넌트와 디자인 토큰으로 분리해, 네이티브가 필요해지면 화면을 다시 쓰지 않고 어댑터만 추가하도록 남겨뒀습니다.',
      '아키텍처 경계를 문서가 아닌 CI로 강제. dependency-cruiser가 매 PR마다 역방향 import를 차단하고, 디자인 토큰이 어긋나면 머지가 막힙니다. 90%까지 올라갔던 클라이언트 컴포넌트 비율을 46.7%로 되돌린 뒤 임계값 가드로 회귀를 봉쇄했습니다.',
      '계정 스코프가 없어 같은 기기에서 계정을 바꾸면 직전 사용자의 AI 요약이 노출되던 결함을 발견해 재설계. 소유자 검증과 TTL을 추가하고, 소유자를 알 수 없는 레거시 데이터는 승계하지 않고 제거하는 쪽을 택했습니다.',
      'AI는 Gemini 단독으로 좁히고 검증된 Fact를 그라운딩해 환각을 억제. 응답을 zod로 검증해 모델 교체 시 락인이 생기지 않도록 했습니다.',
    ],
    technologies: [
      'Next.js 16 (App Router)',
      'React 19',
      'TypeScript (strict)',
      'Supabase (RLS + Edge Functions)',
      'TanStack Query',
      'Zustand',
      'Tailwind CSS + Design Tokens',
      'Gemini AI',
      'Expo (WebView Shell)',
      'Turborepo + pnpm',
      'Storybook + Chromatic',
      'Playwright + Vitest',
    ],
    demoUrl: 'https://wholly-web.vercel.app/',
    appStoreUrl: 'https://apps.apple.com/kr/app/id6787169213',
  },
  {
    title: 'HYDRAFIT',
    description:
      '애플워치·HealthKit의 운동 데이터를 읽어 그날 운동 강도에 비례한 수분 목표를 계산하는 iOS 앱. 기존 트래커가 체중 기반 고정 목표만 제시한다는 점에서 출발했습니다.',
    period: '2026.06 ~ 진행 중',
    highlights: [
      'Supabase 기반 백엔드를 설계·확정했다가, 데이터 원천이 이미 HealthKit이고 iCloud가 iPhone과 워치를 자동 동기화한다는 점을 확인하고 서버를 걷어냈습니다. 계정의 존재 이유가 사라져 로그인 단계까지 제거됐고, 안드로이드 불가 같은 한계는 결정 문서에 함께 남겼습니다.',
      'Expo 네이티브 모듈 2개를 Swift로 직접 작성해 RN에서 App Group을 거쳐 위젯으로, WCSession을 거쳐 워치로 가는 데이터 파이프라인을 구현했습니다.',
      '수분 계산·알림·스냅샷·워치 동기화 네 도메인을 인터페이스와 팩토리로 분리하고 mock/native 구현을 나눠, 네이티브 빌드 환경 없이도 전체 로직과 UI를 개발·테스트할 수 있게 했습니다.',
      '디자인 토큰을 단일 원천으로 두고 RN·웹·Swift 세 플랫폼에 미러링해 값 불일치를 규칙으로 차단했습니다.',
    ],
    technologies: [
      'Expo SDK 56',
      'React Native',
      'React 19',
      'TypeScript (strict)',
      'HealthKit',
      'SwiftUI + WidgetKit',
      'Expo Native Module (Swift)',
      'Turborepo + pnpm',
      'Vitest',
    ],
    demoUrl: 'https://hydrafit.vercel.app',
  },
  {
    title: 'WORKLOG+',
    description:
      '개인의 업무일지가 그대로 팀의 진척 리포트가 되는 업무 기록 도구. Express + Prisma 3-tier로 시작했다가 Supabase 기반으로 전면 이전하며 백엔드 서버를 제거했습니다.',
    period: '2026.02 ~ 2026.06',
    highlights: [
      '마이그레이션을 인증 → 데이터 → 정리 순의 단계로 쪼개 위험을 분리하고, 각 단계를 독립 PR로 검증하며 이전했습니다.',
      '미들웨어와 서비스 코드에 흩어져 있던 권한 규칙을 선언적 RLS 정책으로 이관해, 애플리케이션이 뚫려도 DB가 막는 구조로 바꿨습니다. 프로젝트와 멤버 테이블이 서로의 정책을 참조하며 생기는 무한재귀는 SECURITY DEFINER 헬퍼로 끊었습니다.',
      'Custom Access Token Hook으로 JWT에 역할을 주입해, RLS를 평가할 때마다 사용자 테이블을 조회하던 쿼리를 없앴습니다.',
      '대시보드 집계의 날짜별 루프 쿼리를 generate_series와 단일 GROUP BY를 쓰는 RPC로 대체해 N+1을 제거했습니다.',
    ],
    technologies: [
      'Next.js 15 (App Router)',
      'React 19',
      'TypeScript (strict)',
      'Supabase (PostgreSQL + RLS)',
      'TanStack Query',
      'Zustand',
      'Tailwind CSS + shadcn/ui',
      'React Native + Expo (WebView)',
      'Turborepo + pnpm',
      'Storybook + Chromatic',
    ],
    demoUrl: 'https://worklog-plus.vercel.app/',
    githubUrl: 'https://github.com/beaever/worklog-plus',
  },
  {
    title: 'GIGGY',
    description:
      '호주 한인 대상 채용 플랫폼. WHOLLY의 자매 서비스로, 워홀러의 정착 단계와 구직 단계가 이어진다는 점에서 향후 WHOLLY로 통합될 예정입니다.',
    period: '2025.07 ~ 2026.06',
    highlights: [
      'React Native CLI 기반으로 앱을 구현하고, 서버 상태는 TanStack Query로 관리했습니다.',
      '구직 도메인이 WHOLLY의 정착 단계와 사용자 흐름상 이어진다고 판단해, 별도 서비스로 확장하는 대신 WHOLLY로 이주하는 방향을 택했습니다.',
    ],
    technologies: ['React Native CLI', 'TypeScript', 'TanStack Query'],
    demoUrl: 'https://beaever.github.io/giggy-landing-page/',
  },
];
