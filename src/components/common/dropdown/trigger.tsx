"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface DropDownTriggerProps {
  children: ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

const hoverAnimation = { scale: 1.02 };
const tapAnimation = { scale: 0.98 };

// 클릭 시 드롭다운을 열고 닫는 버튼 역할
export default function DropDownTrigger({ children, onClick, isOpen }: DropDownTriggerProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex justify-between items-center w-[120px] px-4 py-3 rounded-[12px] text-text-primary text-md font-regular transition
        ${isOpen ? "bg-bg-tertiary" : "bg-bg-secondary"}
      `}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
    >
      {children}
      <Image
        src="icons/icon-toggle.svg"
        alt="toggle"
        width={24}
        height={24}
        className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
      />
    </motion.button>
  );
}

