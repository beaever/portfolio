/**
 * ExperienceCard Component
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Text } from '@/components/ui/Text';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <GlassCard variant='default' padding='lg'>
      <div className='flex flex-col lg:flex-row lg:items-start gap-6'>
        {/* Company Info */}
        <div className='lg:w-64 flex-shrink-0'>
          <Text.Heading size='sm' as='h3' className='mb-1'>
            {experience.company}
          </Text.Heading>
          <Text.Body size='sm' color='secondary' className='mb-2'>
            {experience.position}
          </Text.Body>
          <div className='flex items-center gap-2'>
            <Calendar className='w-3 h-3 text-[var(--text-tertiary)]' />
            <Text.Label className='text-[var(--accent-primary)] font-mono font-semibold'>
              {experience.period}
            </Text.Label>
          </div>
        </div>

        {/* Projects Grid */}
        <div className='flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {experience.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

interface ProjectCardProps {
  project: {
    title: string;
    period: string;
    description: string;
    details: string[];
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreDetails = project.details.length > 3;

  return (
    <div className='glass-inner rounded-2xl p-5 hover:bg-[var(--glass-inner-hover)] transition-colors'>
      <Text.Heading size='xs' as='h4' className='mb-1'>
        {project.title}
      </Text.Heading>
      <Text.Label className='text-[var(--accent-primary)] font-semibold mb-3 block'>
        {project.period}
      </Text.Label>
      <Text.Body size='sm' color='secondary' className='mb-3'>
        {project.description}
      </Text.Body>

      {project.details.length > 0 && (
        <div>
          <ul className='space-y-1.5'>
            {project.details
              .slice(0, isExpanded ? undefined : 3)
              .map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className='text-sm leading-6 text-[var(--text-secondary)] flex items-start gap-2'
                >
                  <span className='w-1 h-1 rounded-full bg-[var(--accent-primary)] mt-2.5 flex-shrink-0' />
                  <span>{detail}</span>
                </motion.li>
              ))}
          </ul>

          {hasMoreDetails && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              className='mt-3 flex items-center gap-1 text-sm text-[var(--main)] hover:text-[var(--text-secondary)] transition-colors font-medium'
            >
              <span>
                {isExpanded ? '접기' : `+${project.details.length - 3} more`}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className='w-3 h-3' />
              </motion.div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
