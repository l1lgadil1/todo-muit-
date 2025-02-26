import { create } from 'zustand';
import { AuthResponse, LoginDto, RegisterDto, authApi } from '@/shared/api/auth-api';

interface AuthStore {
  user: AuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginDto) => Promise<void>;
  register: (userData: RegisterDto) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginDto) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authApi.login(credentials);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: 'Invalid credentials',
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  register: async (userData: RegisterDto) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authApi.register(userData);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: 'Registration failed',
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  logout: () => {
    authApi.logout();
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const user = await authApi.getCurrentUser();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
})); 