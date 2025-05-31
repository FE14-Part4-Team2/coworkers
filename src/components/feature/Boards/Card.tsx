"use client";
import Image from "next/image";

export default function MyDataCard() {
  return (
    <div className="w-[22rem] h-[19rem] rounded-xl border border-1.5 border-interaction-inactive bg-white shadow-lg overflow-hidden">
      <div className="w-full h-[12rem] bg-blue-100 flex items-center justify-center relative">
        <Image
          src="/icons/icon-avatar.svg"
          fill
          alt="임시 아이콘"
          className="object-cover"
        />
      </div>

      <div className="border bg-text-default"></div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="flex gap-2 text-md text-text-default">
            2025-06-17
          </span>
          <Image
            src="/icons/icon-bookmark2.svg"
            alt="더보기"
            width={14}
            height={18}
            className="cursor-pointer"
          />
        </div>

        <div className="mt-3 text-lg text-bg-primary mb-4">
          6월에 같이 팀하면서 일정 관리하고 공유하실 분!
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-bg-secondary ">이나경</div>
          <div className="flex gap-1 items-center">
            <Image
              src="/icons/icon-heart.svg"
              alt="하트"
              width={16}
              height={16}
            />
            <span className="text-sm text-bg-secondary ">10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
