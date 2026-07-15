'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { PROFILE } from '@/constants/data';
import { useThemeStore } from '@/stores/useThemeStore';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    let frame = 0;

    // passive: 스크롤 블로킹 방지, rAF: 프레임당 1회로 제한
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        frame = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-primary)]'
            : 'bg-transparent'
        }`}
      >
        <div className='max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between'>
          <Link
            href='/'
            className='font-mono text-lg font-bold text-[var(--accent-primary)]'
          >
            {PROFILE.logo}
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-8'>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors'
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className='relative w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border-primary)] hover:bg-[var(--bg-surface)] transition-colors overflow-hidden'
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
            <a
              href='#contact'
              className='px-4 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[var(--shadow-accent)] transition-all'
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden w-10 h-10 flex items-center justify-center text-[var(--text-primary)]'
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-0 right-0 bottom-0 w-64 bg-[var(--bg-primary)]/95 backdrop-blur-md border-l border-[var(--border-primary)] z-50 md:hidden'
          >
            <div className='flex flex-col h-full p-6'>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className='self-end w-10 h-10 flex items-center justify-center text-[var(--text-primary)] mb-8'
                aria-label='Close menu'
              >
                <X size={24} />
              </button>
              <div className='flex flex-col gap-6'>
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='text-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors'
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={toggleTheme}
                  className='flex items-center gap-3 text-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors'
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
                <a
                  href='#contact'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='mt-4 px-4 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg text-center font-medium'
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
