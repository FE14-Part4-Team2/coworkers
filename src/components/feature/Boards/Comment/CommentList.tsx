import { ArticleComment } from "@/types/article";
import CommentItem from "./CommentItem";

interface ArticleCommentProps {
  comments: ArticleComment[];
  articleId: number;
}

export default function CommentList({
  comments,
  articleId,
}: ArticleCommentProps) {
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
