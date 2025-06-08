"use client";
import SearchInput from "@/components/feature/Boards/List/SearchInput";
import BoardBestList from "@/components/feature/Boards/List/BoardBestList";
import BoardList from "@/components/feature/Boards/List/BoardList";
import { useArticleList, useBestArticles } from "@/api/article/article.query";

export default function BoardsPage() {
  const { data: bestList, isLoading: bestLoading } = useBestArticles();
  const { data: articleList, isLoading: articleLoading } = useArticleList({
    page: 1,
    pageSize: 6,
    orderBy: "recent",
  });

  return (
    <>
      <div className="flex flex-col w-full max-w-full">
        <SearchInput />
        <BoardBestList data={bestList} />
        <BoardList data={articleList} />
      </div>
    </>
  );
}
