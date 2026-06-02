import type { IArtist } from '../types';

export class ArtistProfile implements IArtist {
  id!: string;
  name!: string;
  genre?: string[] | undefined;
  imageUrl?: string | undefined;
  country?: string | undefined;
  externalIds?: IArtist['externalIds'];
  bio?: string | undefined;

  constructor(a: IArtist) {
    Object.assign(this, a);
  }

  matchesQuery(q: string) {
    const hay = `${this.name} ${(this.genre ?? []).join(' ')} ${
      this.country ?? ''
    }`.toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  get avatarFallback() {
    const parts = this.name.trim().split(/\s+/);
    const letters = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
    return letters.toUpperCase() || 'AR';
  }
}
