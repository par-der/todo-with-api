import { IAuthState } from '../types/auth.ts';
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

// export const useAuthStore = create<AuthStoreState>((set) => ({
//   isAuthenticated: false,
//   login: (token) => {
//     localStorage.setItem('token', token);
//     set({
//       isAuthenticated: true,
//     });
//   },
//   logout: () => {
//     localStorage.removeItem('token');
//     set({
//       isAuthenticated: false,
//     });
//   },
// }));
