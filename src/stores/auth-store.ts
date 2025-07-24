import { IAuthState } from '@/shared/types/auth';
import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import { setApiClient } from '@/shared/services/axios.ts';
import { CurrentUser } from '@/shared/types/user.ts';

interface AuthStoreState extends IAuthState {
  user: CurrentUser | null;
  setUser: (u: CurrentUser | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: '',
      isAuthenticated: false,
      user: null,
      setUser: (u) => set({ user: u }),
      login: (token: string) => {
        set({ token, isAuthenticated: true });
        setApiClient(token);
      },
      logout: () => {
        set({ token: '', isAuthenticated: false, user: null });
        setApiClient();
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ token, isAuthenticated, user }) => ({ token, isAuthenticated, user }),
    },
  ),
);
