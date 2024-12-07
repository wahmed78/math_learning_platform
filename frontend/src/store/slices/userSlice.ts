import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: any;
  preferences: {
    theme: string;
    fontSize: number;
    notifications: boolean;
  };
  setUser: (user: any) => void;
  updatePreferences: (preferences: Partial<UserState['preferences']>) => void;
  resetState: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      preferences: {
        theme: 'light',
        fontSize: 16,
        notifications: true,
      },
      setUser: (user) => set({ user }),
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
      resetState: () =>
        set({
          user: null,
          preferences: {
            theme: 'light',
            fontSize: 16,
            notifications: true,
          },
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);
