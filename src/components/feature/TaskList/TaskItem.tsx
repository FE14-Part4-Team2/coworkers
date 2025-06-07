"use client";

import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface TaskItemProps {
  task: {
    name: string;
    doneAt: string | null;
    commentCount?: number;
    date?: string;
  };
  onToggle: () => void;
  onDetail: () => void;
}

export default function TaskItem({ task, onToggle, onDetail }: TaskItemProps) {
  return (
    <li
      className="bg-bg-secondary px-[14px] py-[12px] rounded-[8px] flex flex-col gap-2  cursor-pointer"
      onClick={onDetail}
    >
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="w-5 h-5"
          >
            <Image
              src={
                task.doneAt
                  ? "/icons/icon-checkbox-checked.svg"
                  : "/icons/icon-checkbox-empty.svg"
              }
              alt="체크박스"
              width={20}
              height={20}
            />
          </button>
          <span
            className={`text-md font-regular inline-block mr-[12px] ${
              task.doneAt ? "line-through text-gray-400" : ""
            }`}
          >
            {task.name}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-text-secondary">
          <Image
            src="/icons/icon-comment.svg"
            alt="댓글"
            width={16}
            height={16}
          />
          <span>{task.commentCount ?? 0}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-text-disabled">
        <Image
          src="/icons/icon-calender.svg"
          alt="날짜"
          width={16}
          height={16}
        />
        <span>
          {task.date
            ? format(new Date(task.date), "yyyy년 M월 d일", { locale: ko })
            : "날짜 없음"}
        </span>
        <span>|</span>
        <Image
          src="/icons/icon-repeat.svg"
          alt="아이콘"
          width={16}
          height={16}
        />
        <span>매일 반복</span>
      </div>
    </li>
  );
}
