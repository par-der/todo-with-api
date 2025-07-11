import { IAuthState } from '@/shared/types/auth';
import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import { setApiClient } from '@/shared/services/axios.ts';

interface AuthStoreState extends IAuthState {
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: '',
      isAuthenticated: false,
      login: (token: string) => {
        set({ token, isAuthenticated: true });
        setApiClient(token);
      },
      logout: () => {
        set({ token: '', isAuthenticated: false });
        setApiClient();
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
