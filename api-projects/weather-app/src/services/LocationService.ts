import type { SelectedLocation } from '../types/location';

export class LocationService {
  static async reverseGeocode(
    lat: number,
    lng: number
  ): Promise<Partial<SelectedLocation>> {
    const g = (window as any).google;
    if (!g?.maps?.Geocoder) return {};
    const geocoder = new g.maps.Geocoder();

    const resp = await geocoder
      .geocode({ location: { lat, lng } })
      .catch(() => null);
    const results = resp?.results || [];
    if (!results.length) return {};

    const best = results[0];
    const parts = new Map<string, string>();
    for (const comp of best.address_components) {
      for (const t of comp.types) parts.set(t, comp.long_name);
    }

    const city =
      parts.get('locality') ||
      parts.get('postal_town') ||
      parts.get('sublocality') ||
      parts.get('administrative_area_level_2');
    const region = parts.get('administrative_area_level_1');
    const country = parts.get('country');

    return {
      city: city || undefined,
      region: region || undefined,
      country: country || undefined,
      formattedAddress: best.formatted_address,
      label: city || region || country || best.formatted_address,
      placeId: best.place_id,
    };
  }
}
