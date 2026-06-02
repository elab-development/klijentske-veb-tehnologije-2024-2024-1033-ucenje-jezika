export interface ArtBlocksRaw {
  tokenID: number | string;
  project_id?: number | string;
  name?: string;
  artist?: string;
  collection_name?: string;
  project_name?: string;
  image?: string | null;
  animation_url?: string | null;
  external_url?: string | null;
}

export interface DigitalArt {
  id: string;
  title: string;
  collectionName: string;
  artist?: string;
  imageUrl?: string;
  htmlUrl?: string;
  sourceUrl?: string;
}

export class DigitalArtItem implements DigitalArt {
  id: string;
  title: string;
  collectionName: string;
  artist?: string;
  imageUrl?: string;
  htmlUrl?: string;
  sourceUrl?: string;

  constructor(raw: ArtBlocksRaw) {
    const id = String(raw.tokenID);
    this.id = id;

    const project = raw.project_name || raw.collection_name || 'Art Blocks';
    this.collectionName = project;

    const fallbackTitle = raw.name || `Token #${id}`;
    this.title = fallbackTitle;

    this.artist = raw.artist || undefined;

    this.imageUrl = raw.image || undefined;
    this.htmlUrl = raw.animation_url || undefined;

    this.sourceUrl = `https://www.artblocks.io/token/${id}`;
  }
}
