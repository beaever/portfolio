/**
 * ExperienceCard Component
 *
 * 카드 대신 그리드 한 행으로 그린다. 왼쪽 4열은 회사 정보, 오른쪽 8열은 프로젝트 목록이다.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Text } from '@/components/ui/Text';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className='grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 border-t border-[var(--border-primary)] py-12 md:py-16'>
      <div className='md:col-span-4 space-y-2'>
        <Text.Heading size='sm' as='h3'>
          {experience.company}
        </Text.Heading>
        <Text.Body size='sm' color='secondary'>
          {experience.position}
        </Text.Body>
        <span className='block font-mono text-small font-semibold text-[var(--accent-primary)]'>
          {experience.period}
        </span>
      </div>

      <div className='md:col-span-8 space-y-10'>
        {experience.projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </article>
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
    <div className='space-y-3'>
      <div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
        <Text.Heading size='xs' as='h4'>
          {project.title}
        </Text.Heading>
        <span className='font-mono text-small font-semibold text-[var(--accent-primary)]'>
          {project.period}
        </span>
      </div>
      <Text.Body size='md' color='secondary'>
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
                  className='grid grid-cols-[1.25rem_1fr] text-small text-[var(--text-tertiary)]'
                >
                  <span aria-hidden='true'>—</span>
                  <span>{detail}</span>
                </motion.li>
              ))}
          </ul>

          {hasMoreDetails && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              className='mt-3 flex items-center gap-1 py-1 text-small font-medium text-[var(--text-primary)] underline-offset-[0.3em] hover:underline'
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
