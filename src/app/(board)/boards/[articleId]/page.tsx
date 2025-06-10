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
  const {
    data: article,
    isLoading: isArticleLoading,
    error: articleError,
  } = useArticleDetail(articleId as string);
  const { mutate: createComment } = useCreateArticleComment();
  const [comment, setComment] = useState("");
  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useGetArticleComment(articleId as string, { limit: 10 });

  const handleSubmit = () => {
    createComment({
      articleId: articleId as string,
      body: { content: comment },
    });
    setComment("");
  };

  if (isArticleLoading || isCommentsLoading) return <div>로딩 중...</div>;
  if (articleError || commentsError) return <div>에러가 발생했습니다.</div>;
  if (!article) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <article className="w-full">
      <ArticleDetail data={article} />
      <CommentForm
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onSubmit={handleSubmit}
      />
      <CommentList articleId={article.id} comments={comments?.list || []} />
    </article>
  );
}
