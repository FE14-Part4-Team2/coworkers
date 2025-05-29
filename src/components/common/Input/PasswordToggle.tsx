import React from "react";

interface PasswordToggleProps {
  isShow: boolean;
  onToggle: () => void;
}

const PasswordToggle = React.memo(
  ({ isShow, onToggle }: PasswordToggleProps) => {
    const iconSrc = isShow
      ? "/icons/icon-visibility_on.svg"
      : "/icons/icon-visibility_off.svg";

    return (
      <button type="button" onClick={onToggle} className="align-middle">
        <img
          src={iconSrc}
          alt={isShow ? "비밀번호 가리기" : "비밀번호 보이기"}
        />
      </button>
    );
  },
);

export default PasswordToggle;
