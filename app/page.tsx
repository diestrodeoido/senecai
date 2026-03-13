'use client';

import { useState } from 'react';
import { ChevronDown, Send, Loader } from 'lucide-react';

type Idioma = 'es' | 'en';
type Seccion = 'home' | 'cartas' | 'emails' | 'buzon' | 'about';

interface PiezaSeleccionada {
  tipo: 'carta' | 'email';
  indice: number;
}

const textos = {
  es: {
    sections: { cartas: "Cartas a Séneca", emails: "Emails a Lucilio", buzon: "Buzón de SénecAI" },
    home: {
      titulo: "SenecAI",
      subtitulo: "Cartas filosóficas en diálogo con Séneca",
      descripcion: "Un proyecto de reflexión personal y divulgación que recupera la tradición de las cartas filosóficas para explorar cómo la sabiduría estoica ilumina nuestras vidas contemporáneas."
    },
    about: {
      titulo: "---",
      bio: "Filósofo sin academia, mente con cuerpo, emprendedor el resto del tiempo.",
    },
    buzon: {
      titulo: "Buzón de SénecAI",
      descripcion: "Escribe tu pregunta o comparte una situación que te preocupa. Séneca te responderá con la sabiduría de sus cartas.",
      placeholder: "¿Qué te inquieta? ¿Qué pregunta llevas contigo?",
      enviar: "Enviar pregunta",
      esperando: "Séneca está reflexionando...",
      respuestaDe: "Respuesta de Séneca:",
    }
  },
  en: {
    sections: { cartas: "Letters to Seneca", emails: "Emails to Lucilius", buzon: "SenecAI Mailbox" },
    home: {
      titulo: "SenecAI",
      subtitulo: "Philosophical letters in dialogue with Seneca",
      descripcion: "A project of personal reflection and outreach that recovers the tradition of philosophical letters to explore how Stoic wisdom illuminates our contemporary lives."
    },
    about: {
      titulo: "---",
      bio: "Philosopher without academy, mind with body, entrepreneur for the rest of the time.",
    },
    buzon: {
      titulo: "SenecAI Mailbox",
      descripcion: "Write your question or share a situation that concerns you. Seneca will respond with the wisdom of his letters.",
      placeholder: "What troubles you? What question do you carry with you?",
      enviar: "Send question",
      esperando: "Seneca is reflecting...",
      respuestaDe: "Seneca's response:",
    }
  }
};

