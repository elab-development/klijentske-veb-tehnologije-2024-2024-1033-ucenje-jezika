import { type IUser } from '../types/user';
import { weakHash } from '../lib/hash';

export class User implements IUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string | undefined;
  passwordHash: string;
  createdAt: string;

  private constructor(props: IUser) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.email = props.email.toLowerCase();
    this.phone = props.phone;
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
  }

  static create(params: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
  }): User {
    return new User({
      id: crypto.randomUUID(),
      fullName: params.fullName.trim(),
      email: params.email.trim().toLowerCase(),
      phone: params.phone?.trim(),
      passwordHash: weakHash(params.password),
      createdAt: new Date().toISOString(),
    });
  }

  static fromPlain(data: IUser) {
    return new User(data);
  }

  verifyPassword(raw: string) {
    return this.passwordHash === weakHash(raw);
  }
}
