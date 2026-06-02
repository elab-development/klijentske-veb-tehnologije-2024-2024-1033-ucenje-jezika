export function getFavoriteIds(): string[] {
  try {
    const raw = localStorage.getItem('pixel_favorites');
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

export function setFavoriteIds(ids: string[]) {
  localStorage.setItem(
    'pixel_favorites',
    JSON.stringify([...new Set(ids.map(String))])
  );
}

export function isFavoriteId(id: string): boolean {
  const list = getFavoriteIds();
  return list.includes(String(id));
}

export function toggleFavoriteId(id: string): boolean {
  const s = String(id);
  const list = getFavoriteIds();
  const idx = list.indexOf(s);
  if (idx >= 0) {
    list.splice(idx, 1);
    setFavoriteIds(list);
    return false;
  } else {
    list.push(s);
    setFavoriteIds(list);
    return true;
  }
}
