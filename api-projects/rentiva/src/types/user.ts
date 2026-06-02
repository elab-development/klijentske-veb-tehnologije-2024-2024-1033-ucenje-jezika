export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  passwordHash: string;
  createdAt: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface IAuthState {
  currentUser: IUser | null;
  users: IUser[];
}
