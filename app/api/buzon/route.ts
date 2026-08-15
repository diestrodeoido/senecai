import { Anthropic } from '@anthropic-ai/sdk';
import { getQuotes, getFragments } from '@/lib/knowledge';
import { checkRateLimit } from '@/lib/rateLimit';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_PREGUNTA_LENGTH = 1000;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ error: 'Demasiadas preguntas. Intenta de nuevo en un momento.' }),
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const { pregunta, idioma } = await request.json();

    if (!pregunta || typeof pregunta !== 'string' || !pregunta.trim()) {
      return new Response(JSON.stringify({ error: "Pregunta requerida" }), { status: 400 });
    }

    if (pregunta.length > MAX_PREGUNTA_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Pregunta demasiado larga (máximo ${MAX_PREGUNTA_LENGTH} caracteres).` }),
        { status: 400 }
      );
    }

    // Búsqueda mejorada de relevancia
    const preguntaLower = pregunta.toLowerCase();
    const palabrasClave = preguntaLower.split(/\s+/).filter((p: string) => p.length > 3);

    const quotesRelevantes = getQuotes()
      .map(idea => ({
        ...idea,
        relevance: palabrasClave.filter((p: string) =>
          idea.quote.toLowerCase().includes(p) ||
          idea.primaryTag.toLowerCase().includes(p)
        ).length
      }))
      .filter(idea => idea.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    // Prioridad 1: palabras del propio Séneca
    const senecaRelevante = quotesRelevantes
      .filter(q => q.author === 'Seneca')
      .slice(0, 3)
      .map(({ relevance, ...rest }) => rest);

    // Prioridad 2: otros pensadores, solo para complementar
    const otrosRelevante = quotesRelevantes
      .filter(q => q.author !== 'Seneca')
      .slice(0, 2)
      .map(({ relevance, ...rest }) => rest);

    // Prioridad 3: tus propias Cartas/Emails, como último recurso.
    // Dentro de esta prioridad, prefiere Emails (tus propias palabras a Lucilio);
    // recurre a Cartas (las de tu discípulo hacia ti) solo si no hay suficientes Emails relevantes.
    const fragmentosOrdenados = getFragments()
      .map(item => ({
        ...item,
        relevance: palabrasClave.filter((p: string) => item.excerpt.toLowerCase().includes(p) || item.tags.toLowerCase().includes(p)).length
      }))
      .filter(item => item.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    const emailFragments = fragmentosOrdenados.filter(f => f.source.startsWith('Email'));
    const cartaFragments = fragmentosOrdenados.filter(f => f.source.startsWith('Carta'));

    const fragmentosRelevantes = [...emailFragments, ...cartaFragments]
      .slice(0, 2)
      .map(({ relevance, ...rest }) => rest);

    const NINGUNA_ES = '(ninguna especialmente relevante para esta pregunta)';
    const NONE_EN = '(none especially relevant to this question)';

    const fuentesSeneca = senecaRelevante.map(q => `- "${q.quote}"`).join('\n');
    const fuentesOtros = otrosRelevante.map(q => `- ${q.author}: "${q.quote}"`).join('\n');
    const fuentesFragmentos = fragmentosRelevantes.map(f => `- ${f.source}: "${f.excerpt}"`).join('\n');

    const prompt = idioma === 'es'
      ? `Eres Séneca, el filósofo estoico. Un discípulo te escribe con esta pregunta:

"${pregunta}"

Responde siempre en tu propia voz, con sabiduría y compasión. Apóyate en las siguientes fuentes, en este estricto orden de prioridad:

1. Tus propias palabras y enseñanzas (máxima prioridad — parte siempre de aquí):
${fuentesSeneca || NINGUNA_ES}

2. Ideas de otros pensadores (úsalas solo para complementar o dar matiz a tus propias ideas, nunca para contradecirlas ni citarlas como si fueran tuyas):
${fuentesOtros || NINGUNA_ES}

3. Fragmentos de tus propios Emails a tu discípulo, y solo si es realmente necesario, de sus Cartas hacia ti (último recurso, principalmente para conectar con su situación personal):
${fuentesFragmentos || NINGUNA_ES}

Reglas de estilo:
- Cuando uses una cita textual o casi textual de la sección 1 (tus propias palabras), escríbela en cursiva usando asteriscos, así: *la cita aquí*. No pongas en cursiva el resto de tu respuesta.
- No uses frases que hagan referencia explícita al acto de haber escrito algo antes, como "antes he escrito que...", "como ya dije..." o similares. Expresa la idea con naturalidad, como parte del mismo pensamiento, sin señalar que la estás citando de algún lugar.

Sé profundo pero accesible. La respuesta debe ser un párrafo o dos.`
      : `You are Seneca, the Stoic philosopher. A disciple writes to you with this question:

"${pregunta}"

Always respond in your own voice, with wisdom and compassion. Draw on the following sources, in this strict order of priority:

1. Your own words and teachings (highest priority — always start here):
${fuentesSeneca || NONE_EN}

2. Ideas from other thinkers (use only to complement or add nuance to your own ideas, never to contradict them or present them as your own):
${fuentesOtros || NONE_EN}

3. Fragments from your own Emails to your disciple, and only if truly necessary, from his Letters to you (last resort, mainly to connect with his personal situation):
${fuentesFragmentos || NONE_EN}

Style rules:
- When you use a direct or near-direct quote from section 1 (your own words), write it in italics using asterisks, like this: *the quote here*. Don't italicize the rest of your response.
- Don't use phrases that explicitly reference the act of having written something before, like "I've written before that...", "as I once said..." or similar. Express the idea naturally, as part of the same train of thought, without flagging that you're quoting it from somewhere.

Be profound but accessible. The response should be a paragraph or two.`;

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
