import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

/** Account role — matches the backend `UserRole` (CLIENT / TATUADOR / ESTUDIO) and the
 *  RoleSwitch (Cliente / Artista / Estúdio). Drives auth copy and post-login routing
 *  (cliente → cliente tabs; artista/estúdio → Dashboard, once it exists). */
export type UserRoleId = 'cliente' | 'artista' | 'estudio';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRoleId;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRole: (role: UserRoleId) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: 'cliente',
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setRole: (role) => set({ role }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, role: 'cliente' }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
