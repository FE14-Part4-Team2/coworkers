import CommentItem from "./CommentItem";
import { GetArticleCommentResponse } from "@/api/article-comment/article-comment.schema";

interface ArticleCommentProps {
  articleId: string;
}

export default async function CommentList({ articleId }: ArticleCommentProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const commentsResult = await fetch(
    `${baseUrl}/articles/${articleId}/comments?limit=10`,
    {
      cache: "no-store",
    },
  );

  const commentsData =
    (await commentsResult.json()) as GetArticleCommentResponse;
  const comments = commentsData.list;

  if (comments.length === 0) {
    return (
      <section aria-label="댓글 목록" className="flex flex-col">
        <div className="flex flex-col items-center justify-center py-6 px-6">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-text-disabled/40 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>

            <p className="text-lg text-text-disabled mb-2">
              아직 댓글이 없어요
            </p>
            <p className="text-md text-text-disabled/80">
              첫번째 댓글을 남겨보세요 !
            </p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section aria-label="댓글 목록" className="flex flex-col">
      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            articleId={articleId}
          />
        ))}
      </div>
    </section>
  );
}
