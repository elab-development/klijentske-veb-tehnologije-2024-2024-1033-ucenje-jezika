import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  type IAuthState,
  type ICredentials,
  type IRegisterPayload,
  type IUser,
} from '../types/user';
import { authManager } from '../lib/auth';

type AuthContextValue = {
  currentUser: IUser | null;
  users: IUser[];
  login: (c: ICredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (r: IRegisterPayload) => Promise<void>;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IAuthState>(() => authManager.bootstrap());

  const api = useMemo<AuthContextValue>(
    () => ({
      currentUser: state.currentUser,
      users: state.users,
      login: async (c) => setState(authManager.login(c)),
      logout: async () => setState(authManager.logout()),
      register: async (r) => setState(authManager.register(r)),
      refresh: () => setState(authManager.getAuthState()),
    }),
    [state]
  );

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key?.includes('rentivu:')) api.refresh();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [api]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
