/**
 * ProjectsSection Component
 */

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
        <Text.Heading size='md' className='mb-12 md:mb-16'>
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
