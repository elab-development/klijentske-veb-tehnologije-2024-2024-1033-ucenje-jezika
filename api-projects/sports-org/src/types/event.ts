export interface Location {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Team {
  name: string;
  players: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  sport: string;
  date: string;
  time: string;
  location: Location;
  teams: Team[];
}
