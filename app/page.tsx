'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const piezas = {
  cartas: [
    {
      id: 1,
      titulo: { es: "Sobre el valor del tiempo", en: "On the Value of Time" },
      tema: "TIME & MORTALITY",
      fecha: "15 de enero de 2024",
      resumen: "Una reflexión personal sobre cómo clasificamos y usamos nuestro tiempo más valioso.",
      contenido: {
        es: `Mi querido Séneca, justo estando a punto de empezar a escribirte esto, sentí cómo algunas obligaciones querían sustraerme el tiempo, tras notar que había recibido varios mensajes. Me resistí a leerlos, aún con un ligero miedo de que podría haber allí algo urgente o importante. Consciente de que difícilmente nada habría más valioso que este preciso momento, me volqué con toda mi atención a estas líneas, sabiendo que romper mi atención sería no haber abrazado tu consejo.

Clasifico ahora cada situación: ¿me arrebata el tiempo? La evito. ¿Me lo sustrae? La pospongo, al menos hasta cuando sea realmente indispensable enfrentarla. Seguramente también están aquellas en las que se me escapa el tiempo, pero con sólo ser más consciente ahora, espero reducir estas últimas.

Solía considerar negligentes a quienes creen tener más tiempo del que disponen. "El día tiene 24 horas más la noche", dicen ellos, como si la vida fuera infinita. Pero hoy veo que hay algo peor: estar consciente del tiempo finito y desperdiciarlo de todas formas.`,
        en: `My dear Seneca, just as I was about to begin writing this, I felt how certain obligations wanted to steal my time, noticing that I had received several messages. I resisted reading them, even with a slight fear that something urgent or important might be there. Aware that hardly anything could be more valuable than this precise moment, I turned with all my attention to these lines, knowing that breaking my focus would mean I had not truly embraced your counsel.

Nowadays I try to classify every situation: Does it steal my time? I avoid it. Does it drain my time? I postpone it, at least until it becomes truly necessary to face it. Surely there are also those in which time simply slips away from me, but by being more conscious now, I hope to reduce these instances.

I used to consider negligent those who believe they have more time than they actually possess. "The day has 24 hours plus the night," they say, as if life were infinite. But today I see something worse: being aware of finite time and squandering it anyway.`
      }
    },
    {
      id: 2,
      titulo: { es: "Sobre la diversidad de las lecturas", en: "On Reading Diversity" },
      tema: "FOCUS & LEARNING",
      fecha: "20 de febrero de 2024",
      resumen: "Una conversación sobre cómo la variedad en nuestras lecturas revela quiénes somos.",
      contenido: {
        es: `Recibí tu consejo sobre los autores, mi querido Séneca, y debo confesarte algo incómodo: no lo estoy siguiendo. Leo regularmente, pero nunca todo lo que quisiera. Y últimamente leo menos que en los últimos años, seguro por haber decidido dedicarle más tiempo a otras obligaciones y desde hace poco, a actividades realmente importantes.`,
        en: `I received your counsel on authors, my dear Seneca, and I must confess something uncomfortable to you: I am not following it. I read regularly, but never as much as I would wish. And lately I read less than in recent years, certainly because I decided to dedicate more time to other obligations.`
      }
    },
    {
      id: 3,
      titulo: { es: "Sobre la elección de amigos", en: "On Choosing Friends" },
      tema: "RELATIONSHIPS & SOLITUDE",
      fecha: "10 de marzo de 2024",
      resumen: "Reflexiones sobre los grados de amistad y la necesidad de verdaderos amigos.",
      contenido: {
        es: `Leí con mucho entusiasmo tus consejos sobre la amistad, mi querido Séneca, pero creo que, aunque hermosas todas las ideas, algo están alejadas de la realidad. Sabiendo que en nadie realmente confío como en mi mismo, no existe persona a la que le pueda decir absolutamente todo lo que pienso.`,
        en: `I read your counsel on friendship with great enthusiasm, my dear Seneca, but I believe that, though all the ideas are beautiful, they are somewhat removed from reality. Knowing that I truly trust no one as I trust myself, there is no person to whom I can tell absolutely everything I think.`
      }
    }
  ],
  emails: [
    {
      id: 1,
      titulo: { es: "Sobre el valor del tiempo", en: "On the Value of Time" },
      tema: "TIME & MORTALITY",
      fecha: "16 de enero de 2024",
      resumen: "Una meditación sobre kronos y kairos, y cómo la atención da valor al tiempo.",
      contenido: {
        es: `¿Qué es el tiempo Lucilio, sino un instante infinito que se esconde entre el pasado y el futuro? Es ese instante, a la vez infinitesimal y por lo tanto imperceptible para nuestras capacidades, lo único que tenemos, pero todo lo que necesitamos. De la misma manera que no pueden existir monedas de un centavo porque todas las transacciones monetarias las hacemos por montos muchos mayores, es que para valorar el tiempo debemos pensarlo como bloques de muchos instantes.`,
        en: `What is time, Lucilius, but an infinite instant that hides between the past and the future? That instant, at once infinitesimal and therefore imperceptible to our capacities, is the only thing we possess, yet it is all we need. In the same way that penny coins cannot exist because all monetary transactions are conducted in larger amounts, we must think of time as blocks of many instants.`
      }
    },
    {
      id: 2,
      titulo: { es: "Sobre las lecturas", en: "On Reading" },
      tema: "FOCUS & LEARNING",
      fecha: "21 de febrero de 2024",
      resumen: "Cómo la variedad de nuestras lecturas revela nuestro ser.",
      contenido: {
        es: `Aquel que pasa de un texto sobre el poder de la respiración, a otro de sesgos cognitivos, a la vez que repasa algo de historia universal buscando aprender de liderazgo, para terminar seguramente con filosofía, no busca respuestas diversas, sino coherencia en la multiplicidad. La variedad de nuestras lecturas, Lucilio, revela quiénes somos, a la vez que quiénes queremos ser.`,
        en: `One who moves from a text on the power of breathing, to another on cognitive biases, while reviewing something of universal history seeking to learn of leadership, to end surely with philosophy, does not seek diverse answers, but coherence in multiplicity. The variety of our readings, Lucilius, reveals who we are, at the same time as who we wish to be.`
      }
    },
    {
      id: 3,
      titulo: { es: "Sobre la elección de amigos", en: "On Choosing Friends" },
      tema: "RELATIONSHIPS & SOLITUDE",
      fecha: "11 de marzo de 2024",
      resumen: "Una reflexión sobre la verdadera amistad.",
      contenido: {
        es: `Era este un niño extraterrestre que se hace amigo de uno terrícola. Del mismo modo, Lucilio, ocurre con los verdaderos amigos: los puedes ver luego de siete años para continuar la conversación que tuvieron la última vez. Si te preguntas entonces si, como en el amor a la pareja, la distancia y el tiempo son pruebas de la amistad, yo veo una clara diferencia: el amor parece debilitarse con ellos, mientras la amistad verdadera, se fortalece.`,
        en: `There was once an extraterrestrial child who befriended an earthly child. In the same way, Lucilius, it is with true friends: you can see them after seven years to continue the conversation you had the last time. If you ask yourself then whether, as in romantic love, distance and time are tests of friendship, I see a clear difference: love seems to weaken with them, while true friendship strengthens.`
      }
    }
  ]
};

