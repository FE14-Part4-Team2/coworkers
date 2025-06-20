import Image from "next/image";
import { useLikeArticle } from "@/api/article/article.query";

export interface LikeButtonProps {
  articleId: number;
  isLiked: boolean;
  likeCount: number;
  isAuthenticated: boolean;
  onRequireLogin?: () => void;
}

export default function LikeButton({
  articleId,
  isLiked,
  likeCount,
  onRequireLogin,
  isAuthenticated,
}: LikeButtonProps) {
  const { mutate: addLike } = useLikeArticle("add");
  const { mutate: deleteLike } = useLikeArticle("delete");

  const handleClick = () => {
    if (!isAuthenticated) {
      onRequireLogin?.();
      return;
    }

    if (isLiked) {
      deleteLike(String(articleId));
    } else {
      addLike(String(articleId));
    }
  };
  return (
    <>
      <button
        className="flex items-center gap-3 hover:opacity-70 transition-opacity"
        onClick={handleClick}
      >
        <Image
          src={
            isLiked ? "/icons/icon-heart-filled.svg" : "/icons/icon-heart.svg"
          }
          alt="하트"
          width={28}
          height={28}
          className="hover:scale-110 transition-transform"
        />
        <span className="text-text-primary">{likeCount}개의 좋아요</span>
      </button>
    </>
  );
}
