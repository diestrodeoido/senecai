import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Piece = {
  id: number;
  slug: string;
  titleEs: string;
  titleEn: string;
  date: string; // ISO (YYYY-MM-DD)
  bodyEs: string;
  bodyEn: string;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function readPieces(dirName: 'cartas' | 'emails'): Piece[] {
  const dir = path.join(CONTENT_ROOT, dirName);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  const pieces = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content } = matter(raw);
    const [bodyEs, bodyEn] = content.split('<!--en-->').map((s) => s.trim());

    return {
      id: data.id,
      slug: data.slug,
      titleEs: data.titleEs,
      titleEn: data.titleEn,
      date: data.date,
      bodyEs,
      bodyEn,
    } satisfies Piece;
  });

  return pieces.sort((a, b) => a.date.localeCompare(b.date));
}

let cartasCache: Piece[] | null = null;
let emailsCache: Piece[] | null = null;

export function getAllCartas(): Piece[] {
  if (!cartasCache) cartasCache = readPieces('cartas');
  return cartasCache;
}

export function getAllEmails(): Piece[] {
  if (!emailsCache) emailsCache = readPieces('emails');
  return emailsCache;
}

export function getCartaBySlug(slug: string): Piece | undefined {
  return getAllCartas().find((c) => c.slug === slug);
}

export function getEmailBySlug(slug: string): Piece | undefined {
  return getAllEmails().find((e) => e.slug === slug);
}
