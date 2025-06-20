"use client";

import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface JoinButtonProps {
  token?: string;
}

export default function JoinButton({ token }: JoinButtonProps) {
  const router = useRouter();

  if (!token) return null;

  const handleClick = () => {
    router.push(token);
  };

  return (
    <div className="mt-8 group">
      <Button
        label="팀에 참여하기"
        variant="primary"
        iconPosition="left"
        icon={
          <svg
            className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        }
        onClick={handleClick}
        className="!w-40 sm:w-auto transition-all duration-200 hover:scale-105 hover:shadow-lg"
      />
    </div>
  );
}
