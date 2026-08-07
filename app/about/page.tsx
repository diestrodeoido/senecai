import type { Metadata } from 'next';
import { AboutContent } from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'Sobre Luisilio',
  description: 'Quién escribe SenecAI y por qué.',
};

export default function AboutPage() {
  return <AboutContent />;
}
