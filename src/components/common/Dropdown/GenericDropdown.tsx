"use client";

import DropDown from "@/components/common/Dropdown";

// 드롭다운에 표시할 항목
interface Option {
  label: string;
  value: string;
}

interface GenericDropdownProps {
  options: Option[];
  selected: string;
  isOpen: boolean;
  handleToggle: () => void;
  handleClose: () => void;
  handleSelect: (value: string) => void;
  className?: string;
}

function createSelectHandler(
  value: string,
  handleSelect: (value: string) => void,
) {
  return () => handleSelect(value);
}

export default function GenericDropdown({
  options,
  selected,
  isOpen,
  handleToggle,
  handleClose,
  handleSelect,
  className,
}: GenericDropdownProps) {
  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label ?? selected;

  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      <DropDown onClose={handleClose}>
        <DropDown.Trigger onClick={handleToggle} isOpen={isOpen}>
          {selectedLabel}
        </DropDown.Trigger>
        <DropDown.Menu isOpen={isOpen}>
          {options.map((opt) => (
            <DropDown.Item
              key={opt.value}
              onClick={createSelectHandler(opt.value, handleSelect)}
            >
              {opt.label}
            </DropDown.Item>
          ))}
        </DropDown.Menu>
      </DropDown>
    </div>
  );
}
