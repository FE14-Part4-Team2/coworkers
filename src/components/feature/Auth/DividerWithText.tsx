import React from "react";

export default function DividerWithText() {
  return (
    <div className="flex items-center mt-12">
      <div className="flex-grow border-t border-border-primary opacity-10"></div>
      <span className="px-6">OR</span>
      <div className="flex-grow border-t border-border-primary opacity-10"></div>
    </div>
  );
}
