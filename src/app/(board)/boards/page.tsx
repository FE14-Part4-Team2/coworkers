"use client";

import DropDown from "@/components/common/dropdown";
import { useCallback, useState } from "react";

export default function FilterExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("최신순");

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectLatest = useCallback(() => {
    setSelected("최신순");
    setIsOpen(false);
  }, []);

  const handleSelectOldest = useCallback(() => {
    setSelected("좋아요순");
    setIsOpen(false);
  }, []);

  return (
    <div className="relative inline-block ml-3">
      <DropDown onClose={handleClose}>
        <DropDown.Trigger onClick={handleToggle} isOpen={isOpen}>
          {selected}
        </DropDown.Trigger>
        <DropDown.Menu isOpen={isOpen}>
          <DropDown.Item onClick={handleSelectLatest}>최신순</DropDown.Item>
          <DropDown.Item onClick={handleSelectOldest}>좋아요순</DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
}
