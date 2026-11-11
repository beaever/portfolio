/**
 * ProjectsSection Component
 */

'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';
import { AnimatedWrapper } from '@/components/ui/AnimatedWrapper';
import { ProjectCard } from './ProjectCard';
import { PORTFOLIO_PROJECTS } from '@/constants/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function ProjectsSection() {
  return (
    <Section id='projects'>
      <AnimatedWrapper>
        <Text.Heading size='md' as='h1' className='mb-10 md:mb-16'>
          Projects
        </Text.Heading>
      </AnimatedWrapper>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={staggerContainer}
        className='border-b border-[var(--border-primary)]'
      >
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <ProjectCard {...project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
