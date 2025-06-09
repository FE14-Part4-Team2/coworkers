import SearchInput from "@/components/feature/Boards/List/SearchInput";
import BoardBestList from "@/components/feature/Boards/List/BoardBestList";
import BoardList from "@/components/feature/Boards/List/BoardList";
import { ArticleMock } from "./[teamId]/ArticleMock";

export default function BoardsPage() {
  return (
    <>
      <div className="flex flex-col w-full">
        <SearchInput />
        <BoardBestList data={ArticleMock} />
        <BoardList data={ArticleMock} />
      </div>
    </>
  );
}
