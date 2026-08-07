export function formatFecha(iso: string, idioma: 'es' | 'en'): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(idioma === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
