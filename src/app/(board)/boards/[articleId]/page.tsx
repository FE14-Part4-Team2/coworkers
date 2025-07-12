import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentSection from "@/components/feature/Boards/Comment/CommentSection";
import { ArticleDetailType } from "@/api/article/article.schema";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  const result = await fetch(`${baseUrl}/articles/${articleId}`, {
    cache: "force-cache",
  });

  const data = (await result.json()) as ArticleDetailType;

  return (
    <article className="w-full">
      <ArticleDetail data={data} />
      <CommentSection articleId={articleId as string} />
    </article>
  );
}
