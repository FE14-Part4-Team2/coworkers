import { UserType } from "@/api/user/user.schema";
import { create } from "zustand";

interface AuthState {
  user: UserType | null | undefined;
  isAuthenticated: boolean;
  setAuth: (user: UserType) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isAuthenticated: false,
  setAuth: (user) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: undefined, isAuthenticated: false }),
}));
