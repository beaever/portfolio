/**
 * Section Component
 * 
 * 공통 섹션 래퍼 컴포넌트 (레이아웃, 애니메이션 포함)
 * UI 라이브러리로 이주 가능하도록 프로젝트 의존성 0%로 설계
 * 
 * @example
 * <Section id="about">Content</Section>
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // 위쪽은 페이드되는 고정 헤더 높이만큼 더 비운다.
        'relative z-10 pt-36 pb-20 md:pt-44 md:pb-28',
        className
      )}
    >
      <div className='max-w-7xl mx-auto px-6 md:px-12'>{children}</div>
    </section>
  );
}
