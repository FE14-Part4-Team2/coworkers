"use client";
import { useState, useCallback } from "react";

// 드롭다운에서 사용되는 기본 함수 훅
export default function useGenericDropdown(
  initialValue: string,
  onSelect?: (value: string) => void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  return {
    selected,
    isOpen,
    handleToggle,
    handleClose,
    handleSelect,
  };
}
