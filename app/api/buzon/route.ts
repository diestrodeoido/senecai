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

    // Buscar en Ideas Database
    const ideasRelevantes = getQuotes()
      .map(idea => ({
        ...idea,
        relevance: palabrasClave.filter((p: string) =>
          idea.quote.toLowerCase().includes(p) ||
          idea.primaryTag.toLowerCase().includes(p)
        ).length
      }))
      .filter(idea => idea.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3)
      .map(({ relevance, ...rest }) => rest);

    // Buscar en Cartas/Emails
    const cartasRelevantes = getFragments()
      .map(item => ({
        ...item,
        relevance: palabrasClave.filter((p: string) => item.excerpt.toLowerCase().includes(p) || item.tags.toLowerCase().includes(p)).length
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
