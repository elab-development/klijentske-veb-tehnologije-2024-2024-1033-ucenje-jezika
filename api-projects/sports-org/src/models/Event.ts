import {
  type Event as EventType,
  type Location,
  type Team,
} from '../types/event';

export class Event implements EventType {
  id!: string;
  title!: string;
  description!: string;
  sport!: string;
  location!: Location;
  date!: string;
  time!: string;
  teams!: Team[];
  lat?: number;
  lng?: number;

  constructor(data: EventType) {
    Object.assign(this, data);
  }

  get formattedDate() {
    return new Date(this.date).toLocaleDateString();
  }

  get formattedTime() {
    return this.time;
  }
}

export class TeamClass implements Team {
  name: string;
  players: string[];

  constructor(name: string, players: string[]) {
    this.name = name;
    this.players = players;
  }

  get playerCount() {
    return this.players.length;
  }
}
