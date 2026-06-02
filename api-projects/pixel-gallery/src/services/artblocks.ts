import type { ArtBlocksRaw } from '../models/artblocks';
import { DigitalArtItem, type DigitalArt } from '../models/artblocks';

const TOKEN_BASE = 'https://token.artblocks.io';

export async function fetchArtBlocksToken(
  tokenId: number | string
): Promise<DigitalArt | null> {
  const url = `${TOKEN_BASE}/${tokenId}`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const raw = (await res.json()) as ArtBlocksRaw;

  if (!raw.tokenID) raw.tokenID = tokenId;

  const item = new DigitalArtItem(raw);
  if (!item.imageUrl && !item.htmlUrl) return null;
  return item;
}

export async function fetchArtBlocksBatch(
  tokenIds: Array<number | string>
): Promise<DigitalArt[]> {
  const results = await Promise.all(
    tokenIds.map((id) => fetchArtBlocksToken(id))
  );
  return results.filter((x): x is DigitalArt => !!x);
}
