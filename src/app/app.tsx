import { useEffect } from 'react';
import { Router } from './providers/router/router';
import { useAuthStore } from '@/entities/session/model/auth-store';

export const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <Router />;
}; 