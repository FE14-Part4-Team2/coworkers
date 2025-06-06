import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import ArticleComment from "@/components/feature/Boards/Comment/ArticleComment";
import { ArticleMock } from "../ArticleMock";
import { CommentMock } from "../CommentMock";

export default function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const article =
    ArticleMock.find((item) => item.id === Number(params.articleId)) ||
    ArticleMock[0];

  return (
    <article className="w-full">
      <ArticleDetail data={article} />
      <ArticleComment
        articleId={article.id}
        comments={CommentMock.flatMap((item) => item.list)}
      />
    </article>
  );
}
