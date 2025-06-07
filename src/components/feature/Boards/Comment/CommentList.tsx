import Image from "next/image";
import { ArticleComment } from "@/types/article";
import CommentDropdown from "./CommentDropdown";

interface ArticleCommentProps {
  comments: ArticleComment[];
  articleId: number;
}

export default function CommentList({ comments }: ArticleCommentProps) {
  return (
    <>
      <section aria-label="댓글 목록" className="flex flex-col">
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex flex-col justify-between py-5 px-6 items-start border rounded-lg bg-bg-secondary border-border-primary/10 h-[7rem] sm:h-[7.5rem]">
                <div className="flex justify-between w-full items-center">
                  <span className="text-md sm:text-lg text-text-primary">
                    {comment.content}
                  </span>
                  <CommentDropdown />
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="flex items-center text-sm sm:text-md text-text-primary gap-1.5 sm:gap-3">
                    <Image
                      src={
                        comment.writer.image ||
                        "/icons/icon-profile-default.svg"
                      }
                      alt="프로필 이미지"
                      width={32}
                      height={32}
                    />
                    {comment.writer.nickname}
                  </span>
                  <span className="flex items-center text-sm sm:text-md text-text-disabled gap-2 sm:gap-4">
                    <Image
                      src="/icons/icon-vector.svg"
                      alt="벡터"
                      width={2}
                      height={12}
                    />
                    {comment.createdAt.slice(0, 10).replace(/-/g, ".")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
