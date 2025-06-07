"use client";
import Image from "next/image";

interface ShortCardProps {
  date: string;
  title: string;
  writer: string;
  profileImg?: string;
  likes: number;
  thumbnail?: string;
}

export default function ShortCard({
  date,
  title,
  writer,
  profileImg = "/icons/icon-profile-default.svg",
  likes,
  thumbnail = "/icons/icon-avatar.svg",
}: ShortCardProps) {
  return (
    <div className="w-[24rem] h-[19rem] rounded-xl border border-card-border bg-bg-secondary shadow-lg overflow-hidden">
      <div className="w-full h-[12rem] bg-blue-100 flex items-center justify-center relative">
        <Image
          src={thumbnail}
          fill
          alt="임시 아이콘"
          className="object-cover"
        />
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="flex gap-3 text-md text-text-disabled">
            {" "}
            {date.slice(0, 10).replace(/-/g, ".")}
          </span>
          <Image
            src="/icons/icon-bookmarks.svg"
            alt="더보기"
            width={14}
            height={18}
            className="cursor-pointer"
          />
        </div>

        <div className="mt-3 text-lg text-text-tertiary mb-4">{title}</div>

        <div className="flex gap-3 items-center">
          <Image src={profileImg} alt="작성자" width={25} height={25} />
          <div className="text-sm text-text-Primary ">{writer}</div>
          <div className="flex gap-1 items-center ml-auto">
            <Image
              src="/icons/icon-heart.svg"
              alt="하트"
              width={16}
              height={16}
            />
            <span className="text-sm text-text-disabled ">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
