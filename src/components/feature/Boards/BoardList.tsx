import FilterDropdown from "@/components/common/Dropdown/FilterDropdown";
import LongCard from "./LongCard";

export default function BoardList() {
  return (
    <>
      <div className="flex flex-col mt-[5rem]">
        <div className="flex items-center justify-between mb-[2rem]">
          <span className="text-xl text-text-primary">게시글</span>
          <FilterDropdown />
        </div>
        <div className="flex gap-4">
          <LongCard />
          <LongCard />
        </div>
      </div>
    </>
  );
}
