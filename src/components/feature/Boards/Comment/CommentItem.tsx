"use client";
import { ArticleComment } from "@/types/article";
import { useState } from "react";
import CommentDropdown from "./CommentDropdown";
import Image from "next/image";
import Textarea from "@/components/common/TextArea/TextArea";
import Button from "@/components/common/Button";
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
import DeleteModal from "@/components/common/Modal/DeleteModal";
import useArticleComments from "@/hooks/useArticleComments";
import { useToastStore } from "@/stores/toastStore";

interface CommentItemProps {
  comment: ArticleComment;
  articleId: string;
}

export default function CommentItem({ comment, articleId }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const { editComment } = useArticleComments(articleId.toString());
  const { deleteComment } = useArticleComments(comment.id.toString());
  const user = useAuthStore((state) => state.user);
  const isMyComment = user?.id === comment.writer.id;

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    editComment(comment.id, editContent);
    setIsEditing(false);
    showToast("댓글 수정 완료!", "success");
  };
  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };
  const handleDeleteClick = () => {
    openModal("delete-article-comment");
  };

  const handleConfirmDelete = () => {
    deleteComment(comment.id);
    closeModal();
    showToast("댓글 삭제 완료!", "success");
  };

  return (
    <div className="flex flex-col justify-between py-5 px-6 items-start border rounded-lg bg-bg-secondary border-border-primary/10 min-h-[7rem] sm:min-h-[7.5rem]">
      <div className="flex justify-between w-full items-start gap-3">
        {isEditing ? (
          <div className="flex flex-col w-full gap-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              height="h-[5rem]"
              autoFocus
              rows={2}
            />
            <div className="flex justify-end gap-2 text-md">
              <Button
                label="취소"
                size="sm"
                variant="secondary"
                onClick={handleCancel}
                className="border-none w-[5rem] h-8"
              />
              <Button
                label="저장"
                size="sm"
                variant="primary"
                onClick={handleSave}
                className="border-none w-[5rem] h-8"
              />
            </div>
          </div>
        ) : (
          <>
            <span className="text-md sm:text-lg text-text-primary flex-1 break-all">
              {comment.content}
            </span>
            {isMyComment && (
              <CommentDropdown
                isEditing={isEditing}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDeleteClick}
              />
            )}
          </>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-2 sm:gap-4 mt-3">
          <span className="flex items-center text-sm sm:text-md text-text-primary gap-1.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden">
              <Image
                src={comment.writer.image || "/icons/icon-profile-default.svg"}
                alt="프로필 이미지"
                width={36}
                height={36}
              />
            </div>
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
      )}

      <DeleteModal
        title="댓글을 삭제하시겠습니까?"
        description="삭제된 댓글은 복구할 수 없습니다."
        onConfirm={handleConfirmDelete}
        modalType="delete-article-comment"
      />
    </div>
  );
}
