/**
 * Text Component (Compound Pattern)
 *
 * 일관된 타이포그래피 시스템을 제공하는 컴포넌트
 * UI 라이브러리로 이주 가능하도록 프로젝트 의존성 0%로 설계
 *
 * @example
 * <Text.Heading size="xl">Title</Text.Heading>
 * <Text.Body size="lg" color="secondary">Description</Text.Body>
 */

import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextHeadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
}

interface TextBodyProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
  className?: string;
}

interface TextButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: '_blank' | '_self';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const Heading = ({
  size = 'md',
  as: Component = 'h2',
  children,
  className,
}: TextHeadingProps) => {
  const sizeClasses = {
    xs: 'text-subheading font-semibold',
    sm: 'text-heading font-semibold tracking-tight',
    md: 'text-title font-semibold tracking-tight',
    lg: 'text-title font-bold tracking-tight',
    xl: 'text-display font-bold tracking-[-0.03em]',
  };

  return (
    <Component className={cn('text-balance', sizeClasses[size], className)}>
      {children}
    </Component>
  );
};

const Body = ({
  size = 'md',
  color = 'primary',
  children,
  className,
}: TextBodyProps) => {
  const sizeClasses = {
    sm: 'text-small',
    md: 'text-body',
    lg: 'text-lead',
  };

  const colorClasses = {
    primary: 'text-[var(--text-primary)]',
    secondary: 'text-[var(--text-secondary)]',
    tertiary: 'text-[var(--text-tertiary)]',
  };

  return (
    <p className={cn(sizeClasses[size], colorClasses[color], className)}>
      {children}
    </p>
  );
};

const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  target = '_self',
  onClick,
  children,
  className,
}: TextButtonProps) => {
  const sizeClasses = {
    sm: 'text-small',
    md: 'text-body',
    lg: 'text-lead',
  };

  // 버튼 모양 없이 글자만 보이는 링크다. 강조는 밑줄 유무로만 구분한다.
  const variantClasses = {
    primary: 'text-[var(--text-primary)] underline decoration-1 hover:decoration-2',
    secondary: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline',
  };

  const combinedClasses = cn(
    'group/link inline-flex items-center gap-1.5 py-1 font-medium underline-offset-[0.3em] transition-colors',
    sizeClasses[size],
    variantClasses[variant],
    className,
  );
  const arrowClasses =
    'size-[1em] shrink-0 transition-transform motion-reduce:transition-none';

  if (href?.startsWith('/')) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
        <ArrowRight aria-hidden='true' className={cn(arrowClasses, 'group-hover/link:translate-x-0.5')} />
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
      >
        {children}
        <ArrowUpRight
          aria-hidden='true'
          className={cn(arrowClasses, 'group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5')}
        />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export const Text = {
  Heading,
  Body,
  Button,
};
