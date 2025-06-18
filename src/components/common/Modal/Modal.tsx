"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/stores/modalStore";
import clsx from "clsx";
import Button from "../Button";

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
    "w-full sm:max-w-md sm:w-96 bg-bg-secondary relative max-h-[80vh] scroll-custom overflow-y-auto ",
    {
      "rounded-t-xl px-12 pt-12 pb-8 sm:rounded-3xl sm:p-8":
        modalType === "profile",
      "rounded-t-3xl px-12 pt-12 pb-8 sm:rounded-xl": modalType === "invite",
      "rounded-t-3xl p-8 sm:rounded-xl sm:px-12 pt-12":
        modalType === "calendar",
      "rounded-t-xl px-12 pt-12 pb-8 sm:rounded-xl":
        modalType !== "profile" &&
        modalType !== "invite" &&
        modalType !== "calendar",
    },
  );

  const renderButtons = () => {
    switch (buttonType) {
      case "single-green":
        return (
          <Button
            label={confirmText}
            type={confirmButtonType}
            variant="primary"
            size="md"
            className="mt-3 w-full"
            onClick={confirmButtonType === "button" ? onConfirm : undefined}
          />
        );
      case "double-white-green":
        return (
          <div className="mt-6 flex gap-2">
            <Button
              label={cancelText}
              type="button"
              variant="secondary"
              size="md"
              className="w-1/2"
              onClick={closeModal}
            />
            <Button
              label={confirmText}
              type={confirmButtonType}
              variant="primary"
              size="md"
              className="w-1/2"
              onClick={onConfirm}
            />
          </div>
        );
      case "double-white-red":
        return (
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              className="w-1/2 border border-text-secondary bg-white text-text-default font-semibold text-lg py-3 rounded-xl"
              onClick={closeModal}
            >
              {cancelText}
            </button>
            <Button
              label={confirmText}
              type={confirmButtonType}
              variant="danger"
              size="md"
              className="w-1/2"
              onClick={onConfirm}
            />
          </div>
        );
      case "none-button":
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
                  className="w-6 h-6"
                />
              </button>
            )}
            <h2 className="text-lg text-center text-text-primary font-medium mb-2">
              {title}
            </h2>
            {description && (
              <p className="text-md text-center text-text-secondary font-medium mb-6 whitespace-pre-line">
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
                  className="w-6 h-6"
                />
              </button>
            )}
            {headerImage && (
              <div className="flex justify-center mb-4">{headerImage}</div>
            )}
            <h2 className="text-lg text-center text-text-primary font-medium mb-2">
              {title}
            </h2>
            {description && (
              <p className="text-md text-center text-text-secondary font-medium mb-6 whitespace-pre-line">
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
