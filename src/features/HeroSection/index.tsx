/**
 * HeroSection Component
 *
 * 포트폴리오 메인 히어로 섹션
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HighlightText } from '@/components/common/HighlightText';
import { Text } from '@/components/ui/Text';
import { CodeBlock } from './CodeBlock';
import { useTotalExperience } from '@/hooks/useCareerCalculator';
import { EXPERIENCES_DATE, PROFILE } from '@/constants/data';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const totalExperienceText = useTotalExperience(EXPERIENCES_DATE);
  const DYNAMIC_CODE_TEXT = `const developer = {\n  experience: '${totalExperienceText}',\n  focus: ['Performance', 'Scalability']\n}`;

  useEffect(() => {
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
  }, [DYNAMIC_CODE_TEXT]);

  return (
    <section id='about' className='relative z-10 min-h-screen flex items-start pt-20'>
      <div className='w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-20'>
        {/* 입자 워드마크가 놓일 자리 */}
        <div aria-hidden='true' className='h-[24vh] md:h-[32vh]' />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left: Text */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={staggerContainer}
            className='glass rounded-3xl p-7 md:p-9'
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
              <div className='space-y-2'>
                {PROFILE.highlights.map((highlight, index) => (
                  <Text.Body
                    key={index}
                    size='md'
                    color='secondary'
                    className='leading-relaxed'
                  >
                    • {highlight}
                  </Text.Body>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className='flex flex-wrap gap-3 mt-8'>
              <Text.Button variant='primary' href='/projects'>
                프로젝트 보기
              </Text.Button>
              <Text.Button variant='outline' href='/contact'>
                연락하기
              </Text.Button>
            </motion.div>
          </motion.div>

          {/* Right: Code Typing Animation */}
          <CodeBlock typedText={typedText} />
        </div>
      </div>
    </section>
  );
}
