import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentSection from "@/components/feature/Boards/Comment/CommentSection";

const dummyList = [
  {
    id: 1,
    date: "2025.06.17",
    title: "6월에 같이 공모전 나가실 분 구합니다",
    writer: "이나경",
    comment: 3,
    likes: 10,
    content:
      "고용노동부 공공데이터 활용 공모전 떴던데, 같이 나가실 분 구합니다! ",
  },
];

export default function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const article =
    dummyList.find((item) => item.id === Number(params.articleId)) ||
    dummyList[0];

  return (
    <article className="w-full">
      <ArticleDetail data={article} />
      <CommentSection articleId={article.id} />
    </article>
  );
}
