import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentSection from "@/components/feature/Boards/Comment/CommentSection";
import { ArticleDetailType } from "@/api/article/article.schema";
import { baseUrl } from "@/constants/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { articleCommentService } from "@/api/article-comment/article-comment.service";

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

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["article-comments", articleId],
    queryFn: ({ pageParam = 1 }) =>
      articleCommentService.getArticleComment(articleId, {
        limit: 10,
        cursor: pageParam,
      }),
    initialPageParam: 1,
  });

  return (
    <article className="w-full">
      <ArticleDetail data={data} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommentSection articleId={articleId as string} />
      </HydrationBoundary>
    </article>
  );
}
