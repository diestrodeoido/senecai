export const textos = {
  es: {
    home: {
      titulo: "SenecAI",
      subtitulo: "Continuando la conversación con Séneca",
      introduccion: "Mientras escuchaba una clase sobre una de las Cartas de Séneca a Lucilio, me pregunté: ¿existirán esas cartas que enviaba Lucilio o todo era parte del arsenal literario de Séneca? Luego entendí que esto no importaba. Lo que importaba eran las enormes lecciones de vida que hay en estos textos. Y no se me ocurrió mejor forma para aprender sobre esto que continuar la conversación con Séneca, porque todos somos Lucilio, pero también podemos ser de vez en cuando, Séneca.",
      botones: { cartas: "Cartas", emails: "Emails", buzon: "Buzón" }
    },
    about: {
      titulo: "Sobre Luisilio",
      contenidoPre: "Filósofo sin academia, empresario sin ambiciones, mente con cuerpo. Empecé escribiendo en mi blog ",
      contenidoLinkText: "Diestro de Oído",
      contenidoPost: ", pero necesitaba un carril para avanzar derecho, y lo encontré en las cartas de Séneca que escribió para mi, pero también para ti.",
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
      contenidoPre: "Philosopher without academy, entrepreneur without ambitions, mind with body. I started writing on my blog ",
      contenidoLinkText: "Diestro de Oído",
      contenidoPost: ", but I needed a path to move straight ahead, and I found it in Seneca's letters that he wrote for me, but also for you.",
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
} as const;

export type Idioma = keyof typeof textos;

export function useTextos(idioma: Idioma) {
  return textos[idioma];
}
