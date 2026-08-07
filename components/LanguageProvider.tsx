'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Idioma = 'es' | 'en';

type LanguageContextValue = {
  idioma: Idioma;
  setIdioma: (idioma: Idioma) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>('es');

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
