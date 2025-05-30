import DropDownItem from "./Item";
import DropDownMenu from "./Menu";
import DropDownTrigger from "./Trigger";
import { ReactNode } from "react";
import useClickOutside from "@/hooks/useclickoutside";

interface DropDownProps {
  onClose: () => void;
  children: ReactNode;
}

// 루트 컴포넌트 역할 (외부에서 감싸는 용도)
function DropDown({ onClose, children }: DropDownProps) {
  const ref = useClickOutside(onClose);

  return (
    <div ref={ref} className="relative inline-block">
      {children}
    </div>
  );
}

DropDown.Trigger = DropDownTrigger;
DropDown.Menu = DropDownMenu;
DropDown.Item = DropDownItem;

export default DropDown;
