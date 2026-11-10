/**
 * ContactSection Component
 */

'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';
import { fadeInUp } from '@/lib/animations';
import { PROFILE } from '@/constants/data';

export function ContactSection() {
  return (
    <Section id='contact'>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeInUp}
        className='grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10'
      >
        <div className='md:col-span-8'>
          <Text.Heading size='xl' className='mb-6'>
            Let&apos;s Work Together
          </Text.Heading>
          <Text.Body size='lg' color='secondary'>
            새로운 프로젝트나 협업 기회에 대해 이야기 나눠요.
          </Text.Body>
        </div>
        <div className='md:col-span-12 flex flex-col items-start gap-3 border-t border-[var(--border-primary)] pt-10'>
          <Text.Button size='lg' href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </Text.Button>
          <Text.Button variant='secondary' size='lg' href={PROFILE.github} target='_blank'>
            GitHub
          </Text.Button>
        </div>
      </motion.div>
    </Section>
  );
}
