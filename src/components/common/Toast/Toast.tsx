"use client";

import React from "react";
import { ToastType, useToastStore } from "@/stores/toastStore";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ToastPortal from "./ToastPortal";

const iconPaths: Record<ToastType, string> = {
  success: "/icons/icon-toast-check.svg",
  error: "/icons/icon-alert.svg",
  info: "/icons/icon-info.svg",
};

interface IconProps {
  type: ToastType;
}

function Icon({ type }: IconProps) {
  const src = iconPaths[type];
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={`${type} 아이콘`}
      width={24}
      height={24}
      className="absolute left-5 top-1/2 -translate-y-1/2 z-20"
    />
  );
}

const initialVariants = { opacity: 0, y: 20, x: "-50%" };
const animateVariants = { opacity: 1, y: 0, x: "-50%" };
const exitVariants = { opacity: 0, y: 20, x: "-50%" };
const transition = { duration: 0.3 };

function Toast() {
  const { message, type, isVisible, hideToast } = useToastStore();

  const typeTextColor = {
    success: "text-brand-tertiary",
    error: "text-status-danger",
    info: "text-text-secondary",
  };

  return (
    <ToastPortal>
      <AnimatePresence>
        {isVisible && message && (
          <motion.div
            key="toast"
            initial={initialVariants}
            animate={animateVariants}
            exit={exitVariants}
            transition={transition}
            onClick={hideToast}
            className={`fixed left-1/2 bottom-20 overflow-hidden pointer-events-auto pl-[3.5rem] pr-6 py-3 rounded-xl bg-bg-secondary text-lg z-100 max-w-[22.5rem] w-full flex items-center relative ${typeTextColor[type]}`}
          >
            <Icon type={type} />
            <div className="flex-1 flex items-center justify-center">
              <p className="text-center">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastPortal>
  );
}

export default Toast;
