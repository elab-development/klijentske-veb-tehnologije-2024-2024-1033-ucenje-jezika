const DM_ENDPOINT = 'https://api.datamuse.com';

type DMWord = { word: string; score?: number; tags?: string[] };

async function dm(path: string, params: Record<string, string | number>) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${DM_ENDPOINT}${path}?${qs}`);
  if (!res.ok) throw new Error(`Datamuse error: ${res.status}`);
  return (await res.json()) as DMWord[];
}

function clean(w: string) {
  return w.trim().toLowerCase();
}
function isOkWord(w: string) {
  return /^[a-z]+$/.test(w) && w.length >= 3 && w.length <= 12;
}
function pickUnique<T>(
  arr: T[],
  n: number,
  exclude = new Set<string>(),
  key = (x: any) => String(x)
) {
  const out: T[] = [];
  for (const item of arr) {
    if (out.length >= n) break;
    const k = key(item);
    if (!exclude.has(k)) {
      exclude.add(k);
      out.push(item);
    }
  }
  return out;
}

export type Player = 'red' | 'blue';
export interface ClueCell {
  id: string;
  text: string;
  revealed: boolean;
}
export interface Column {
  id: string;
  clues: ClueCell[];
  solution: string;
  revealed: boolean;
}
export interface Board {
  id: string;
  columns: Column[];
  finalSolution: string;
}

const FINAL_SEEDS = [
  'nature',
  'music',
  'energy',
  'ocean',
  'mountain',
  'space',
  'light',
  'history',
  'festival',
  'science',
  'garden',
  'technique',
  'bridge',
  'film',
  'puzzle',
];

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

async function relatedWords(seed: string, limit = 30): Promise<string[]> {
  const [ml, trg] = await Promise.all([
    dm('/words', { ml: seed, max: limit }),
    dm('/words', { rel_trg: seed, max: limit }),
  ]);
  const merged = [...ml, ...trg].map((x) => clean(x.word)).filter(isOkWord);

  return Array.from(new Set(merged));
}

async function buildColumn(
  solution: string,
  taken: Set<string>
): Promise<Column | null> {
  const pool = await relatedWords(solution, 60);
  const candidates = pool.filter((w) => w !== solution && !taken.has(w));

  const sorted = candidates.sort(
    (a, b) => Math.abs(6 - a.length) - Math.abs(6 - b.length)
  );
  const clues = pickUnique(sorted, 4, taken);

  if (clues.length < 4) return null;

  return {
    id: uid('col'),
    clues: clues.map((text) => ({ id: uid('clue'), text, revealed: false })),
    solution,
    revealed: false,
  };
}

export async function generateBoard(): Promise<Board> {
  const taken = new Set<string>();

  const finalSolution =
    FINAL_SEEDS[Math.floor(Math.random() * FINAL_SEEDS.length)];
  taken.add(finalSolution);

  const colSeedsPool = (await relatedWords(finalSolution, 100))
    .filter((w) => !taken.has(w))
    .slice(0, 40);

  const columnSolutions = pickUnique(colSeedsPool, 4, taken);
  if (columnSolutions.length < 4) {
    throw new Error('Could not find enough column solutions. Try again.');
  }

  const columns: Column[] = [];
  for (const sol of columnSolutions) {
    const col = await buildColumn(sol, taken);
    if (!col) {
      const nextSeed = colSeedsPool.find(
        (w) => !taken.has(w) && !columnSolutions.includes(w)
      );
      if (!nextSeed) throw new Error('Not enough clues for a column.');
      const retry = await buildColumn(nextSeed, taken);
      if (!retry)
        throw new Error('Not enough clues for a column (retry failed).');
      columns.push(retry);
    } else {
      columns.push(col);
    }
  }

  return {
    id: uid('board'),
    columns,
    finalSolution,
  };
}
