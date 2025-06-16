import { TaskType } from "@/api/task/task.schema";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

interface TaskDetailProps {
  task: TaskType;
  onClose: () => void;
}

export default function TaskDetail({ task, onClose }: TaskDetailProps) {
  const [comment, setComment] = useState("");
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      <div
        className={clsx(
          "fixed top-0 right-0 z-50 h-full bg-bg-secondary shadow-lg p-8",
          "w-full",
          "md:w-[435px]",
          "lg:w-[779px]",
        )}
      >
        <div className="">
          <div onClick={onClose} aria-label="닫기">
            <Image
              src="/icons/icon-close.svg"
              alt="닫기"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="h-[calc(100vh-72px)] overflow-y-auto pr-2">
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-xl">{task?.name}</h2>
            <Image
              src="/icons/icon-kebabs.svg"
              alt="kebabs"
              width={4}
              height={4}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <Image
                src="/icons/icon-profile-default.svg"
                alt="프로필이미지"
                width={32}
                height={32}
              />
              <span className="ml-2 text-md font-regular">김성빈</span>
            </div>
            <div className="text-text-secondary text-md">
              {format(new Date(task.date), "yyyy년 M월 d일", {
                locale: ko,
              })}
            </div>
          </div>
          <div className="flex items-center text-xs font-regular text-text-default mt-3">
            <div className="flex items-center">
              <Image
                src="/icons/icon-calender.svg"
                alt="달력"
                width={16}
                height={16}
              />
              <span className=" ml-1">
                {format(new Date(task.date), "yyyy년 M월 d일", {
                  locale: ko,
                })}
              </span>
            </div>
            <span className="ml-2 mr-2">|</span>
            <div className="flex items-center">
              <Image
                src="/icons/icon-repeat.svg"
                alt="반복"
                width={16}
                height={16}
              />
              <span className="ml-2">반복없음</span>
            </div>
          </div>
          <div className="mt-4 overflow-wrap-anywhere h-[200px] whitespace-normal break-words text-14-400 overflow-y-auto overflow-x-hidden">
            {task.description}
          </div>
          <div className="relative mt-2">
            <textarea
              className="w-full border-t border-b border-x-0 border-border-primary resize-none text-14-400 p-2 pr-10 h-16 focus:outline-none bg-transparent"
              rows={2}
              placeholder="댓글을 달아주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <style jsx>{`
              textarea::-webkit-scrollbar {
                display: none;
              }
              textarea {
                scrollbar-width: none; /* Firefox */
              }
            `}</style>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Image
                src={
                  comment
                    ? "/icons/icon-submit.svg"
                    : "/icons/icon-submit-disable.svg"
                }
                alt="Submit button"
                width={24}
                height={24}
                className={comment ? "opacity-100" : "opacity-50"}
              />
            </div>
          </div>

          <div className="mt-2">
            <div className="border-b border-x-0 border-border-primary pt-4 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-md">안녕하세요</span>
                <Image
                  src="/icons/icon-kebabs.svg"
                  alt="kebabs"
                  width={3}
                  height={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
