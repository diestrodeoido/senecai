#!/usr/bin/env node
// One-off migration: lifts the hardcoded `piezas` object out of app/page.tsx and
// `ideasDatabase`/`cartasEmailsFragments` out of app/api/buzon/route.ts, and writes
// them out as content/cartas/*.md, content/emails/*.md, content/knowledge/*.json.
//
// AST-based (not regex) because the prose contains quotes/colons/apostrophes that
// would make regex extraction fragile. Kept in the repo after running as a template
// for any future bulk-import.
//
// Usage: node scripts/migrate-content.mjs

import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const traverse = _traverse.default ?? _traverse;
const generate = _generate.default ?? _generate;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const MONTHS_ES = {
  enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
  julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
};

function slugify(str) {
  return str
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function fechaToISO(fecha) {
  const m = fecha.match(/(\d{1,2}) de (\w+) de (\d{4})/i);
  if (!m) throw new Error(`Unrecognized fecha format: "${fecha}"`);
  const [, day, monthName, year] = m;
  const month = MONTHS_ES[monthName.toLowerCase()];
  if (!month) throw new Error(`Unknown Spanish month: "${monthName}"`);
  return `${year}-${month}-${day.padStart(2, '0')}`;
}

// Extract a top-level `const <name> = ...;` initializer from a source file's AST
// and materialize it into a real JS value.
function extractConst(sourceCode, filename, varName) {
  const ast = parse(sourceCode, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  let found = null;
  traverse(ast, {
    VariableDeclarator(nodePath) {
      if (nodePath.node.id.type === 'Identifier' && nodePath.node.id.name === varName) {
        found = nodePath.node.init;
      }
    },
  });

  if (!found) {
    throw new Error(`Could not find "const ${varName} = ..." in ${filename}`);
  }

  const { code } = generate(found);
  // Safe here: one-time script run over our own trusted local source, not user input.
  return new Function(`return (${code});`)();
}

function writePieceFiles(pieces, dirName, warnings) {
  const outDir = path.join(ROOT, 'content', dirName);
  for (const piece of pieces) {
    const slug = slugify(piece.titulo.es);
    const iso = fechaToISO(piece.fecha);
    const num = String(piece.id).padStart(2, '0');
    const frontmatter = [
      '---',
      `id: ${piece.id}`,
      `slug: ${slug}`,
      `titleEs: ${JSON.stringify(piece.titulo.es)}`,
      `titleEn: ${JSON.stringify(piece.titulo.en)}`,
      `date: "${iso}"`,
      '---',
      '',
    ].join('\n');
    const body = `${piece.contenido.es.trim()}\n\n<!--en-->\n\n${piece.contenido.en.trim()}\n`;
    const filePath = path.join(outDir, `${num}-${slug}.md`);
    fs.writeFileSync(filePath, frontmatter + body, 'utf8');
    console.log(`  wrote ${path.relative(ROOT, filePath)}`);
  }

  // Surface Carta/Email title drift for the same id, without auto-fixing it.
  if (dirName === 'emails' && warnings) {
    for (const p of pieces) {
      const carta = warnings.cartasByid.get(p.id);
      if (carta && carta.titulo.es !== p.titulo.es) {
        console.warn(
          `⚠ id ${p.id}: Carta title "${carta.titulo.es}" vs Email title "${p.titulo.es}" — ` +
          `confirm intended, both preserved verbatim in their own files.`
        );
      }
    }
  }
}

function main() {
  console.log('Extracting content from app/page.tsx ...');
  const pageSource = fs.readFileSync(path.join(ROOT, 'app/page.tsx'), 'utf8');
  const piezas = extractConst(pageSource, 'app/page.tsx', 'piezas');

  console.log(`Found ${piezas.cartas.length} cartas, ${piezas.emails.length} emails.`);

  const cartasById = new Map(piezas.cartas.map((c) => [c.id, c]));
  writePieceFiles(piezas.cartas, 'cartas', null);
  writePieceFiles(piezas.emails, 'emails', { cartasByid: cartasById });

  console.log('\nExtracting knowledge database from app/api/buzon/route.ts ...');
  const routeSource = fs.readFileSync(path.join(ROOT, 'app/api/buzon/route.ts'), 'utf8');
  const ideasDatabase = extractConst(routeSource, 'app/api/buzon/route.ts', 'ideasDatabase');
  const cartasEmailsFragments = extractConst(routeSource, 'app/api/buzon/route.ts', 'cartasEmailsFragments');

  const quotes = ideasDatabase.map((q, i) => ({ id: i + 1, ...q }));
  const fragments = cartasEmailsFragments.map((f, i) => ({ id: i + 1, ...f }));

  const quotesPath = path.join(ROOT, 'content/knowledge/quotes.json');
  const fragmentsPath = path.join(ROOT, 'content/knowledge/fragments.json');
  fs.writeFileSync(quotesPath, JSON.stringify(quotes, null, 2) + '\n', 'utf8');
  fs.writeFileSync(fragmentsPath, JSON.stringify(fragments, null, 2) + '\n', 'utf8');
  console.log(`  wrote ${path.relative(ROOT, quotesPath)} (${quotes.length} rows)`);
  console.log(`  wrote ${path.relative(ROOT, fragmentsPath)} (${fragments.length} rows)`);

  console.log('\nDone.');
}

main();
