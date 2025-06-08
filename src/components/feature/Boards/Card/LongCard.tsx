"use client";
import Image from "next/image";
import { sharedCardStyles, longCardStyles } from "@/styles/sharedCardStyles";

const DEFAULT_PROFILE_IMG = "/icons/icon-profile-default.svg";

interface LongCardProps {
  title: string;
  writer: string;
  date: string;
  likes: number;
  profileImg?: string;
  thumbnail?: string;
}

export default function LongCard({
  title,
  writer,
  date,
  likes,
  profileImg = DEFAULT_PROFILE_IMG,
  thumbnail,
}: LongCardProps) {
  return (
    <div className={longCardStyles.container}>
      {thumbnail ? (
        <>
          <div className={longCardStyles.content}>
            <div className={longCardStyles.thumbnail}>
              <Image
                src={thumbnail}
                alt="썸네일"
                fill
                className="object-cover relative z-10"
              />
            </div>

            <div className={longCardStyles.contentWithThumbnail}>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={longCardStyles.dateIndicator}></div>
                  <h3 className={`${sharedCardStyles.title} line-clamp-2`}>
                    {title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={sharedCardStyles.authorSection}>
                    <div className="relative">
                      <Image
                        src={profileImg}
                        alt="작성자"
                        width={32}
                        height={32}
                        className={sharedCardStyles.profileImage}
                      />
                    </div>
                    <div>
                      <div className={sharedCardStyles.authorName}>
                        {writer}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={sharedCardStyles.dateText}>
                      {date.slice(0, 10).replace(/-/g, ".")}
                    </span>
                  </div>
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
        <>
          <div className={longCardStyles.contentNoThumbnail}>
            <div className="flex items-center justify-between">
              <div className={sharedCardStyles.dateContainer}>
                <div className={longCardStyles.dateIndicator}></div>
                <span className={sharedCardStyles.dateText}>
                  {date.slice(0, 10).replace(/-/g, ".")}
                </span>
              </div>
            </div>

            <div className="flex-grow flex items-center justify-center">
              <div className="text-center">
                <Image
                  src="/icons/icon-logo-icon.svg"
                  alt="클로버"
                  width={40}
                  height={40}
                  className="mx-auto mb-4"
                />
                <h3 className={`${sharedCardStyles.title} px-4`}>{title}</h3>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={sharedCardStyles.authorSection}>
                <div className="relative">
                  <Image
                    src={profileImg}
                    alt="작성자"
                    width={32}
                    height={32}
                    className={sharedCardStyles.profileImage}
                  />
                </div>
                <div>
                  <div className={sharedCardStyles.authorName}>{writer}</div>
                </div>
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
        </>
      )}
    </div>
  );
}
