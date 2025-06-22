import { ArticleComment } from "@/types/article";
import CommentItem from "./CommentItem";
import { useState } from "react";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";
import DeleteModal from "@/components/common/Modal/DeleteModal";

interface ArticleCommentProps {
  comments: ArticleComment[];
  editComment: (commentId: number, content: string) => void;
  deleteComment: (commentId: number) => void;
}

export default function CommentList({
  comments,
  editComment,
  deleteComment,
}: ArticleCommentProps) {
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();

  const handleDeleteRequest = (commentId: number) => {
    setCommentToDelete(commentId);
    openModal("delete-article-comment");
  };

  const handleConfirmDelete = () => {
    if (commentToDelete) {
      deleteComment(commentToDelete);
      setCommentToDelete(null);
      closeModal();
      showToast("댓글 삭제 완료!", "success");
    }
  };

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
            editComment={editComment}
            onDeleteRequest={handleDeleteRequest}
          />
        ))}
      </div>

      <DeleteModal
        title="댓글을 삭제하시겠습니까?"
        description="삭제된 댓글은 복구할 수 없습니다."
        onConfirm={handleConfirmDelete}
        modalType="delete-article-comment"
      />
    </section>
  );
}
