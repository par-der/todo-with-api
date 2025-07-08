import { IAuthState } from '@/shared/types/auth';
import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStoreState extends IAuthState {
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: '',
      isAuthenticated: false,
      login: (token) => set({ token, isAuthenticated: true }),
      logout: () => set({ token: '', isAuthenticated: false }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
