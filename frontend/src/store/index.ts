import create from 'zustand';

interface AppState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const useStore = create<AppState>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
  theme: 'light',
  setTheme: (theme) => set({ theme })
}));
