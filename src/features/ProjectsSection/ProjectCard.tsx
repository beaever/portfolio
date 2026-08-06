/**
 * ProjectCard Component
 */

import { ArrowUpRight } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Text } from '@/components/ui/Text';
import { PortfolioProject } from '@/types';

interface ProjectCardProps extends PortfolioProject {
  index?: number;
}

export function ProjectCard({
  title,
  description,
  period,
  highlights,
  demoUrl,
  githubUrl,
  appStoreUrl,
  technologies,
  index = 0,
}: ProjectCardProps) {
  return (
    <GlassCard variant='group' padding='lg' className='h-full flex flex-col'>
      <div className='flex items-start justify-between mb-4'>
        <span className='text-xs text-[var(--text-tertiary)] font-mono'>
          {String(index + 1).padStart(2, '0')}
        </span>
        <ArrowUpRight
          className='text-[var(--text-quaternary)] group-hover:text-[var(--accent-primary)] transition-colors'
          size={20}
        />
      </div>

      <div className='flex-1 space-y-4'>
        <div className='space-y-1'>
          <Text.Heading
            size='sm'
            as='h3'
            className='group-hover:text-[var(--accent-primary)] transition-colors'
          >
            {title}
          </Text.Heading>
          <span className='text-xs text-[var(--text-tertiary)] font-mono'>
            {period}
          </span>
        </div>

        <Text.Body size='sm' color='secondary'>
          {description}
        </Text.Body>

        <ul className='space-y-2'>
          {highlights.map((highlight, highlightIndex) => (
            <li
              key={highlightIndex}
              className='flex gap-2 text-sm leading-relaxed text-[var(--text-secondary)]'
            >
              <span
                aria-hidden='true'
                className='mt-2 size-1 shrink-0 rounded-full bg-[var(--accent-primary)]'
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className='flex flex-wrap gap-2'>
          {technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className='px-3 py-1 bg-[var(--bg-surface)]/80 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors'
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {(demoUrl || githubUrl || appStoreUrl) && (
        <div className='flex flex-wrap gap-3 pt-4 mt-4 border-t border-[var(--border-primary)]/30'>
          {demoUrl && (
            <Text.Button
              variant='primary'
              size='sm'
              href={demoUrl}
              target='_blank'
            >
              Demo
            </Text.Button>
          )}
          {appStoreUrl && (
            <Text.Button
              variant='outline'
              size='sm'
              href={appStoreUrl}
              target='_blank'
            >
              App Store
            </Text.Button>
          )}
          {githubUrl && (
            <Text.Button
              variant='outline'
              size='sm'
              href={githubUrl}
              target='_blank'
            >
              GitHub
            </Text.Button>
          )}
        </div>
      )}
    </GlassCard>
  );
}
