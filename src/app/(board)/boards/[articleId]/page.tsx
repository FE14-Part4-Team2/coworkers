"use client";

import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentSection from "@/components/feature/Boards/Comment/CommentSection";
import { useArticleDetail } from "@/api/article/article.query";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { articleId } = useParams();
  const { data: article } = useArticleDetail(articleId as string);

  return (
    <article className="w-full">
      {article && <ArticleDetail data={article} />}
      <CommentSection articleId={articleId as string} />
    </article>
  );
}