const cartasData = {
  es: [
    {
      numero: 1,
      titulo: "Sobre el valor del tiempo",
      contenido: `Mi querido Séneca,

Tu carta sobre el tiempo me ha golpeado como pocas cosas lo hacen. "Unos tiempos se nos arrebatan, otros se nos sustraen y otros se nos escapan." Leí estas líneas en una mañana cualquiera, mientras comprobaba mi correo por enésima vez, sabiendo que debería estar escribiendo.

He reconocido en mí esa negligencia de la que hablas. No es que me roben el tiempo—es que lo entrego voluntariamente a cosas que importan poco. Las horas se deslizan entre notificaciones, entre conversaciones intrascendentes, entre la ilusión de estar ocupado. Y lo más arduo de aceptar es que yo soy el culpable.

Lo que tu sabiduría me muestra es que no se trata solo de "administrar" el tiempo, sino de elegir qué merece poseer mis horas. Cuando finalmente decidí apartar el teléfono y sentarme a escribir, descubrí algo: el tiempo no era escaso. Siempre estuvo ahí. Lo que faltaba era decisión.

Tu pregunta sigue resonando: "¿Acapara todas las horas?" Estoy aprendiendo a responder que sí—a que cada día sea mío por completo, no en fragmentos robados.

Con gratitud por tu claridad,
Un aprendiz`
    },
    {
      numero: 2,
      titulo: "Sobre la diversidad de las lecturas",
      contenido: `Querido Séneca,

Tu consejo sobre las lecturas me ha hecho detenerme. Yo era de esos que acumulaba libros como si la cantidad fuera virtud, saltando de uno a otro sin profundidad. Creía que leer más me haría más sabio. Qué ingenuo.

Cuando leí tus palabras sobre la necesidad de digerir profundamente una idea, reconocí mi error. He estado en todas partes y en ninguna—disperso entre cien autores sin realmente habitar ninguno.

Entonces hice lo que sugerías: elegí. Tomé un libro, uno solo, y me atrincheré en sus páginas. Releeí pasajes. Pensé en ellos mientras caminaba. Y fue entonces cuando la lectura dejó de ser acumulación para convertirse en conversación.

Lo que más me ha impactado es entender que la calidad de lo que absorbemos importa infinitamente más que la cantidad. Una idea profundamente comprendida remueve más que cien sobrevoleadas.

Sigo siendo un lector, pero ahora sé que leo para transformarme, no para coleccionar.

Tuyo en el aprendizaje,
Un discípulo`
    },
    {
      numero: 3,
      titulo: "Sobre la elección de amigos",
      contenido: `Mi estimado Séneca,

Tu prudencia sobre la amistad me ha enseñado algo que duele reconocer: he sido demasiado liberal en otorgar ese título. No todos los que me rodean son amigos. Algunos son apenas conocidos que ocurren estar cerca.

Lo que tu sabiduría me muestra es que la verdadera amistad exige discernimiento antes y entrega después. "Ponder for a long time" —reflexiona lentamente— antes de admitir a alguien. Pero una vez decidido, acoge con el alma completa.

He estado practicando esta distinción. Hay personas en mi vida que merecen ese juicio lento, esa evaluación honesta de si realmente podemos caminar juntos. Y he descubierto que cuando finalmente digo "sí" a alguien, lo digo con una profundidad que antes no conocía.

Lo más liberador es aceptar que no necesito tantos amigos. Necesito amigos verdaderos. La diferencia es abismal.

Tu enseñanza me ha devuelto la soledad como regalo, no como castigo.

Con admiración profunda,
Un aprendiz`
    },
    {
      numero: 4,
      titulo: "Sobre el miedo a la muerte",
      contenido: `Querido maestro Séneca,

He llegado a tu carta sobre la muerte en un momento en que la mía se ha sentido cercana—no por enfermedad, sino por claridad. Algo en mi vida me obligó a mirarla de frente, y descubrí que el miedo no era a morir, sino a haber vivido mal.

"La mayoría fluctúa miserablemente entre las penas de la vida y el miedo a morir, y no quiere vivir, pero no sabe morir." Estas palabras me atravesaron. He sido esa mayoría—a medias en todo, comprometido a nada, temiendo simultáneamente la vida y su fin.

Pero entonces vi lo que intentabas enseñar: que morir bien es una consecuencia de vivir bien. No se trata de negar la muerte ni de obsesionarse con ella. Se trata de vivir tan plenamente que cuando llegue, llegue sin protesta.

He comenzado a preguntarme cada mañana: "¿Si hoy fuera el último, estaría satisfecho con lo que haría?" No como un ejercicio morboso, sino como un acto de libertad. Porque una vida vivida bajo esa pregunta no tiene tiempo para la negligencia.

La muerte, descubro ahora, es mi mejor maestra. No porque me asuste, sino porque me devuelve a lo que importa.

Con gratitud infinita,
Tu aprendiz`
    }
  ],
  en: [
    {
      numero: 1,
      titulo: "On the Value of Time",
      contenido: `My dear Seneca,

Your letter on time has struck me as few things do. "Some times are snatched from us, others are stolen, and still others slip away." I read these lines one ordinary morning while checking my email for the nth time, knowing I should have been writing.

I have recognized in myself that negligence you speak of. It is not that time is stolen from me—I surrender it willingly to things that matter little. Hours slip away between notifications, between trivial conversations, between the illusion of busyness. And what is hardest to accept is that I am responsible.

What your wisdom shows me is that it is not merely a matter of "managing" time, but of choosing what deserves to possess my hours. When I finally decided to set aside my phone and sit to write, I discovered something: time was not scarce. It was always there. What was missing was decision.

Your question continues to echo: "Master all the hours?" I am learning to answer yes—to make each day completely mine, not in stolen fragments.

With gratitude for your clarity,
A student`
    },
    {
      numero: 2,
      titulo: "On Reading Diversity",
      contenido: `Dear Seneca,

Your advice on reading has made me pause. I was the kind who accumulated books as if quantity were virtue, jumping from one to another without depth. I believed that reading more would make me wiser. How naive.

When I read your words on the necessity of thoroughly digesting an idea, I recognized my error. I have been everywhere and nowhere—scattered among a hundred authors without truly inhabiting any of them.

So I did what you suggested: I chose. I took one book, only one, and entrenched myself in its pages. I reread passages. I thought about them while walking. And it was then that reading ceased to be accumulation and became conversation.

What has most struck me is understanding that the quality of what we absorb matters infinitely more than quantity. One idea deeply grasped moves more than a hundred skimmed.

I remain a reader, but now I know that I read to transform myself, not to collect.

Yours in learning,
A disciple`
    },
    {
      numero: 3,
      titulo: "On Choosing Friends",
      contenido: `My esteemed Seneca,

Your prudence on friendship has taught me something that pains me to recognize: I have been too liberal in bestowing that title. Not everyone around me is a friend. Some are merely acquaintances who happen to be near.

What your wisdom shows me is that true friendship demands discernment before and devotion after. "Ponder for a long time" before admitting someone. But once decided, welcome them with your whole soul.

I have been practicing this distinction. There are people in my life who deserve that slow judgment, that honest evaluation of whether we can truly walk together. And I have discovered that when I finally say "yes" to someone, I say it with a depth I never knew before.

Most liberating is accepting that I do not need so many friends. I need true friends. The difference is abyssal.

Your teaching has given me solitude back as a gift, not a punishment.

With deep admiration,
A student`
    },
    {
      numero: 4,
      titulo: "On the Fear of Death",
      contenido: `Dear Master Seneca,

I have come to your letter on death at a moment when mine has felt near—not from illness, but from clarity. Something in my life forced me to look it in the face, and I discovered that the fear was not of dying, but of having lived poorly.

"The majority fluctuate miserably between the sorrows of life and the fear of dying, unwilling to live, yet not knowing how to die." These words pierced me. I have been that majority—half in everything, committed to nothing, fearing both life and its end simultaneously.

But then I saw what you were trying to teach: that dying well is a consequence of living well. It is not about denying death or obsessing over it. It is about living so fully that when it comes, it comes without protest.

I have begun to ask myself each morning: "If today were the last, would I be satisfied with what I would do?" Not as a morbid exercise, but as an act of freedom. Because a life lived under that question has no time for negligence.

Death, I discover now, is my best teacher. Not because it frightens me, but because it returns me to what matters.

With infinite gratitude,
Your student`
    }
  ]
};

