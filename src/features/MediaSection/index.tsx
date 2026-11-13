/**
 * MediaSection Component
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';
import { AnimatedWrapper } from '@/components/ui/AnimatedWrapper';
import { MEDIA_ITEMS, PROFILE, VISUAL_SERVICES } from '@/constants/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useMotionStore } from '@/stores/useMotionStore';

export function MediaSection() {
  const setLive = useMotionStore((state) => state.setLive);

  return (
    <Section id='media'>
      <AnimatedWrapper className='grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 mb-16 md:mb-24'>
        <Text.Heading size='md' as='h1' className='md:col-span-5'>
          Visual
        </Text.Heading>
        <div className='md:col-span-7'>
          <Text.Body size='lg' color='secondary' className='mb-6'>
            공연·행사 VJ와 영상 연출, 인터랙티브 웹을 작업합니다. 지금 보고 있는 배경도 직접 만든 실시간 WebGL 입자
            엔진입니다.
          </Text.Body>
          <Text.Button onClick={() => setLive(true)}>라이브 모드로 연주하기</Text.Button>
        </div>
      </AnimatedWrapper>

      <AnimatedWrapper>
        <ul className='border-b border-[var(--border-primary)] mb-16 md:mb-24'>
          {VISUAL_SERVICES.map((service) => (
            <li
              key={service.title}
              className='grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-2 border-t border-[var(--border-primary)] py-8'
            >
              <Text.Heading size='xs' as='h2' className='md:col-span-5'>
                {service.title}
              </Text.Heading>
              <Text.Body color='secondary' className='md:col-span-7'>
                {service.description}
              </Text.Body>
            </li>
          ))}
        </ul>
      </AnimatedWrapper>

      {MEDIA_ITEMS.length === 0 ? (
        <Text.Body color='secondary'>
          작업 영상 아카이브는 정리 중입니다. 지난 작업 영상은{' '}
          <a
            href={`mailto:${PROFILE.email}?subject=${encodeURIComponent('[작업 영상 요청]')}`}
            className='text-[var(--text-primary)] underline underline-offset-[0.3em]'
          >
            메일로 요청
          </a>
          해 주세요.
        </Text.Body>
      ) : (
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={staggerContainer}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'
        >
          {MEDIA_ITEMS.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <a href={item.href} target='_blank' rel='noreferrer' className='block group'>
                <div>
                  <div className='relative aspect-video overflow-hidden'>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                  <div className='pt-4 space-y-1'>
                    <span className='text-small font-semibold text-[var(--accent-primary)] font-mono'>
                      {item.category} · {item.period}
                    </span>
                    <Text.Heading size='xs' as='h3'>
                      {item.title}
                    </Text.Heading>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Section>
  );
}
