'use client';

import { useState } from "react";
import { Send, Loader } from "lucide-react";

const SubstackEmbed = ({ idioma }: { idioma: 'es' | 'en' }) => (
  <div className="mt-12 flex justify-center">
    <div className="border border-gray-200 rounded-lg p-6 bg-white text-center" style={{maxWidth: '480px', width: '100%'}}>
      <p className="text-gray-700 font-medium mb-1" style={{fontFamily: 'Georgia, serif'}}>
        {idioma === 'es' ? 'Suscríbete para recibir nuevas entradas' : 'Subscribe to receive new entries'}
      </p>
      <p className="text-gray-500 text-sm mb-4">
        {idioma === 'es' ? 'Recibirás cada nueva Carta o Email al ser publicada.' : "You'll receive each new Letter or Email as soon as it's published."}
      </p>
      <a
        href="https://diestrodeoido.substack.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition font-medium text-sm"
      >
        {idioma === 'es' ? 'Suscribirme en Substack →' : 'Subscribe on Substack →'}
      </a>
    </div>
  </div>
);

export default function SenecAI() {
  const [idioma, setIdioma] = useState<'es' | 'en'>('es');
  const [seccionActiva, setSeccionActiva] = useState('home');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [piezaSeleccionada, setPiezaSeleccionada] = useState<{ tipo: 'carta' | 'email'; pieza: any } | null>(null);
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

  const piezas = {
    cartas: [
      {
        id: 1,
        titulo: { es: "Sobre el valor del tiempo", en: "On the Value of Time" },
        fecha: "15 de enero de 2026",
        contenido: {
          es: `Mi querido Séneca, justo estando a punto de empezar a escribirte esto, sentí cómo algunas obligaciones querían sustraerme el tiempo, tras notar que había recibido varios mensajes. Me resistí a leerlos, aún con un ligero miedo de que podría haber allí algo urgente o importante. Consciente de que difícilmente nada habría más valioso que este preciso momento, me volqué con toda mi atención a estas líneas, sabiendo que romper mi atención sería no haber abrazado tu consejo.

Clasifico ahora cada situación: ¿me arrebata el tiempo? La evito. ¿Me lo sustrae? La pospongo, al menos hasta cuando sea realmente indispensable enfrentarla. Seguramente también están aquellas en las que se me escapa el tiempo, pero con sólo ser más consciente ahora, espero reducir estas últimas.

Solía considerar negligentes a quienes creen tener más tiempo del que disponen. "El día tiene 24 horas más la noche", dicen ellos, como si la vida fuera infinita. Pero hoy veo que hay algo peor: estar consciente del tiempo finito y desperdiciarlo de todas formas. De ese grupo, desgraciadamente, también soy parte, y es con la comprensión visceral de esta tragedia, que estoy empezando a conseguir, gracias a tus consejos, que mi vida parece estar cambiando radicalmente.

Como buen administrador de mis cuentas, al igual que tú, vengo llevando con decente precisión el control del tiempo que le dedico a aquellas actividades que considero valiosas, como leer, escribir, escuchar clases o desarrollar ideas, siendo que todas las demás solamente pueden servirle a estas primeras.

No es difícil deducir entonces que mi tiempo real de vida en estos 45 años ha sido no más de 5 años. Estuve muerto la mayoría. Con una excepción: existe un tiempo que ni siquiera intento medir, ese que paso con mi familia y amigos. Estos no son momentos cuyo valor pueda calcularse por extensión—kairos sobre kronos—. Son momentos donde realmente existo, incluso cuando creía estar muerto.

Dentro de esa muerte, hay momentos donde, aunque no hago lo que realmente valoro, sí lo hago de la mejor manera posible. Como cuando me dedico al neg-ocio—no para generar dinero, sino para generarme más tiempo, para que la empresa dependa de mi visión, no de mi presencia, y para ayudar a otros en su crecimiento.

Esto de ayudar a otras personas a ir cubriendo sus diversas necesidades, según su lugar actual en la pirámide de Maslow, es un tipo de inversión que me da la sensación de ser tremendamente rentable, provocándome alocar más capital en esta categoría, aún a expensas de las inversiones de tiempo que sean exclusivamente para mí o los míos. Ayudar a alguien es siempre una inversión—pero aquí está lo extraño: el retorno no es mío. Y sin embargo, es lo que más me alimenta. ¿Cómo puede ser eso una inversión? La respuesta puede estar en los tipos de felicidad que concibe el utilitarismo, donde la que viene del altruismo no tiene competencia.

Curioso que una de las formas de ayudar más a las personas tenga que ver justamente con el manejo de sus tiempos, de lo que venimos hablando. En estas épocas creo que son dos las formas en las que la gente deja que se les vaya el tiempo como de ninguna manera lo harían con su dinero.

Primero están las distracciones, que hoy en día vienen a través de alguna pantalla. Yo mismo paso, en promedio, dos horas diarias en la pantalla del celular. Sé que buena parte tiene utilidad, pero la mayoría es tiempo muerto, indiscutiblemente. He visto personas pasar el triple allí, prestando atención a lo que claramente no importa. Yo fui uno de esos. Lo sigo siendo algunos días.

Luego está uno de los peores inventos culturales: las reuniones de trabajo, que tienen poco de trabajo y mucho de sólo de asistencia. No sólo son numerosas e interminables, hoy en día virtuales (más pantallas), sino casi siempre inefectivas y las más de las veces, innecesarias. Pocas veces preparadas, frecuentemente sobre asistidas y sin acuerdos efectivos, si me preguntan, es la manera más frecuente de perder tiempo en grupo, como si perderlo sólo no fuera suficiente. No hemos llegado a la máquina del tiempo pero hemos creado la mejor máquina de perder tiempo grupalmente.

No puedo restituir, Séneca, la inversión de tiempo que has hecho conmigo para escribirme sobre esto, pero claramente puedo multiplicarla difundiendo con otros de mi generación y espero, futuras. Empezaré a honrar tus consejos, empezando por separarle el tiempo adecuado y el mejor momento a todas aquellas actividades que me hacen sentir realmente vivo, y aunque cuando las recuerde serán recuerdos de un muerto, habrá sido esa una buena vida.

Sé que sigo con el marcador en contra, Séneca, pero luego de hoy creo haber marcado el descuento y sobre todo, sé cómo debo replantear el encuentro, que de ninguna manera quiero perder.

Me despido, amigo, habiendo querido decirte mucho más, pero consciente de que por hoy, se me acabó el tiempo para esto.`,
          en: `My dear Seneca, just as I was about to begin writing this, I felt how certain obligations wanted to steal my time, noticing that I had received several messages. I resisted reading them, even with a slight fear that something urgent or important might be there. Aware that hardly anything could be more valuable than this precise moment, I turned with all my attention to these lines, knowing that breaking my focus would mean I had not truly embraced your counsel.

Nowadays I try to classify every situation: Does it steal my time? I avoid it. Does it drain my time? I postpone it, at least until it becomes truly necessary to face it. Surely there are also those in which time simply slips away from me, but by being more conscious now, I hope to reduce these instances.

I used to consider negligent those who believe they have more time than they actually possess. "The day has 24 hours plus the night," they say, as if life were infinite. But today I see something worse: being aware of finite time and squandering it anyway. From that group, unfortunately, I am also part, and it is with the visceral understanding of this tragedy—which I am beginning to grasp thanks to your counsel—that my life seems to be changing radically.

Like a good accountant of my accounts, as you are, I have been keeping a decent record of the time I dedicate to those activities I consider valuable: reading, writing, attending classes, developing ideas—all others serving only these.

It is not difficult to deduce then that my real lifetime in these 45 years has been no more than 5 years. I was dead most of the time. With one exception: there is a time I do not even attempt to measure—the time I spend with my family and friends. These are not moments whose value can be calculated by duration alone—kairos over chronos. They are moments where I truly exist, even when I believed I was dead.

Within that death, there are moments where, although I am not doing what I truly value, I am at least doing it in the best way possible. Like when I dedicate myself to the neg-ocio—not to generate money, but to generate more time for myself, so my company depends on my vision, not my presence, and to help others in their professional growth.

Helping others cover their diverse needs, according to their place on Maslow's pyramid, is a type of investment that feels tremendously profitable to me, prompting me to allocate more capital to this category, even at the expense of investments of time that are exclusively for myself or my own. Helping someone is always an investment—but here is the strange part: the return is not mine. And yet, it is what nourishes me most. How can that be an investment? The answer may lie in the types of happiness that utilitarianism conceives, where the kind that comes from altruism has no equal.

Curious that one of the best ways to help people has to do precisely with the management of their time, which is what we have been discussing. In these times, I believe there are two ways in which people allow their time to slip away as they would never allow their money to slip away.

First, there are distractions, which nowadays come through some screen. I myself spend, on average, two hours daily looking at my phone screen. I know that much of it has utility, but the majority is, undoubtedly, dead time. I have seen people spend triple that there, paying attention to what clearly does not matter. I was one of them. I still am, some days.

Then there is one of the worst cultural inventions: work meetings, which have little work about them and almost everything about mere attendance. Not only are they numerous and endless, nowadays virtual (more screens), but almost always ineffective and most often unnecessary. Rarely well-prepared, frequently over-attended, and without real agreements—if you ask me, it is the most common way to waste time in a group, as if wasting it alone were not enough. We have not reached the time machine, but we have created the finest machine for wasting time collectively.

I cannot repay you, Seneca, for the investment of time you have made in me by writing about this, but I can certainly multiply it by spreading it to others of my generation and, I hope, future ones. I will begin to honor your counsel, starting by giving adequate time and the best moment to all those activities that make me feel truly alive, and although when I remember them they will be the memories of a dead man, it will have been a good life.

I know I am still behind on the scoreboard, Seneca, but after today I believe I have scored my first goal, and above all, I know exactly how I must reshape the match, which I have no intention of losing.

I bid you farewell, friend, having wished to tell you much more, but aware that for today, my time for this has run out.`
        }
      },
      {
        id: 2,
        titulo: { es: "Sobre la diversidad de las lecturas", en: "On Reading Diversity" },
        fecha: "20 de febrero de 2026",
        contenido: {
          es: `Recibí tu consejo sobre los autores, mi querido Séneca, y debo confesarte algo incómodo: no lo estoy siguiendo.

Leo regularmente, pero nunca todo lo que quisiera. Y últimamente leo menos que en los últimos años, seguro por haber decidido dedicarle más tiempo a otras obligaciones y desde hace poco, a actividades realmente importantes, las que te decía que me hacen sentir vivo realmente.

Contrariamente a lo que sugieres, recientemente —diría un poco más de un año— leo con regular variedad. Difícilmente me quedo con un solo libro hasta terminarlo, sino más bien que ahora prefiero leer varios libros a la vez.

No sé si esto ocurre por mera curiosidad o por dármela de generalista, pero lo más probable es que sea porque necesito resolver diversas situaciones en las que los libros me pueden ayudar.

A veces tengo un problema específico para el que sé que algunos textos me pueden proveer ideas o inspirarme. Otras, sin problema en mente encuentro soluciones que sé que algún día pueden servir perfectamente. Pero tal vez lo que más disfruta es cuando tiento mi suerte y encuentro algo verdadero, útil o bello. El que busca, encuentra. El que encuentra, lo cuenta.

Mi ánimo, seguro asociado al calendario semanal, también marca el ritmo de mis lecturas. Quizás este puede ser parte de mi problema a la luz de tu consejo — buscar novedad según mi estado. Pero mira bien: busco novedad según mi necesidad, que es distinto.

Durante los días de trabajo estoy más interesado en los negocios, en el liderazgo, en la contribución social y en todo lo que me haga ser mejor empresario y líder. Los fines de semana mis intereses se inclinan más por la historia, la literatura, la cultura, la salud y la espiritualidad. Sin duda los acontecimientos de la semana también me influyen, pero mi variada curiosidad responde en realidad a diversa necesidad.

Dirás que carezco de disciplina, pero si la emoción es requisito para la acción, aprovecho mejor las lecturas cuando estoy emocionalmente involucrado o racionalmente emocionado.

Si paso un día sin leer empiezo a sentir un vacío, que en alguna medida logro llenar aprendiendo algo valioso por otra vía: una clase, un artículo, un podcast, pero casi todos los días me esfuerzo por haber aprendido algo conscientemente, por cuanto aprendizaje inconsciente no lo puedo registrar.

Si bien leo algo menos, sin duda escribo más, y no me refiero a espacios como este, en donde me estoy aplicando para mantener el ritmo, sino que me refiero a escritos muy cortos.

Estoy siempre al acecho de ideas por su potencial. Cuando las encuentro, hago una nota —al menos del titular— con el propósito de desarrollarla luego. Raramente lo hago.

Lo extraño es que estas notas no desaparecen. Se siguen desarrollando en algún rincón de mi mente, involuntariamente, hasta que un día resurgen o se quedan siendo parte de quién soy.

Sin más, por lo menos sé que necesito masticar por mucho tiempo una idea para realmente digerirla, y es escribiendo algo al respecto que a mí me es posible.

Leyendo es que recargo; escribiendo es que disparo.

Concuerdo Séneca plenamente contigo en la necesidad de tener pocos amigos y muchos conocidos. Ya sabía yo que los autores clásicos son aquellos a quienes debo frecuentar y por allí he venido transitando, pero últimamente he entendido que "clásicos" es una categoría muy grande y que debo hablar de nombres concretos.

Justo no hace mucho definí una lista casi completa de autores de quienes me encantaría volverme su amigo, como Platón, Aristóteles, Marco Aurelio, Hume, Nietzsche, Betrand Rusell, Oscar Wilde, William James, Borges, Peter Singer, Kahneman, Taleb, Sam Harris, Kafka, Richard Bach, Ribeyro, Zweig y por supuesto tú, mi querido amigo. Y si no llegan a ser mis amigos, igual los quiero como mentores.

Si sólo pudiera conocer mucho más de estos gigantes y mucho menos de todos los demás, sé que tendría no sólo lo necesario, sino lo suficiente, de la misma manera que uno cubre primero la renta antes de comprar pasajes.

Pero aquí tengo una pregunta para ti, Séneca: ¿Acaso que alguien no sea mi amigo significa que no pueda tener algo valioso de lo que aprender? ¿No será un encuentro breve la oportunidad de conocer amistades más profundas?

Tal como aconsejas sobre apropiarse de algunos pasajes de autores valiosos, evoqué automáticamente uno de Emerson, que todavía no está en mi lista de queridos amigos porque no lo conozco tanto, pero que recuerdo que decía que no recordaba todos los libros que había leído de la misma manera que no recordaba las comidas que ha ingerido, pero ambos lo habían hecho quién es.

No habiendo manera de que yo recuerde todo lo que he leído, ni todos los autores que he visitado, me basta saber que cada idea es un ladrillo de la mejor construcción que puede forjar, cada día mejor que ayer.`,
          en: `I received your counsel on authors, my dear Seneca, and I must confess something uncomfortable to you: I am not following it.

I read regularly, but never as much as I would wish. And lately I read less than in recent years, certainly because I decided to dedicate more time to other obligations, and recently, to activities that truly matter—the ones I told you make me feel truly alive.

Contrary to what you suggest, recently—I would say a bit more than a year now—I read with regular variety. I hardly ever finish one book before starting another; rather, I now prefer to read several books at once.

I do not know if this happens because of mere curiosity or because I fancy myself a generalist, but most likely it is because I need to resolve diverse situations in which books can help me.

Sometimes I have a specific problem for which I know certain texts can provide me with ideas or inspire me. Other times, without a problem in mind, I find solutions that I know could serve me perfectly one day. But perhaps what I enjoy most is when I venture my luck and discover something true, useful, or beautiful. He who seeks, finds. He who finds, tells.

My mood, surely associated with the weekly calendar, also marks the rhythm of my reading. Perhaps this could be part of my problem in light of your counsel—seeking novelty according to my state. But look carefully: I seek novelty according to my need, which is different.

During work days I am more interested in business, leadership, social contribution, and everything that makes me a better entrepreneur and leader. On weekends my interests lean more toward history, literature, culture, health, and spirituality. The events of the week also influence me, certainly, but my varied curiosity responds, in fact, to diverse need.

You will say I lack discipline, but if emotion is a requirement for action, I benefit more from reading when I am emotionally engaged or rationally moved.

If I pass a day without reading I begin to feel a void, which to some degree I manage to fill by learning something valuable another way: sometimes a class, an article, a podcast. But almost every day I strive to have learned something consciously, since unconscious learning I cannot register.

Though I read somewhat less, I certainly write more—and I do not mean spaces like this one, where I am applying myself to maintain the pace, but rather very short pieces.

I am always on the lookout for ideas because of their potential. When I find them, I make a note—at least of the title—with the purpose of developing it later. Rarely do I do so.

What is strange is that these notes do not disappear. They continue to develop in some corner of my mind, involuntarily, until one day they resurge or remain becoming part of who I am.

In short, I at least know that I need to chew on an idea for a long time to truly digest it, and it is by writing something about it that this becomes possible for me.

Reading is how I recharge; writing is how I fire.

I agree with you completely, Seneca, on the need to have few friends and many acquaintances. I already knew that classical authors are those I should frequent, and I have been traveling that path. But lately I have understood that "classical" is a very large category, and I must speak of concrete names.

Just recently I defined an almost complete list of authors I would love to become friends with: Plato, Aristotle, Marcus Aurelius, Hume, Nietzsche, Bertrand Russell, Oscar Wilde, William James, Borges, Peter Singer, Kahneman, Taleb, Sam Harris, Kafka, Richard Bach, Ribeyro, Zweig, and of course you, my dear friend. And if they do not become my friends, I still want them as mentors.

If I could only know much more of these giants and much less of everyone else, I know I would have not only what is necessary, but what is sufficient—the same way one covers rent first before buying plane tickets.

But here I have a question for you, Seneca: Does the fact that someone is not my friend mean they cannot have something valuable from which I can learn? Might not a brief encounter be the opportunity to discover deeper friendships?

Just as you counsel about appropriating passages from valuable authors, I automatically recalled one from Emerson, who is still not on my list of dear friends because I do not know him so well, but whom I remember saying that he did not remember all the books he had read the same way he did not remember all the meals he had eaten, yet both had made him who he is.

Having no way to remember everything I have read, nor all the authors I have visited, it suffices for me to know that each idea is a brick in the best construction I can forge, each day better than yesterday.`
        }
      },
      {
        id: 3,
        titulo: { es: "Sobre la elección de amigos", en: "On Choosing Friends" },
        fecha: "10 de marzo de 2026",
        contenido: {
          es: `Leí con mucho entusiasmo tus consejos sobre la amistad, mi querido Séneca, pero creo que, aunque hermosas todas las ideas — tal vez justo por eso —, algo están alejadas de la realidad.

Sabiendo que en nadie realmente confío como en mi mismo— no existe persona a la que le puedo decir absolutamente todo lo que pienso —, pero esto no implica no poder tener amigos, me inclino a creer que más que verdadera amistad o simples relaciones, existen los grados de amistad.

Sin duda con quien considero mi mejor amigo puedo hablar casi sin ningún tapujo, pero claramente hay temas u opiniones sobre las que prefiero mantener reserva. Debe ser en parte porque además de ser amigos, hoy en día somos compañeros de trabajo, de la misma manera que lo soy con uno de sus hermanos; debe ser por otra parte, mayor creo, por mi naturaleza generalmente reservada.

Con los que están en mi escala de amistad muy cerca al primero, sucede algo similar: no sólo tampoco podría hablar con ellos como conmigo mismo, sino que hay dimensiones enteras en las que probablemente me cierro más aún.

Si me sigo alejando en mi escala imaginaria, de la amistad perfecta, que en el mejor de los casos, sólo es conmigo mismo, encuentro a casi todas las demás personas que conozco, empezando por amigos con vínculo fuerte pero que frecuento poco, amigos que frecuento regularmente, compañeros de trabajo, amigos de años pero con vínculo ahora débil, amigos de mis amigos y finalmente conocidos. Haciendo el recuento a consciencia, en mi caso, son pocos con los que podría decir que cultivo algún nivel de amistad para llamarla así realmente, usando los estándares que propones, mi querido Séneca.

He aprendido hace mucho tiempo que es mejor confiar y ser decepcionado, que no confiar en nadie y vivir atormentado, aún cuando no siempre haya sido mejor el resultado — aquí me vuelvo a recordar que mal resultado no implica mala decisión, y viceversa.

Si pensara nuevamente en ubicar a las personas en alguna escala, esta vez de confianza, la distribución sería distinta a la de mi escala de amistad; aunque, si la visualizo detenidamente, distingo patrones ligeramente diferentes entre las relaciones profesionales y personales: confío más fácilmente en las primeras.

En relación con esto, justo estoy ante un caso de un compañero de trabajo al que podría haber clasificado como amigo, en un sentido general del término — conozco a su familia, hemos compartido fuera del trabajo y el trato ha sido más coloquial —, quien resultó estar sacando provecho de esta confianza, beneficiándose a sí mismo, en detrimento de la empresa.

Pensaba en el caso anterior como un contraejemplo a tu recomendación de simplemente confiar en un amigo una vez calificado como tal: confié por creerlo amigo, de su traición luego fui testigo.

Pero luego me di cuenta de que estuve errado en la aplicación: nunca hice el esfuerzo necesario para juzgarlo antes de considerarlo mi amigo, que era parte clave de tu consejo, y la verdad es que está tan lejos en mi escala de amistad que no debería haberlo llamado nunca "amigo".

Me pregunto Séneca entonces: ¿realmente todos necesitamos esos verdaderos amigos — "un alma en dos cuerpos" como decía Aristóteles? ¿O basta con la idea de amistad perfecta, como proponía Platón en sus formas, para entender nuestra relación con los demás?

Sea lo uno, sea lo otro, ahora entiendo que la amistad verdadera, como el amor — ¿por qué todavía creo que son distintos?—, comienza con uno mismo. Porque ser amigo de otro por no poder bastarse a sí mismo, no es amistad—es conveniencia.`,
          en: `I read your counsel on friendship with great enthusiasm, my dear Seneca, but I believe that, though all the ideas are beautiful—perhaps precisely because they are—, they are somewhat removed from reality.

Knowing that I truly trust no one as I trust myself—there is no person to whom I can tell absolutely everything I think—, but this does not mean I cannot have friends, I am inclined to believe that rather than true friendship or mere relationships, there exist degrees of friendship.

Certainly, with whom I consider my best friend, I can speak with little reservation, but clearly there are topics and opinions about which I prefer to maintain reserve. It must be partly because, besides being friends, we are now colleagues at work, the same way I am with one of his brothers; it must be, to a greater degree I believe, due to my generally reserved nature.

With those who are very close to my best friend on my scale of friendship, something similar happens: not only could I not speak with them as I speak with myself, but there are entire dimensions in which I probably close myself off even more.

If I continue moving away on my imaginary scale, from perfect friendship, which at best is only with myself, I find almost everyone else I know—beginning with friends of strong bond but whom I see rarely, friends I see regularly, colleagues at work, friends of years but with now weakened bonds, friends of my friends, and finally acquaintances.

Doing an honest accounting, in my case, there are few with whom I could truly say I cultivate some level of friendship, really calling it that, using the standards you propose, my dear Seneca.

I learned long ago that it is better to trust and be disappointed than to trust no one and live tormented, even though the outcome has not always been better—here I remind myself again that a poor outcome does not imply a poor decision, and vice versa.

If I were to place people on a scale again, this time of trust, the distribution would be different from my scale of friendship; though, if I visualize it carefully, I distinguish slightly different patterns between professional and personal relationships: I trust more easily in the former.

In relation to this, I am just now facing a case of a colleague at work whom I could have classified as a friend, in a general sense of the term—I know his family, we have shared time outside of work, and our dealings have been more casual—turned out to be taking advantage of this trust, benefiting himself, to the detriment of the company.

I was thinking of the previous case as a counterexample to your recommendation of simply trusting a friend once he is classified as such: I trusted because I believed him to be a friend, and later I witnessed his betrayal.

But then I realized that I was wrong in my application: I never made the necessary effort to judge him before considering him my friend, which was a key part of your counsel. The truth is he is so far down on my scale of friendship that I should never have called him "friend" in the first place.

I ask myself then, Seneca: do we really all need those true friends—"one soul in two bodies" as Aristotle said? Or is it enough to have the idea of perfect friendship, as Plato proposed in his forms, to understand our relationship with others?

Be that as it may, I now understand that true friendship, like love—why do I still think they are different?—, begins with oneself. Because being a friend to another out of inability to be sufficient unto oneself is not friendship—it is convenience.`
        }
      },
      {
        id: 4,
        titulo: { es: "Sobre el miedo a la muerte", en: "On the Fear of Death" },
        fecha: "17 de marzo de 2026",
        contenido: {
          es: `Hace unos cinco años, cuando mi esposa estaba embarazada de mi segunda hija, viví un episodio en el que estuve cerca a la muerte. Recién en ese momento entendí que desde que nací estoy siendo conducido a la muerte, como me explicabas en tu carta, mi querido Séneca.

Intentábamos con unos amigos ingresar por una playa con olas grandes para iniciar una travesía de varios kilómetros de nado. La distancia no era problema alguno, por cuanto ya había nadado similares y además estaba bien entrenado — pero las olas que impedían el ingreso, sí que eran de temer.

Si de mi solamente hubiera dependido, no habría intentado atravesar esas olas, pero mis dos amigos ya las habían cruzado y un tablista que parecía dominarlas me animó a seguir. Me aventuré entonces, pero luego de atravesar algunas cuantas vino el momento que temía: una de las grandes olas reventó antes de que la pudiera cruzar, empujándome hacia el fondo del mar.

Recuerdo haber visualizado varios momentos de mi vida en segundos, a la vez que me desesperaba por no tener aire suficiente para salir a flote. Pude salir finalmente, respirar profundo, sentir un éxtasis enorme por seguir vivo e iniciar la travesía, sabiendo que me podría haber muerto — aunque no queriendo aceptarlo por completo.

Hasta antes de esto no recuerdo haber tenido miedo real a la muerte, al menos de la mía. El único contacto que había tenido con ella era cuando alguien cercano se moría, siendo la experiencia de ver morir a mi padre, sin duda la más fuerte.

Recuerdo haber llorado delante de él semanas antes, sabiendo que si no hacíamos algo radical por su salud, lo íbamos a perder. Esta yo allí explicándole sobre un tratamiento alternativo para salvar sus riñones cuando entendí que ya nos quedaba poco tiempo con él, y me quebré.

Los días siguientes vi cómo mi padre se iba apagando lentamente, no sólo en fortaleza física sino en sus ganas de vivir. Tan evidente era para mí, que el día que tuvimos que llevarlo a la clínica por una alerta con sus signos vitales, yo sabía que ese día probablemente sería su último, al punto que quise yo quedarme con él para acompañarlo en la noche, durante sus últimas horas.

Mi padre también tenía miedo a la muerte, pero el sufrimiento por su enfermedad era tan duro que estoy seguro que él ya no quería seguir viviendo y por lo tanto eligió dejarse llevar.

Creo que tuve mucho miedo a la muerte cuando casi me ahogo porque todavía no conocía a mi segunda hija, porque habría dejado sin padre a mi primera hija y por dejar sola a mi esposa estando recién casados, en ese mismo orden. No recuerdo haber tenido miedo por mí — aunque reconozco que la idea de ahogarme me aterraba. El miedo era por ellas.

Si hoy algo temo respecto a la muerte, estoy logrando no pensar en mí, pero inevitablemente pienso en todos aquellos en los que algún efecto podría tener que yo no esté.

Desde entonces no he vivido algo similar, pero estoy preparándome para enfrentar estos miedos, sin duda gracias al estoicismo. He llegado a entender, al menos, no sólo que estoy muriendo todos los días, sino que mi vida se puede terminar en cualquier momento. Y no pudiendo hacer nada al respecto, he decidido aprovechar al máximo el tiempo que por aquí me queda.

Justo hace poco que asistí a la celebración de los cincuenta años de un amigo y se me pidió dar unas palabras, insistí en recordar que era ese preciso instante lo único que tenemos — no importa si es cumplir una década, un año, un día, o en realidad, solamente un segundo más de vida.

Me quedo, Séneca, con la imagen del agua del río, que simplemente fluye con el canal que la naturaleza le ha cedido, y aunque piedras y escombros se cruzarán en el camino, sólo tiene permitido fluir entre ellos y llegar al mismo destino que todos.

No sólo de agua estamos hechos, sino que agua somos en este hermoso río que es la vida y que sin duda tiene un destino final en el que simplemente —felizmente prefiero decir — pasaremos a ser parte del todo.`,
          en: `About five years ago, when my wife was pregnant with our second daughter, I lived through an episode where I came close to death. Only then did I understand what you were telling me in your letter, my dear Seneca—that from the moment I was born, I have been led toward death.

We were trying with some friends to enter through a beach with large waves to begin a journey of several kilometers of swimming. The distance was not a problem, as I had already swum similar distances and was well trained—but the waves that prevented entry were indeed fearsome.

If it had depended only on me, I would not have attempted to cross those waves, but my two friends had already crossed them and a surfer who seemed to master them encouraged me to follow. I ventured then, but after crossing several came the moment I feared: one of the large waves broke before I could cross it, pushing me toward the ocean floor.

I remember visualizing several moments of my life in seconds, while I desperately needed air to resurface. I was finally able to get out, breathe deeply, feel an enormous ecstasy at being alive and beginning the journey, knowing I could have died—though not wanting to fully accept it.

Until before this I do not remember having real fear of death, at least of my own. The only contact I had had with it was when someone close to me died, the experience of watching my father die being, without question, the most powerful.

I remember having cried before him weeks earlier, knowing that if we did not do something radical for his health, we would lose him. I was there explaining to him about an alternative treatment to save his kidneys when I understood that we had little time left with him, and I broke down.

The days that followed I watched my father slowly fade away, not only in physical strength but in his will to live. It was so evident to me that the day we had to take him to the clinic because of an alert with his vital signals, I knew that day would probably be his last. I wanted to stay with him to keep him company through that night, during his final hours.

My father was also afraid of death, but the suffering from his illness was so harsh that I am certain he no longer wanted to go on living and therefore chose to let himself go.

I believe I had much fear of death when I nearly drowned because I still had not met my second daughter, because I would have left my first daughter without a father, and because I would have left my wife alone after we had barely begun our marriage—in that very order. I do not remember having fear for myself—though I recognize that the idea of drowning terrified me. The fear was for them.

If there is anything I fear about death today, I am managing not to think about myself, but I inevitably think of all those who would be affected by my not being here.

Since then I have not lived through anything similar, but I am preparing myself to face these fears, undoubtedly thanks to Stoicism. I have come to understand, at least, not only that I am dying every day, but that my life can end at any moment. And since I can do nothing about it, I have decided to make the most of the time I have left here.

Just recently I attended the celebration of a friend's fiftieth birthday and was asked to say a few words. I insisted on reminding everyone that this precise moment was the only thing we have—whether it is completing a decade, a year, a day, or truly just one more second of life.

I remain, Seneca, with the image of the water of the river, which simply flows with the channel that nature has given it, and though stones and debris will cross its path, it is only permitted to flow among them and reach the same destination as all things.

We are not only made of water, but we are water in this beautiful river that is life, and which undoubtedly has a final destination where we will simply—happily I prefer to say—become part of the whole.`
        }
      },
      {
        id: 5,
        titulo: { es: "Sobre el filósofo igual y presente", en: "On the Philosopher as Peer and Present" },
        fecha: "20 de marzo de 2026",
        contenido: {
          es: `Me hablas primero, Séneca, de los problemas de la singularidad: ser muy distinto me alejaría de quienes quiero cambiar. Y tienes razón. He tratado de ser muy distinto, en parte naturalmente y en parte a propósito.

Llevo un arete y tatuajes visibles — adornos que muy pocos en mi entorno osarían llevar. Soy vegano, practico el ayuno y cuido mi sueño. Además abrazo ideas radicales, en las que realmente creo que casi todos están equivocados, como creer que el capitalismo es el único camino, o que el consumismo nos hará felices, o que alguna religión tenga realmente las respuestas—sólo paliativos. En resumen, he construido una vida deliberadamente diferente.

Durante estos años en que mis cambios se han acentuado, realmente los he disfrutado. Creo no ser uno más del montón sino que creo que todos estos cambios me han estado haciendo bien y mejor persona. Sí he sentido el rechazo —o al menos el alejamiento de algunos cuantos por mis particularidades — pero mi lectura es siempre positiva: no eran para mí.

Pero ahora entiendo que pude haber exagerado, porque la soledad extrema no es filosofía, sino aislamiento. Y ningún hombre puede vivir así, tan sólo sobrevivir. Yo pretendo mucho más que esto.

Es curioso: ya aplicaba esta lección a mi veganismo, donde soy más comprensivo que agresivo, pero no lo había extendido a otras dimensiones de mi vida. ¿Cómo no intentar entender por qué no pueden cambiar los demás, cuando yo estuve la mayor parte de mi vida en esa misma vereda?

Luego me hablas sobre la dificultad de concentrarse en el presente. Esto ya lo sabía, pero como dicen de los buenos libros: los mejores son aquellos que saben decir lo que ya sabes. Y aunque la meditación un poco me ha ayudado, me sigue costando enormemente vivir aquí y ahora.

No es tanto el pasado el que me atormenta, sino el futuro el que ocupa mucho más de mis pensamientos que lo que debería. Creí que tenía miedos y esperanzas, pero ahora entiendo que sólo eran esperanzas, y que los miedos se generan a partir de la posibilidad de que no se cumplan mis previsiones.

El hecho de que me esté tomando estos minutos para leer tu carta y responderté—a pesar de tener otros asuntos importantes—es una señal de que sí es posible vivir a nuestro modo, al menos por algunos instantes. Quizás esto sea todo lo que tenemos.

Voy a reducir mis esperanzas, Séneca. No porque deje de ser positivo, sino porque casi nada depende de mí. Ahora sé que todo depende del azar—el más justo de los dioses — así que lo único que me queda es vivir absolutamente en el presente, flexible ante lo que venga.

Quiero ser filósofo, Séneca, al menos por hoy, y así por cada día que me quede.`,
          en: `You speak to me first, Seneca, of the problems of singularity: being very different would alienate those I wish to change. And you are right. I have tried to be very different, partly naturally and partly on purpose.

I wear a visible earring and tattoos—adornments that very few in my professional circle would dare to wear. I am vegan, I practice fasting, and I care for my sleep. I also embrace radical ideas, in which I truly believe almost everyone is mistaken—like believing that capitalism is the only path, or that consumerism will make us happy, or that any religion truly has the answers—only palliatives. In short, I have built a deliberately different life.

During these years as my changes have deepened, I have truly enjoyed them. I believe I am not one of the masses, and I think all these changes have been making me a better person. I have felt rejection—or at least the distancing of some because of my peculiarities—but my interpretation is always positive: they were not meant for me.

But now I understand that I may have exaggerated, because extreme solitude is not philosophy—it is isolation. And no man can live like that; he only survives. I aspire to much more than survival.

It is curious: I was already applying this lesson to my veganism, where I am more understanding than aggressive, yet I had not extended it to other dimensions of my life. How could I not try to understand why others cannot change, when I spent most of my life on that same path?

You then speak to me about the difficulty of concentrating on the present. I already knew this, but as they say of good books: the best are those that know how to say what you already know. And though meditation has helped me somewhat, it still costs me enormously to live here and now.

It is not so much the past that torments me, but the future that occupies far more of my thoughts than it should. I believed I had fears and hopes, but now I understand that they were only hopes, and that fears are generated from the possibility that my expectations will not be fulfilled.

The fact that I am taking these minutes to read your letter and respond to you—despite having other important matters—is a sign that it is indeed possible to live in our own way, at least for some moments. Perhaps this is all we have.

I am going to reduce my expectations, Seneca. Not because I will stop being positive, but because almost nothing depends on me. Now I know that everything depends on chance—the most just of the gods—so all that remains for me is to live absolutely in the present, flexible before whatever comes.

I want to be a philosopher, Seneca, at least for today, and so for every day I have left.`
        }
      },
      {
        id: 6,
        titulo: { es: "Sobre compartir conocimiento", en: "On Sharing Knowledge" },
        fecha: "24 de marzo de 2026",
        contenido: {
          es: `He cambiado muchísimo, querido Séneca, pero ahora entiendo que no demasiado. Como el barco de Teseo, quiero ser en algunos años el mismo a la vez que completamente distinto —tanto que sólo mi esencia permanecerá reconocible — subjetiva como sea.

Algunos dirán que cambiar tanto es como vivir en distintas moradas sin poder asentarse —con el riesgo de haber perdido tiempo y descubrir que necesitaba un hogar. Yo creo que de esto trata justamente el cambio: de vivir varias vidas para quedarse con la mejor, o de simplemente vivir varias vidas dentro de la misma.

Aprecio enormemente cada una de las ideas que compartes conmigo, pero es invalorable que me permitas estar a tu lado para verte vivir. De un apreciado maestro escuché decir que tus cartas eran como verte jugar el partido. Y aunque las atesoro profundamente, ninguna podría compararse a jugar al lado tuyo, o por lo menos verte en vivo.

De la misma manera que creo que una persona no puede amar sino empieza por sí mismo, coincido contigo en que es imposible ser amigo de nadie más si no eres amigo del que tienes más cerca: ese que te susurra cada vez que detecta posibles cursos de acción distintos al que crees que has elegido.

Es a este primer amigo a quien le quiero decir lo que pienso con total franqueza – hablándole como me hablo a mí mismo. Es con este amigo íntimo – tan cercano que somos el mismo — con quien quiero compartir las ideas que me tienen, sea que las repase mentalmente, las recite o las escriba, como hago en este momento.

Aunque habiendo compartido todas mis ideas con este mi íntimo amigo, no me sentiría completo. Porque de la misma manera que una vela multiplica la iluminación al encender a muchas otras, el conocimiento es importante cuando se comparte, momento en el cual se convierte automáticamente en sabiduría.

No quiero muchos amigos, Séneca, pues no me alcanzaría la energía para mantenerlos como se debe. Pienso que es mejor tener amigos con los que pueda compartir todo lo que tengo, y que espero les alcance para ellos también sigan compartiendo.

Cuando lo analizo más a fondo, lo que tengo debe ser muy poco, y aunque poco como es, no tendría sentido que lo guardara solo para mí, sea porque permanece incorrecto por no haber sido contrastado, sea porque se vuelve inútil al haberse quedado guardado. Y nada menos valioso que moneda que nadie conoce o que simplemente se mantiene por el gusto del ahorro.`,
          en: `I have changed enormously, my dear Seneca, but now I understand not too much. Like the Ship of Theseus, I want to be in some years the same as I am now, yet completely different—so much so that only my essence will remain recognizable—subjective as it may be.

Some will say that changing so much is like living in different dwellings without being able to settle—with the risk of wasting time only to discover that I needed a home. But I believe that is precisely what change is about: living several lives in order to keep the best, or simply living several lives within the same one.

I appreciate enormously each of the ideas you share with me, but it is invaluable that you allow me to stand beside you to see you live. A respected teacher once told me that your letters were like watching you play the game. And though I treasure them deeply, none could compare to playing beside you, or at the very least seeing you live.

In the same way that I believe a person cannot love unless he begins with himself, I agree with you that it is impossible to be a friend to anyone else if you are not a friend to the one closest to you: that inner voice that whispers to you each time it detects possible courses of action different from the one you believe you have chosen.

It is to this first friend that I want to tell what I think with total honesty—speaking to him as I speak to myself. It is with this intimate friend—so close that we are the same—that I want to share the ideas that possess me, whether I rehearse them mentally, recite them, or write them, as I am doing now.

Although I had shared all my ideas with this intimate friend, I would not feel complete. Because in the same way that a candle multiplies illumination by lighting many others, knowledge is important when it is shared—the moment it is shared, it automatically becomes wisdom.

I do not want many friends, Seneca, for I would not have the energy to maintain them as they deserve. I think it is better to have friends with whom I can share all that I have, and I hope it is enough for them to also keep sharing.

When I analyze it more deeply, what I have must be very little. And though little as it is, it would make no sense to keep it only for myself, whether because it remains incorrect without having been tested, or because it becomes useless once it has been locked away. And nothing is less valuable than coin that no one knows exists, or that is simply kept for the pleasure of hoarding.`
        }
      }    ],
    emails: [
      {
        id: 1,
        titulo: { es: "Sobre el valor del tiempo", en: "On the Value of Time" },
        fecha: "16 de enero de 2026",
        contenido: {
          es: `¿Qué es el tiempo Lucilio, sino un instante infinito que se esconde entre el pasado y el futuro? Es ese instante, a la vez infinitesimal y por lo tanto imperceptible para nuestras capacidades, lo único que tenemos, pero todo lo que necesitamos.

De la misma manera que no pueden existir monedas de un centavo porque todas las transacciones monetarias las hacemos por montos muchos mayores, es que para valorar el tiempo debemos pensarlo como bloques de muchos instantes, siendo que recién entonces podemos concebirlo, y en consecuencia, valorarlo.

Debe ser por lo mismo que no nos duele que nos arrebaten segundos valiosos en las pantallas, que no nos preocupa perder centavos — aun cuando, acumulados, sean millones o para muchos, toda una vida.

Concebido el tiempo con este artificio de agruparlo en intervalos, encuentro útil la idea de clasificarlo para cada día, en tres grandes bloques: el primero – aunque hoy innegociable en cantidad, perfectible en calidad –, son las ocho horas sagradas de sueño; el segundo, de donde deben venir los ahorros, el tiempo dedicado al trabajo; el tercero – el de las verdaderas oportunidades – el tiempo dedicado a crecer como persona y a buscar contribución.

Es dentro de estos dos segundos bloques – útilmente concebibles como carteras de inversión – donde gestionar prioridades es indispensable: ¿Qué es lo que realmente te importa? ¿Qué es lo que realmente debe importarte? ¿Cuál está siendo una gran pérdida? ¿Cuál podría ser la mejor inversión?

No tengo las respuestas, Lucilio, pues son profundamente personales. Pero sin duda prefiero tener preguntas sin respuestas que respuestas sin preguntas. Y la más importante de todas – saber qué es lo siguiente a lo que te dedicarás – es la primera definición al iniciar cada día, tan crucial como decidir con qué ánimo entrarás en él.

Estoy convencido de que el ser humano no logra entendimiento completo del tiempo ni siquiera agrupándolo en periodos de horas o días, y menos aún en décadas o siglos. Es la semana la unidad que conversa con nuestro cableado cerebral – curiosamente, un invento cultural, como la familia, pero que funciona de manera notable.

La semana no es meramente un horizonte intermedio. Contiene el ciclo completo de los tres bloques de los que hablaba al inicio. Además incluye una continuidad interesante en los bloques de trabajo de lunes a viernes, y en los bloques de tiempo personal los fines de semana – otro invento cultural que como los mejores, termina pareciendo natural.

Hablé de inversiones refiriéndome a la relación entre beneficio y tiempo dedicado. Pero este beneficio no puede ser monopolio tuyo: debe ser compartido. ¿Qué te beneficia a ti a la vez que puede beneficiar al mundo? O al menos: ¿qué te prepara ahora para luego producir beneficios después? La historia nos enseña que el tiempo no es propiedad individual, sino de la humanidad. Nada valioso se hizo en soledad, y ninguna felicidad se alcanza plenamente sólo.

Si has llegado a este entendimiento del tiempo, estás preparado para lo que viene; algo que parece contradictorio pero es en realidad complementario: no es el tiempo lo que debes vigilar, sino la energía.

La física clásica lo muestra: la energía es tiempo multiplicado por potencia. Cuando se trata de vida – siendo la vida fundamentalmente energía – no importa solo el tiempo dedicado, sino la intensidad con que se vive. Por eso los antiguos hablaban de dos tiempos: kronos, cuantitativo, y kairos, cualitativo.

En la vida real, entonces, no importa el cuánto, sino el cómo. Y hoy la intensidad se manifiesta principalmente en atención – elemento que muchos, lamentablemente han convertido en mercancía.

Tu atención, Lucilio, es lo que da valor al tiempo. De ahí que cada momento sea distinto, irrepetible. Pero siendo nuestra energía limitada, solo podemos administrarla – así que basta de escuchar. Todo lo que queda es vivir.`,
          en: `What is time, Lucilius, but an infinite instant that hides between the past and the future? That instant, at once infinitesimal and therefore imperceptible to our capacities, is the only thing we possess, yet it is all we need.

In the same way that penny coins cannot exist because all monetary transactions are conducted in larger amounts, we must think of time as blocks of many instants in order to value it. Only then can we conceive of it, and consequently, appreciate its worth.

It must be for this very reason that we feel no pain when seconds are stolen from us by screens, just as we scarcely worry about losing pennies—even when accumulated, they become millions or, for many, an entire lifetime.

Having conceived of time through this device of grouping it into intervals, I find it useful to classify it for each day into three great blocks: the first—although today non-negotiable in quantity, perfectible in quality—eight sacred hours of sleep; the second, from which our savings must come, time devoted to work; the third—that of true opportunities—time devoted to growing as a person and seeking contribution.

It is within these two latter blocks—usefully conceived as investment portfolios—where managing priorities becomes indispensable: What is it that truly matters to you? What is it that truly should matter to you? What is becoming a great loss? What could be the best investment?

I do not have the answers, Lucilius, for they are profoundly personal. But without doubt I prefer to have questions without answers than answers without questions. And the most important of all—knowing what comes next in what you will dedicate yourself to—is the first definition upon beginning each day, as crucial as deciding with what spirit you will enter into it.

I am convinced that the human being does not achieve a complete understanding of time even by grouping it into periods of hours or days, and even less when attempting to think in decades or centuries. It is the week that is the unit which converses with our neural wiring—curiously, a cultural invention, like the family, yet one that functions in a remarkable way.

The week is not merely an intermediate horizon. It contains the complete cycle of the three blocks I spoke of at the beginning. Moreover, it includes an interesting continuity in the work blocks from Monday through Friday, and in the personal time blocks of the weekends—another cultural invention that, like the best ones, ends up seeming natural.

I spoke of investments referring to the relationship between benefit and time devoted to it. But this benefit cannot be your monopoly: it must be shared. What benefits you while also benefiting the world? Or at least: what prepares you now to later produce benefits afterward? History teaches us that time is not individual property, but belongs to humanity. Nothing of true value was ever done in solitude, and no happiness is ever fully achieved alone.

If you have arrived at this understanding of time, you are prepared for what comes next; something that seems contradictory but is actually complementary: it is not time that you must watch, but energy.

Classical physics shows us this: energy is time multiplied by power. When it comes to life—being life fundamentally energy—what matters is not only the time devoted but the intensity with which you live. This is why the ancients spoke of two kinds of time: chronos, quantitative, and kairos, qualitative.

In real life, then, what matters is not the how much, but the how. And today intensity manifests itself principally in attention—an element that many, unfortunately, have converted into a commodity.

Your attention, Lucilius, is what gives value to time. From this comes the fact that each moment is distinct, irreplaceable. But being our energy limited, we can only try to manage it—so enough of listening. All that remains is to live.`
        }
      },
      {
        id: 2,
        titulo: { es: "Sobre las lecturas", en: "On Reading" },
        fecha: "21 de febrero de 2026",
        contenido: {
          es: `Aquel que pasa de un texto sobre el poder de la respiración, a otro de sesgos cognitivos, a la vez que repasa algo de historia universal buscando aprender de liderazgo, para terminar seguramente con filosofía, no busca respuestas diversas, sino coherencia en la multiplicidad.

La variedad de nuestras lecturas, Lucilio, revela quiénes somos, a la vez que quiénes queremos ser. Porque leer es ser, como aprender es ser y hacer es ser.

No es sólo que la variedad refleje tu propia forma de ser y conocer, sino que son estas elecciones claro reflejo de quién eres y quieres ser. No son la respiración, los sesgos, la historia o el liderazgo lo que importa realmente, sino las conexiones entre estos objetos de pensamiento.

Y es con la filosofía que podemos construir conscientemente estas conexiones, no buscando resolver un problema, sino simplemente entender, y muchas veces encontrando soluciones que algún día encontrarán su problema.

Uno es lo que lee, Lucilio, no sólo en el sentido que son las lecturas lo que a uno lo hacen sino que uno termina leyendo justamente de la manera en que ya es. Aunque claro, siempre existe un espacio para virar hacia mejores formas de ser — espacio que sólo el leer y el pensar en serio te pueden proveer.

Leer es también viajar, y puedes viajar por dos motivos: para aprender algo que necesitas, o para aprender algo que no sabes que necesitas. Por lo primero es que debes recurrir con regularidad a lecturas en las que crees que puedes encontrar ideas para resolver algún problema, porque soluciones son tales cuando probadas e iteradas, se implementan.

Por lo segundo es que debes viajar con los libros a lugares que te den la sensación que pueden ser interesantes o que algún referente de confianza te ha recomendado, y si bien en ambos casos muchas veces puede no funcionar, los costos siempre serán mucho menores a los beneficios.

Tómate en serio las recomendaciones de lecturas, pero sólo las de aquellos que conoces lo suficiente como para confiar en ellas como confías en ellos. Pero tómatelas en serio también para criticarlas, por cuanto de los mejores lugares muchos han salido estafados o asaltados. Lee con preguntas en la cabeza cuando estés buscando soluciones, de la misma manera que debes estar atento a respuestas que hoy pueden no servir para nada, pero que luego notarás que servirán para todo.

Lee Lucilio con fervor, con confianza y con duda, exigiendo claridad pero también belleza, y si alguno de esos libros no te deslumbra, déjalo de inmediato de lado, porque es el siguiente el que podría cambiarte la vida. Pero lee sólo lo necesario para pasar a vivir, porque uno lee para vivir y no vive para leer.

Recuerda Lucilio las cartas que escribimos juntos hace cientos de años. Digo "escribimos" porque creo que nadie escribe sólo, sino que son ideas de muchos las que terminan bajando a tierra por obra de las manos de una sola persona. Lee y relee. Escucha y re-escucha. Volver no es empezar de nuevo. Es empezar distinto.`,
          en: `One who moves from a text on the power of breathing, to another on cognitive biases, while reviewing something of universal history seeking to learn of leadership, to end surely with philosophy, does not seek diverse answers, but coherence in multiplicity.

The variety of our readings, Lucilius, reveals who we are, at the same time as who we wish to be. Because reading is being, as learning is being and doing is being.

It is not only that variety reflects your own way of being and knowing, but that these choices are a clear reflection of who you are and wish to be. It is not breathing, biases, history, or leadership that truly matters, but the connections between these objects of thought.

And it is through philosophy that we can consciously construct these connections, not seeking to solve a problem, but simply to understand. And many times, finding solutions that someday will find their problem.

One is what one reads, Lucilius, not only in the sense that readings are what make one who one is, but that one ends up reading precisely in the way one already is. Though of course, there always exists a space to turn toward better ways of being—a space that only reading and serious thinking can provide.

Reading is also traveling, and you can travel for two reasons: to learn something you need, or to learn something you don't know you need. For the first, it is that you must turn regularly to readings in which you believe you can find ideas to solve some problem, because solutions are such when tested and iterated, they are implemented.

For the second, it is that you must travel with books to places that give you the feeling they might be interesting or that some trusted reference has recommended to you, and although in both cases many times it may not work, the costs will always be much less than the benefits.

Take reading recommendations seriously, but only those from those you know well enough to trust as you trust them. But take them seriously also to criticize them, for from the best places many have left deceived or assaulted. Read with questions in your head when you are seeking solutions, in the same way that you must be attentive to answers that today may serve nothing, but that later you will notice will serve for everything.

Read, Lucilius, with fervor, with confidence and with doubt, demanding clarity but also beauty, and if any of these books does not dazzle you, set it aside immediately, because it is the next one that could change your life. But read only what is necessary to go on living, because one reads in order to live and does not live in order to read.

Remember, Lucilius, the letters that we wrote together hundreds of years ago. I say "we wrote" because I believe that no one writes alone, but that ideas of many end up coming to earth through the work of a single person's hands. Read and reread. Listen and re-listen. To return is not to begin anew. It is to begin differently.`
        }
      },
      {
        id: 3,
        titulo: { es: "Sobre la elección de amigos", en: "On Choosing Friends" },
        fecha: "11 de marzo de 2026",
        contenido: {
          es: `Era este un niño extraterreste que se hace amigo de uno terrícola, cuando este último es llevado a su planeta para ser analizado como espécimen humano. Para el niño de por allá era muy natural ser amigo de alguien de por acá —siendo justamente niño — pero cuando sus padres le dicen que debían llevarlo de regreso a la Tierra, el niño extraterrestre promete visitarlo cada cierto tiempo. Y es así que ambos se encuentran cada cuantos años, esta vez para visitar distintas galaxias, siendo que en cada uno de esos encuentros es como si el tiempo no se hubiera interrumpido, como si nunca se hubieran separado.

Del mismo modo, Lucilio, ocurre con los verdaderos amigos: los puedes ver luego de siete años para continuar la conversación que tuvieron la última vez, o volver a contarse el chiste que sólo ustedes pueden entender. Si te preguntas entonces si, como en el amor a la pareja, la distancia y el tiempo son pruebas de la amistad, yo veo una clara diferencia: el amor parece debilitarse con ellos, mientras la amistad verdadera, se fortalece.

Aristóteles hablaba de la amistad por placer, por utilidad y por amor. Y efectivamente, es placentero tener a alguien con quien compartir intereses. Es útil tener a alguien que nos devuelva algún favor, o mejor, que lo haga sin esperar nada a cambio. Pero es de otro nivel tener a alguien a quien amar, simplemente porque uno tiene esta posibilidad.

El verdadero amigo es entonces ese que nos permite dar y disfrutar de dicha gracia, pero dar como si fuera para nosotros mismos. Pregúntate entonces si estás para tu amigo como lo estás para ti mismo, y si la respuesta es negativa, agradece al menos tener un conocido.

Prefiere los pocos verdaderos amigos, que muchísimos conocidos. Antes que tener la facilidad de poder hablar con cualquiera de lo que sea, prefiere conversar profundamente sobre lo que realmente importa, con una sola persona, además de contigo mismo.

¿Deben los amigos ser similares a nosotros, como sugiere el "alma en dos cuerpos" de Aristóteles, o "un segundo uno mismo" de Cicerón? ¿O deben ser completamente distintos a uno? La respuesta es que necesitamos de ambos: ese que en unas dimensiones nos sea muy parecido, de manera que siempre nos recuerde y ayude a ser lo que quisimos ser; pero también alguno muy distinto, que más bien nos ayude a cambiar por completo.

La amistad puede entonces concentrarse en las coincidencias para aceptar las diferencias, pero también puede buscar las diferencias para encontrar las coincidencias. En la amistad se siente, simplemente, una rara armonía.

Dicen que quien no tiene enemigos no merece tener amigos. Debes tener algunos enemigos por ahí, Lucilio, aunque no te los hayan presentado aún. En todo caso, para ti serán a lo más conocidos, porque tener tu amistad es verdaderamente algo exclusivo, digno de ti mismo, de extraterrestres y de uno que otro terrícola que como yo, te estime demasiado.`,
          en: `There was once an extraterrestrial child who befriended an earthly child when the latter was taken to his planet to be analyzed as a human specimen. For the child from there, it was quite natural to befriend someone from here—being after all just a child—but when his parents told him they had to take the earthling back to Earth, the extraterrestrial child promised to visit him from time to time. And so both have met every few years, this time to visit different galaxies, and in each of these encounters it is as if time had not been interrupted, as if they had never been separated.

In the same way, Lucilius, it is with true friends: you can see them after seven years to continue the conversation you had the last time, or to tell again the joke that only the two of you understand. If you ask yourself then whether, as in romantic love, distance and time are tests of friendship, I see a clear difference: love seems to weaken with them, while true friendship strengthens.

Aristotle spoke of friendship for pleasure, for utility, and for love. And indeed, it is pleasant to have someone with whom to share interests. It is useful to have someone who returns a favor to you, or better, who does so without expecting anything in return. But it is on another level to have someone to love, simply because one has this possibility.

The true friend, then, is one who allows us to give and to enjoy this grace, but to give as if it were for ourselves. Ask yourself then whether you are for your friend as you are for yourself, and if the answer is no, be grateful at least to have an acquaintance.

Prefer few true friends to many acquaintances. Rather than having the ease of being able to speak with anyone about anything, prefer to converse deeply about what truly matters, with a single person, and with yourself.

Should friends be similar to us, as the "soul in two bodies" of Aristotle suggests, or "a second self" of Cicero? Or should they be completely different from us? The answer is that we need both: that one who in some dimensions is very much like us, in such a way that he always reminds us and helps us to be what we wished to be; but also someone very different, who helps us change completely.

Friendship can then concentrate on coincidences to accept differences, but it can also seek differences to find coincidences. In friendship, one feels, simply, a rare harmony.

They say that he who has no enemies does not deserve to have friends. You must have some enemies out there, Lucilius, even if they have not been introduced to you yet. In any case, for you they will be at most acquaintances, because to have your friendship is truly something exclusive, worthy of yourself, of extraterrestrials, and of the one or two earthlings who, like me, esteem you too much.`
        }
      },
      {
        id: 4,
        titulo: { es: "Sobre el miedo a la muerte", en: "On the Fear of Death" },
        fecha: "18 de marzo de 2026",
        contenido: {
          es: `Tengo tatuado en un brazo el _memento mori_, pero ahora quiero agregar —tal vez en el otro — el _sine timore,_ porque no sólo tengo claro que, como todos, me voy a morir, sino que ya no le tengo miedo.

Es razonable temer lo desconocido. De la muerte—específicamente de lo que ocurre realmente cuando viene—nadie ha podido contarnos. Pero observa bien Lucilio: no tememos a la muerte misma, sino a perder lo que sí tenemos y por lo tanto conocemos. Morir es perder tu vida actual, eso que valoras enormemente.

Es otro el tipo de miedo que aparece cuando piensas en lo que podría pasar con aquellos que amas: tus hijos, tu esposa, aquellos que dependen de ti. Pero este miedo no te pertenece realmente—solo puede serles suyo. Lo natural es que te importe.

Está bien temerle al dolor, a la tristeza, a la bancarrota o a algún asesino, porque aun sin haberlos enfrentado, seguro tienes una buena idea de lo que implican. Pero si tiene sentido temerle a lo conocido, ¿por qué temerle automáticamente a lo desconocido?

Nada es más desconocido que la muerte, sobretodo en la actualidad. Las guerras ya no son tan frecuentes ni tan cercanas para muchos. Las más letales enfermedades tienen cura. Algunos aún conviven con la muerte diariamente, pero verla pasar no implica entenderla. No sólo nadie entiende el por qué o el para qué, sino mucho menos el qué es realmente la muerte. 

La muerte no es solo desconocida, sino es un evento instantáneo. Cuando realmente ocurra, no podremos tener consciencia de ella — no solo porque no podríamos recordarla, sino porque no tenemos capacidad de concebir algo de duración infinitesimal.

No tienes que conocer cuándo vas a morir, ni cómo, para saber que lo único que tienes es la vida, que podríamos definirla como aquello que existe entre el nacimiento y la defunción. Algunos parecen tener la suerte de la vida extensa, pero pocos tienen la verdadera dicha de gozar la vida en profundidad, sin preocuparse por la extensión.

Si no puedes controlar cuánto vivirás ni cuándo acabará, claramente sólo te queda el cómo. Y la mejor imagen para entenderlo es la del agua de un río que fluye por su canal naturalmente, sin que le molesten las piedras ni los escombros,  destinada a reunirse en el gran mar en donde todo converge —de lo que por algún capricho nos desprendimos temporalmente.

Deberías querer morirte, Lucilio, porque si te va a ocurrir —y vaya que sí—, quieres quererlo. No hay peor sufrimiento que el que ocurre innecesariamente ante algo inevitable. Y no sólo deberías querer morirte, sino que no encontrarás razón alguna para tenerle miedo. 

Y por todo esto, hoy vas a tener el mejor día de tu vida, y si te es permitido, mañana también.`,
          en: `I have tattooed on my arm the _memento mori_, but now I want to add—perhaps on the other—the _sine timore,_ because not only am I clear that, like all, I will die, but I no longer fear it.

It is reasonable to fear the unknown. Of death—specifically of what really happens when it comes—no one has been able to tell us. But observe well, Lucilius: we do not fear death itself, but losing what we do have and therefore know. To die is to lose your present life, that which you value enormously.

It is another kind of fear that appears when you think about what could happen to those you love: your children, your spouse, those who depend on you. But this fear does not truly belong to you—it can only be theirs. What is natural is that it matters to you.

It is good to fear pain, sadness, ruin, or some assassin, because even without having faced them, you surely have a good idea of what they entail. But if it makes sense to fear what is known, why fear automatically what is unknown?

Nothing is more unknown than death, especially in our time. Wars are no longer so frequent or so near to many of us. The most lethal diseases have cures. Some still live with death daily, but seeing it pass does not mean understanding it. Not only does no one understand the why or the wherefore, but much less what death really is.

Death is not only unknown, but it is an instantaneous event. When it really occurs, we will not be able to have consciousness of it—not only because we could not remember it, but because we do not have the capacity to conceive of something of infinitesimal duration.

You do not need to know when you will die, nor how, to know that the only thing you have is life, which we might define as that which exists between birth and death. Some seem to have the fortune of a long life, but few have the true joy of enjoying life in depth, without worrying about its length.

If you cannot control how long you will live or when it will end, clearly all that remains to you is the how. And the best image for understanding this is that of water flowing through a river's channel naturally, unbothered by stones or debris, destined to reunite in the great sea where everything converges—from which for some caprice we have temporarily separated ourselves.

You should want to die, Lucilius, because if it will happen to you—and surely it will—you want to want it. There is no worse suffering than that which occurs unnecessarily before something inevitable. And not only should you want to die, but you will find no reason whatsoever to fear it.

And because of all this, today you will have the best day of your life, and if it is permitted, tomorrow as well.`
        }
      },
      {
        id: 5,
        titulo: { es: "Sobre el filósofo igual y presente", en: "On the Philosopher as Peer and Present" },
        fecha: "23 de marzo de 2026",
        contenido: {
          es: `Ser diferente, Lucilio, está muy bien, pero en el sentido de saberse diferente. Lo digo de otra manera: quien realmente importa que sepa que eres diferente, eres tú mismo. Por supuesto que los demás notarán, con el tiempo, que eres una persona distinta, para bien. Uno cambia cuando cambia el espíritu, no la ropa, que es lo que los demás suelen ver.

Quien se empeña por distinguirse, ya sea por opulencia o por frugalidad, gasta la mayor parte de su energía tratando de convencer a los demás — pobre inversión pues no tienes control sobre la percepción ajena. Esforzarse en comportarse distinto al vulgo, corrigiendo los propios vicios y reforzando virtudes, tiene mucho mejor retorno.

Evitamos al escandaloso, al derrochador, al intenso. También rechazamos al extremadamente tímido, al pobre en extremo, al muerto en vida. No es asunto de preferencia—es que tales extremos se contagian.

Pero tú no quieres ser distinto en extremo y en externo por otra razón más profunda: tú los necesitas a ellos y ellos te necesitan a ti.

A estas alturas sabes que no es posible una vida plena sin la compañía de otras personas —¿ sino con quién compartir tus alegrías y soportar tus penas? Ellos necesitan lo mismo de ti, pero también necesitan ver y entender que vale la pena el esfuerzo por ser mejor persona cada día. Es la única manera de lograr que cambien también, con tu vivo ejemplo. Los promedios necesitan de la varianza para entenderse.

Lo anterior no es suficiente, Lucilio. Debes además enfocarte en el presente. Tu yo anterior solo puede servir como punto de referencia, como línea de base; tu yo futuro solo para definir objetivos, tal vez destinos. Ni el pasado es tuyo ya, ni nadie puede asegurarte que tendrás futuro.

Es natural que sufras por lo que hiciste mal, consolándote con lo que hiciste bien, a la vez que imaginas un futuro mejor pero te aterras de que no ocurra. Siendo todo esto natural, lo único que te queda para experimentar lo que realmente existe es ser consciente del ahora—con todas tus fuerzas—de cada instante que no es más que imagen del continuo de nuestra percepción.

La vida es una experiencia a ser gozada, de manera que vivir bien requiere presencia, dándole completa atención a cada segundo para el que tengamos capacidad de hacerlo.

Recuerda Lucilio, pero no sufras ni te jactes por ello; planifica, pero no con esperanza, porque la esperanza es pasiva y engendra miedo. Sé el fotógrafo, no el protagonista de la película.

Todo lo que importa y de hecho lo único que existe, Lucilio, es aquí adentro y aquí ahora.`,
          en: `To be different, Lucilius, is quite fine, but in the sense of knowing yourself to be different. Let me put it another way: the one who truly needs to know you are different is yourself. Of course the others will notice, in time, that you are a distinct person, for the better. One changes when the spirit changes, not the clothes—which is what others tend to see.

Whoever strives to distinguish himself, whether through opulence or frugality, spends most of his energy trying to convince others—a poor investment, for you have no control over the perception of others. To strive to behave differently from the common herd, correcting your own vices and strengthening virtues, has a much better return.

We avoid the scandalous, the wasteful, the intense. We also reject the extremely timid, the poor to extremity, the dead in life. It is not a matter of preference—it is that such extremes are contagious.

But you do not wish to be different in extreme and in external form for another, deeper reason: you need them and they need you.

By this point you know that a full life is not possible without the company of other people—without whom would you share your joys and bear your sorrows? They need the same from you, but they also need to see and understand that it is worth the effort to be a better person each day. It is the only way to make them change as well, through your living example. The average needs the variance to know itself.

What came before is not sufficient, Lucilius. You must also focus on the present. Your former self can only serve as a point of reference, as a baseline; your future self only to define objectives, perhaps destinies. Neither is the past yours anymore, nor can anyone assure you that you will have a future.

It is natural that you suffer for what you did wrong, consoling yourself with what you did right, while imagining a better future yet terrifying yourself if it does not occur. Since all this is natural, the only thing that remains for you to experience what truly exists is to be conscious of the now—with all your strength—of each instant that is nothing more than an image of the continuum of our perception.

Life is an experience to be savored, so living well requires presence, giving complete attention to each second for which you have the capacity to do so.

Remember, Lucilius, but do not suffer nor boast because of it; plan, but not with hope, because hope is passive and begets fear. Be the cameraman, not the actor in the film.

All that matters and indeed the only thing that exists, Lucilius, is here inside and here now.`
        }
      },
      {
        id: 6,
        titulo: { es: "Sobre compartir conocimiento", en: "On Sharing Knowledge" },
        fecha: "26 de marzo de 2026",
        contenido: {
          es: `Conversaban un historiador, un abogado y un ingeniero sobre el modelo económico que rige las sociedades de estos tiempos. Siendo además ellos investigador, músico y empresario, respectivamente, sus puntos de vista eran distantes.

Cada uno defendía su posición con argumentos propios de sus formaciones y experiencias —no necesariamente comprensibles a fondo por los demás. Distintas referencias hacían difícil llegar a acuerdos concretos, pero la posición de cada uno se vio ligeramente modificada a partir del conocimiento de los otros.

Cambiar la mente no es algo que necesite 180 grados. A veces basta un ligero giro para terminar en un lugar completamente distinto.

Todo lo que sabemos, Lucilio, es producto de la exposición a diversas ideas, personas y ambientes. Pero esto no es sólo un resultado inevitable — es también influible. Debes exponerte activamente a esta diversidad para que tu conocimiento sea lo más amplio y menos alejado de la realidad. La verdad es, simplemente, una mejor vista al jardín.

Sin embargo, somos mucho más influidos por las acciones de las personas que por sus decires. Recuerda: el camino del ejemplo es más corto y efectivo que el camino del precepto. Las personas hablan realmente con sus cuerpos, no con sus bocas —las palabras son más baratas que los movimientos.

No mires siquiera los movimientos del cuerpo, sino el resultado de ellos —el que se mueve no necesariamente avanza. Es solo cuando ves resultados consistentes que tiene sentido descubrir el método.

Y la mayor influencia de las acciones son las propias. Una idea se convierte en acción y es con la acción y posterior reflexión que se genera conocimiento —para los demás, por supuesto — pero en primer lugar para uno mismo.

Es estando en la vereda que uno sabe realmente lo que significa caminar —nunca desde la carpeta. Aprender de los errores y aciertos es sumamente eficiente, pero nunca tan efectivo como empezar a moverse.

La motivación tiene asistencia perfecta, pero es el profesor el que debe iniciar la clase. Es solo luego de empezar que tienes la única posibilidad de enfrentar el conocimiento con la realidad, para afinarlo — o cambiarlo completamente.

Así como el profesor aprende mucho más al enseñar que cuando fue alumno, el que pasa a la acción puede ser el mejor profesor. Pasar a la acción implica interactuar con la realidad y con la interpretación de esta a cargo de otros — situación que hace todo sumamente más complejo, y justo por esto enormemente más rico.

Es entonces, Lucilio: acción con reflexión. La acción puede empezar por una gran idea o simplemente por la valentía de probar algo, valentía que no sólo generará retornos para ti, sino para todos los que te rodean.

Esos tres conocidos que citaba al inicio se fueron con mejores ideas, pero lo que realmente quedó fue lo que provocaron esas ideas en sus posteriores comportamientos.

Las conversaciones pueden ser profundas. Pero es lo que haces luego de ellas lo que marca la nueva dirección — y por eso debemos llamarlo "conversacción".`,
          en: `Three people conversed about the economic model that governs the societies of our time: a historian, a lawyer, and an engineer. Being also a researcher, musician, and entrepreneur respectively, their points of view were distant.

Each one defended his position with arguments from his own formations and experiences—not necessarily comprehensible in depth to the others. Different references made it difficult to reach concrete agreements, but each one's position was slightly modified by the knowledge of the others.

Changing the mind does not require 180 degrees. Sometimes a slight turn is enough to end up in a completely different place.

All that we know, Lucilius, is the product of exposure to diverse ideas, people, and environments. But this is not only an inevitable result—it is also influenceable. You must expose yourself actively to this diversity so that your knowledge is as broad and as close to reality as possible. Truth is, simply, a better view of the garden.

However, we are much more influenced by the actions of people than by their words. Remember: the path of example is shorter and more effective than the path of precept. People speak truly with their bodies, not with their mouths—words are cheaper than movements.

Do not even look at the movements of the body, but at the result of them—the one who moves does not necessarily advance. It is only when you see consistent results that it makes sense to discover the method.

And the greatest influence of actions are one's own. An idea becomes action, and it is through action and subsequent reflection that knowledge is generated—for others, of course—but first of all for oneself.

It is standing on the sidewalk that one truly knows what it means to walk—never from an armchair. Learning from mistakes and successes is extremely efficient, but never as effective as beginning to move. Motivation has perfect attendance, but it is the teacher who must initiate the class. It is only after beginning that you have the sole possibility of confronting knowledge with reality, to refine it—or change it completely.

Just as the teacher learns much more by teaching than when he was a student, the one who takes action can be the best teacher. To take action implies interacting with reality and with the interpretation of it by others—a situation that makes everything far more complex, and for this very reason enormously richer.

It is then, Lucilius: action with reflection. Action can begin with a great idea or simply with the courage to try something, a courage that will generate returns not only for you, but for all those around you.

Those three acquaintances I mentioned at the beginning left with better ideas, but what truly remained was what those ideas provoked in their subsequent behaviors.

Conversations can be deep. But it is what you do after them that marks the new direction—and that is why we must call it "conversaction".`
        }
      }    ]
  };

  const textos = {
    es: {
      home: {
        titulo: "SenecAI",
        subtitulo: "Continuando la conversación con Séneca",
        introduccion: "Mientras escuchaba una clase sobre una de las Cartas de Séneca a Lucilio, me pregunté: ¿existirán esas cartas que enviaba Lucilio o todo era parte del arsenal literario de Séneca? Luego entendí que esto no importaba. Lo que importaba eran las enormes lecciones de vida que hay en estos textos. Sin embargo, no se me ocurrió mejor forma para aprender sobre esto que continuar la conversación con Séneca, porque todos somos Lucilio, pero también podemos ser de vez en cuando, Séneca.",
        botones: { cartas: "Cartas", emails: "Emails", buzon: "Buzón" }
      },
      about: {
        titulo: "Sobre Luis",
        contenido: "Filósofo sin academia, empresario sin ambiciones, mente con cuerpo. Empecé escribiendo en mi blog Diestro de Oído, pero necesitaba un carril para avanzar derecho, y lo encontré en las cartas de Séneca que escribió para mi, pero también para ti.",
        parrafo2: "Como cuando se aprende a tocar música, SénecAI es mi cover personal sobre uno de los discos que marcaron mi vida."
      },
      nav: { cartas: "Cartas", emails: "Emails", buzon: "Buzón", about: "Sobre mí" },
      sections: { cartas: "Cartas a Séneca", emails: "Emails a Lucilio", buzon: "Buzón de SénecAI" },
      footer: { derechos: "© 2026 SenecAI. Todos los derechos reservados." },
      buzon: { 
        titulo: "Escribe tu pregunta a Séneca",
        descripcion: "Comparte tu pregunta o situación. Séneca te responderá con la sabiduría de sus cartas aplicada a tu vida.",
        placeholder: "¿Qué te inquieta? ¿Qué pregunta llevas contigo?",
        enviar: "Enviar pregunta",
        esperando: "Séneca está reflexionando...",
        respuestaDe: "Respuesta de Séneca:"
      }
    },
    en: {
      home: {
        titulo: "SenecAI",
        subtitulo: "Continuing the Conversation with Seneca",
        introduccion: "While listening to a lecture on one of Seneca's Letters to Lucilius, I wondered: did Lucilius's letters even exist, or was it all part of Seneca's literary arsenal? Then I understood that it didn't matter. What did matter were the enormous life lessons in these texts. However, I found no better way to learn about this than to continue the conversation with Seneca, because we are all Lucilius, but we can also be a Seneca from time to time.",
        botones: { cartas: "Letters", emails: "Emails", buzon: "Mailbox" }
      },
      about: {
        titulo: "About Luis",
        contenido: "Philosopher without academy, entrepreneur without ambitions, mind with body. I started writing on my blog Diestro de Oído, but I needed a path to move straight ahead, and I found it in Seneca's letters that he wrote for me, but also for you.",
        parrafo2: "Just as when learning to play music, SenecAI is my personal cover of one of the records that marked my life."
      },
      nav: { cartas: "Letters", emails: "Emails", buzon: "Mailbox", about: "About me" },
      sections: { cartas: "Letters to Seneca", emails: "Emails to Lucilius", buzon: "Seneca's Mailbox" },
      footer: { derechos: "© 2026 SenecAI. All rights reserved." },
      buzon: {
        titulo: "Ask Seneca a question",
        descripcion: "Share your question or situation. Seneca will respond with the wisdom of his letters applied to your life.",
        placeholder: "What troubles you? What question do you carry?",
        enviar: "Send question",
        esperando: "Seneca is reflecting...",
        respuestaDe: "Seneca's response:"
      }
    }
  };

  const t = textos[idioma as keyof typeof textos];

  return (
    <div className="bg-white min-h-screen flex flex-col" style={{fontFamily: 'system-ui, sans-serif'}}>
      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => { setSeccionActiva('home'); setPiezaSeleccionada(null); }}
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em', fontWeight: '300', fontSize: '1.4rem' }}
            className="text-gray-900 hover:text-yellow-600 transition"
          >
            &lt;SENEC<span className="text-yellow-600">AI</span>&gt;
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {(['cartas','emails','buzon','about'] as const).map(s => (
              <button key={s} onClick={() => { setSeccionActiva(s); setPiezaSeleccionada(null); }}
                className={`text-sm font-medium transition ${seccionActiva === s ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'}`}>
                {t.nav[s]}
              </button>
            ))}
            <div className="flex gap-2 pl-4 border-l border-gray-200">
              {(['es','en'] as const).map(l => (
                <button key={l} onClick={() => setIdioma(l)}
                  className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === l ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600 hover:text-gray-900'}`}>
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
            {(['cartas','emails','buzon','about'] as const).map(s => (
              <button key={s} onClick={() => { setSeccionActiva(s); setPiezaSeleccionada(null); setMenuAbierto(false); }}
                className={`text-sm font-medium text-left transition ${seccionActiva === s ? 'text-yellow-600' : 'text-gray-600'}`}>
                {t.nav[s]}
              </button>
            ))}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              {(['es','en'] as const).map(l => (
                <button key={l} onClick={() => { setIdioma(l); setMenuAbierto(false); }}
                  className={`px-3 py-1 text-xs font-medium rounded transition ${idioma === l ? 'bg-yellow-100 text-yellow-900' : 'text-gray-600'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="flex-grow">

        {/* HOME */}
        {seccionActiva === 'home' && (
          <section className="min-h-screen bg-white flex flex-col justify-center">
            <div className="max-w-2xl mx-auto px-6 py-16 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">{t.home.titulo}</h1>
              <p className="text-xl text-yellow-600 mb-8 font-light">{t.home.subtitulo}</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-12 font-light">{t.home.introduccion}</p>
              <div className="flex gap-4 justify-center flex-wrap">
                {(['cartas','emails','buzon'] as const).map(s => (
                  <button key={s} onClick={() => setSeccionActiva(s)}
                    className="bg-yellow-600 text-white px-8 py-3 rounded hover:bg-yellow-700 transition font-medium">
                    {t.home.botones[s]}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CARTAS */}
        {seccionActiva === 'cartas' && (
          <section className="min-h-screen bg-yellow-50 py-16">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-12">{t.sections.cartas}</h2>
              {piezaSeleccionada && piezaSeleccionada.tipo === 'carta' ? (
                <article>
                  <button onClick={() => setPiezaSeleccionada(null)} className="text-yellow-700 hover:text-yellow-900 font-medium text-sm mb-8 block">
                    ← {idioma === 'es' ? 'Volver' : 'Back'}
                  </button>
                  <div className="bg-yellow-100 border-2 border-yellow-800 rounded-lg p-8 shadow-md max-w-3xl">
                    <h3 className="text-3xl font-bold text-yellow-900 mb-6" style={{fontFamily: 'Georgia, serif'}}>{piezaSeleccionada.pieza.titulo[idioma]}</h3>
                    <div className="text-yellow-900 leading-relaxed whitespace-pre-wrap mb-8"
                      style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', lineHeight: '1.7' }}>
                      {piezaSeleccionada.pieza.contenido[idioma]}
                    </div>
                    <div className="text-sm text-yellow-800 italic border-t-2 border-yellow-800 pt-4">{piezaSeleccionada.pieza.fecha}</div>
                  </div>
                  <SubstackEmbed idioma={idioma} />
                </article>
              ) : (
                <div className="grid gap-6">
                  {piezas.cartas.slice().reverse().map(carta => (
                    <div key={carta.id} className="bg-white p-6 rounded border border-gray-200 hover:border-yellow-400 transition cursor-pointer"
                      onClick={() => setPiezaSeleccionada({ tipo: 'carta', pieza: carta })}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{carta.titulo[idioma]}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{carta.contenido[idioma].split('\n\n')[0].substring(0, 150)}...</p>
                      <span className="text-yellow-600 font-medium text-sm">{idioma === 'es' ? 'Leer más →' : 'Read more →'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* EMAILS */}
        {seccionActiva === 'emails' && (
          <section className="min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-12">{t.sections.emails}</h2>
              {piezaSeleccionada && piezaSeleccionada.tipo === 'email' ? (
                <article>
                  <button onClick={() => setPiezaSeleccionada(null)} className="text-yellow-600 hover:text-yellow-700 font-medium text-sm mb-8 block">
                    ← {idioma === 'es' ? 'Volver' : 'Back'}
                  </button>
                  <div className="bg-white border border-gray-300 rounded-lg shadow-sm max-w-3xl">
                    <div className="border-b border-gray-200 p-6 bg-gray-50">
                      <p className="text-sm text-gray-600 font-mono"><span className="font-semibold">{idioma === 'es' ? 'Asunto' : 'Subject'}:</span> {piezaSeleccionada.pieza.titulo[idioma]}</p>
                      <p className="text-sm text-gray-600 font-mono mt-1"><span className="font-semibold">{idioma === 'es' ? 'Fecha' : 'Date'}:</span> {piezaSeleccionada.pieza.fecha}</p>
                    </div>
                    <div className="p-8 text-gray-800 leading-relaxed whitespace-pre-wrap text-base" style={{fontFamily: 'Georgia, serif'}}>
                      {piezaSeleccionada.pieza.contenido[idioma]}
                    </div>
                  </div>
                  <SubstackEmbed idioma={idioma} />
                </article>
              ) : (
                <div className="grid gap-6">
                  {piezas.emails.slice().reverse().map(emailItem => (
                    <div key={emailItem.id} className="bg-white p-6 rounded border border-gray-200 hover:border-yellow-400 transition cursor-pointer"
                      onClick={() => setPiezaSeleccionada({ tipo: 'email', pieza: emailItem })}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{emailItem.titulo[idioma]}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{emailItem.contenido[idioma].split('\n\n')[0].substring(0, 150)}...</p>
                      <span className="text-yellow-600 font-medium text-sm">{idioma === 'es' ? 'Leer más →' : 'Read more →'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* BUZÓN */}
        {seccionActiva === 'buzon' && (
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
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap" style={{fontFamily: 'Georgia, serif'}}>{respuesta}</p>
                </div>
              )}

              <SubstackEmbed idioma={idioma} />
            </div>
          </section>
        )}

        {/* ABOUT */}
        {seccionActiva === 'about' && (
          <section className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-2xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{t.about.titulo}</h2>
              <div className="bg-white p-8 rounded border border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{t.about.contenido}</p>
                <p className="text-lg text-gray-700 leading-relaxed">{t.about.parrafo2}</p>
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