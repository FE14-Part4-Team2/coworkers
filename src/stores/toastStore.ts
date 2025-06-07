import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

interface ToastState {
  message: string | null;
  type: ToastType;
  isVisible: boolean;
  timeoutId: NodeJS.Timeout | null;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  message: null,
  type: "info",
  isVisible: false,
  timeoutId: null,

  showToast: (message: string, type: ToastType = "info") => {
    const { timeoutId, hideToast } = get();

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    set({ message, type, isVisible: true });

    const newTimeoutId = setTimeout(() => {
      hideToast();
    }, 2000);

    set({ timeoutId: newTimeoutId });
  },

  hideToast: () => {
    const { timeoutId } = get();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    set({ isVisible: false, timeoutId: null });

    setTimeout(() => {
      set({ message: null });
    }, 300);
  },
}));
