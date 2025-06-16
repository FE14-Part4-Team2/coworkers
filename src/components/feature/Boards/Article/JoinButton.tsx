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
            className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        }
        onClick={handleClick}
        className="!w-40 sm:w-auto transition-all duration-200 hover:scale-105 hover:shadow-lg"
      />
    </div>
  );
}
