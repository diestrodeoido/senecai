'use client';

import { useLanguage } from './LanguageProvider';
import { textos } from '@/lib/i18n';
import { SUBSTACK_URL } from '@/lib/constants';

export function AboutContent() {
  const { idioma } = useLanguage();
  const t = textos[idioma];

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{t.about.titulo}</h2>
        <div className="bg-white p-8 rounded border border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t.about.contenidoPre}
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-600 underline font-medium"
            >
              {t.about.contenidoLinkText}
            </a>
            {t.about.contenidoPost}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">{t.about.parrafo2}</p>
        </div>
      </div>
    </section>
  );
}
