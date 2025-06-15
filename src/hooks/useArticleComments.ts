"use client";
import {
  useGetArticleComment,
  useCreateArticleComment,
  useEditArticleComment,
  useDeleteArticleComment,
} from "@/api/article-comment/article-comment.query";
import { useState } from "react";

// 게시글 댓글 CRUD 훅
export default function useArticleComments(articleId: string) {
  const [comment, setComment] = useState("");
  const { data: comments } = useGetArticleComment(articleId as string, {
    limit: 10,
  });
  const { mutate: createComment } = useCreateArticleComment();
  const { mutate: editComment } = useEditArticleComment();
  const { mutate: deleteComment } = useDeleteArticleComment();

  return {
    comments: comments?.list || [],
    comment,
    setComment,
    createComment: (content: string) => {
      createComment({ articleId, body: { content } });
      setComment("");
    },
    editComment: (commentId: number, content: string) =>
      editComment({ commentId: commentId.toString(), body: { content } }),
    deleteComment: (commentId: number) => deleteComment(commentId.toString()),
  };
}
