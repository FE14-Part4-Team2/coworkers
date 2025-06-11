"use client";
import { ArticleComment } from "@/types/article";
import { useState } from "react";
import CommentDropdown from "./CommentDropdown";
import Image from "next/image";
import Textarea from "@/components/common/TextArea/TextArea";
import Button from "@/components/common/Button";

export default function CommentItem({
  comment,
  onEdit,
  onDelete,
}: {
  comment: ArticleComment;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    onEdit(comment.id, editContent);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
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
            <div className="flex justify-end gap-2">
              <Button
                label="취소"
                size="sm"
                variant="secondary"
                onClick={handleCancel}
                className="border-none"
              >
                취소
              </Button>
              <Button
                label="저장"
                size="sm"
                variant="primary"
                onClick={handleSave}
                className="border-none"
              >
                저장
              </Button>
            </div>
          </div>
        ) : (
          <>
            <span className="text-md sm:text-lg text-text-primary flex-1">
              {comment.content}
            </span>
            <CommentDropdown
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={() => onDelete(comment.id)}
            />
          </>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-2 sm:gap-4 mt-3">
          <span className="flex items-center text-sm sm:text-md text-text-primary gap-1.5 sm:gap-3">
            <Image
              src={comment.writer.image || "/icons/icon-profile-default.svg"}
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
      )}
    </div>
  );
}
