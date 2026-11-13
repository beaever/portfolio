import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { PROFILE } from '@/constants/data';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/stores/useThemeStore';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const SITE_URL = 'https://beaever.github.io/portfolio';
const SITE_TITLE = `${PROFILE.name} | ${PROFILE.title}`;

// GitHub Pages 는 확장자로 Content-Type 을 정하므로 실제 .png 파일을 참조해야 한다.
// next/og 의 opengraph-image 라우트는 확장자 없는 파일로 떨어져 크롤러가 이미지로 인식하지 못한다.
const OG_IMAGE = {
  // metadataBase 에 이미 /portfolio 가 들어있어 여기서는 basePath 를 빼야 한다.
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'THEBEAEVER — Jinyoung Kim, Frontend Developer · VJ',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${PROFILE.name}`,
  },
  description: PROFILE.description,
  keywords: [
    '김진영',
    'Jinyoung Kim',
    'THEBEAEVER',
    '프론트엔드 개발자',
    'Frontend Developer',
    'VJ',
    '비주얼 디렉팅',
    '크리에이티브 개발자',
    'WebGL',
    '외주 개발',
    '포트폴리오',
    'React',
    'Next.js',
    'TypeScript',
    'Turborepo',
    'Supabase',
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.github }],
  creator: PROFILE.name,
  applicationName: 'THEBEAEVER Portfolio',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/portfolio/favicon.ico',
    apple: '/portfolio/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: 'THEBEAEVER Portfolio',
    title: SITE_TITLE,
    description: PROFILE.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: PROFILE.description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0E14' },
  ],
  colorScheme: 'dark light',
};

// 첫 페인트 전에 테마 클래스를 칠해 새로고침 시 깜빡임(FOUC)을 막는다.
// zustand persist 는 하이드레이션 이후에 복원되므로 그전까지 기본 테마가 노출된다.
const themeInitScript = `
(function(){
  try {
    var raw = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = raw ? JSON.parse(raw).state.theme : null;
    if (theme !== 'light' && theme !== 'dark') theme = '${DEFAULT_THEME}';
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add('${DEFAULT_THEME}');
  }
})();
`;

// 검색 결과에 인물 정보로 노출되도록 하는 구조화 데이터.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  alternateName: PROFILE.nameEn,
  jobTitle: PROFILE.title,
  description: PROFILE.description,
  email: `mailto:${PROFILE.email}`,
  url: SITE_URL,
  sameAs: [PROFILE.github],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seoul',
    addressCountry: 'KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
