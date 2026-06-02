import type { IReservation } from '../../types/reservation';

export class ReservationManager {
  private storageKey = 'catcaffe.reservations';

  private loadAll(): IReservation[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  private saveAll(list: IReservation[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  listByCafe(cafeId: string): IReservation[] {
    return this.loadAll().filter((r) => r.cafeId === cafeId);
  }

  add(cafeId: string, date: string, time: string): IReservation {
    const all = this.loadAll();
    const id = (
      crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
    ).toString();

    const res: IReservation = { id, cafeId, date, time };
    all.push(res);
    this.saveAll(all);
    return res;
  }

  cancel(id: string): boolean {
    const before = this.loadAll();
    const after = before.filter((r) => r.id !== id);
    this.saveAll(after);
    return after.length < before.length;
  }
}
