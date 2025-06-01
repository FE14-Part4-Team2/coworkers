"use client";
import Image from "next/image";

export default function LongCard() {
  return (
    <div className="w-[36rem] h-[11rem] border border-card-border bg-bg-secondary rounded-xl px-8 py-6 shadow-lg relative flex items-center">
      {/* 프로필 이미지 */}
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src="/icons/icon-avatar.svg"
          alt="프로필"
          width={48}
          height={48}
          className="object-cover"
        />
      </div>

      {/* 내용: flex-col로 위(제목)-아래(하단정보) 퍼짐 */}
      <div className="ml-4 w-full h-full flex flex-col justify-between">
        {/* 제목: 윗부분 */}
        <div className="text-2lg text-text-tertiary truncate">
          6월에 같이 팀하면서 일정 관리하고 공유하실 분!
        </div>
        {/* 하단 정보: 아랫부분 */}
        <div className="flex items-center text-xs text-text-secondary">
          <span className="flex items-center gap-3 text-md">
            <Image
              src="/icons/icon-profile-default.svg"
              alt="작성자"
              width={32}
              height={32}
            />
            이나경
          </span>
          <span className="text-md ml-2 text-interaction-inactive">
            2024.06.17
          </span>
          <span className="flex items-center gap-1 ml-auto text-sm text-text-disabled ">
            <Image
              src="/icons/icon-heart.svg"
              alt="하트"
              width={16}
              height={16}
            />
            9999+
          </span>
        </div>
      </div>

      <button className="absolute top-3 right-4">
        <Image
          src="/icons/icon-bookmark2.svg"
          alt="더보기"
          width={18}
          height={18}
        />
      </button>
    </div>
  );
}
