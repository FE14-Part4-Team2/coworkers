"use client";

import { useState } from "react";
import Textarea from "@/components/common/TextArea/TextArea";
import Button from "@/components/common/Button";
import useArticleComments from "@/hooks/useArticleComments";
import { useToastStore } from "@/stores/toastStore";
import { useModalStore } from "@/stores/modalStore";

interface CommentFormProps {
  articleId: string;
  disabled?: boolean;
}

export default function CommentForm({ articleId, disabled }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const { createComment } = useArticleComments(articleId);
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();

  const handleSubmit = async () => {
    if (!comment.trim() || disabled) {
      if (disabled) openModal("no-auth");
      return;
    }

    try {
      await createComment(comment);
      setComment("");
      showToast("댓글 등록 완료!", "success");
    } catch {
      showToast("댓글 등록 실패", "error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!e.nativeEvent.isComposing && comment.trim()) {
        handleSubmit();
      }
    }
  };

  const handleTextareaClick = () => {
    if (disabled) {
      openModal("no-auth");
    }
  };

  return (
    <>
      <h2 className="text-lg sm:text-xl text-text-primary font-medium mb-4 sm:mb-6">
        댓글달기
      </h2>
      <Textarea
        id="comment"
        placeholder="댓글을 입력해주세요."
        height="h-[6.5rem]"
        className="text-md sm:text-lg"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={handleTextareaClick}
        readOnly={disabled}
      />
      <div className="flex justify-end mb-8 sm:mb-10">
        <Button
          label="등록"
          variant="primary"
          type="submit"
          className="px-[0] w-[4.5rem] h-[2rem] sm:w-[11.5rem] sm:h-[3rem] mt-4"
          onClick={handleSubmit}
          disabled={!comment.trim() || disabled}
        />
      </div>

      <hr className="w-full border-t border-border-primary opacity-10 mb-8 sm:mb-10" />
    </>
  );
}
