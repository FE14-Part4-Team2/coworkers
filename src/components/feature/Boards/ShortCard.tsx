"use client";
import Image from "next/image";

export default function ShortCard() {
  return (
    <div className="w-[24rem] h-[19rem] rounded-xl border border-card-border bg-bg-secondary shadow-lg overflow-hidden">
      <div className="w-full h-[12rem] bg-blue-100 flex items-center justify-center relative">
        <Image
          src="/icons/icon-avatar.svg"
          fill
          alt="임시 아이콘"
          className="object-cover"
        />
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="flex gap-3 text-md text-text-disabled">
            2025.06.17
          </span>
          <Image
            src="/icons/icon-bookmark2.svg"
            alt="더보기"
            width={14}
            height={18}
            className="cursor-pointer"
          />
        </div>

        <div className="mt-3 text-lg text-text-tertiary mb-4">
          6월에 같이 팀하면서 일정 관리하고 공유하실 분!
        </div>

        <div className="flex gap-3 items-center">
          <Image
            src="/icons/icon-profile-default.svg"
            alt="작성자"
            width={25}
            height={25}
          />
          <div className="text-sm text-text-Primary ">이나경</div>
          <div className="flex gap-1 items-center ml-auto">
            <Image
              src="/icons/icon-heart.svg"
              alt="하트"
              width={16}
              height={16}
            />
            <span className="text-sm text-text-disabled ">10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
