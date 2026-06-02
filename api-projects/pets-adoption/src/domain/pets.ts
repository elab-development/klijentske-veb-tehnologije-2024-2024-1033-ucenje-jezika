export type Category = 'dog' | 'cat' | 'rabbit' | 'bird';

export type Size = 'small' | 'medium' | 'large';

export type Sex = 'male' | 'female';

export type AdoptionStatus = 'available' | 'pending' | 'adopted';

export interface IPet {
  id: string;
  name: string;
  description: string;
  ageYears: number;
  category: Category;
  breed?: string;
  sex: Sex;
  size: Size;
  weightKg?: number;
  location: string;
  goodWith?: {
    children?: boolean;
    dogs?: boolean;
    cats?: boolean;
  };
  vaccinated?: boolean;
  neutered?: boolean;
  microchipped?: boolean;
  status: AdoptionStatus;
}
