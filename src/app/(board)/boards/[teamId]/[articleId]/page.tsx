import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import { ArticleMock } from "../ArticleMock";
import { CommentMock } from "../CommentMock";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";

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
      <CommentForm />
      <CommentList
        articleId={article.id}
        comments={CommentMock.flatMap((item) => item.list)}
      />
    </article>
  );
}
