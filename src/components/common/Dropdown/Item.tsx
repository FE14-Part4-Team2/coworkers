"use client";
import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

// 드롭다운 메뉴의 항목
interface DropDownItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const hoverAnimation: Variants = {
  hover: {
    scale: 1.02,
    backgroundColor: "#64748b",
    color: "#f8fafc",
    transition: {
      duration: 0.15,
    },
  },
};

const tapAnimation = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

export default function DropDownItem({
  children,
  onClick,
  className,
}: DropDownItemProps) {
  return (
    <motion.div
      className={`w-full px-1 py-1 rounded-lg text-md-regular text-text-primary cursor-pointer ${className}`}
      variants={hoverAnimation}
      whileHover="hover"
      whileTap={tapAnimation}
      initial={false}
      animate="rest"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
