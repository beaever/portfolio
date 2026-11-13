/**
 * ContactSection Component
 */

'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';
import { fadeInUp } from '@/lib/animations';
import { PROFILE, VISUAL_SERVICES } from '@/constants/data';

// 메일 앱이 열릴 때 문의 종류가 제목에 미리 들어가 있게 한다.
const mailTo = (subject: string) => `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}`;

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
          <Text.Heading size='xl' as='h1' className='mb-6'>
            Let&apos;s Work Together
          </Text.Heading>
          <Text.Body size='lg' color='secondary'>
            외주 프로젝트와 채용 제안 모두 열려 있습니다. 메일 한 통이면 충분합니다.
          </Text.Body>
        </div>

        <div className='md:col-span-6 border-t border-[var(--border-primary)] pt-10'>
          <Text.Heading size='xs' as='h2' className='mb-4'>
            외주 · 협업
          </Text.Heading>
          <ul className='mb-6 space-y-1 text-body text-[var(--text-secondary)]'>
            {VISUAL_SERVICES.map((service) => (
              <li key={service.title}>{service.title}</li>
            ))}
            <li>웹 · 앱 프론트엔드 개발</li>
          </ul>
          <Text.Body size='sm' color='tertiary' className='mb-4'>
            일정, 매체나 장소, 예산 범위를 함께 적어 주시면 더 빠르게 답드립니다.
          </Text.Body>
          <Text.Button href={mailTo('[외주 문의] ')}>외주 문의하기</Text.Button>
        </div>

        <div className='md:col-span-6 border-t border-[var(--border-primary)] pt-10'>
          <Text.Heading size='xs' as='h2' className='mb-4'>
            채용
          </Text.Heading>
          <Text.Body color='secondary' className='mb-6'>
            프론트엔드 포지션, 특히 인터랙션과 비주얼 비중이 큰 팀이라면 더 반갑습니다.
          </Text.Body>
          <div className='flex flex-col items-start gap-2'>
            <Text.Button href={mailTo('[채용 문의] ')}>채용 제안하기</Text.Button>
            <Text.Button variant='secondary' href='/experience'>
              경력 보기
            </Text.Button>
            <Text.Button variant='secondary' href={PROFILE.github} target='_blank'>
              GitHub
            </Text.Button>
          </div>
        </div>

        <Text.Body size='sm' color='tertiary' className='md:col-span-12 font-mono'>
          {PROFILE.email}
        </Text.Body>
      </motion.div>
    </Section>
  );
}
