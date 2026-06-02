import { LocalStore } from './storage';
import {
  type IAuthState,
  type ICredentials,
  type IRegisterPayload,
  type IUser,
} from '../types/user';
import { User } from '../models/User';

const LS_USERS = 'users';
const LS_AUTH = 'auth';

const seedUsersPlain = [
  {
    fullName: 'Petar Petrović',
    email: 'petar@example.com',
    password: 'petar123',
  },
  { fullName: 'Mina Marin', email: 'mina@example.com', password: 'mina123' },
  { fullName: 'Jovana Jović', email: 'jovana@example.com', password: 'jovana' },
  { fullName: 'Marko Marković', email: 'marko@example.com', password: 'marko' },
];

export class AuthManager {
  private store = new LocalStore();

  bootstrap() {
    const existing = this.store.get<IUser[]>(LS_USERS, []);
    if (!existing || existing.length === 0) {
      const seeded = seedUsersPlain.map((u) =>
        User.create({
          fullName: u.fullName,
          email: u.email,
          password: u.password,
        })
      );
      this.store.set<IUser[]>(LS_USERS, seeded);
    }
    const auth = this.store.get<IAuthState>(LS_AUTH, {
      currentUser: null,
      users: this.getUsers(),
    });
    auth.users = this.getUsers();
    this.store.set<IAuthState>(LS_AUTH, auth);
    return auth;
  }

  getUsers(): IUser[] {
    return this.store.get<IUser[]>(LS_USERS, []);
  }

  setUsers(users: IUser[]) {
    this.store.set<IUser[]>(LS_USERS, users);
    const auth = this.getAuthState();
    this.store.set<IAuthState>(LS_AUTH, { ...auth, users });
  }

  getAuthState(): IAuthState {
    return this.store.get<IAuthState>(LS_AUTH, {
      currentUser: null,
      users: this.getUsers(),
    });
  }

  private setAuthState(next: IAuthState) {
    this.store.set<IAuthState>(LS_AUTH, next);
    return next;
  }

  login(creds: ICredentials): IAuthState {
    const users = this.getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === creds.email.toLowerCase()
    );
    if (!found) throw new Error('Korisnik ne postoji');
    const user = User.fromPlain(found);
    if (!user.verifyPassword(creds.password))
      throw new Error('Pogrešna lozinka');
    return this.setAuthState({ currentUser: found, users });
  }

  logout(): IAuthState {
    return this.setAuthState({ currentUser: null, users: this.getUsers() });
  }

  register(payload: IRegisterPayload): IAuthState {
    const users = this.getUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );
    if (exists) throw new Error('Email je već registrovan');
    const newUser = User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
    });
    const nextUsers = [...users, newUser];
    this.setUsers(nextUsers);
    return this.setAuthState({ currentUser: newUser, users: nextUsers });
  }
}

export const authManager = new AuthManager();
