import { useAuthStore } from '@/stores/auth-store';
import { Navigate, Outlet, useLocation } from 'react-router';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export const GuestOnlyRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
