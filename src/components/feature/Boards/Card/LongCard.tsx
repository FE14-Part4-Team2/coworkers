"use client";
import Image from "next/image";

const DEFAULT_PROFILE_IMG = "/icons/icon-profile-default.svg";
const DEFAULT_THUMBNAIL = "/icons/icon-avatar.svg";

interface LongCardProps {
  title: string;
  content: string;
  writer: string;
  date: string;
  likes: number;
  profileImg?: string;
  thumbnail?: string;
}

export default function LongCard({
  title,
  content,
  writer,
  date,
  likes,
  profileImg = DEFAULT_PROFILE_IMG,
  thumbnail = DEFAULT_THUMBNAIL,
}: LongCardProps) {
  return (
    <div className="w-[37rem] h-[11rem] border border-card-border bg-bg-secondary rounded-xl px-8 pt-6 pb-5 shadow-lg relative flex items-center">
      <div className="w-[128px] h-[128px] rounded-lg overflow-hidden bg-blue-100 flex-shrink-0 relative">
        <Image src={thumbnail} alt="썸네일" fill className="object-cover" />
      </div>

      <div className="ml-4 w-full h-full flex flex-col justify-between">
        <div className="text-2lg text-text-tertiary truncate">{title}</div>

        <div className="text-md text-text-secondary">{content}</div>

        <div className="flex items-center">
          <span className="flex items-center gap-3 text-md text-icon-inverse">
            <Image src={profileImg} alt="작성자" width={25} height={25} />
            {writer}
          </span>
          <span className="text-md ml-3 text-interaction-inactive">{date}</span>
          <span className="flex items-center gap-1 ml-auto text-sm text-text-disabled ">
            <Image
              src="/icons/icon-heart.svg"
              alt="하트"
              width={16}
              height={16}
            />
            {likes}
          </span>
        </div>
      </div>

      <button className="absolute top-3 right-4">
        <Image
          src="/icons/icon-bookmarks.svg"
          alt="더보기"
          width={18}
          height={18}
        />
      </button>
    </div>
  );
}
