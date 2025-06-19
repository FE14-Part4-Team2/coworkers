import { create } from "zustand";

export const useUiStore = create((set) => ({
  isUserDropdownOpen: false,
  setUserDropdownOpen: (isOpen: boolean) => set({ isUserDropdownOpen: isOpen }),
}));
