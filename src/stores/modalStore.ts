import { create } from "zustand";

type ModalType =
  | "invite"
  | "todo"
  | "todo-create"
  | "todo-edit"
  | "password-reset"
  | "profile"
  | "delete-account"
  | "logout"
  | "password-change"
  | "calendar"
  | "delete"
  | null;

interface ModalState {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  modalType: ModalType;
  isOpen: boolean;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  isOpen: false,

  openModal: (type) =>
    set({
      modalType: type,
      isOpen: true,
    }),

  closeModal: () =>
    set({
      modalType: null,
      isOpen: false,
    }),
}));
