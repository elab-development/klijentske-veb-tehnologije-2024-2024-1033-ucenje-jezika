export interface ICatCafe {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  ratingsCount?: number;
  photoUrl?: string;
}

export interface ICatCafeDetails extends ICatCafe {
  phoneNumber?: string;
  website?: string;
  openingHours?: string[];
  photos?: string[];
}
