import { create } from "zustand";

type ModalType =
  | "invite"
  | "success-invite"
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
  | "delete-article"
  | "delete-article-comment"
  | "no-token"
  | "taskListTodo"
  | "no-auth"
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
