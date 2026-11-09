import type { Metadata } from 'next';
import { ProjectsSection } from '@/features/ProjectsSection';

export const metadata: Metadata = {
  title: 'Projects',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
