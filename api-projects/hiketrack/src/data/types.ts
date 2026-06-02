export interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
  imageUrl: string;
}

export type Difficulty = 'easy' | 'moderate' | 'hard';
export type TrailType = 'loop' | 'out-and-back' | 'point-to-point';

export interface Trail {
  id: string;
  name: string;
  locationId: string;
  description: string;
  difficulty: Difficulty;
  type: TrailType;
  distanceKm: number;
  elevationGainM: number;
  estTimeH: number;
  startLat?: number;
  startLon?: number;
  minAltM?: number;
  maxAltM?: number;
  tags?: string[];
}
