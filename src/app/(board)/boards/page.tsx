"use client";

import SearchInput from "@/components/feature/Boards/List/SearchInput";
import BoardBestList from "@/components/feature/Boards/List/BoardBestList";
import BoardList from "@/components/feature/Boards/List/BoardList";
import AsyncBoundary from "@/components/common/AsyncBoundary/AsyncBoundary";
import BoardBestListSkeleton from "@/components/feature/Boards/Skeleton/BoardBestListSkeleton";
import { useState } from "react";
import BoardListSkeleton from "@/components/feature/Boards/Skeleton/BoardListSkeleton";
import ErrorFallback from "@/components/common/AsyncBoundary/ErrorFallback";

export default function BoardsPage() {
  const [keyword, setKeyword] = useState("");
  const hasKeyword = keyword.trim() !== "";

  return (
    <>
      <div className="flex flex-col w-full max-w-full">
        <SearchInput value={keyword} onChange={setKeyword} />

        {!hasKeyword && (
          <AsyncBoundary
            fallback={<BoardBestListSkeleton />}
            errorFallback={({ error, resetErrorBoundary }) => (
              <ErrorFallback
                error={error}
                onRetry={resetErrorBoundary}
                title="인기 게시글을 불러올 수 없습니다"
              />
            )}
          >
            <BoardBestList />
          </AsyncBoundary>
        )}

        <AsyncBoundary
          fallback={<BoardListSkeleton />}
          errorFallback={({ error, resetErrorBoundary }) => (
            <ErrorFallback
              error={error}
              onRetry={resetErrorBoundary}
              title="전체 게시글을 불러올 수 없습니다"
            />
          )}
        >
          <BoardList keyword={keyword} />
        </AsyncBoundary>
      </div>
    </>
  );
}
