import type { IEvent } from '../types';

export class EventEntity implements IEvent {
  id!: string;
  title!: string;
  type!: IEvent['type'];
  datetime!: string;
  venue!: IEvent['venue'];
  artistIds!: string[];
  priceFrom?: number | undefined;
  imageUrl?: string | undefined;
  externalIds?: IEvent['externalIds'];
  description?: string | undefined;

  constructor(data: IEvent) {
    Object.assign(this, data);
  }

  isUpcoming(ref: Date = new Date()) {
    return new Date(this.datetime).getTime() > ref.getTime();
  }

  formattedDate(locale = navigator.language) {
    try {
      return new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(this.datetime));
    } catch {
      return this.datetime;
    }
  }
}
