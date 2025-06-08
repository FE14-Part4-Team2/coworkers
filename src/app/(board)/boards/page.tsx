"use client";
import SearchInput from "@/components/feature/Boards/List/SearchInput";
import BoardBestList from "@/components/feature/Boards/List/BoardBestList";
import BoardList from "@/components/feature/Boards/List/BoardList";
import { ArticleMock } from "./[teamId]/ArticleMock";
import { useBestArticles } from "@/api/article/article.query";

export default function BoardsPage() {
  const { data: bestList = [], isLoading } = useBestArticles();
  return (
    <>
      <div className="flex flex-col w-full">
        <SearchInput />
        <BoardBestList data={bestList} />
        <BoardList data={ArticleMock} />
      </div>
    </>
  );
}
