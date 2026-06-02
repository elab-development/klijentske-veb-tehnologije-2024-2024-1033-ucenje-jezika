import { Loader } from '@googlemaps/js-api-loader';
import type { ICatCafe, ICatCafeDetails } from '../../types/cafe';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  version: 'weekly',
  libraries: ['places'],
});

export async function fetchCatCafesByCity(city: string): Promise<{
  cafes: ICatCafe[];
  nextPage?: (cb: (cafes: ICatCafe[]) => void) => void;
}> {
  const google = await loader.load();
  const svc = new google.maps.places.PlacesService(
    document.createElement('div')
  );

  const req: google.maps.places.TextSearchRequest = {
    query: `cat cafe in ${city}`,
    type: 'cafe',
  };

  return new Promise((resolve, reject) => {
    svc.textSearch(req, (res, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && res) {
        const cafes = res.map((r) => ({
          id: r.place_id!,
          name: r.name ?? 'Unknown',
          address: r.formatted_address ?? '',
          lat: r.geometry?.location?.lat() ?? 0,
          lng: r.geometry?.location?.lng() ?? 0,
          rating: r.rating,
          ratingsCount: r.user_ratings_total,
          photoUrl: r.photos?.[0]?.getUrl({ maxWidth: 1200 }),
        }));

        const nextPage =
          pagination && pagination.hasNextPage
            ? (cb: (cafes: ICatCafe[]) => void) =>
                setTimeout(() => {
                  pagination.nextPage();
                  svc.textSearch(req, (res2, status2) => {
                    if (
                      status2 === google.maps.places.PlacesServiceStatus.OK &&
                      res2
                    ) {
                      const more = res2.map((r) => ({
                        id: r.place_id!,
                        name: r.name ?? 'Unknown',
                        address: r.formatted_address ?? '',
                        lat: r.geometry?.location?.lat() ?? 0,
                        lng: r.geometry?.location?.lng() ?? 0,
                        rating: r.rating,
                        ratingsCount: r.user_ratings_total,
                        photoUrl: r.photos?.[0]?.getUrl({ maxWidth: 1200 }),
                      }));
                      cb(more);
                    }
                  });
                }, 2000)
            : undefined;

        resolve({ cafes, nextPage });
      } else if (
        status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
      ) {
        resolve({ cafes: [] });
      } else {
        reject(new Error(status));
      }
    });
  });
}

export async function fetchCafeDetails(
  placeId: string
): Promise<ICatCafeDetails> {
  const google = await loader.load();
  const svc = new google.maps.places.PlacesService(
    document.createElement('div')
  );

  const req: google.maps.places.PlaceDetailsRequest = {
    placeId,
    fields: [
      'place_id',
      'name',
      'formatted_address',
      'geometry',
      'rating',
      'user_ratings_total',
      'formatted_phone_number',
      'opening_hours',
      'website',
      'photos',
    ],
  };

  return new Promise((resolve, reject) => {
    svc.getDetails(req, (res, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && res) {
        console.log('Fetched cafe details:', res);

        const cafeDetails: ICatCafeDetails = {
          id: res.place_id!,
          name: res.name ?? 'Unknown',
          address: res.formatted_address ?? '',
          lat: res.geometry?.location?.lat() ?? 0,
          lng: res.geometry?.location?.lng() ?? 0,
          rating: res.rating,
          ratingsCount: res.user_ratings_total,
          phoneNumber: res.formatted_phone_number,
          website: res.website,
          openingHours: res.opening_hours?.weekday_text ?? [],
          photos: res.photos?.map((p) => p.getUrl({ maxWidth: 1200 })),
        };
        resolve(cafeDetails);
      } else {
        reject(new Error(status));
      }
    });
  });
}
