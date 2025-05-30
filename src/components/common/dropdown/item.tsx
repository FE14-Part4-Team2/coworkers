"use client";
import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

// 드롭다운 메뉴의 항목
interface DropDownItemProps {
  children: ReactNode;
  onClick?: () => void;
}

const hoverAnimation: Variants = {
  hover: {
    scale: 1.02,
    backgroundColor: "#0f172a",
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

export default function DropDownItem({ children, onClick }: DropDownItemProps) {
  return (
    <motion.div
      className="w-full px-1 py-1 rounded-[12px] text-md-regular text-text-primary cursor-pointer"
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
