"use client";
import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import { useArticleDetail } from "@/api/article/article.query";
import { useParams } from "next/navigation";
import useArticleComments from "@/hooks/useArticleComments";

export default function ArticlePage() {
  const { articleId } = useParams();
  const { data: article } = useArticleDetail(articleId as string);
  const { comments } = useArticleComments(articleId as string);

  if (!article) return null;

  return (
    <article className="w-full">
      <ArticleDetail data={article} />
      <CommentForm articleId={articleId as string} />
      <CommentList articleId={article.id} comments={comments} />
    </article>
  );
}