const emailsData = {
  es: [
    {
      numero: 1,
      titulo: "Sobre el valor del tiempo",
      contenido: `Estimado Lucilio,

El tiempo es la única riqueza que posees y, paradójicamente, la que menos reconoces como tal. Mientras amasas fortunas en dinero, desperdicias aquello que ningún comerciante puede reponerle.

Observa bien: algunos hombres tienen el tiempo arrebatado por circunstancias ajenas, otros lo pierden a través de negligencia. Pero tú—querido Lucilio—tienes el privilegio de ser el dueño de tu tiempo. La pregunta entonces no es si tienes suficiente. Es cómo lo gastarás.

He aprendido que el ocioso se queja de que la vida es breve. El ocupado se da cuenta de que es larga. La diferencia no está en los años, sino en cómo los habitas. Cuando dominas tus horas, ningún futuro te intimida. Acapara todas las horas del día de hoy, y mañana dejará de aterrarte.

Recuerda: nadie es verdaderamente pobre sino quien no controla su tiempo.

Con afecto,
Séneca`
    },
    {
      numero: 2,
      titulo: "Sobre las lecturas",
      contenido: `Mi querido Lucilio,

Muchos creen que leer mucho es sabiduria. Son los mismos que visitan bibliotecas como quien visita el mercado—recogiendo sin elegir, acumulando sin digerir. Permíteme decirte: eres más sabio con diez líneas comprendidas que con diez libros apenas hojeados.

La lectura no es un acto de cantidad sino de comunión. Cuando lees, te sientas con una mente a través de los siglos. Esa conversación debe ser profunda, o no es conversación en absoluto.

Sé selectivo. Elige autores que te desafíen, que te obliguen a pensar. Luego, relee. La primera lectura es encuentro; la segunda, amistad. Y es en esa amistad donde reside el verdadero aprendizaje.

Harold Bloom lo expresó bien: solo la lectura profunda y constante establece y aumenta un yo autónomo. Hasta que no te conviertas en ti mismo, ¿qué beneficio puedes ser para otros?

Con admiración por tu sed de saber,
Séneca`
    },
    {
      numero: 3,
      titulo: "Sobre la elección de amigos",
      contenido: `Estimado Lucilio,

La amistad verdadera es rara. Y precisamente porque es rara, debe ser cuidadosamente elegida.

Juzga lentamente a quien deseas admitir en tu círculo íntimo. Observa en silencio. ¿Camina esta persona hacia la virtud o la evita? ¿Busca la verdad o solo aplausos? ¿Estaría dispuesta a decirte una verdad incómoda, aunque le cueste?

Pero una vez hayas decidido, acógela con toda tu alma. Habla con ella como contigo mismo. No hay amistad donde hay cautela permanente.

Como dijo Ming-Dao Deng: "Con mi amigo desaparecido del mundo, ¿para quién tocaría mi música?" La verdadera amistad es una rara armonía. Y como toda armonía, requiere tiempo para ser perfeccionada.

Elige pocos. Ama profundo. Este es el camino de la amistad sabia.

Tu maestro,
Séneca`
    },
    {
      numero: 4,
      titulo: "Sobre el miedo a la muerte",
      contenido: `Mi estimado Lucilio,

El miedo a la muerte es, en realidad, miedo a la vida mal vivida. Por eso te digo: vive bien, y la muerte perderá su poder sobre ti.

Observe cómo la mayoría fluctúa miserablemente entre las penas de la vida y el miedo a morir. No quiere vivir plenamente por temor a lo que pueda suceder. No sabe morir porque nunca supo vivir. Es un estado lamentable.

Pero aquí está el secreto que los antiguos sabían: la muerte no es el enemigo. El enemigo es la negligencia. Es haber vivido por otros, según sus expectativas, persiguiendo sus sueños. Es llegar al final y descubrir que nunca fuiste tuyo.

Por eso pregúntate cada mañana: ¿estoy viviendo, o solo esperando? Porque una vida vivida bajo esa pregunta no teme a la muerte. La recibe como conclusión natural, no como tragedia.

Epicuro lo entendió perfectamente: "De la muerte no tenemos nada que temer, porque cuando la muerte existe, nosotros no existimos; y mientras nosotros existimos, la muerte no existe."

Vive, Lucilio. Vive plenamente. Entonces podrás decir, al final: fue suficiente.

Con amor eterno,
Séneca`
    }
  ],
  en: [
    {
      numero: 1,
      titulo: "On the Value of Time",
      contenido: `Esteemed Lucilius,

Time is the only wealth you possess, and paradoxically, the one you least recognize as such. While you amass fortunes in money, you squander that which no merchant can replenish for you.

Observe well: some men have time snatched from them by circumstances beyond their control. Others lose it through negligence. But you—dear Lucilius—have the privilege of being the master of your time. The question then is not whether you have enough. It is how you will spend it.

I have learned that the idle complain that life is short. The occupied discover that it is long. The difference lies not in the years, but in how you inhabit them. When you master your hours, no future intimidates you. Master all the hours of today, and tomorrow will cease to frighten you.

Remember: no one is truly poor except he who does not control his time.

With affection,
Seneca`
    },
    {
      numero: 2,
      titulo: "On Reading",
      contenido: `My dear Lucilius,

Many believe that reading much is wisdom. They are the same ones who visit libraries as one visits the marketplace—gathering without choosing, accumulating without digesting. Let me tell you: you are wiser with ten lines understood than with ten books barely skimmed.

Reading is not an act of quantity but of communion. When you read, you sit with a mind across the centuries. That conversation must be deep, or it is not conversation at all.

Be selective. Choose authors who challenge you, who force you to think. Then, reread. The first reading is encounter; the second, friendship. And it is in that friendship where true learning resides.

Harold Bloom expressed it well: only deep, constant reading fully establishes and augments an autonomous self. Until you become yourself, what benefit can you be to others?

With admiration for your thirst for knowledge,
Seneca`
    },
    {
      numero: 3,
      titulo: "On Choosing Friends",
      contenido: `Esteemed Lucilius,

True friendship is rare. And precisely because it is rare, it must be carefully chosen.

Judge slowly the one you wish to admit to your inner circle. Observe in silence. Does this person walk toward virtue or away from it? Does he seek truth or only applause? Would he be willing to tell you an uncomfortable truth, even if it cost him?

But once you have decided, welcome him with your whole soul. Speak with him as you speak with yourself. There is no friendship where there is permanent caution.

As Ming-Dao Deng said: "With my friend gone from the world, who will I play my music for?" True friendship is a rare harmony. And like all harmony, it requires time to be perfected.

Choose few. Love deeply. This is the way of wise friendship.

Your teacher,
Seneca`
    },
    {
      numero: 4,
      titulo: "On the Fear of Death",
      contenido: `My esteemed Lucilius,

The fear of death is, in reality, fear of having lived poorly. So I tell you: live well, and death will lose its power over you.

Observe how the majority fluctuate miserably between the sorrows of life and the fear of dying. They do not wish to live fully for fear of what may happen. They do not know how to die because they never knew how to live. It is a lamentable state.

But here is the secret the ancients knew: death is not the enemy. The enemy is negligence. It is to have lived for others, according to their expectations, pursuing their dreams. It is to arrive at the end and discover that you were never your own.

So ask yourself each morning: Am I living, or merely waiting? Because a life lived under that question does not fear death. It receives it as a natural conclusion, not as tragedy.

Epicurus understood it perfectly: "We have nothing to fear from death, because when death exists, we do not exist; and while we exist, death does not exist."

Live, Lucilius. Live fully. Then you can say, at the end: it was enough.

With eternal love,
Seneca`
    }
  ]
};

