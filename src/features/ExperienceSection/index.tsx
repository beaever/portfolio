/**
 * ExperienceSection Component
 */

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';
import { AnimatedWrapper } from '@/components/ui/AnimatedWrapper';
import { EXPERIENCES } from '@/constants/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ExperienceCard } from './ExperienceCard';

export function ExperienceSection() {
  return (
    <Section id='experience'>
      <AnimatedWrapper variant='fadeInUp'>
        <Text.Heading size='md' className='mb-12 md:mb-16'>
          Experience
        </Text.Heading>
      </AnimatedWrapper>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={staggerContainer}
        className='space-y-12 md:space-y-16'
      >
        <motion.div
          initial='hidden'
          animate='visible'
          variants={staggerContainer}
          className='space-y-8'
        >
          {EXPERIENCES.map((experience, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
