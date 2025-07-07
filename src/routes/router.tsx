import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './protected-route.tsx';
import { NAVIGATION_ROUTES } from '../constants/routes.ts';
import { lazy } from 'react';
import HomePage from '../pages/home-page/home-page.tsx';

const LoginPage = lazy(() => import('../pages/login-page/login-page.tsx'));
const AddTodoForm = lazy(() => import('../pages/add-todo-page/add-todo-page.tsx'));

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      { path: NAVIGATION_ROUTES.HOME, element: <HomePage /> },
      { path: NAVIGATION_ROUTES.ADD_TODO, element: <AddTodoForm /> },
    ],
  },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <LoginPage />,
  },
]);
