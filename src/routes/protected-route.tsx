import { useAuthStore } from '../stores/auth-store.ts';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore.getState();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
