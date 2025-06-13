"use client";
import SearchInput from "@/components/feature/Boards/List/SearchInput";
import BoardBestList from "@/components/feature/Boards/List/BoardBestList";
import BoardList from "@/components/feature/Boards/List/BoardList";
import { useArticleList, useBestArticles } from "@/api/article/article.query";
import { useState } from "react";
import { ORDER_TYPE, OrderType } from "@/constants/orderType";
import Pagination from "@/components/common/Pagination/Pagination";

export default function BoardsPage() {
  const [orderBy, setOrderBy] = useState<OrderType>(ORDER_TYPE.RECENT);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { data: bestList } = useBestArticles();
  const { data: articleList, totalCount } = useArticleList({
    page,
    pageSize,
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
        <Pagination
          page={page}
          setPage={setPage}
          total={totalCount || 0}
          pageSize={pageSize}
        />
      </div>
    </>
  );
}
