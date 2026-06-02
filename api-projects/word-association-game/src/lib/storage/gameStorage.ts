export type Player = 'red' | 'blue';

export type ColumnResult = {
  solution: string;
  solver?: Player;
  points: number;
};

export type GameResult = {
  id: string;
  boardId: string;
  finalSolution: string;
  finalSolver?: Player;
  scores: { red: number; blue: number };
  winner: Player | 'tie';
  columns: ColumnResult[];
  finishedAt: string;
  mode: 'api' | 'memory';
};

const STORAGE_KEY = 'wag_results';
const MAX_RESULTS_TO_KEEP = 200;

export class GameStorage {
  static list(): GameResult[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw) as GameResult[];
      if (!Array.isArray(arr)) return [];
      return arr.sort((a, b) => b.finishedAt.localeCompare(a.finishedAt));
    } catch {
      return [];
    }
  }

  static add(result: GameResult) {
    const all = GameStorage.list();
    all.unshift(result);
    const trimmed = all.slice(0, MAX_RESULTS_TO_KEEP);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  }

  static get(id: string): GameResult | undefined {
    return GameStorage.list().find((r) => r.id === id);
  }

  static remove(id: string) {
    const filtered = GameStorage.list().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  static clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function makeId(prefix = 'res'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}
