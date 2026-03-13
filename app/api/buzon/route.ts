import { Anthropic } from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Ideas Database
const ideasDatabase = [
  {
    author: "Seneca",
    quote: "Unos tiempos se nos arrebatan, otros se nos sustraen y otros se nos escapan. Sin embargo, la más reprensible es la pérdida, que se produce por la negligencia",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Seneca",
    quote: "Gran parte de la existencia se nos escapa obrando mal, la mayor parte estando inactivos, toda ella obrando cosas distintas de las que debemos",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Seneca",
    quote: "Realmente nos engañamos en esto: que consideramos lejana la muerte, siendo así que gran parte de ella ya ha pasado. Todo cuanto de nuestra vida queda atrás, la muerte lo posee.",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Seneca",
    quote: "Acapara todas las horas. Así sucederá que estés menos pendiente del mañana, si te has aplicado al día de hoy",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Seneca",
    quote: "Nadie que dispone del tiempo se considera deudor de nada, siendo así que éste es el único crédito que ni siquiera el más agradecido puede restituir",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Seneca",
    quote: "Es ahorro demasiado tardío el que se consigue en el fondo del vaso : en el sedimento no sólo queda una parte insignificante, sino la peor",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Timothy Ferriss",
    quote: "Lack of time is actually lack of priorities",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Alan Weiss",
    quote: "Managing time is about priorities, not resources",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Andrew S. Grove",
    quote: "How you handle your own time is, in my view, the single most important aspect of being a role model and leader",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Timothy Ferriss",
    quote: "Time without attention is worthless, so value attention over time",
    primaryTag: "FOCUS & LEARNING",
    secondaryTag: "attention"
  },
  {
    author: "Robert Greene",
    quote: "Take one thing off your plate today to make more time for your Life's Task",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "time"
  },
  {
    author: "Seneca",
    quote: "No está en ningún lugar quien está en todas partes",
    primaryTag: "FOCUS & LEARNING",
    secondaryTag: "focus"
  },
  {
    author: "Seneca",
    quote: "¿Preguntas cuál es el límite conveniente de las riquezas? Primero tener lo necesario, luego lo suficiente",
    primaryTag: "MATERIAL LIFE & NEEDS",
    secondaryTag: "wealth"
  },
  {
    author: "Seneca",
    quote: "A well ordered mind is reflected in the man's ability to remain in one place and linger in his company",
    primaryTag: "RELATIONSHIPS & SOLITUDE",
    secondaryTag: "solitude"
  },
  {
    author: "Seneca",
    quote: "After you have run over many thoughts, select the one to be throroughly digested that day",
    primaryTag: "FOCUS & LEARNING",
    secondaryTag: "thinking"
  },
  {
    author: "James Clear",
    quote: "What matters is not simply reading more books, but getting more out of each book you read",
    primaryTag: "FOCUS & LEARNING",
    secondaryTag: "reading"
  },
  {
    author: "Shane Parrish",
    quote: "You have to have some idea of what you want to get from the book. If you don't read with intention, what you read will never stick",
    primaryTag: "FOCUS & LEARNING",
    secondaryTag: "reading"
  },
  {
    author: "Harold Bloom",
    quote: "The ultimate answer to the question \"Why read?\" is that only deep, constant reading fully establishes and augments an autonomous self. Until you become yourself, what benefit can you be to others?",
    primaryTag: "FOCUS & LEARNING",
    secondaryTag: "reading"
  },
  {
    author: "Shane Parrish",
    quote: "The opportunity cost of reading something new is re-reading the best book you've ever read",
    primaryTag: "FOCUS & LEARNING",
    secondaryTag: "reading"
  },
  {
    author: "Taleb",
    quote: "Drink old wine. Read old books. Keep old friends",
    primaryTag: "FOCUS & LEARNING",
    secondaryTag: "reading"
  },
  {
    author: "Seneca",
    quote: "When friendship is settled, you must trust; before friendship is formed, you must pass judgment",
    primaryTag: "RELATIONSHIPS & SOLITUDE",
    secondaryTag: "friendship"
  },
  {
    author: "Seneca",
    quote: "But if you consider any man a friend whom you do not trust as you trust yourself, you are mightily mistaken and you do not sufficiently understand what true friendship means",
    primaryTag: "RELATIONSHIPS & SOLITUDE",
    secondaryTag: "friendship"
  },
  {
    author: "Seneca",
    quote: "Ponder for a long time whether you shall admit a given person to your friendship; but when you have decided to admit him, welcome him with all your heart and soul. Speak as boldly with him as with yourself",
    primaryTag: "RELATIONSHIPS & SOLITUDE",
    secondaryTag: "friendship"
  },
  {
    author: "Ming-Dao Deng",
    quote: "With my friend gone from the world, who will I play my music for? True friendship is a rare harmony",
    primaryTag: "RELATIONSHIPS & SOLITUDE",
    secondaryTag: "friendship"
  },
  {
    author: "Seneca",
    quote: "Pues hasta ahora no perdura en nosotros la infancia, sino un defecto mayor: la mentalidad infantil.",
    primaryTag: "VIRTUE & CHARACTER",
    secondaryTag: "aging"
  },
  {
    author: "Seneca",
    quote: "Ningún mal es tan grande, si es el último. Llega a ti la muerte. Deberías temerle, solo si pudiera quedarse junto a ti.",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Seneca",
    quote: "La mayoría fluctúa miserablemente entre las penas de la vida y el miedo a morir, y no quiere vivir, pero no sabe morir.",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Seneca",
    quote: "¿Qué te importa cuán poderoso sea aquel que entiendes? Si lo que causa tu temor lo podrían provocar todos",
    primaryTag: "SUFFERING & MENTAL STATES",
    secondaryTag: "suffering"
  },
  {
    author: "Seneca",
    quote: "Lo superfluo nos hace sudar; lo suficiente, está alcance de la mano. Quien de buen grado se acomoda con la pobreza es rico",
    primaryTag: "MATERIAL LIFE & NEEDS",
    secondaryTag: "possessions"
  },
  {
    author: "Seneca",
    quote: "No man can have a peaceful life who thinks too much in a lenghtening it",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Robert Greene",
    quote: "By becoming deeply aware of our mortality, we intensify our experience of every aspect of life",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Epicuro",
    quote: "De la muerte no tenemos nada que temer, porque cuando la muerte existe, nosotros no existimos, y mientras nosotros existimos, la muerte no existe",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Ming-Dao Deng",
    quote: "Death is not an ending. It is a transformation. What dies is only our sense of identity, which was false to begin with. Death is the threshold of this life.",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "William Woollard",
    quote: "By grappling with the Buddhist ideas on the eternity of life, it becomes possible to see death not as a thing apart, a vast and fearful emptiness, but as a continuity, as a natural part of the cycle that underpins all things",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Leo Tolstoy",
    quote: "You should live your life so that you are not afraid of death, and at the same time do not wish to die",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Anthony De Mello",
    quote: "The first reaction is one of fear. It's not that we fear the unknown. You cannot fear something that you do not know. Nobody is afraid of the unknown. What you really fear is the loss of the known",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Gordon Livingston",
    quote: "The great paradox of life: It is possible to be happy in the face of our mortality",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  },
  {
    author: "Leo Tolstoy",
    quote: "Perhaps you fear the changes that death will bring? But a similar great change already happened at the time of your birth, and nothing bad came out of it",
    primaryTag: "TIME & MORTALITY",
    secondaryTag: "death"
  }
];

