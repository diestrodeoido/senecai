import type { Metadata } from 'next';
import { getAllEmails } from '@/lib/content';
import { PieceList } from '@/components/PieceList';

export const metadata: Metadata = {
  title: 'Emails a Lucilio',
  description: 'Las respuestas de Séneca, con la sabiduría estoica aplicada a la vida moderna.',
};

export default function EmailsPage() {
  return <PieceList kind="emails" pieces={getAllEmails()} />;
}
