export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
}

export const users: User[] = [
  { id: 1, username: 'pera', password: '123', fullName: 'Pera Perić' },
  { id: 2, username: 'mika', password: '456', fullName: 'Mika Mikić' },
  { id: 3, username: 'ana', password: '789', fullName: 'Ana Anić' },
  { id: 4, username: 'ivan', password: '111', fullName: 'Ivan Ivanić' },
  {
    id: 5,
    username: 'sofija',
    password: '222',
    fullName: 'Stefan Stefanović',
  },
  { id: 6, username: 'luka', password: '333', fullName: 'Luka Lukić' },
];
