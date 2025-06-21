"use client";
import {
  useCreateArticleComment,
  useEditArticleComment,
  useDeleteArticleComment,
} from "@/api/article-comment/article-comment.query";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 게시글 댓글 CRUD 훅
export default function useArticleComments(articleId: string) {
  const [comment, setComment] = useState("");
  const { mutate: createComment } = useCreateArticleComment();
  const { mutate: editComment } = useEditArticleComment();
  const { mutate: deleteComment } = useDeleteArticleComment();
  const router = useRouter();

  return {
    comment,
    setComment,
    createComment: (content: string) => {
      createComment(
        { articleId, body: { content } },
        {
          onSuccess: () => {
            setComment("");
            router.refresh();
          },
        },
      );
    },
    editComment: (commentId: number, content: string) =>
      editComment({ commentId: commentId.toString(), body: { content } }),
    deleteComment: (commentId: number) => deleteComment(commentId.toString()),
  };
}
