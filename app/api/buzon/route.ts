import { Anthropic } from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Ideas Database (58 ideas curadas)
const ideasDatabase = [
  { author: "Seneca", quote: "Unos tiempos se nos arrebatan, otros se nos sustraen y otros se nos escapan. Sin embargo, la más reprensible es la pérdida, que se produce por la negligencia", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Seneca", quote: "Gran parte de la existencia se nos escapa obrando mal, la mayor parte estando inactivos, toda ella obrando cosas distintas de las que debemos", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Seneca", quote: "Realmente nos engañamos en esto: que consideramos lejana la muerte, siendo así que gran parte de ella ya ha pasado. Todo cuanto de nuestra vida queda atrás, la muerte lo posee.", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Seneca", quote: "Acapara todas las horas. Así sucederá que estés menos pendiente del mañana, si te has aplicado al día de hoy", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Seneca", quote: "Nadie que dispone del tiempo se considera deudor de nada, siendo así que éste es el único crédito que ni siquiera el más agradecido puede restituir", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Seneca", quote: "Es ahorro demasiado tardío el que se consigue en el fondo del vaso: en el sedimento no sólo queda una parte insignificante, sino la peor", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Timothy Ferriss", quote: "Lack of time is actually lack of priorities", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Alan Weiss", quote: "Managing time is about priorities, not resources", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Andrew S. Grove", quote: "How you handle your own time is, in my view, the single most important aspect of being a role model and leader", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Timothy Ferriss", quote: "Time without attention is worthless, so value attention over time", primaryTag: "FOCUS & LEARNING", secondaryTag: "attention" },
  { author: "Robert Greene", quote: "Take one thing off your plate today to make more time for your Life's Task", primaryTag: "TIME & MORTALITY", secondaryTag: "time" },
  { author: "Seneca", quote: "No está en ningún lugar quien está en todas partes", primaryTag: "FOCUS & LEARNING", secondaryTag: "focus" },
  { author: "Seneca", quote: "¿Preguntas cuál es el límite conveniente de las riquezas? Primero tener lo necesario, luego lo suficiente", primaryTag: "MATERIAL LIFE & NEEDS", secondaryTag: "wealth" },
  { author: "Seneca", quote: "A well ordered mind is reflected in the man's ability to remain in one place and linger in his company", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "solitude" },
  { author: "Seneca", quote: "After you have run over many thoughts, select the one to be thoroughly digested that day", primaryTag: "FOCUS & LEARNING", secondaryTag: "thinking" },
  { author: "James Clear", quote: "What matters is not simply reading more books, but getting more out of each book you read", primaryTag: "FOCUS & LEARNING", secondaryTag: "reading" },
  { author: "Shane Parrish", quote: "You have to have some idea of what you want to get from the book. If you don't read with intention, what you read will never stick", primaryTag: "FOCUS & LEARNING", secondaryTag: "reading" },
  { author: "Harold Bloom", quote: "The ultimate answer to the question 'Why read?' is that only deep, constant reading fully establishes and augments an autonomous self. Until you become yourself, what benefit can you be to others?", primaryTag: "FOCUS & LEARNING", secondaryTag: "reading" },
  { author: "Shane Parrish", quote: "The opportunity cost of reading something new is re-reading the best book you've ever read", primaryTag: "FOCUS & LEARNING", secondaryTag: "reading" },
  { author: "Taleb", quote: "Drink old wine. Read old books. Keep old friends", primaryTag: "FOCUS & LEARNING", secondaryTag: "reading" },
  { author: "Seneca", quote: "When friendship is settled, you must trust; before friendship is formed, you must pass judgment", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "friendship" },
  { author: "Seneca", quote: "But if you consider any man a friend whom you do not trust as you trust yourself, you are mightily mistaken and you do not sufficiently understand what true friendship means", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "friendship" },
  { author: "Seneca", quote: "Ponder for a long time whether you shall admit a given person to your friendship; but when you have decided to admit him, welcome him with all your heart and soul. Speak as boldly with him as with yourself", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "friendship" },
  { author: "Ming-Dao Deng", quote: "With my friend gone from the world, who will I play my music for? True friendship is a rare harmony", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "friendship" },
  { author: "Seneca", quote: "Pues hasta ahora no perdura en nosotros la infancia, sino un defecto mayor: la mentalidad infantil.", primaryTag: "VIRTUE & CHARACTER", secondaryTag: "aging" },
  { author: "Seneca", quote: "Ningún mal es tan grande, si es el último. Llega a ti la muerte. Deberías temerle, solo si pudiera quedarse junto a ti.", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Seneca", quote: "La mayoría fluctúa miserablemente entre las penas de la vida y el miedo a morir, y no quiere vivir, pero no sabe morir.", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Seneca", quote: "¿Qué te importa cuán poderoso sea aquel que entiendes? Si lo que causa tu temor lo podrían provocar todos", primaryTag: "SUFFERING & MENTAL STATES", secondaryTag: "suffering" },
  { author: "Seneca", quote: "Lo superfluo nos hace sudar; lo suficiente, está alcance de la mano. Quien de buen grado se acomoda con la pobreza es rico", primaryTag: "MATERIAL LIFE & NEEDS", secondaryTag: "possessions" },
  { author: "Seneca", quote: "No man can have a peaceful life who thinks too much in a lengthening it", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Robert Greene", quote: "By becoming deeply aware of our mortality, we intensify our experience of every aspect of life", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Epicuro", quote: "De la muerte no tenemos nada que temer, porque cuando la muerte existe, nosotros no existimos, y mientras nosotros existimos, la muerte no existe", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Ming-Dao Deng", quote: "Death is not an ending. It is a transformation. What dies is only our sense of identity, which was false to begin with. Death is the threshold of this life.", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "William Woollard", quote: "By grappling with the Buddhist ideas on the eternity of life, it becomes possible to see death not as a thing apart, a vast and fearful emptiness, but as a continuity, as a natural part of the cycle that underpins all things", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Leo Tolstoy", quote: "You should live your life so that you are not afraid of death, and at the same time do not wish to die", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Anthony De Mello", quote: "The first reaction is one of fear. It's not that we fear the unknown. You cannot fear something that you do not know. Nobody is afraid of the unknown. What you really fear is the loss of the known", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Gordon Livingston", quote: "The great paradox of life: It is possible to be happy in the face of our mortality", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Leo Tolstoy", quote: "Perhaps you fear the changes that death will bring? But a similar great change already happened at the time of your birth, and nothing bad came out of it", primaryTag: "TIME & MORTALITY", secondaryTag: "death" },
  { author: "Seneca", quote: "Sigamos una vida mejor que la del vulgo, no la contraria; de otra suerte a quienes deseamos corregir los ayentamos de nosotros", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "contrarian" },
  { author: "Seneca", quote: "Filosofía exige frugalidad, no castigo. Puede existir una frugalidad sin desalino", primaryTag: "MATERIAL LIFE & NEEDS", secondaryTag: "moderation" },
  { author: "Seneca", quote: "¿No habrá diferencia entre nosotros y ellos? Muchísima: sepa que somos diferentes de las gentes que nos examine más de cerca. El que entre en nuestra casa admire más nuestra persona que nuestro ajuar.", primaryTag: "VIRTUE & CHARACTER", secondaryTag: "contrarian" },
  { author: "Seneca", quote: "Propio de un espíritu pusilánime es no poder soportar las riquezas", primaryTag: "VIRTUE & CHARACTER", secondaryTag: "possessions" },
  { author: "Seneca", quote: "Si dejas de esperar, dejas de temer", primaryTag: "SUFFERING & MENTAL STATES", secondaryTag: "hope-fear" },
  { author: "Seneca", quote: "Las fieras huyen de los peligros que ven; una vez los han evitado, están seguras: nosotros nos atormentamos por el porvenir y el pasado.", primaryTag: "SUFFERING & MENTAL STATES", secondaryTag: "attention" },
  { author: "Seneca", quote: "Inwardly, we ought to be different in all respects, but our exterior should conform to society.", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "contrarian" },
  { author: "Seneca", quote: "We should not believe that the lack of silver and gold to be proof of the simple life", primaryTag: "MATERIAL LIFE & NEEDS", secondaryTag: "wealth" },
  { author: "Seneca", quote: "Live according to nature, but remember it is quite contrary to nature to torture the body", primaryTag: "MATERIAL LIFE & NEEDS", secondaryTag: "needs" },
  { author: "Sam Harris", quote: "How we pay attention to the present moment largely determines the character of our experience and, therefore, the quality of our lives", primaryTag: "FOCUS & LEARNING", secondaryTag: "attention" },
  { author: "Ryan Holiday", quote: "Focus on what is in front of you, right now. Ignore what it 'represents' or it 'means' or 'why it happened to you'", primaryTag: "FOCUS & LEARNING", secondaryTag: "attention" },
  { author: "Goethe", quote: "We suffer from the past, and we spoil our future because we neglect the present. The best the future can offer is dreams. There is only one thing which really exists: the present.", primaryTag: "FOCUS & LEARNING", secondaryTag: "attention" },
  { author: "Harari", quote: "Family and community seem to have more impact on our happiness than money and health", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "company" },
  { author: "Seneca", quote: "Esta es la prueba cabal de un alma perfeccionada: el que descubre los propios defectos que todavía ignoraba; a ciertos enfermos se les felicita cuando advierten que lo están.", primaryTag: "SUFFERING & MENTAL STATES", secondaryTag: "wisdom" },
  { author: "Seneca", quote: "Si la sabiduría se me otorgase bajo esta condición, de mantenerla ocultra y no divulgarla, la rechazaría: sin compañía no es grata la posesión de bien alguno.", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "wealth" },
  { author: "Seneca", quote: "Los hombres se fían más de la vista que del oído; luego, porque el camino es largo a través de los preceptos, breve y eficaz a través de los ejemplos.", primaryTag: "VIRTUE & CHARACTER", secondaryTag: "example" },
  { author: "Seneca", quote: "¿Me preguntas en qué he aprovechado? He empezado a ser mi propio amigo... Ten presente que un tal amigo es posible a todos.", primaryTag: "RELATIONSHIPS & SOLITUDE", secondaryTag: "friendship" },
  { author: "Seneca", quote: "I am being not only reformed but transformed. I do not yet, however, assure myself, or indulge the hope, that there are no elements left in me which need to be changed", primaryTag: "VIRTUE & CHARACTER", secondaryTag: "learning" },
  { author: "Robert Greene", quote: "'The truth is generally seen, rarely heard.' - The Moral Effect. Quite simply, you teach others a lesson by giving them a taste of their own medicine", primaryTag: "FOCUS & LEARNING", secondaryTag: "example" },
  { author: "Harari", quote: "Words are cheaper than actions", primaryTag: "FOCUS & LEARNING", secondaryTag: "example" },
];

// Fragmentos de Cartas/Emails 1-6 como fuentes adicionales
const cartasEmailsFragments = [
  { source: "Carta 1", excerpt: "El tiempo es lo único que tenemos, pero lo desperdiciamos en distracciones y reuniones innecesarias", tags: "TIME & MORTALITY" },
  { source: "Email 1", excerpt: "Tu atención, Lucilio, es lo que da valor al tiempo. De ahí que cada momento sea distinto, irrepetible", tags: "TIME & MORTALITY" },
  { source: "Carta 2", excerpt: "Leer es ser, como aprender es ser y hacer es ser. Cada idea es un ladrillo de la mejor construcción que puede forjar", tags: "FOCUS & LEARNING" },
  { source: "Email 2", excerpt: "Coherencia en la multiplicidad: las conexiones entre ideas es lo que importa realmente", tags: "FOCUS & LEARNING" },
  { source: "Carta 3", excerpt: "La amistad verdadera, como el amor, comienza con uno mismo. Ser amigo de otro por no poder bastarse a sí mismo, no es amistad—es conveniencia", tags: "RELATIONSHIPS & SOLITUDE" },
  { source: "Email 3", excerpt: "En la amistad se siente, simplemente, una rara armonía. Necesitamos tanto amigos similares como completamente distintos", tags: "RELATIONSHIPS & SOLITUDE" },
  { source: "Carta 4", excerpt: "Estoy muriendo todos los días. Mi vida puede terminar en cualquier momento. He decidido aprovechar al máximo el tiempo que me queda", tags: "TIME & MORTALITY" },
  { source: "Email 4", excerpt: "No debes temer a la muerte misma, sino a perder lo que tienes. Tu atención es lo que da valor al tiempo", tags: "TIME & MORTALITY" },
  { source: "Carta 5", excerpt: "Ser diferente no significa vivir en extremos. La soledad extrema es aislamiento, no filosofía", tags: "RELATIONSHIPS & SOLITUDE" },
  { source: "Email 5", excerpt: "Sé el fotógrafo, no el protagonista de la película. Todo lo que importa es aquí adentro y aquí ahora", tags: "FOCUS & LEARNING" },
  { source: "Carta 6", excerpt: "El conocimiento sin compartir permanece incorrecto. Se convierte en sabiduría cuando se comparte con otros", tags: "RELATIONSHIPS & SOLITUDE" },
  { source: "Email 6", excerpt: "Acción con reflexión. Es la acción la que marca la nueva dirección, no la conversación", tags: "FOCUS & LEARNING" },
];

export async function POST(request: Request) {
  try {
    const { pregunta, idioma } = await request.json();

    if (!pregunta) {
      return new Response(JSON.stringify({ error: "Pregunta requerida" }), { status: 400 });
    }

    // Búsqueda mejorada de relevancia
    const preguntaLower = pregunta.toLowerCase();
    const palabrasClave = preguntaLower.split(/\s+/).filter(p => p.length > 3);

    // Buscar en Ideas Database
    const ideasRelevantes = ideasDatabase
      .map(idea => ({
        ...idea,
        relevance: palabrasClave.filter(p => 
          idea.quote.toLowerCase().includes(p) || 
          idea.primaryTag.toLowerCase().includes(p)
        ).length
      }))
      .filter(idea => idea.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3)
      .map(({ relevance, ...rest }) => rest);

    // Buscar en Cartas/Emails
    const cartasRelevantes = cartasEmailsFragments
      .map(item => ({
        ...item,
        relevance: palabrasClave.filter(p => item.excerpt.toLowerCase().includes(p) || item.tags.toLowerCase().includes(p)).length
      }))
      .filter(item => item.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 2)
      .map(({ relevance, ...rest }) => rest);

    // Construir prompt
    const fuentes = [
      ...ideasRelevantes.map(i => `- ${i.author}: "${i.quote}"`),
      ...cartasRelevantes.map(c => `- ${c.source}: "${c.excerpt}"`)
    ].join('\n');

    const prompt = idioma === 'es' 
      ? `Eres Séneca, el filósofo estoico. Un discípulo te escribe con esta pregunta:

"${pregunta}"

Basándote en tus enseñanzas, tus cartas a Lucilio, y estas fuentes relevantes:
${fuentes}

Responde como lo haría Séneca: con sabiduría, compasión y referencias a tus enseñanzas. Sé profundo pero accesible. La respuesta debe ser un párrafo o dos.`
      : `You are Seneca, the Stoic philosopher. A disciple writes to you with this question:

"${pregunta}"

Based on your teachings, your letters to Lucilius, and these relevant sources:
${fuentes}

Respond as Seneca would: with wisdom, compassion, and references to your teachings. Be profound but accessible. The response should be a paragraph or two.`;

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      messages: [
        { role: "user", content: prompt }
      ]
    });

    const respuestaTexto = response.content[0].type === 'text' ? response.content[0].text : '';

    return new Response(JSON.stringify({ respuesta: respuestaTexto }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud" }), { status: 500 });
  }
}
