// The Art Institute of Chicago

export interface AicArtworkApi {
  id: number;
  title: string;
  artist_title: string | null;
  artist_display: string | null;
  date_display: string | null;
  department_title: string | null;
  artwork_type_title: string | null;
  image_id: string | null;
  is_public_domain: boolean;
  api_link: string;
  thumbnail?: { lqip?: string | null } | null;
}

export interface AicListResponse {
  data: AicArtworkApi[];
  config: { iiif_url: string; website_url: string };
  pagination?: {
    total?: number;
    limit?: number;
    current_page?: number;
    total_pages?: number;
  };
}

export interface TraditionalArt {
  id: number;
  title: string;
  artist: string;
  category: string;
  dateText: string;
  yearRange?: [number, number];
  culture?: string;
  medium?: string;
  dimensions?: string;
  department?: string;
  tags: string[];
  imageLarge?: string;
  imageSmall?: string;
  sourceUrl?: string;
  publicDomain: boolean;
}

export class AicArtItem implements TraditionalArt {
  id: number;
  title: string;
  artist: string;
  category: string;
  dateText: string;
  yearRange?: [number, number];
  culture?: string;
  medium?: string;
  dimensions?: string;
  department?: string;
  tags: string[];
  imageLarge?: string;
  imageSmall?: string;
  sourceUrl?: string;
  publicDomain: boolean;

  constructor(api: AicArtworkApi, iiifBase: string) {
    this.id = api.id;
    this.title = api.title || 'Untitled';
    this.artist = (api.artist_title || 'Unknown artist').trim();
    this.category = api.artwork_type_title || api.department_title || 'Unknown';
    this.dateText = api.date_display || '';
    this.department = api.department_title || undefined;
    this.tags = [];

    if (api.image_id) {
      this.imageLarge = `${iiifBase}/${api.image_id}/full/843,/0/default.jpg`;
      this.imageSmall = `${iiifBase}/${api.image_id}/full/400,/0/default.jpg`;
    }

    const idStr = String(api.id);
    this.sourceUrl = `https://www.artic.edu/artworks/${idStr}`;

    this.publicDomain = !!api.is_public_domain;
  }
}
