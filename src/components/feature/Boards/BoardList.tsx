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
          <LongCard
            date="2025.06.17"
            title="6월에 같이 팀하면서 일정 관리하고 공유하실 분!"
            writer="이나경"
            content="같이 공부하실 분 구함요"
            likes={10}
          />
        </div>
      </div>
    </>
  );
}
