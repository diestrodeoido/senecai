'use client';

import { useLanguage } from './LanguageProvider';
import { textos } from '@/lib/i18n';

export function Footer() {
  const { idioma } = useLanguage();
  const t = textos[idioma];

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm border-t border-gray-800 mt-16">
      <p>{t.footer.derechos}</p>
    </footer>
  );
}
