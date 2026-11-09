import type { Metadata } from 'next';
import { ContactSection } from '@/features/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactSection />;
}
