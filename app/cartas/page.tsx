import type { Metadata } from 'next';
import { getAllCartas } from '@/lib/content';
import { PieceList } from '@/components/PieceList';

export const metadata: Metadata = {
  title: 'Cartas a Séneca',
  description: 'Cartas de un discípulo moderno a Séneca, en respuesta a sus enseñanzas estoicas.',
};

export default function CartasPage() {
  return <PieceList kind="cartas" pieces={getAllCartas()} />;
}
