import { create } from 'zustand';
import type { SelectedLocation } from '../types/location';

type LocationState = {
  location: SelectedLocation | null;
  setLocation: (loc: SelectedLocation) => void;
};

function loadFromStorage(): SelectedLocation | null {
  try {
    const stored = localStorage.getItem('weatherapp:selectedLocation');
    return stored ? (JSON.parse(stored) as SelectedLocation) : null;
  } catch {
    return null;
  }
}

export const useLocationStore = create<LocationState>((set) => ({
  location: loadFromStorage(),

  setLocation: (loc) => {
    try {
      localStorage.setItem('weatherapp:selectedLocation', JSON.stringify(loc));
    } catch {
      console.log('Could not write to localStorage');
    }
    set({ location: loc });
  },
}));
