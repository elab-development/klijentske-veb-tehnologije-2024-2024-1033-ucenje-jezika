export interface LatLng {
  lat: number;
  lng: number;
}

export interface PlaceInfo {
  city?: string;
  region?: string;
  country?: string;
  formattedAddress?: string;
}

export interface SelectedLocation extends LatLng, PlaceInfo {
  placeId?: string;
  label?: string;
}
