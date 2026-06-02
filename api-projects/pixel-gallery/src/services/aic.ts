import type { AicListResponse, AicArtworkApi } from '../models/aic';
import { AicArtItem } from '../models/aic';

const AIC_BASE = 'https://api.artic.edu/api/v1';

export async function fetchAicArtworks({
  page = 1,
  limit = 100,
  fields = [
    'id',
    'title',
    'artist_title',
    'artist_display',
    'date_display',
    'department_title',
    'artwork_type_title',
    'image_id',
    'is_public_domain',
    'api_link',
    'thumbnail',
  ],
}: {
  page?: number;
  limit?: number;
  fields?: string[];
} = {}) {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));
  params.set('fields', fields.join(','));
  params.set('is_public_domain', 'true');
  params.set('has_image', 'true');

  const res = await fetch(`${AIC_BASE}/artworks?${params.toString()}`);
  if (!res.ok) throw new Error(`AIC fetch failed: ${res.status}`);
  const json = (await res.json()) as AicListResponse;

  const iiifBase = json.config?.iiif_url || 'https://www.artic.edu/iiif/2';
  const items = json.data.map(
    (it: AicArtworkApi) => new AicArtItem(it, iiifBase)
  );
  const total = json.pagination?.total ?? items.length;

  return { items, total, iiifBase };
}

export async function fetchAicBatch({
  limit = 100,
  pageSize = 100,
  startPage = 1,
}: {
  limit?: number;
  pageSize?: number;
  startPage?: number;
}) {
  const collected: AicArtItem[] = [];
  let page = startPage;

  while (collected.length < limit) {
    const { items } = await fetchAicArtworks({ page, limit: pageSize });
    if (items.length === 0) break;
    for (const it of items) {
      collected.push(it);
      if (collected.length >= limit) break;
    }
    page += 1;
  }

  return collected.slice(0, limit);
}
