/**
 * ProjectCard Component
 *
 * 카드 대신 그리드 한 행으로 그린다. 왼쪽 4열은 메타 정보, 오른쪽 8열은 본문이다.
 */

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
    <article className='grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 border-t border-[var(--border-primary)] py-12 md:py-16'>
      <div className='md:col-span-4 space-y-3'>
        <span className='block font-mono text-caption text-[var(--text-tertiary)]'>
          {String(index + 1).padStart(2, '0')}
        </span>
        <Text.Heading size='sm' as='h3'>
          {title}
        </Text.Heading>
        <span className='block font-mono text-small font-semibold text-[var(--accent-primary)]'>
          {period}
        </span>
        {(demoUrl || githubUrl || appStoreUrl) && (
          <div className='flex flex-wrap gap-x-5 pt-2'>
            {demoUrl && (
              <Text.Button size='sm' href={demoUrl} target='_blank'>
                Demo
              </Text.Button>
            )}
            {appStoreUrl && (
              <Text.Button variant='secondary' size='sm' href={appStoreUrl} target='_blank'>
                App Store
              </Text.Button>
            )}
            {githubUrl && (
              <Text.Button variant='secondary' size='sm' href={githubUrl} target='_blank'>
                GitHub
              </Text.Button>
            )}
          </div>
        )}
      </div>

      <div className='md:col-span-8 space-y-6'>
        <Text.Body size='lg' color='primary'>
          {description}
        </Text.Body>

        <ul className='space-y-3'>
          {highlights.map((highlight, highlightIndex) => (
            <li
              key={highlightIndex}
              className='grid grid-cols-[1.25rem_1fr] text-body text-[var(--text-secondary)]'
            >
              <span aria-hidden='true' className='text-[var(--text-tertiary)]'>
                —
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <p className='font-mono text-small text-[var(--text-tertiary)]'>
          {technologies.join('  /  ')}
        </p>
      </div>
    </article>
  );
}
