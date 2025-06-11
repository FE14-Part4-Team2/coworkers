"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/stores/modalStore";
import clsx from "clsx";

type ModalButtonType =
  | "single-green"
  | "double-white-green"
  | "double-white-red"
  | "none-button";

interface ModalProps extends React.PropsWithChildren {
  title?: string;
  description?: string;
  children?: ReactNode;
  headerImage?: ReactNode;
  showCloseIcon?: boolean;
  buttonType?: ModalButtonType;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: "button" | "submit";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Modal({
  title,
  description,
  children,
  showCloseIcon = true,
  headerImage,
  buttonType = "single-green",
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
  confirmButtonType = "button",
  onSubmit,
}: ModalProps) {
  const { closeModal, modalType } = useModalStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const modalRadiusClass = clsx(
    "w-full sm:max-w-md sm:w-[384px] p-8 bg-bg-secondary relative",
    {
      "rounded-t-[0.75rem] sm:rounded-[1.5rem]": modalType === "profile",
      "rounded-t-[0.75rem] sm:rounded-[0.75rem]": modalType !== "profile",
    },
  );

  const renderButtons = () => {
    switch (buttonType) {
      case "single-green":
        return (
          <button
            type={confirmButtonType}
            className="mt-3 w-full bg-brand-primary text-white py-2 rounded"
            onClick={confirmButtonType === "button" ? onConfirm : undefined}
          >
            {confirmText}
          </button>
        );
      case "double-white-green":
        return (
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded"
              onClick={closeModal}
            >
              {cancelText}
            </button>
            <button
              type={confirmButtonType}
              className="w-1/2 bg-brand-primary text-white py-2 rounded"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        );
      case "double-white-red":
        return (
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded "
              onClick={closeModal}
            >
              {cancelText}
            </button>
            <button
              type={confirmButtonType}
              className="w-1/2 bg-red-500 text-white py-2 rounded"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        );
      case "none-button":
        return null;

      default:
        return null;
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center sm:items-center sm:justify-center"
      onClick={closeModal}
    >
      <div className={modalRadiusClass} onClick={(e) => e.stopPropagation()}>
        {confirmButtonType === "submit" ? (
          <form onSubmit={onSubmit}>
            {showCloseIcon && (
              <button
                type="button"
                className="absolute top-4 right-4"
                onClick={closeModal}
                aria-label="close"
              >
                <img
                  src="/icons/icon-close.svg"
                  alt="닫기"
                  className="w-5 h-5"
                />
              </button>
            )}
            <h2 className="text-lg text-center text-text-inverse font-medium mb-2">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-center text-text-default font-medium mb-4 whitespace-pre-line">
                {description}
              </p>
            )}
            {children}
            {renderButtons()}
          </form>
        ) : (
          <>
            {showCloseIcon && (
              <button
                type="button"
                className="absolute top-4 right-4"
                onClick={closeModal}
                aria-label="close"
              >
                <img
                  src="/icons/icon-close.svg"
                  alt="닫기"
                  className="w-5 h-5"
                />
              </button>
            )}
            {headerImage && (
              <div className="flex justify-center mb-4">{headerImage}</div>
            )}
            <h2 className="text-lg text-center text-text-inverse font-medium mb-2">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-center text-text-default font-medium mb-4 whitespace-pre-line">
                {description}
              </p>
            )}
            {children}
            {renderButtons()}
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
