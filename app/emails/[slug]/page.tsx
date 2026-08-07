import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllEmails, getEmailBySlug } from '@/lib/content';
import { PieceDetail } from '@/components/PieceDetail';

export function generateStaticParams() {
  return getAllEmails().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const piece = getEmailBySlug(slug);
  if (!piece) return {};
  return {
    title: piece.titleEs,
    description: piece.bodyEs.split('\n\n')[0].slice(0, 155),
  };
}

export default async function EmailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const piece = getEmailBySlug(slug);
  if (!piece) notFound();
  return <PieceDetail kind="emails" piece={piece} />;
}
