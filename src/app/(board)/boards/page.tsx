// import LongCard from "@/components/feature/Boards/LongCard";
// import ShortCard from "@/components/feature/Boards/ShortCard";

import SearchInput from "@/components/feature/Boards/SearchInput";

export default function Page() {
  return (
    <>
      <div className="flex flex-col">
        <span className="text-2xl text-text-primary mb-[2.5rem]">
          자유게시판
        </span>

        <SearchInput />
      </div>
    </>
  );
}
