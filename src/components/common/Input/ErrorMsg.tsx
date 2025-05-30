import React from "react";

interface ErrorMsgProps {
  message?: string | null;
  className?: string;
}

export default function ErrorMsg({ message, className }: ErrorMsgProps) {
  if (!message) return null;

  return (
    <p className={`mt-2 text-sm font-medium text-status-danger ${className}`}>
      {message}
    </p>
  );
}
