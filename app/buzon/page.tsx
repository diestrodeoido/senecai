import type { Metadata } from 'next';
import { BuzonForm } from '@/components/BuzonForm';

export const metadata: Metadata = {
  title: 'Buzón de SénecAI',
  description: 'Comparte tu pregunta o situación y recibe una respuesta con la sabiduría estoica de Séneca.',
};

export default function BuzonPage() {
  return <BuzonForm />;
}
