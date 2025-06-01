"use client";
import Image from "next/image";

export default function LongCard() {
  return (
    <div className="w-[36rem] h-[11rem] border border-card-border bg-bg-secondary rounded-xl px-8 pt-6 pb-5 shadow-lg relative flex items-center">
      <div className="w-[128px] h-[128px] rounded-lg overflow-hidden bg-blue-100 flex-shrink-0 relative">
        <Image
          src="/icons/icon-avatar.svg"
          alt="프로필"
          fill
          className="object-cover"
        />
      </div>

      <div className="ml-4 w-full h-full flex flex-col justify-between">
        <div className="text-2lg text-text-tertiary truncate">
          6월에 같이 팀하면서 일정 관리하고 공유하실 분!
        </div>

        <div className="text-md text-text-secondary truncate">
          혼자 공부하니까 공부가 잘 안되더라구요. <br />
          같이 하실분 구합니다!
        </div>

        <div className="flex items-center text-xs text-text-secondary">
          <span className="flex items-center gap-3 text-md text-icon-inverse">
            <Image
              src="/icons/icon-profile-default.svg"
              alt="작성자"
              width={25}
              height={25}
            />
            이나경
          </span>
          <span className="text-md ml-3 text-interaction-inactive">
            2025.06.17
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
