"use client";
import Image from "next/image";
import { sharedCardStyles, shortCardStyles } from "@/styles/sharedCardStyles";

interface ShortCardProps {
  date: string;
  title: string;
  writer: string;
  profileImg?: string;
  likes: number;
  thumbnail?: string;
}

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
  thumbnail,
}: ShortCardProps) {
  return (
    <div className={shortCardStyles.container}>
      {thumbnail ? (
        <>
          <div className={shortCardStyles.thumbnail}>
            <Image
              src={thumbnail}
              fill
              alt="게시글 썸네일"
              className="object-cover"
            />
          </div>

          <div className={shortCardStyles.content}>
            <div className="flex items-center justify-between">
              <div className={sharedCardStyles.dateContainer}>
                <div className={shortCardStyles.dateIndicator}></div>
                <span className={sharedCardStyles.dateText}>
                  {date.slice(0, 10).replace(/-/g, ".")}
                </span>
              </div>
            </div>

            <div className={sharedCardStyles.title}>{title}</div>

            <div className="border-gray-100 pt-[2.125rem]">
              <div className="flex gap-3 items-center">
                <div>
                  <Image
                    src={profileImg}
                    alt="작성자"
                    width={32}
                    height={32}
                    className={sharedCardStyles.profileImage}
                  />
                </div>
                <div className="flex-grow">
                  <div className={sharedCardStyles.authorName}>{writer}</div>
                </div>
                <div className={sharedCardStyles.likesBadge}>
                  <Image
                    src="/icons/icon-heart.svg"
                    alt="하트"
                    width={14}
                    height={14}
                  />
                  <span className={sharedCardStyles.likesText}>{likes}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="px-5 py-4 h-full flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div className={sharedCardStyles.dateContainer}>
              <div className={shortCardStyles.dateIndicator}></div>
              <span className={sharedCardStyles.dateText}>
                {date.slice(0, 10).replace(/-/g, ".")}
              </span>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <div className="text-center mb-6">
              <Image
                src="/icons/icon-logo-icon.svg"
                alt="클로버"
                width={40}
                height={40}
                className="mx-auto mb-4"
              />
              <h3 className={`${sharedCardStyles.title} px-2`}>{title}</h3>
            </div>
          </div>

          <div className={shortCardStyles.bottomBorder}>
            <div className="flex gap-3 items-center">
              <div>
                <Image
                  src={profileImg}
                  alt="작성자"
                  width={32}
                  height={32}
                  className={sharedCardStyles.profileImage}
                />
              </div>
              <div className="flex-grow">
                <div className={sharedCardStyles.authorName}>{writer}</div>
              </div>
              <div className={sharedCardStyles.likesBadge}>
                <Image
                  src="/icons/icon-heart.svg"
                  alt="하트"
                  width={14}
                  height={14}
                />
                <span className={sharedCardStyles.likesText}>{likes}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
