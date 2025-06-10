"use client";
import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import { CommentMock } from "../CommentMock";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import { useArticleDetail } from "@/api/article/article.query";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { articleId } = useParams();
  const {
    data: article,
    isLoading,
    error,
  } = useArticleDetail(articleId as string);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!article) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <article className="w-full">
      <ArticleDetail data={article} />
      <CommentForm />
      <CommentList
        articleId={article.id}
        comments={CommentMock.flatMap((item) => item.list)}
      />
    </article>
  );
}
