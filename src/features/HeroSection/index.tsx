/**
 * HeroSection Component
 *
 * 포트폴리오 메인 히어로 섹션
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HighlightText } from '@/components/common/HighlightText';
import { Text } from '@/components/ui/Text';
import { CodeBlock } from './CodeBlock';
import { useTotalExperience } from '@/hooks/useCareerCalculator';
import { EXPERIENCES_DATE, PROFILE } from '@/constants/data';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const reducedMotion = useReducedMotion();
  const totalExperienceText = useTotalExperience(EXPERIENCES_DATE);
  const DYNAMIC_CODE_TEXT = `const developer = {\n  experience: '${totalExperienceText}',\n  focus: ['Performance', 'Scalability']\n}`;

  useEffect(() => {
    if (reducedMotion) return;
    let index = 0;
    const timer = setInterval(() => {
      if (index <= DYNAMIC_CODE_TEXT.length) {
        setTypedText(DYNAMIC_CODE_TEXT.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [DYNAMIC_CODE_TEXT, reducedMotion]);

  return (
    <section id='about' className='relative z-10 min-h-screen flex items-start pt-20'>
      <div className='w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-20'>
        {/* 입자 워드마크가 놓일 자리 */}
        <div aria-hidden='true' className='h-[24vh] md:h-[32vh]' />
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-end'>
          {/* Left: Text */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={staggerContainer}
            className='lg:col-span-7'
          >
            <motion.div variants={fadeInUp}>
              <Text.Heading size='xl' as='h1' className='mb-6'>
                Solving Complexity
                <br />
                with <HighlightText>Clean Code</HighlightText>.
              </Text.Heading>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Text.Body size='lg' color='secondary' className='mb-4'>
                {PROFILE.description}
              </Text.Body>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ul className='space-y-2'>
                {PROFILE.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className='grid grid-cols-[1.25rem_1fr] text-body text-[var(--text-secondary)]'
                  >
                    <span aria-hidden='true' className='text-[var(--text-tertiary)]'>—</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp} className='flex flex-wrap gap-x-8 gap-y-2 mt-10'>
              <Text.Button variant='primary' href='/projects'>
                프로젝트 보기
              </Text.Button>
              <Text.Button variant='secondary' href='/contact'>
                연락하기
              </Text.Button>
            </motion.div>
          </motion.div>

          {/* Right: Code Typing Animation */}
          <div className='lg:col-span-4 lg:col-start-9'>
            <CodeBlock typedText={reducedMotion ? DYNAMIC_CODE_TEXT : typedText} />
          </div>
        </div>
      </div>
    </section>
  );
}
