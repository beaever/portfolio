/**
 * ContactSection Component
 */

'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/common/GlassCard';
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
      >
        <GlassCard padding='lg' className='text-center'>
          <div className='p-8 md:p-12'>
            <Text.Heading size='md' className='mb-4'>
              Let&apos;s Work Together
            </Text.Heading>
            <Text.Body size='lg' color='secondary' className='mb-8'>
              새로운 프로젝트나 협업 기회에 대해 이야기 나눠요.
            </Text.Body>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Text.Button
                variant='primary'
                size='lg'
                href={`mailto:${PROFILE.email}`}
              >
                {PROFILE.email}
              </Text.Button>
              <Text.Button
                variant='outline'
                size='lg'
                href={PROFILE.github}
                target='_blank'
              >
                GitHub
              </Text.Button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </Section>
  );
}
