export type EventType = 'concert' | 'festival';

export interface IArtist {
  id: string;
  name: string;
  genre?: string[];
  imageUrl?: string;
  country?: string;
  externalIds?: {
    musicbrainz?: string;
    ticketmasterAttractionId?: string;
  };
  bio?: string;
}

export interface IEvent {
  id: string;
  title: string;
  type: EventType;
  datetime: string;
  venue: { name: string; city: string; country: string };
  artistIds: string[];
  priceFrom?: number;
  imageUrl?: string;
  externalIds?: { ticketmasterEventId?: string };
  description?: string;
}

export interface IReview {
  id: string;
  targetType: 'event' | 'artist';
  targetId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  author: string;
  comment: string;
  createdAt: string;
}

export interface IReservation {
  id: string;
  eventId: string;
  name: string;
  email: string;
  qty: number;
  createdAt: string;
}
