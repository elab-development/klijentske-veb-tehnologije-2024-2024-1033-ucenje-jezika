export type TracksFilters = {
  location?: string | null;
  type?: string | null;
  difficulty?: string | null;
};

const STORAGE_KEY = 'hiketrack.tracks.filters.v1';

export function readFiltersFromStorage(): TracksFilters | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TracksFilters;
    return parsed ?? null;
  } catch {
    return null;
  }
}

export function writeFiltersToStorage(filters: TracksFilters): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {}
}

export function clearFiltersFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
