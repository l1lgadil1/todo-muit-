import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/session/model/auth-store';
import { LoginPage } from '@/pages/login/ui/login-page';
import { RegisterPage } from '@/pages/register/ui/register-page';
import { TasksPage } from '@/pages/tasks/ui/tasks-page';
import { Layout } from '@/widgets/layout/ui/layout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
}; 