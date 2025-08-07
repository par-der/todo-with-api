import { useAuthStore } from '@/stores/auth-store.ts';
import { Navigate, Outlet, useLocation } from 'react-router';

export const ProtectedRouterAdmin = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user?.is_staff) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
