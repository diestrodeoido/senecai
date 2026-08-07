# Content

## Adding a new Carta or Email

1. Create a new file in `content/cartas/` or `content/emails/`, named `NN-slug.md`
   (the `NN` prefix is just for readability when browsing the folder — it isn't
   read by the app; only the `slug` frontmatter field determines the URL).
2. Frontmatter:

   ```yaml
   ---
   id: 14                          # next unused id; pairs a Carta to its Email
   slug: mi-nuevo-titulo            # becomes the URL /cartas/mi-nuevo-titulo — don't change after publishing
   titleEs: "Mi nuevo título"
   titleEn: "My New Title"
   date: "2026-08-01"               # ISO format, quoted
   ---
   ```
3. Body: Spanish text first, then a line containing only `<!--en-->`, then the
   English text. Paragraphs are separated by a blank line.
4. A Carta and its paired Email should share the same `id` (their titles don't
   have to match — Seneca's reply can have its own subject line).

## Knowledge database (`content/knowledge/`)

Used by the Buzón AI feature (`app/api/buzon/route.ts`) to ground its responses.

- `quotes.json` — quotes from Seneca and other thinkers: `{ id, author, quote, primaryTag, secondaryTag }`.
  Each quote is stored in whichever language it was originally written/translated in — it
  is not duplicated per-language.
- `fragments.json` — excerpts from the Cartas/Emails themselves: `{ id, source, excerpt, tags }`.

To add a row, append an object to the array with the next unused `id`. Keep `id`s
stable once published — they're just for readability in diffs, not referenced
elsewhere, but reusing one makes history confusing.

The Buzón prompt treats these in strict priority order: Seneca's own quotes
first, other thinkers second (to complement, never contradict), Carta/Email
fragments last (mainly for personal continuity). See `app/api/buzon/route.ts`.

## Regenerating from scratch

`scripts/migrate-content.mjs` was a one-time script that produced this `content/`
tree from the original hardcoded data in `app/page.tsx` / `app/api/buzon/route.ts`.
It's kept as a reference/template — it is not meant to be run again against the
current codebase (those hardcoded arrays no longer exist post-migration).
