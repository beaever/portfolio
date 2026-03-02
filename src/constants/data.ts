import type { Skill, SocialLink, Experience, PortfolioProject } from '@/types';

export const PROFILE = {
  logo: 'THEBEAEVER',
  name: '김진영',
  nameEn: 'Jinyoung Kim',
  title: 'Frontend Developer',
  description:
    '대외비 환경의 복잡한 도메인에서도 문제를 구조화해 해결하는 프론트엔드 개발자입니다. 사내 ITSM, 운영·관리자 시스템을 중심으로 확장성·안정성·협업을 고려한 프론트엔드 설계와 구현 경험을 쌓아왔습니다.',
  highlights: [
    '실무에서 바로 쓰이는 구조와 코드 품질을 중요하게 생각합니다.',
    '화면 구현을 넘어, 상태 설계 · API 계약 · 사용자 흐름까지 함께 고민합니다.',
  ],
  email: 'thebeaever@gmail.com',
  github: 'https://github.com/beaever',
  location: 'Seoul, South Korea',
};

export const SKILLS: Skill[] = [
  {
    name: 'JavaScript',
    icon: 'javascript',
    category: 'frontend',
    proficiency: 90,
  },
  {
    name: 'TypeScript',
    icon: 'typescript',
    category: 'frontend',
    proficiency: 90,
  },
  { name: 'React', icon: 'react', category: 'frontend', proficiency: 95 },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', proficiency: 85 },
  {
    name: 'React Query',
    icon: 'reactquery',
    category: 'frontend',
    proficiency: 80,
  },
  { name: 'Recoil', icon: 'recoil', category: 'frontend', proficiency: 75 },
  { name: 'SWR', icon: 'swr', category: 'frontend', proficiency: 80 },
  { name: 'Emotion', icon: 'emotion', category: 'frontend', proficiency: 85 },
  {
    name: 'Styled-components',
    icon: 'styledcomponents',
    category: 'frontend',
    proficiency: 85,
  },
  { name: 'Turborepo', icon: 'turborepo', category: 'tools', proficiency: 80 },
  { name: 'pnpm', icon: 'pnpm', category: 'tools', proficiency: 85 },
  { name: 'Storybook', icon: 'storybook', category: 'tools', proficiency: 75 },
];

export const SOFT_SKILLS: string[] = [
  '구조적 사고',
  '문제 해결 능력',
  '팀 커뮤니케이션',
  '코드 리뷰 문화',
  '자기 주도 학습',
];

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

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/beaever',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:thebeaever@gmail.com',
    icon: 'mail',
  },
];

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const EXPERIENCES_DATE = [
  { from: '2021.07', to: '2021.12' }, // HubDnc
  { from: '2022.01', to: '2025.04' }, // NCITS
  // 만약 현재 진행 중인 경력이 있다면 EX:{ from: '2025.05', to: 'Present' } 추가
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: 'WORKLOG+',
    description: 'ITSM 개념의 업무관리 시스템',
    technologies: [
      `pnpm`,
      `Turborepo`,
      `Next.js 15 (App Router)`,
      `React Native + Expo (WebView)`,
      `Tailwind CSS + shadcn/ui`,
      `Zustand`,
      `TanStack Query`,
      `TypeScript (strict mode)`,
    ],
    demoUrl: 'https://worklog-plus.vercel.app/',
    githubUrl: 'https://github.com/beaever/worklog-plus',
  },
  {
    title: 'GIGGY',
    description: '호주 한인 대상 채용 플랫폼',
    technologies: ['ReactNative CLI', 'Typescript', 'TanStack Query'],
    demoUrl: 'https://giggy.online/',
  },
  {
    title: 'WHOLLY',
    description:
      '호주 워킹홀리데이 준비부터 정착까지, 단계별 체크리스트로 완벽하게 준비를 위한 웹,앱 서비스 ',
    technologies: [
      'React (web)',
      'ReactNative (web view 기반 mobile)',
      'Expo',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/beaever/wholly',
    demoUrl: 'https://wholly-web.vercel.app/',
  },
];
