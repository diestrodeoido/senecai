'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { textos } from '@/lib/i18n';

const SECTIONS = ['cartas', 'emails', 'buzon', 'about'] as const;
type Section = (typeof SECTIONS)[number];

function isActive(pathname: string, s: Section) {
  return pathname === `/${s}` || pathname.startsWith(`/${s}/`);
}

export function Nav() {
  const { idioma, setIdioma } = useLanguage();
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const t = textos[idioma];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em', fontWeight: '300', fontSize: '1.4rem' }}
          className="text-gray-900 hover:text-yellow-600 transition"
        >
          &lt;SENEC<span className="text-yellow-600">AI</span>&gt;
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s) => (
            <Link
              key={s}
              href={`/${s}`}
              className={`text-sm font-medium transition ${isActive(pathname, s) ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {t.nav[s]}
            </Link>
          ))}
          <div className="flex gap-2 pl-4 border-l border-gray-200">
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setIdioma(l)}
                className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === l ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden text-gray-600 text-xl">
          {menuAbierto ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuAbierto && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s}
              href={`/${s}`}
              onClick={() => setMenuAbierto(false)}
              className={`text-sm font-medium text-left transition ${isActive(pathname, s) ? 'text-yellow-600' : 'text-gray-600'}`}
            >
              {t.nav[s]}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setIdioma(l); setMenuAbierto(false); }}
                className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === l ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
