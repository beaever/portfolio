'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Pause, Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, PROFILE } from '@/constants/data';
import { useThemeStore } from '@/stores/useThemeStore';
import { useMotionStore } from '@/stores/useMotionStore';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { paused, togglePaused } = useMotionStore();
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    // 서랍이 열린 동안 뒤 페이지는 포커스와 스크린리더에서 뺀다.
    const background = [navRef.current, document.getElementById('main'), document.querySelector('footer')];
    background.forEach((element) => element?.setAttribute('inert', ''));
    const menuButton = menuButtonRef.current;
    closeButtonRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      background.forEach((element) => element?.removeAttribute('inert'));
      window.removeEventListener('keydown', handleKeyDown);
      menuButton?.focus();
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        // 푸터와 같은 방식으로 아랫부분을 페이드시켜 블러 경계가 보이지 않게 한다.
        // 페이드 영역은 클릭을 아래 콘텐츠로 통과시킨다.
        className='fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3 pb-10 pointer-events-none glass border-0 shadow-none before:hidden [mask-image:linear-gradient(to_top,transparent,#000_2.5rem)]'
      >
        <div className='pointer-events-auto max-w-7xl mx-auto px-5 md:px-6 py-2.5 flex items-center justify-between'>
          <Link
            href='/'
            className='font-mono text-subheading font-bold text-[var(--main)]'
          >
            {PROFILE.logo}
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-7'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={`relative py-1 text-small hover:text-[var(--text-primary)] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100 motion-reduce:after:transition-none ${
                  pathname === item.href
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    layoutId='nav-active'
                    className='absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-[var(--main)]'
                  />
                )}
              </Link>
            ))}
            <button
              onClick={togglePaused}
              aria-pressed={paused}
              aria-label={paused ? '배경 애니메이션 재생' : '배경 애니메이션 일시정지'}
              className='w-9 h-9 flex cursor-pointer items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-primary)] active:scale-90 transition-[color,background-color,scale] motion-reduce:scale-none'
            >
              {paused ? <Play size={18} /> : <Pause size={18} />}
            </button>
            <button
              onClick={toggleTheme}
              className='relative w-9 h-9 overflow-hidden flex cursor-pointer items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-primary)] active:scale-90 transition-[color,background-color,scale] motion-reduce:scale-none'
              aria-label={
                theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
              }
            >
              <AnimatePresence initial={false} mode='wait'>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className='flex items-center justify-center'
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Link
              href='/contact'
              className='group inline-flex items-center gap-1.5 py-1 text-small font-medium text-[var(--text-primary)] underline decoration-1 underline-offset-[0.3em] hover:decoration-2'
            >
              Get in Touch
              <ArrowRight size={14} className='transition-transform group-hover:translate-x-0.5' />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--border-primary)] transition-colors'
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key='backdrop'
            aria-hidden='true'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className='fixed inset-0 z-40 bg-black/40 md:hidden'
          />
        )}
        {isMobileMenuOpen && (
          <motion.div
            key='drawer'
            role='dialog'
            aria-modal='true'
            aria-label='메뉴'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-0 right-0 bottom-0 w-64 glass bg-[var(--bg-primary)]/70 border-y-0 border-r-0 overflow-y-auto overscroll-contain z-50 md:hidden'
          >
            <div className='flex flex-col h-full p-6'>
              <button
                ref={closeButtonRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className='self-end w-10 h-10 flex items-center justify-center text-[var(--text-primary)] mb-8'
                aria-label='메뉴 닫기'
              >
                <X size={24} />
              </button>
              <div className='flex flex-col gap-6'>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-subheading hover:text-[var(--main)] transition-colors ${
                      pathname === item.href
                        ? 'text-[var(--main)]'
                        : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={togglePaused}
                  aria-pressed={paused}
                  className='flex items-center gap-3 text-subheading text-[var(--text-secondary)] hover:text-[var(--main)] transition-colors'
                >
                  {paused ? <Play size={20} /> : <Pause size={20} />}
                  <span>{paused ? '애니메이션 재생' : '애니메이션 일시정지'}</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className='flex items-center gap-3 text-subheading text-[var(--text-secondary)] hover:text-[var(--main)] transition-colors'
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={20} />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={20} />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                <Link
                  href='/contact'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='mt-4 py-1 text-subheading font-medium text-[var(--text-primary)] underline underline-offset-[0.3em]'
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
