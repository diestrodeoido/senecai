import fs from 'node:fs';
import path from 'node:path';

export type Quote = {
  id: number;
  author: string;
  quote: string;
  primaryTag: string;
  secondaryTag: string;
};

export type Fragment = {
  id: number;
  source: string;
  excerpt: string;
  tags: string;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'knowledge');

let quotesCache: Quote[] | null = null;
let fragmentsCache: Fragment[] | null = null;

export function getQuotes(): Quote[] {
  if (!quotesCache) {
    quotesCache = JSON.parse(fs.readFileSync(path.join(CONTENT_ROOT, 'quotes.json'), 'utf8'));
  }
  return quotesCache!;
}

export function getFragments(): Fragment[] {
  if (!fragmentsCache) {
    fragmentsCache = JSON.parse(fs.readFileSync(path.join(CONTENT_ROOT, 'fragments.json'), 'utf8'));
  }
  return fragmentsCache!;
}
