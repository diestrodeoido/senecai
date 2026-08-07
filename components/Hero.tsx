'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { textos } from '@/lib/i18n';

const BUTTONS = ['cartas', 'emails', 'buzon'] as const;

export function Hero() {
  const { idioma } = useLanguage();
  const t = textos[idioma];

  return (
    <section className="min-h-screen bg-white flex flex-col justify-center">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">{t.home.titulo}</h1>
        <p className="text-xl text-yellow-600 mb-8 font-light">{t.home.subtitulo}</p>
        <p className="text-lg text-gray-700 leading-relaxed mb-12 font-light">{t.home.introduccion}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          {BUTTONS.map((s) => (
            <Link
              key={s}
              href={`/${s}`}
              className="bg-yellow-600 text-white px-8 py-3 rounded hover:bg-yellow-700 transition font-medium"
            >
              {t.home.botones[s]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
