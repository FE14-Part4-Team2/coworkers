"use client";

import { useArticleDetail } from "@/api/article/article.query";
import ArticleDetail from "./ArticleDetail";
import CommentSection from "../Comment/CommentSection";

export default function ArticleContent({ articleId }: { articleId: string }) {
  const { data: article } = useArticleDetail(articleId);

  return (
    <article className="w-full">
      {article && <ArticleDetail data={article} />}
      <CommentSection articleId={articleId} />
    </article>
  );
}
