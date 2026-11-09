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
    <Section id='projects' background='secondary'>
      <AnimatedWrapper variant='fadeInUp'>
        <Text.Heading size='md' className='glass inline-block rounded-2xl px-6 py-3 mb-10 md:mb-12'>
          Projects
        </Text.Heading>
      </AnimatedWrapper>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={staggerContainer}
        className='grid grid-cols-1 lg:grid-cols-2 gap-6'
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
