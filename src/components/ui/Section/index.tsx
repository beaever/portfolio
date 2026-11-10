/**
 * Section Component
 * 
 * 공통 섹션 래퍼 컴포넌트 (레이아웃, 애니메이션 포함)
 * UI 라이브러리로 이주 가능하도록 프로젝트 의존성 0%로 설계
 * 
 * @example
 * <Section id="about" background="primary">Content</Section>
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: 'primary' | 'secondary';
  padding?: 'sm' | 'md' | 'lg';
}

export function Section({
  id,
  children,
  className,
  background = 'primary',
  padding = 'lg',
}: SectionProps) {
  const backgroundClasses = {
    primary: '',
    secondary: 'bg-[var(--bg-secondary)]',
  };

  const paddingClasses = {
    sm: 'pt-28 pb-12 md:pt-32 md:pb-16',
    md: 'pt-32 pb-16 md:pt-36 md:pb-24',
    lg: 'pt-36 pb-20 md:pt-44 md:pb-28',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative z-10',
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className='max-w-7xl mx-auto px-6 md:px-12'>{children}</div>
    </section>
  );
}
