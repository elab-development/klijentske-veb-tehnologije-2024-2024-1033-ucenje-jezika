export class LocalStore {
  private prefix: string;
  constructor(prefix = 'rentivu') {
    this.prefix = prefix;
  }

  private key(k: string) {
    return `${this.prefix}:${k}`;
  }

  get<T>(k: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(this.key(k));
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  set<T>(k: string, v: T) {
    localStorage.setItem(this.key(k), JSON.stringify(v));
  }

  remove(k: string) {
    localStorage.removeItem(this.key(k));
  }
}
