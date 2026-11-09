'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NAV_ITEMS } from '@/constants/data';

const LINK_CLASS =
  'glass group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-base font-medium text-[var(--text-primary)] hover:text-[var(--main)] transition-colors';

export function PageNav() {
  const pathname = usePathname();
  const index = NAV_ITEMS.findIndex((item) => item.href === pathname);
  if (index < 0) return null;
  const previous = NAV_ITEMS[index - 1];
  const next = NAV_ITEMS[index + 1];

  return (
    <nav
      aria-label='페이지 이동'
      className='max-w-7xl mx-auto px-6 md:px-12 pb-16 flex items-center justify-between gap-6'
    >
      {previous ? (
        <Link href={previous.href} className={LINK_CLASS}>
          <ArrowLeft size={18} className='transition-transform group-hover:-translate-x-1' />
          {previous.label}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className={LINK_CLASS}>
          {next.label}
          <ArrowRight size={18} className='transition-transform group-hover:translate-x-1' />
        </Link>
      )}
    </nav>
  );
}
