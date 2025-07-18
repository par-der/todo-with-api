import { createBrowserRouter } from 'react-router';
import { GuestOnlyRoute, ProtectedRoute } from '@/app/protected-route';
import { NAVIGATION_ROUTES } from '@/shared/constants/routes';
import { lazy } from 'react';
import TodayPage from '@/pages/today-page/today-page.tsx';

const LoginPage = lazy(() => import('@/pages/login-page/login-page'));
const UserPage = lazy(() => import('@/pages/user-page/user-page'));
const AuthPage = lazy(() => import('@/pages/auth-page/auth-page.tsx'));
const HomePage = lazy(() => import('@/pages/home-page/home-page'));

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: NAVIGATION_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: NAVIGATION_ROUTES.USER,
        element: <UserPage />,
      },
      {
        path: NAVIGATION_ROUTES.TODAY,
        element: <TodayPage />,
      },
    ],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: NAVIGATION_ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: NAVIGATION_ROUTES.SIGN_UP,
        element: <AuthPage />,
      },
    ],
  },
]);
