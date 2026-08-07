'use client';

import { useLanguage } from './LanguageProvider';
import { SUBSTACK_URL } from '@/lib/constants';

export function SubstackEmbed() {
  const { idioma } = useLanguage();

  return (
    <div className="mt-12 flex justify-center">
      <div className="border border-gray-200 rounded-lg p-6 bg-white text-center" style={{ maxWidth: '480px', width: '100%' }}>
        <p className="text-gray-700 font-medium mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          {idioma === 'es' ? 'Suscríbete para recibir nuevas entradas' : 'Subscribe to receive new entries'}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          {idioma === 'es' ? 'Recibirás cada nueva Carta o Email al ser publicada.' : "You'll receive each new Letter or Email as soon as it's published."}
        </p>
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition font-medium text-sm"
        >
          {idioma === 'es' ? 'Suscribirme en Substack →' : 'Subscribe on Substack →'}
        </a>
      </div>
    </div>
  );
}
