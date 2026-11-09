import type { Metadata } from 'next';
import { ExperienceSection } from '@/features/ExperienceSection';

export const metadata: Metadata = {
  title: 'Experience',
  alternates: { canonical: '/experience' },
};

export default function ExperiencePage() {
  return <ExperienceSection />;
}
