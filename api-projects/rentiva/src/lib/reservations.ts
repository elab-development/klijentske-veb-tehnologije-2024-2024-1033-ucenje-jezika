export interface Reservation {
  id: string;
  rentalId: string;
  userName: string;
  datetime: string;
}

const KEY = 'rentivu:reservations';

function readAll(): Reservation[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as Reservation[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeAll(list: Reservation[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function listReservationsFor(rentalId: string): Reservation[] {
  return readAll()
    .filter((r) => r.rentalId === rentalId)
    .sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );
}

export function addReservation(newRes: Omit<Reservation, 'id'>): Reservation {
  const all = readAll();
  const id = crypto.randomUUID();
  const res: Reservation = { id, ...newRes };
  all.push(res);
  writeAll(all);
  return res;
}

export function hasConflict(rentalId: string, isoDateTime: string): boolean {
  const all = readAll();
  return all.some((r) => r.rentalId === rentalId && r.datetime === isoDateTime);
}