const textos = {
  es: {
    home: {
      titulo: "SenecAI",
      subtitulo: "Continuando la conversación con Séneca",
      introduccion: "Mientras escuchaba una clase sobre una de las Cartas de Séneca a Lucilio, me pregunté: ¿existirán esas las cartas que enviaba Lucilio o todo era parte del arsenal literario de Séneca? Luego entendí que esto no importaba, como sí las enormes lecciones de vida que hay en estos textos. Sin embargo, no se me ocurrió mejor forma para aprender sobre esto que continuar la conversación con Séneca, porque todos somos Lucilio, pero también podemos ser de vez en cuando, Séneca.",
      botones: { cartas: "Cartas", emails: "Emails", buzon: "Buzón" }
    },
    about: {
      titulo: "Sobre Luis",
      contenido: "Filósofo sin academia, empresario sin ambiciones, mente con cuerpo. Empecé escribiendo en mi blog Diestro de Oído, pero necesitaba un carril para avanzar derecho, y lo encontré en las cartas de Séneca que escribió para mi, pero también para ti.",
      parrafo2: "Como cuando se aprende a tocar música, SénecAI es mi cover personal sobre uno de los discos que marcaron mi vida."
    },
    nav: { cartas: "Cartas", emails: "Emails", buzon: "Buzón", about: "Sobre mí" },
    sections: { cartas: "Cartas a Séneca", emails: "Emails a Lucilio", buzon: "Buzón de SénecAI" },
    footer: { suscribete: "Suscríbete para recibir nuevas entradas", detalle: "Recibirás cada nueva Carta o Email al ser publicada", derechos: "© 2024 SenecAI. Todos los derechos reservados." }
  },
  en: {
    home: {
      titulo: "SenecAI",
      subtitulo: "Continuing the Conversation with Seneca",
      introduccion: "While listening to a lecture on one of Seneca's Letters to Lucilius, I wondered: did Lucilius's letters even exist, or was it all part of Seneca's literary arsenal? Then I understood that it didn't matter—what did matter were the enormous life lessons in these texts. However, I found no better way to learn about this than to continue the conversation with Seneca, because we are all Lucilius, but we can also be a Seneca from time to time.",
      botones: { cartas: "Letters", emails: "Emails", buzon: "Mailbox" }
    },
    about: {
      titulo: "About Luis",
      contenido: "Philosopher without academy, entrepreneur without ambitions, mind with body. I started writing on my blog Diestro de Oído, but I needed a path to move straight ahead, and I found it in Seneca's letters that he wrote for me, but also for you.",
      parrafo2: "Just as when learning to play music, SenecAI is my personal cover of one of the records that marked my life."
    },
    nav: { cartas: "Letters", emails: "Emails", buzon: "Mailbox", about: "About me" },
    sections: { cartas: "Letters to Seneca", emails: "Emails to Lucilius", buzon: "Seneca's Mailbox" },
    footer: { suscribete: "Subscribe to receive new entries", detalle: "You'll receive each new Letter or Email as soon as it's published", derechos: "© 2024 SenecAI. All rights reserved." }
  }
};

