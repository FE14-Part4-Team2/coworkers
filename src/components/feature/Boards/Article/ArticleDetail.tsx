import { ArticleDetailType } from "@/api/article/article.schema";
import Image from "next/image";
import LikeButton from "./LikeButton";

export default function ArticleDetail({ data }: { data: ArticleDetailType }) {
  return (
    <>
      <div className="flex justify-between items-center my-5">
        <h1 className="text-lg sm:text-2lg text-text-secondary font-medium">
          {data.title}
        </h1>
        <Image
          src="/icons/icon-kebabs.svg"
          alt="더보기"
          width={3}
          height={12}
        />
      </div>
      <hr className="w-full border-t border-border-primary" />
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-4 sm:gap-8 md:gap-20">
          <span className="text-text-primary text-sm sm:text-md">
            {data.writer.nickname}
          </span>
          <span className="text-interaction-inactive text-sm sm:text-md">
            {data.updatedAt.slice(0, 10).replace(/-/g, ".")}
          </span>
        </div>
      </div>

      {data.image && (
        <div className="mt-6">
          <Image
            src={data.image}
            alt={data.title || "게시글 이미지"}
            width={400}
            height={400}
            className="rounded-lg object-cover"
            priority={false}
          />
        </div>
      )}

      <section className="text-text-secondary text-md sm:text-lg py-12 sm:py-16 whitespace-pre-line">
        {data.content}
      </section>

      <div className="flex items-center gap-4 py-6 border-b mb-6">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/icon-comment.svg"
            alt="댓글"
            width={28}
            height={28}
          />
          <span className="text-text-primary text-base">
            {data.commentCount}개의 댓글
          </span>
        </div>
        <LikeButton
          isLiked={data.isLiked}
          articleId={data.id}
          likeCount={data.likeCount}
        />
      </div>
    </>
  );
}
