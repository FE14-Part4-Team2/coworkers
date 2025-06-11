"use client";
import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import {
  useArticleDetail,
  useDeleteArticle,
} from "@/api/article/article.query";
import { useParams } from "next/navigation";
import {
  useCreateArticleComment,
  useDeleteArticleComment,
  useEditArticleComment,
} from "@/api/article-comment/article-comment.query";
import { useState } from "react";
import { useGetArticleComment } from "@/api/article-comment/article-comment.query";
import { useRouter } from "next/navigation";

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
  const { mutate: deleteArticle } = useDeleteArticle();
  const router = useRouter();

  const handleSubmit = () => {
    createComment({
      articleId: articleId as string,
      body: { content: comment },
    });
    setComment("");
  };

  const handleEditArticle = () => {
    console.log("수정 잘 동작하게 해주세요");
    router.push(`/boards/new`);
  };

  const handleDeleteArticle = (articleId: number) => {
    deleteArticle(articleId.toString());
  };

  const handleEditComment = (commentId: number, content: string) => {
    editComment({
      commentId: commentId.toString(),
      body: { content },
    });
  };

  // LATER : 삭제 확인 모달 띄우기
  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment(commentId.toString());
    }
  };

  const commentList = comments?.list || [];

  // LATER : 에러 처리 구현 (스켈레톤 UI 등등)
  if (!article) return null;

  return (
    <article className="w-full">
      <ArticleDetail
        data={article}
        onEdit={handleEditArticle}
        onDelete={() => handleDeleteArticle(article.id)}
      />
      <CommentForm
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onSubmit={handleSubmit}
      />
      <CommentList
        articleId={article.id}
        comments={commentList}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
      />
    </article>
  );
}
