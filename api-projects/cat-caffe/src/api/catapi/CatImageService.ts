import type { CatApiImage } from '../../types/catapi';

export class CatImageService {
  private base = 'https://api.thecatapi.com/v1';
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey =
      apiKey ?? (import.meta.env.VITE_CAT_API_KEY as string | undefined);
  }

  async fetchRandom(count = 6): Promise<string[]> {
    const url = new URL(`${this.base}/images/search`);
    url.searchParams.set('limit', String(count));
    url.searchParams.set('size', 'small');
    const headers: Record<string, string> = {};
    if (this.apiKey) headers['x-api-key'] = this.apiKey;

    const res = await fetch(url.toString(), { headers });
    if (!res.ok) throw new Error(`Cat API error: ${res.status}`);
    const data = (await res.json()) as CatApiImage[];

    return data.map((d) => d.url).filter(Boolean);
  }
}
