export type RentalType = 'apartment' | 'house' | 'office';

export interface Location {
  city: string;
  country: string;
  address: string;
}

export interface Rental {
  id: string;
  name: string;
  location: Location;
  description: string;
  price: number;
  type: RentalType;

  mainImageUrl?: string | null;
  galleryUrls?: (string | null)[];
}
