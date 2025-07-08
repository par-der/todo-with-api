import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from '@/app/protected-route';
import { NAVIGATION_ROUTES } from '@/shared/constants/routes';
import { lazy } from 'react';
import HomePage from '@/pages/home-page/home-page';

const LoginPage = lazy(() => import('@/pages/login-page/login-page'));
const AddTodoPage = lazy(() => import('@/pages/add-todo-page/add-todo-page'));

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: NAVIGATION_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: NAVIGATION_ROUTES.ADD_TODO,
        element: <AddTodoPage />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <LoginPage />,
  },
]);
