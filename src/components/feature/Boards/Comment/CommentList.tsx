import { ArticleComment } from "@/types/article";
import CommentItem from "./CommentItem";

interface ArticleCommentProps {
  comments: ArticleComment[];
  articleId: number;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentList({
  comments,
  onEdit,
  onDelete,
}: ArticleCommentProps) {
  return (
    <section aria-label="댓글 목록" className="flex flex-col">
      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
