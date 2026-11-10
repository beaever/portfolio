/**
 * MediaSection Component
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';
import { AnimatedWrapper } from '@/components/ui/AnimatedWrapper';
import { MEDIA_ITEMS } from '@/constants/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function MediaSection() {
  return (
    <Section id='media'>
      <AnimatedWrapper variant='fadeInUp'>
        <Text.Heading size='md' className='mb-10 md:mb-16'>
          Media
        </Text.Heading>
      </AnimatedWrapper>

      {MEDIA_ITEMS.length === 0 ? (
        <Text.Body size='lg' color='secondary' className='border-t border-[var(--border-primary)] pt-10'>
          미디어 작업물을 준비하고 있습니다.
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
