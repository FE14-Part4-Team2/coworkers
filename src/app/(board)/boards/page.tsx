"use client";
import SearchInput from "@/components/feature/Boards/List/SearchInput";
import BoardBestList from "@/components/feature/Boards/List/BoardBestList";
import BoardList from "@/components/feature/Boards/List/BoardList";
import { useState } from "react";

export default function BoardsPage() {
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <div className="flex flex-col w-full max-w-full">
        <SearchInput value={keyword} onChange={setKeyword} />
        {keyword.trim() === "" && <BoardBestList />}
        <BoardList keyword={keyword} />
      </div>
    </>
  );
}
