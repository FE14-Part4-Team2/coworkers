import SearchInput from "@/components/feature/Boards/SearchInput";
import BoardBestList from "@/components/feature/Boards/BoardBestList";
import BoardList from "@/components/feature/Boards/BoardList";

export default function Page() {
  return (
    <>
      <div className="flex flex-col w-full">
        <SearchInput />
        <BoardBestList />
        <BoardList />
      </div>
    </>
  );
}