export async function POST(request: Request) {
  try {
    const { pregunta, idioma } = await request.json();

    if (!pregunta) {
      return new Response(JSON.stringify({ error: "Pregunta requerida" }), { status: 400 });
    }

    // Buscar ideas relevantes
    const ideasRelevantes = ideasDatabase
      .filter(idea => 
        idea.quote.toLowerCase().includes(pregunta.toLowerCase().split(' ')[0]) ||
        pregunta.toLowerCase().includes(idea.primaryTag.toLowerCase())
      )
      .slice(0, 3);

    // Construir prompt para Claude
    const prompt = idioma === 'es' 
      ? `Eres Séneca, el filósofo estoico. Un discípulo te escribe con esta pregunta o situación:

"${pregunta}"

Basándote en la filosofía estoica, tus cartas a Lucilio, y estas ideas relevantes:
${ideasRelevantes.map(i => `- ${i.author}: "${i.quote}"`).join('\n')}

Responde como lo haría Séneca: con sabiduría, compasión y referencias a tus enseñanzas. Sé profundo pero accesible. La respuesta debe ser un párrafo o dos, no una carta completa.`
      : `You are Seneca, the Stoic philosopher. A disciple writes to you with this question or situation:

"${pregunta}"

Based on Stoic philosophy, your letters to Lucilius, and these relevant ideas:
${ideasRelevantes.map(i => `- ${i.author}: "${i.quote}"`).join('\n')}

Respond as Seneca would: with wisdom, compassion, and references to your teachings. Be profound but accessible. The response should be a paragraph or two, not a complete letter.`;

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