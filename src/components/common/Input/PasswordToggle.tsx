import React from "react";
import VisibilityIconOff from "@/assets/icons/icon-visibility_off.svg";
import VisibilityIconOn from "@/assets/icons/icon-visibility_on.svg";

interface PasswordToggleProps {
  isShow: boolean;
  onToggle: () => void;
}

const PasswordToggle = React.memo(
  ({ isShow, onToggle }: PasswordToggleProps) => {
    return (
      <button type="button" onClick={onToggle} className="align-middle">
        {isShow ? <VisibilityIconOn /> : <VisibilityIconOff />}
      </button>
    );
  },
);

export default PasswordToggle;
