'use client';

import { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { SubstackEmbed } from './SubstackEmbed';
import { textos } from '@/lib/i18n';

export function BuzonForm() {
  const { idioma } = useLanguage();
  const t = textos[idioma];
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleEnviarPregunta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pregunta.trim()) return;

    setCargando(true);
    setRespuesta('');

    try {
      const res = await fetch('/api/buzon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta, idioma })
      });

      const data = await res.json();
      if (data.respuesta) {
        setRespuesta(data.respuesta);
      } else {
        setRespuesta(idioma === 'es' ? 'Error al procesar tu pregunta.' : 'Error processing your question.');
      }
    } catch (error) {
      setRespuesta(idioma === 'es' ? 'Error de conexión.' : 'Connection error.');
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{t.sections.buzon}</h2>
        <p className="text-lg text-gray-600 mb-8">{t.buzon.descripcion}</p>

        <form onSubmit={handleEnviarPregunta} className="bg-white p-8 rounded border border-gray-200 mb-8">
          <textarea
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder={t.buzon.placeholder}
            className="w-full h-40 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none"
          />
          <button
            type="submit"
            disabled={cargando || !pregunta.trim()}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                {t.buzon.esperando}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t.buzon.enviar}
              </>
            )}
          </button>
        </form>

        {respuesta && (
          <div className="bg-white p-8 rounded border border-yellow-200 mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-900">{t.buzon.respuestaDe}</h3>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Georgia, serif' }}>{respuesta}</p>
          </div>
        )}

        <SubstackEmbed />
      </div>
    </section>
  );
}
