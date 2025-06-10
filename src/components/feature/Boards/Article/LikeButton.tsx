import Image from "next/image";
import {
  useAddLikeArticle,
  useDeleteLikeArticle,
} from "@/api/article/article.query";

export interface LikeButtonProps {
  articleId: number;
  isLiked: boolean;
  likeCount: number;
}

export default function LikeButton({
  articleId,
  isLiked,
  likeCount,
}: LikeButtonProps) {
  const { mutate: addLike } = useAddLikeArticle();
  const { mutate: deleteLike } = useDeleteLikeArticle();
  return (
    <>
      <button
        className="flex items-center gap-3 hover:opacity-70 transition-opacity"
        onClick={() =>
          isLiked ? deleteLike(String(articleId)) : addLike(String(articleId))
        }
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
        <span className="text-text-primary text-base">
          {likeCount}개의 좋아요
        </span>
      </button>
    </>
  );
}
