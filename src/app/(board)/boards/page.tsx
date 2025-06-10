"use client";
import SearchInput from "@/components/feature/Boards/List/SearchInput";
import BoardBestList from "@/components/feature/Boards/List/BoardBestList";
import BoardList from "@/components/feature/Boards/List/BoardList";
import { useArticleList, useBestArticles } from "@/api/article/article.query";
import { useState } from "react";
import { ORDER_TYPE, OrderType } from "@/constants/orderType";

export default function BoardsPage() {
  const [orderBy, setOrderBy] = useState<OrderType>(ORDER_TYPE.RECENT);
  const { data: bestList } = useBestArticles();
  const { data: articleList } = useArticleList({
    page: 1,
    pageSize: 6,
    orderBy,
  });

  return (
    <>
      <div className="flex flex-col w-full max-w-full">
        <SearchInput />
        <BoardBestList data={bestList} />
        <BoardList
          data={articleList}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      </div>
    </>
  );
}
