import type { Metadata } from 'next';
import { MediaSection } from '@/features/MediaSection';

export const metadata: Metadata = {
  title: 'Media',
  alternates: { canonical: '/media' },
};

export default function MediaPage() {
  return <MediaSection />;
}
