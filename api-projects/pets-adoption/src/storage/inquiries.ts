import { Inquiry } from '../models/Inquiry';
import type { InquiryJSON, NewInquiry } from '../domain/inquiry';

const STORAGE_KEY = 'paws&friends_inquiries';

function readRaw(): InquiryJSON[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as InquiryJSON[]) : [];
  } catch {
    return [];
  }
}

function writeRaw(list: InquiryJSON[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

export function getAllInquiries(): Inquiry[] {
  return readRaw().map(Inquiry.fromJSON);
}

export function getInquiriesByPet(petId: string): Inquiry[] {
  return getAllInquiries().filter((i) => i.petId === petId);
}

export function addInquiry(input: NewInquiry): Inquiry {
  const created = Inquiry.create(input);
  const all = readRaw();
  all.unshift(created.toJSON());
  writeRaw(all);
  return created;
}

export function removeInquiry(id: string): void {
  const all = readRaw().filter((i) => i.id !== id);
  writeRaw(all);
}

export function clearInquiries(): void {
  writeRaw([]);
}

export function subscribeInquiries(onChange: () => void): () => void {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}
