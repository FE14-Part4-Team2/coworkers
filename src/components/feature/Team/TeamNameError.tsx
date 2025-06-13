"use client";

interface TeamNameErrorProps {
  message: string | null;
}

export default function TeamNameError({ message }: TeamNameErrorProps) {
  if (!message) return null;

  return (
    <h1 className="mt-2 text-md text-status-danger font-medium">{message}</h1>
  );
}
