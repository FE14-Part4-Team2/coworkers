"use client";
import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import { useArticleDetail } from "@/api/article/article.query";
import { useParams } from "next/navigation";
import {
  useCreateArticleComment,
  useDeleteArticleComment,
  useEditArticleComment,
} from "@/api/article-comment/article-comment.query";
import { useState } from "react";
import { useGetArticleComment } from "@/api/article-comment/article-comment.query";

export default function ArticlePage() {
  const { articleId } = useParams();
  const [comment, setComment] = useState("");
  const { data: article } = useArticleDetail(articleId as string);
  const { mutate: createComment } = useCreateArticleComment();
  const { data: comments } = useGetArticleComment(articleId as string, {
    limit: 10,
  });
  const { mutate: deleteComment } = useDeleteArticleComment();
  const { mutate: editComment } = useEditArticleComment();

  const handleSubmit = () => {
    createComment({
      articleId: articleId as string,
      body: { content: comment },
    });
    setComment("");
  };

  const handleEdit = (commentId: number, content: string) => {
    editComment({
      commentId: commentId.toString(),
      body: { content },
    });
  };

  // LATER : 삭제 확인 모달 띄우기
  const handleDelete = (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment(commentId.toString());
    }
  };

  const commentList = comments?.list || [];

  // LATER : 에러 처리 구현 (스켈레톤 UI 등등)
  if (!article) return null;

  return (
    <article className="w-full">
      <ArticleDetail data={article} />
      <CommentForm
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onSubmit={handleSubmit}
      />
      <CommentList
        articleId={article.id}
        comments={commentList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </article>
  );
}
