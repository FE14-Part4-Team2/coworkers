"use client";
import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import { useArticleDetail } from "@/api/article/article.query";
import { useParams } from "next/navigation";
import { useCreateArticleComment } from "@/api/article-comment/article-comment.query";
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

  const handleSubmit = () => {
    createComment({
      articleId: articleId as string,
      body: { content: comment },
    });
    setComment("");
  };

  const commentList = comments?.list || [];

  //추후 error 처리 구현 예정 (skeleton UI 등등)
  if (!article) return null;

  return (
    <article className="w-full">
      <ArticleDetail data={article} />
      <CommentForm
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onSubmit={handleSubmit}
      />
      <CommentList articleId={article.id} comments={commentList} />
    </article>
  );
}
