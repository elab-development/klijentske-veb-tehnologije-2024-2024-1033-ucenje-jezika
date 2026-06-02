import type { IArtist, IEvent, IReview } from './types';

export const seedArtists: IArtist[] = [
  {
    id: 'ar-1',
    name: 'Arctic Monkeys',
    genre: ['Indie Rock'],
    country: 'UK',
    imageUrl:
      'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'ar-2',
    name: 'Dua Lipa',
    genre: ['Pop'],
    country: 'UK',
    imageUrl:
      'https://images.unsplash.com/photo-1507878866276-a947ef722fee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'ar-3',
    name: 'The Weeknd',
    genre: ['R&B', 'Pop'],
    country: 'Canada',
    imageUrl:
      'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop',
  },
];

export const seedEvents: IEvent[] = [
  {
    id: 'ev-1',
    title: 'Arctic Monkeys Live',
    type: 'concert',
    datetime: '2025-09-14T20:00:00Z',
    venue: { name: 'Štark Arena', city: 'Belgrade', country: 'Serbia' },
    artistIds: ['ar-1'],
    imageUrl:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'ev-2',
    title: 'Dua Lipa Tour',
    type: 'concert',
    datetime: '2025-10-03T19:30:00Z',
    venue: { name: 'Arena Zagreb', city: 'Zagreb', country: 'Croatia' },
    artistIds: ['ar-2'],
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'ev-3',
    title: 'Summer Fest',
    type: 'festival',
    datetime: '2025-08-30T18:00:00Z',
    venue: { name: 'Petőfi Csarnok', city: 'Budapest', country: 'Hungary' },
    artistIds: ['ar-1', 'ar-2', 'ar-3'],
    imageUrl:
      'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=1200&auto=format&fit=crop',
  },
];

export const seedReviews: IReview[] = [
  {
    id: 'rv-1',
    targetType: 'event',
    targetId: 'ev-1',
    rating: 5,
    author: 'Mila',
    comment: 'Electric energy!',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rv-2',
    targetType: 'artist',
    targetId: 'ar-2',
    rating: 4,
    author: 'Nik',
    comment: 'Great vocals.',
    createdAt: new Date().toISOString(),
  },
];
