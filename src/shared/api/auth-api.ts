import { api } from './base-api';

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  username: string;
}

export const authApi = {
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  register: async (userData: RegisterDto): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const { data } = await api.get<AuthResponse['user']>('/auth/me');
    return data;
  },
}; 