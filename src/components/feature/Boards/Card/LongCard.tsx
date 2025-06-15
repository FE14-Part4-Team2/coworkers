"use client";
import Image from "next/image";
import { sharedCardStyles, longCardStyles } from "@/styles/sharedCardStyles";
import { CardProps } from "./ShortCard";
import { useRouter } from "next/navigation";

export default function LongCard({ article }: CardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/boards/${article.id}`);
  };
  return (
    <div className={longCardStyles.container} onClick={handleCardClick}>
      {article.image ? (
        <>
          <div className={longCardStyles.content}>
            <div className={longCardStyles.thumbnail}>
              <Image
                src={article.image}
                alt="썸네일"
                fill
                className="object-cover relative z-10"
              />
            </div>

            <div className="flex-1 min-w-0 ml-6 flex flex-col justify-between h-full">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <div className={longCardStyles.dateIndicator}></div>
                  <h3 className={`${sharedCardStyles.title} flex-1 min-w-0`}>
                    {article.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-0">
                <div className="sm:hidden flex flex-col gap-2">
                  <span
                    className={`${sharedCardStyles.dateText} whitespace-nowrap text-sm`}
                  >
                    {article.createdAt.slice(0, 10).replace(/-/g, ".")}
                  </span>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <div
                          className={`${sharedCardStyles.authorName} truncate`}
                        >
                          {article.writer.nickname}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${sharedCardStyles.likesBadge} flex-shrink-0`}
                    >
                      <Image
                        src="/icons/icon-heart.svg"
                        alt="하트"
                        width={14}
                        height={14}
                      />
                      <span className={sharedCardStyles.likesText}>
                        {article.likeCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center justify-between gap-4 min-w-0">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0 flex-1">
                        <div className={`${sharedCardStyles.authorName}`}>
                          {article.writer.nickname}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`${sharedCardStyles.dateText} whitespace-nowrap`}
                      >
                        {article.createdAt.slice(0, 10).replace(/-/g, ".")}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`${sharedCardStyles.likesBadge} flex-shrink-0`}
                  >
                    <Image
                      src="/icons/icon-heart.svg"
                      alt="하트"
                      width={14}
                      height={14}
                    />
                    <span className={sharedCardStyles.likesText}>
                      {article.likeCount}
                    </span>
                  </div>
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
                  {article.createdAt.slice(0, 10).replace(/-/g, ".")}
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
                <h3 className={`${sharedCardStyles.title} px-4`}>
                  {article.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={sharedCardStyles.authorSection}>
                <div>
                  <div className={sharedCardStyles.authorName}>
                    {article.writer.nickname}
                  </div>
                </div>
              </div>

              <div className={sharedCardStyles.likesBadge}>
                <Image
                  src="/icons/icon-heart.svg"
                  alt="하트"
                  width={14}
                  height={14}
                />
                <span className={sharedCardStyles.likesText}>
                  {article.likeCount}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