export default function Home() {
  const [idioma, setIdioma] = useState<Idioma>('es');
  const [seccionActual, setSeccionActual] = useState<Seccion>('home');
  const [piezaSeleccionada, setPiezaSeleccionada] = useState<PiezaSeleccionada | null>(null);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

  const t = textos[idioma];

  const handleEnviarPregunta = async (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <div>SENEC<span className="text-yellow-600">AI</span></div>
          </h1>

          <nav className="flex items-center gap-8">
            <div className="hidden sm:flex gap-8">
              <button
                onClick={() => { setSeccionActual('cartas'); setPiezaSeleccionada(null); }}
                className={`text-sm font-medium transition-colors ${
                  seccionActual === 'cartas' ? 'text-yellow-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.sections.cartas}
              </button>
              <button
                onClick={() => { setSeccionActual('emails'); setPiezaSeleccionada(null); }}
                className={`text-sm font-medium transition-colors ${
                  seccionActual === 'emails' ? 'text-yellow-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.sections.emails}
              </button>
              <button
                onClick={() => { setSeccionActual('buzon'); setPiezaSeleccionada(null); }}
                className={`text-sm font-medium transition-colors ${
                  seccionActual === 'buzon' ? 'text-yellow-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {t.sections.buzon}
              </button>
              <button
                onClick={() => { setSeccionActual('about'); setPiezaSeleccionada(null); }}
                className={`text-sm font-medium transition-colors ${
                  seccionActual === 'about' ? 'text-yellow-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {idioma === 'es' ? 'Acerca de' : 'About'}
              </button>
            </div>

            <button
              onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')}
              className="px-3 py-1 text-sm font-medium bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              {idioma === 'es' ? 'EN' : 'ES'}
            </button>
          </nav>
        </div>
      </header>

      {/* Home */}
      {seccionActual === 'home' && (
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">{t.home.titulo}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.home.subtitulo}</p>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">{t.home.descripcion}</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => { setSeccionActual('cartas'); setPiezaSeleccionada(null); }}
              className="px-8 py-3 bg-yellow-600 text-white rounded font-medium hover:bg-yellow-700 transition-colors"
            >
              {idioma === 'es' ? 'Leer Cartas' : 'Read Letters'}
            </button>
            <button
              onClick={() => { setSeccionActual('emails'); setPiezaSeleccionada(null); }}
              className="px-8 py-3 border border-yellow-600 text-yellow-600 rounded font-medium hover:bg-yellow-50 transition-colors"
            >
              {idioma === 'es' ? 'Leer Emails' : 'Read Emails'}
            </button>
          </div>

          {/* Substack embed */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <iframe src="https://diestrodeoido.substack.com/embed" width="100%" height="320" frameBorder="0" scrolling="no" />
          </div>
        </section>
      )}

      {/* Cartas */}
      {seccionActual === 'cartas' && !piezaSeleccionada && (
        <section className="bg-yellow-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold mb-12">{t.sections.cartas}</h2>
            <div className="grid gap-6">
              {cartasData[idioma].map((carta) => (
                <button
                  key={carta.numero}
                  onClick={() => setPiezaSeleccionada({ tipo: 'carta', indice: carta.numero - 1 })}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border-l-4 border-yellow-600"
                >
                  <h3 className="text-xl font-bold mb-2">{carta.numero}. {carta.titulo}</h3>
                  <p className="text-gray-600">{carta.contenido.split('\n')[0]}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Emails */}
      {seccionActual === 'emails' && !piezaSeleccionada && (
        <section className="bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold mb-12">{t.sections.emails}</h2>
            <div className="grid gap-6">
              {emailsData[idioma].map((email) => (
                <button
                  key={email.numero}
                  onClick={() => setPiezaSeleccionada({ tipo: 'email', indice: email.numero - 1 })}
                  className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow text-left border-l-4 border-gray-400"
                >
                  <h3 className="text-xl font-bold mb-2">{email.numero}. {email.titulo}</h3>
                  <p className="text-gray-600">{email.contenido.split('\n')[0]}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pieza Seleccionada */}
      {piezaSeleccionada && (
        <section className={piezaSeleccionada.tipo === 'carta' ? 'bg-yellow-50' : 'bg-white'}>
          <div className="max-w-3xl mx-auto px-6 py-12">
            <button
              onClick={() => setPiezaSeleccionada(null)}
              className="mb-6 text-yellow-600 font-medium hover:text-yellow-700"
            >
              ← {idioma === 'es' ? 'Volver' : 'Back'}
            </button>

            {piezaSeleccionada.tipo === 'carta' ? (
              <article className="prose prose-lg max-w-none font-caveat text-xl leading-relaxed">
                <h1 className="font-caveat text-4xl text-gray-900 mb-8">
                  {cartasData[idioma][piezaSeleccionada.indice].titulo}
                </h1>
                <div className="whitespace-pre-wrap text-gray-800">
                  {cartasData[idioma][piezaSeleccionada.indice].contenido}
                </div>
              </article>
            ) : (
              <article className="bg-white p-8 rounded-lg shadow">
                <div className="mb-6 border-b border-gray-200 pb-6">
                  <p className="text-gray-600 mb-2">
                    <strong>{idioma === 'es' ? 'De:' : 'From:'}</strong> Séneca
                  </p>
                  <p className="text-gray-600">
                    <strong>{idioma === 'es' ? 'Para:' : 'To:'}</strong> Lucilio
                  </p>
                </div>
                <h1 className="text-3xl font-bold mb-8 text-gray-900">
                  {emailsData[idioma][piezaSeleccionada.indice].titulo}
                </h1>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {emailsData[idioma][piezaSeleccionada.indice].contenido}
                  </div>
                </div>
              </article>
            )}
          </div>
        </section>
      )}

      {/* Buzón */}
      {seccionActual === 'buzon' && (
        <section className="bg-gray-50 min-h-screen">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold mb-6">{t.buzon.titulo}</h2>
            <p className="text-lg text-gray-600 mb-10">{t.buzon.descripcion}</p>

            <form onSubmit={handleEnviarPregunta} className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <textarea
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
                placeholder={t.buzon.placeholder}
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none"
              />
              <button
                type="submit"
                disabled={cargando || !pregunta.trim()}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-yellow-600">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{t.buzon.respuestaDe}</h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{respuesta}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* About */}
      {seccionActual === 'about' && (
        <section className="bg-gray-50 min-h-screen">
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-4xl font-bold mb-12">{t.about.titulo}</h2>
            <p className="text-xl text-gray-700 leading-relaxed">{t.about.bio}</p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© 2025 SenecAI. {idioma === 'es' ? 'Un proyecto de reflexión y divulgación filosófica.' : 'A project of philosophical reflection and outreach.'}</p>
      </footer>
    </div>
  );
}