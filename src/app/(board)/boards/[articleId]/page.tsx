import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import { ArticleDetailType } from "@/api/article/article.schema";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import NoAuthModal from "@/components/common/Modal/NoAuthModal";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const result = await fetch(`${baseUrl}/articles/${articleId}`, {
    cache: "force-cache",
  });

  const data = (await result.json()) as ArticleDetailType;

  return (
    <article className="w-full">
      <ArticleDetail data={data} />
      <CommentForm articleId={articleId} />
      <CommentList articleId={articleId} />
      <NoAuthModal />
    </article>
  );
}
