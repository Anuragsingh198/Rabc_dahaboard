import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser, LoginCredentials, RegisterData } from '../types/auth';

interface AuthStore {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const mockLogin = async (credentials: LoginCredentials): Promise<AuthUser> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
    return {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      token: 'mock-jwt-token',
    };
  }

  if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
    return {
      id: '2',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      token: 'mock-jwt-token',
    };
  }

  throw new Error('Invalid credentials');
};

const mockRegister = async (data: RegisterData): Promise<AuthUser> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  return {
    id: '3',
    email: data.email,
    name: data.name,
    role: 'user',
    token: 'mock-jwt-token',
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        try {
          const user = await mockLogin(credentials);
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      register: async (data) => {
        try {
          const user = await mockRegister(data);
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);