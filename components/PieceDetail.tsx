'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { SubstackEmbed } from './SubstackEmbed';
import { textos } from '@/lib/i18n';
import { formatFecha } from '@/lib/format';
import type { Piece } from '@/lib/content';

export function PieceDetail({ kind, piece }: { kind: 'cartas' | 'emails'; piece: Piece }) {
  const { idioma } = useLanguage();
  const t = textos[idioma];
  const title = idioma === 'es' ? piece.titleEs : piece.titleEn;
  const body = idioma === 'es' ? piece.bodyEs : piece.bodyEn;
  const fecha = formatFecha(piece.date, idioma);

  return (
    <section className={`min-h-screen ${kind === 'cartas' ? 'bg-yellow-50' : 'bg-white'} py-16`}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">{t.sections[kind]}</h2>
        <article>
          <Link
            href={`/${kind}`}
            className={`${kind === 'cartas' ? 'text-yellow-700 hover:text-yellow-900' : 'text-yellow-600 hover:text-yellow-700'} font-medium text-sm mb-8 block`}
          >
            ← {idioma === 'es' ? 'Volver' : 'Back'}
          </Link>

          {kind === 'cartas' ? (
            <div className="bg-yellow-100 border-2 border-yellow-800 rounded-lg p-8 shadow-md max-w-3xl">
              <h3 className="text-3xl font-bold text-yellow-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                {title}
              </h3>
              <div
                className="text-yellow-900 leading-relaxed whitespace-pre-wrap mb-8"
                style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', lineHeight: '1.7' }}
              >
                {body}
              </div>
              <div className="text-sm text-yellow-800 italic border-t-2 border-yellow-800 pt-4">{fecha}</div>
            </div>
          ) : (
            <div className="bg-white border border-gray-300 rounded-lg shadow-sm max-w-3xl">
              <div className="border-b border-gray-200 p-6 bg-gray-50">
                <p className="text-sm text-gray-600 font-mono">
                  <span className="font-semibold">{idioma === 'es' ? 'Asunto' : 'Subject'}:</span> {title}
                </p>
                <p className="text-sm text-gray-600 font-mono mt-1">
                  <span className="font-semibold">{idioma === 'es' ? 'Fecha' : 'Date'}:</span> {fecha}
                </p>
              </div>
              <div className="p-8 text-gray-800 leading-relaxed whitespace-pre-wrap text-base" style={{ fontFamily: 'Georgia, serif' }}>
                {body}
              </div>
            </div>
          )}

          <SubstackEmbed />
        </article>
      </div>
    </section>
  );
}
