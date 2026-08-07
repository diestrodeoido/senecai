'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { textos } from '@/lib/i18n';
import type { Piece } from '@/lib/content';

export function PieceList({ kind, pieces }: { kind: 'cartas' | 'emails'; pieces: Piece[] }) {
  const { idioma } = useLanguage();
  const t = textos[idioma];
  const ordered = [...pieces].reverse(); // newest first, matches the original UI

  return (
    <section className={`min-h-screen ${kind === 'cartas' ? 'bg-yellow-50' : 'bg-white'} py-16`}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">{t.sections[kind]}</h2>
        <div className="grid gap-6">
          {ordered.map((piece) => {
            const title = idioma === 'es' ? piece.titleEs : piece.titleEn;
            const body = idioma === 'es' ? piece.bodyEs : piece.bodyEn;
            return (
              <Link
                key={piece.id}
                href={`/${kind}/${piece.slug}`}
                className="block bg-white p-6 rounded border border-gray-200 hover:border-yellow-400 transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{body.split('\n\n')[0].substring(0, 150)}...</p>
                <span className="text-yellow-600 font-medium text-sm">{idioma === 'es' ? 'Leer más →' : 'Read more →'}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