export default function SenecAI() {
  const [idioma, setIdioma] = useState('es');
  const [seccionActiva, setSeccionActiva] = useState('home');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);

  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const t = textos[idioma as keyof typeof textos];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => setSeccionActiva('home')} className="text-2xl font-bold text-gray-900 hover:text-yellow-600 transition" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em', fontWeight: '300' }}>
            &lt;SENEC<span className="text-yellow-600">AI</span>&gt;
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setSeccionActiva('cartas')} className={`text-sm font-medium transition ${seccionActiva === 'cartas' ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.cartas}</button>
            <button onClick={() => setSeccionActiva('emails')} className={`text-sm font-medium transition ${seccionActiva === 'emails' ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.emails}</button>
            <button onClick={() => setSeccionActiva('buzon')} className={`text-sm font-medium transition ${seccionActiva === 'buzon' ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.buzon}</button>
            <button onClick={() => setSeccionActiva('about')} className={`text-sm font-medium transition ${seccionActiva === 'about' ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.about}</button>

            <div className="flex gap-2 pl-4 border-l border-gray-200">
              <button onClick={() => setIdioma('es')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'es' ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>ES</button>
              <button onClick={() => setIdioma('en')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'en' ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>EN</button>
            </div>
          </div>

          <button onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden text-gray-600">{menuAbierto ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </nav>

      <div className="flex-grow">
        {seccionActiva === 'home' && (
          <section className="min-h-screen bg-white flex flex-col justify-center">
            <div className="max-w-2xl mx-auto px-6 py-16 text-center">
              <div className="flex justify-center gap-2 mb-8">
                <button onClick={() => setIdioma('es')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'es' ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>ES</button>
                <button onClick={() => setIdioma('en')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'en' ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>EN</button>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">{t.home.titulo}</h1>
              <p className="text-xl text-yellow-600 mb-8 font-light">{t.home.subtitulo}</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-12 font-light">{t.home.introduccion}</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={() => setSeccionActiva('cartas')} className="inline-block bg-yellow-600 text-white px-8 py-3 rounded hover:bg-yellow-700 transition font-medium">{t.home.botones.cartas}</button>
                <button onClick={() => setSeccionActiva('emails')} className="inline-block bg-yellow-600 text-white px-8 py-3 rounded hover:bg-yellow-700 transition font-medium">{t.home.botones.emails}</button>
                <button onClick={() => setSeccionActiva('buzon')} className="inline-block bg-yellow-600 text-white px-8 py-3 rounded hover:bg-yellow-700 transition font-medium">{t.home.botones.buzon}</button>
              </div>
            </div>
          </section>
        )}

        {seccionActiva === 'cartas' && (
          <section className="min-h-screen bg-yellow-50 py-16">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-12">{t.sections.cartas}</h2>
              {piezaSeleccionada && piezaSeleccionada.tipo === 'carta' ? (
                <article>
                  <button onClick={() => setPiezaSeleccionada(null)} className="text-yellow-700 hover:text-yellow-900 font-medium text-sm mb-8">← {idioma === 'es' ? 'Volver' : 'Back'}</button>
                  <div className="flex justify-end gap-2 mb-8">
                    <button onClick={() => setIdioma('es')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'es' ? 'bg-yellow-200 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>ES</button>
                    <button onClick={() => setIdioma('en')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'en' ? 'bg-yellow-200 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>EN</button>
                  </div>
                  <div className="bg-yellow-100 border-2 border-yellow-800 rounded-lg p-8 shadow-md max-w-2xl">
                    <h3 className="text-3xl font-bold text-yellow-900 mb-6 font-serif">{typeof piezaSeleccionada.pieza.titulo === 'string' ? piezaSeleccionada.pieza.titulo : piezaSeleccionada.pieza.titulo[idioma]}</h3>
                    <div className="text-yellow-900 leading-relaxed whitespace-pre-wrap mb-8" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.3rem', lineHeight: '1.7', fontWeight: '400' }}>{piezaSeleccionada.pieza.contenido[idioma]}</div>
                    <div className="text-sm text-yellow-800 italic border-t-2 border-yellow-800 pt-4">{piezaSeleccionada.pieza.fecha}</div>
                  </div>
                </article>
              ) : (
                <div className="grid gap-6">
                  {piezas.cartas.slice().reverse().map((carta) => (
                    <div key={carta.id} className="bg-white p-6 rounded border border-gray-200 hover:border-yellow-400 transition cursor-pointer" onClick={() => setPiezaSeleccionada({ tipo: 'carta', pieza: carta })}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{typeof carta.titulo === 'string' ? carta.titulo : carta.titulo[idioma]}</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{carta.resumen}</p>
                      <button className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium text-sm">{idioma === 'es' ? 'Leer más →' : 'Read more →'}</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {seccionActiva === 'emails' && (
          <section className="min-h-screen bg-white py-16">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-12">{t.sections.emails}</h2>
              {piezaSeleccionada && piezaSeleccionada.tipo === 'email' ? (
                <article>
                  <button onClick={() => setPiezaSeleccionada(null)} className="text-yellow-600 hover:text-yellow-700 font-medium text-sm mb-8">← {idioma === 'es' ? 'Volver' : 'Back'}</button>
                  <div className="flex justify-end gap-2 mb-8">
                    <button onClick={() => setIdioma('es')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'es' ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>ES</button>
                    <button onClick={() => setIdioma('en')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'en' ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>EN</button>
                  </div>
                  <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
                    <div className="border-b border-gray-200 p-6 bg-gray-50">
                      <div className="text-sm text-gray-600 font-mono"><p><span className="font-semibold">{idioma === 'es' ? 'Asunto' : 'Subject'}:</span> {typeof piezaSeleccionada.pieza.titulo === 'string' ? piezaSeleccionada.pieza.titulo : piezaSeleccionada.pieza.titulo[idioma]}</p><p><span className="font-semibold">{idioma === 'es' ? 'Fecha' : 'Date'}:</span> {piezaSeleccionada.pieza.fecha}</p></div>
                    </div>
                    <div className="p-8 font-serif text-gray-800 leading-relaxed whitespace-pre-wrap text-base">{piezaSeleccionada.pieza.contenido[idioma]}</div>
                  </div>
                </article>
              ) : (
                <div className="grid gap-6">
                  {piezas.emails.slice().reverse().map((email) => (
                    <div key={email.id} className="bg-white p-6 rounded border border-gray-200 hover:border-yellow-400 transition cursor-pointer" onClick={() => setPiezaSeleccionada({ tipo: 'email', pieza: email })}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{typeof email.titulo === 'string' ? email.titulo : email.titulo[idioma]}</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{email.resumen}</p>
                      <button className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium text-sm">{idioma === 'es' ? 'Leer más →' : 'Read more →'}</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {seccionActiva === 'buzon' && (
          <section className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-2xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{t.sections.buzon}</h2>
              <div className="bg-white p-8 rounded border border-gray-200">
                <div className="text-center py-12">
                  <p className="text-2xl text-gray-600 mb-4">🔨</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{idioma === 'es' ? 'En construcción' : 'Under Construction'}</h3>
                  <p className="text-gray-600">
                    {idioma === 'es'
                      ? 'El Buzón de SénecAI estará disponible próximamente. Pronto podrás compartir tus preguntas y recibir respuestas personalizadas con la sabiduría de Séneca.'
                      : 'The Seneca Mailbox will be available soon. You will soon be able to share your questions and receive personalized responses with Seneca\'s wisdom.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {seccionActiva === 'about' && (
          <section className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-2xl mx-auto px-6">
              <div className="flex justify-end gap-2 mb-8">
                <button onClick={() => setIdioma('es')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'es' ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>ES</button>
                <button onClick={() => setIdioma('en')} className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === 'en' ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>EN</button>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{t.about.titulo}</h2>
              <div className="bg-white p-8 rounded border border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{t.about.contenido}</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">{t.about.parrafo2}</p>
              </div>
            </div>
          </section>
        )}
      </div>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm border-t border-gray-800 mt-16">
        <p>{t.footer.derechos}</p>
      </footer>
    </div>
  );
}
